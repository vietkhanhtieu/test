'use client'

import { ZALO_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { ChatIcon } from '@/public/icons'
import {
  BoxIcon,
  ChoXacNhanIcon,
  DaGiaoIcon,
  DaHuyIcon,
  DaLayHangIcon,
  DangVanChuyenIcon,
  DanhGiaIcon
} from '@/public/orders'
import axios from 'axios'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ModalCancelOrder } from '../../ModalCancelOrder'
import { IReason } from '../../ModalCancelOrder'
import { ModalConfirmRefundOrder } from '../../ModalConfirmRefundOrder'
import { progressMapping, statusMapping } from '../../definitions'

interface Props {
  data: any
  moreData: any
}

interface IOrder {
  order_id: string
  total: number
}

const OrderStatus = (props: Props) => {
  const { data, moreData } = props
  const router = useRouter()
  const [isOpenModalCancel, setIsOpenModalCancel] = useState<boolean>(false)
  const [isOpenModalRefund, setIsOpenModalRefund] = useState<boolean>(false)
  const [orderSelected, setOrderSelected] = useState<IOrder | null>(null)
  const [listReasons, setListReasons] = useState<IReason[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchReasonCancel = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/reason/list-order`
        )
        const data = response.data

        if (data.message === 'Successfully') {
          const resData = data.data.map((reason: any) => {
            return {
              code: reason.code,
              title: reason.title
            }
          })
          setListReasons(resData)
        }
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }

    fetchReasonCancel()
  }, [])

  const borderColor = (status: string | string[]) => {
    const condition = Array.isArray(status)
      ? status.includes(statusMapping[data.status])
      : statusMapping[data.status] === status

    return condition ? 'border-primary' : 'border-silver-sand'
  }

  const borderColorAndLeft = (status: string) => {
    return statusMapping[data.status] === status
      ? 'border-l border-primary ml-[-1px]'
      : 'border-silver-sand'
  }

  const iconStroke = (status: string | string[]) => {
    const condition = Array.isArray(status)
      ? status.includes(statusMapping[data.status])
      : statusMapping[data.status] === status

    return condition ? '#ff6b00' : undefined
  }

  const statusDate = (status: string | string[]) => {
    const condition = Array.isArray(status)
      ? status.includes(statusMapping[data.status])
      : statusMapping[data.status] === status

    if (!condition) return

    return (
      <>
        {statusMapping[data.status]}
        <br />
        <span className='text-dusty-gray text-10 leading-3 font-normal'>
          {moment(data.updated_at).format('hh:mm - DD/MM/YYYY')}
        </span>
      </>
    )
  }

  const handleCancelOrder = (order: any) => {
    setOrderSelected({
      order_id: order.id,
      total: moreData.total_money || 0
    })
    setIsOpenModalCancel(true)
  }

  const syncOrder = () => {
    router.refresh()
  }

  const checkShowReturnOrder = (date: string | null) => {
    if (date) {
      const currentTime = moment()
      const deliveryTime = moment(date, 'DD/MM/YYYY HH:mm:ss')
      const duration = moment.duration(currentTime.diff(deliveryTime))
      return duration.asHours() <= 0.5
    } else {
      return false
    }
  }

  return (
    <div className='px-[15px] lg:px-[30px] py-[30px]'>
      <ul className='grid grid-cols-6 h-[50px] mb-2'>
        <li
          className={cn(
            'relative inline-flex border rounded-l-full',
            borderColor(['Chưa thanh toán', 'Chờ xác nhận'])
          )}
        >
          <ChoXacNhanIcon
            stroke={iconStroke(['Chưa thanh toán', 'Chờ xác nhận'])}
            className='w-5 h-6 m-auto'
          />
        </li>
        <li
          className={cn(
            'relative inline-flex border-t border-r border-b',
            borderColorAndLeft('Chờ lấy hàng')
          )}
        >
          <DaLayHangIcon stroke={iconStroke('Chờ lấy hàng')} className='w-6 h-7 m-auto' />
        </li>
        <li
          className={cn(
            'relative inline-flex border-t border-r border-b',
            borderColorAndLeft('Đang giao')
          )}
        >
          <DangVanChuyenIcon
            stroke={iconStroke('Đang giao')}
            className='w-[39px] h-[25px] m-auto'
          />
        </li>
        <li
          className={cn(
            'relative inline-flex border-t border-r border-b',
            borderColorAndLeft('Đã giao')
          )}
        >
          <DaGiaoIcon stroke={iconStroke('Đã giao')} className='w-5 h-[22px] m-auto' />
        </li>
        <li className={cn('relative inline-flex border-t border-b', borderColorAndLeft('Đã huỷ'))}>
          <DaHuyIcon stroke={iconStroke('Đã huỷ')} className='w-[21px] h-[22px] m-auto' />
        </li>
        <li className='inline-flex border border-silver-sand rounded-r-full'>
          <DanhGiaIcon className='w-[25px] h-[25px] m-auto' />
        </li>
      </ul>

      <ul className='grid grid-cols-6 h-7 mb-[30px] text-12 font-medium leading-[14px] text-center'>
        <li>{statusDate(['Chưa thanh toán', 'Chờ xác nhận'])}</li>
        <li>{statusDate('Chờ lấy hàng')}</li>
        <li>{statusDate('Đang giao')}</li>
        <li>{statusDate('Đã giao')}</li>
        <li>{statusDate('Đã huỷ')}</li>
        <li></li>
      </ul>

      <div className='flex flex-col lg:flex-row gap-5 justify-between py-3.5'>
        <div className='flex gap-2.5 items-center text-dodger-blue'>
          {data.progress && (
            <>
              <Image src={BoxIcon} alt='Box' width={15} height={16} />
              {progressMapping[data.progress.toLowerCase()]}
            </>
          )}
        </div>
        <div className='flex gap-3.5'>
          <Link
            href={ZALO_URL}
            target='_blank'
            className='inline-flex gap-2.5 items-center py-1.5 px-2.5 text-primary'
          >
            Liên hệ <Image src={ChatIcon} alt='Contact' width={19} height={18} className='' />
          </Link>
          {data.status === 'wc-order-payment' && (
            <button
              className='dy-btn dy-btn-outline dy-btn-primary h-9 min-h-9 py-2.5 px-6 rounded-[10px] font-medium'
              onClick={() => handleCancelOrder(data)}
            >
              Huỷ đơn
            </button>
          )}
          {data.status === 'wc-order-waiting' && (
            <button
              className='dy-btn dy-btn-primary bg-primary h-9 min-h-9 py-2.5 px-6 rounded-[10px] font-medium text-white'
              onClick={() => handleCancelOrder(data)}
            >
              Huỷ đơn hàng
            </button>
          )}
          {['wc-order-payment', 'wc-order-cancel'].includes(data.status) && (
            <button className='dy-btn dy-btn-primary h-9 min-h-9 py-2.5 px-6 border-none rounded-[10px] font-medium'>
              Đặt lại đơn
            </button>
          )}
          {data.status === 'wc-order-complete' && (
            <>
              {checkShowReturnOrder(data.delivery_progress?.Order_complete?.date) && (
                <button
                  className='dy-btn dy-btn-outline dy-btn-primary h-9 min-h-9 py-2.5 px-6 rounded-[10px] font-medium'
                  onClick={() => setIsOpenModalRefund(true)}
                >
                  Đổi/trả hàng
                </button>
              )}
              <button className='dy-btn dy-btn-outline dy-btn-primary h-9 min-h-9 py-2.5 px-6 rounded-[10px] font-medium'>
                Đặt lại đơn
              </button>
              <button className='dy-btn dy-btn-primary h-9 min-h-9 py-2.5 px-6 border-none rounded-[10px] font-medium'>
                Đánh giá
              </button>
            </>
          )}
        </div>
      </div>
      <ModalCancelOrder
        isOpenModalCancel={isOpenModalCancel}
        setIsOpenModalCancel={setIsOpenModalCancel}
        order={orderSelected}
        listReasons={listReasons}
        syncOrder={syncOrder}
        isLoadingFetch={isLoading}
      />
      <ModalConfirmRefundOrder
        isOpenModal={isOpenModalRefund}
        setIsOpenModal={setIsOpenModalRefund}
        order_id={data.id}
      />
    </div>
  )
}

export default OrderStatus
