import { _fetch } from '@/app/actions'
import { usePrevNextButtons } from '@/components/CustomCarousel/CarouselArrowButtons'
import { DotButton, useDotButton } from '@/components/CustomCarousel/CarouselDotButton'
import axios from '@/lib/axios'
import { IOrder } from '@/lib/types/order'
import useEmblaCarousel from 'embla-carousel-react'
import { orderBy } from 'lodash'
import Image from 'next/image'
import Link from 'next/link'
import { fetchAPI } from '@/apiconfi'
import { useEffect, useState } from 'react'

import { DateFilterDropdown } from './DateFilterDropdown'
import Order from './Order'
import revalidateRecentlyOrders from './action'

export default function RecentlyOrders() {
  const [orders, setOrders] = useState<IOrder[]>([])
  const [filterDate, setFilterDate] = useState<string | number>('')

  const [ref, api] = useEmblaCarousel({ loop: true })
  const { selectedIndex, onDotButtonClick } = useDotButton(api)
  usePrevNextButtons(api)

  useEffect(() => {
    const getData = async () => {
      const response = await fetchAPI('order/get-all-order-by-userid/1', 
      { method: 'GET' })

      if (response.status === 200) {
        setOrders(response.data)
        console.log(response.data)
      }
    }
    getData()
  }, [])

  const groupOrders = orderBy(orders, ['is_pinned', 'order_id'], ['desc', 'desc']).reduce<
    IOrder[][]
  >((acc, curr, index) => {
    if (index % 3 === 0) {
      acc.push([curr])
    } else {
      if (acc.length > 0) {
        acc[acc.length - 1].push(curr)
      }
    }
    return acc
  }, [])

  const handleOnPinOrder = async (order_id: number, is_pin: boolean) => {
    const dataParams = {
      order_id: order_id,
      is_pin: is_pin
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/order-management/pin_order_cart`,
      dataParams
    )
    if (response.data.message === 'Successfully') {
      let newOrders = [...orders]
      let idx = newOrders.findIndex((o) => o.order_id == order_id)

      if (idx !== -1) {
        let order = newOrders[idx]
        order['is_pinned'] = is_pin
        newOrders[idx] = order
        setOrders(newOrders)
      }
    }
    revalidateRecentlyOrders()
  }

  const handleSelectFilterDate = (newValue: any) => {
    setFilterDate(newValue.value)
  }

  return (
    <div className='home__section my-[70px]'>
      <p className='text-24 font-bold leading-28 mb-5'>Đơn hàng đã đặt</p>
      <div className='flex items-center justify-between'>
        <DateFilterDropdown
          filterDate={filterDate}
          totalOrder={orders.length}
          onChangeDateFilter={handleSelectFilterDate}
        />
        <Link href={'/account/orders'}>
          <div className='flex items-center cursor-pointer hover:underline'>
            <span className='text-16 leading-[19px] me-[5px]'>Xem tất cả</span>
            <Image
              alt='chevron-right'
              src={'/icons/chevron-right-dark-gray.svg'}
              width={4}
              height={8}
            />
          </div>
        </Link>
      </div>
      <section className='relative w-full rounded-[10px] mt-5'>
        <div className='overflow-hidden' ref={ref}>
          <div className='flex'>
            {groupOrders.map((orders: IOrder[], index: number) => (
              <div
                className='flex gap-5 justify-center ml-1'
                key={index}
                style={{ flex: '0 0 105%' }}
              >
                {orders.map((order: IOrder, index: number) => (
                  <Order key={index} order={order} handleOnPinOrder={handleOnPinOrder} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className='absolute bottom-[-26px] justify-center flex gap-2.5 w-full'>
          {groupOrders.map((orders: IOrder[], index: number) => (
            <DotButton key={index} onClick={() => onDotButtonClick(index)}>
              <div
                className={`${index === selectedIndex ? 'w-[30px] bg-primary' : 'w-[11px] border border-primary'} h-[11px] rounded-full`}
                onClick={() => onDotButtonClick(index)}
              ></div>
            </DotButton>
          ))}
        </div>
      </section>
    </div>
  )
}
