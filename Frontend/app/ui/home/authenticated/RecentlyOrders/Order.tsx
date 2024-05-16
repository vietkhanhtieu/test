import { CartApi } from '@/app/api/cart'
import { IProductData } from '@/app/cart/page'
import Spinner from '@/components/ui/spinner'
import axios from '@/lib/axios'
import { setCurrentStep, setIsFromReOrder, setSelectedProducts } from '@/lib/redux/slices/user_cart'
import { IOrder } from '@/lib/types/order'
import { formatVND } from '@/lib/utils'
import Pin from '@/public/icons/svg_components/Pin'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
  order: IOrder
  handleOnPinOrder: (order_id: number, is_pin: boolean) => void
}

const Order: React.FC<Props> = ({ order, handleOnPinOrder }) => {
  const [pinning, setPinning] = useState<boolean>(false)
  const [reOrderLoading, setReOrderLoading] = useState<boolean>(false)

  const dispatch = useDispatch()
  const router = useRouter()

  const handleOnClickPin = async () => {
    const is_pin = !order.is_pinned
    setPinning(true)
    await handleOnPinOrder(order.orderid, is_pin)
    setPinning(false)
  }

  const handleReOrder = async () => {
    setReOrderLoading(true)

    const response = await fetch('/api/order-management/reorder', {
      method: 'POST',
      body: JSON.stringify({ orderId: order.orderid })
    })
    const reOrderData = await response.json()

    if (reOrderData.message == 'Successfully') {
      if (reOrderData.products.length == 0) {
        console.log('>>>>>>>>>> Product out of stock')
        setReOrderLoading(false)

        return
      }
      const cartResponse = await CartApi.getCart()
      const listProducts: IProductData[] = cartResponse.data.cart
        .filter((item: any) => reOrderData.products.includes(item.id))
        .map((item: any) => ({
          product_id: item.id,
          quantity: item.quantity,
          sale_price: item.sale_price,
          regular_price: item.regular_price,
          supplier: item.supplier,
          title: item.title,
          packing: item.packing,
          productId: item.id,
          stockStatus: item.stock_status,
          stockQuantity: item.stock_quantity,
          isThuoc: item.is_thuoc
        }))
      switch (order.status) {
        case 'wc-order-payment':
          dispatch(setCurrentStep({ current_step: 2 }))
          break
        default:
          dispatch(setCurrentStep({ current_step: 1 }))
          break
      }
      dispatch(setSelectedProducts({ selectedProducts: listProducts }))
      dispatch(setIsFromReOrder({ isFromReOrder: true }))
      setReOrderLoading(false)
      router.push('/cart')
    }
  }

  return (
    <div className='pt-3 px-[14px] bg-white w-[380px] h-[360px] rounded-lg'>
      <div className='flex items-end justify-between mb-[13px]'>
        <p className='text-14'>
          Mã đơn hàng: <span className='text-16 font-medium'>{order.orderid}</span>
        </p>
        {pinning ? (
          <Spinner />
        ) : (
          <>
            {order.is_pinned ? (
              <button
                onClick={handleOnClickPin}
                className='flex items-center justify-center rounded-full bg-primary hover:opacity-85 w-[34px] h-[34px]'
              >
                <Pin stroke='#fff' />
              </button>
            ) : (
              <button
                onClick={handleOnClickPin}
                className='flex items-center justify-center rounded-[30px] text-primary border border-primary hover:opacity-85 w-[92px] h-[34px]'
              >
                <Pin />
                <span className='ms-[5px] text-12 font-medium leading-[14px]'>Ghim đơn</span>
              </button>
            )}
          </>
        )}
      </div>
      <div className='flex items-end justify-between'>
        <span className='text-12'>Giao ngày 25/12/2022</span>
      </div>
      <div>
        <div className='flex justify-between items-center w-full gap-auto border-b border-alto'>
          <div className='flex items-center h-10 px-0 w-[160px] text-12 font-bold leading-[14px]'>
            <p>Tên sản phẩm</p>
          </div>
          <div className='flex min-w-[50px] items-center text-center h-10 px-0 text-12 font-bold leading-[14px]'>
            <p>Số lượng</p>
          </div>
          <div className='flex items-center justify-end h-10 px-0 w-[100px] text-12 font-bold leading-[14px]'>
            <p>Đơn giá hiện tại</p>
          </div>
        </div>
        <div className='py-[13px] h-[181px] border-b border-alto overflow-y-auto'>
          {order.orderDetailResponseDto.map((prod, index) => {
            return (
              <div key={index} className='flex justify-between w-full gap-auto mb-[7px]'>
                <div className='px-0 w-[160px]'>
                  <p className='text-14 font-medium leading-[16px] mb-[2px] truncate'>
                    {prod.productName}
                  </p>
                  <p className='text-12 leading-[14px]'>{prod.dosage_form}</p>
                </div>
                <div className='text-12 min-w-[50px] text-center leading-[14px] font-medium'>
                  <p>{prod.quantity}</p>
                </div>
                <div className='px-0 w-[100px] text-right text-14 leading-[16px] font-medium'>
                  <p>{formatVND(prod.regular_price)}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className='mt-[10px] flex items-center justify-center'>
        <Link href={`/account/orders/${order.orderid}`}>
          <button
            disabled={reOrderLoading}
            className='flex items-center justify-center rounded-[32px] text-primary border border-primary hover:opacity-85 w-[120px] h-9 me-5'
          >
            <span className='text-14 leading-[16px] font-medium'>Xem lại đơn</span>
          </button>
        </Link>

        <button
          onClick={handleReOrder}
          disabled={reOrderLoading}
          className='flex items-center justify-center rounded-[32px] text-white bg-primary hover:opacity-85 w-[120px] h-9'
        >
          {reOrderLoading ? (
            <Spinner size='xs' />
          ) : (
            <span className='text-14 leading-[16px] font-medium'>Đặt lại đơn</span>
          )}
        </button>
      </div>
    </div>
  )
}

export default Order
