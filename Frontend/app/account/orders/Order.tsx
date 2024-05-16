'use client'

import axios from '@/app/api/axios'
import { CartApi } from '@/app/api/cart'
import { IProductData } from '@/app/cart/page'
import Spinner from '@/components/ui/spinner'
import { setCurrentStep, setIsFromReOrder, setSelectedProducts } from '@/lib/redux/slices/user_cart'
import { IOrder } from '@/lib/types/order'
import { formatVND } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Tooltip as ReactTooltip } from 'react-tooltip'

import { ModalCancelOrder } from './ModalCancelOrder'
import { IReason } from './ModalCancelOrder'
import { progressMapping, statusMapping } from './definitions'

interface Props {
  order: IOrder
  listReasons: IReason[]
  syncOrder: (id: number) => void
}

const Order: React.FC<Props> = ({ order, listReasons, syncOrder }) => {
  const [openCopyTooltip, setOpenCopyTooltip] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const coppyOrderIdToClipboard = () => {
    navigator.clipboard.writeText(order.order_id.toString()).then(() => {
      setOpenCopyTooltip(true)

      setTimeout(() => {
        setOpenCopyTooltip(false)
      }, 2000)
    })
  }

  const [isOpenModalCancel, setIsOpenModalCancel] = useState<boolean>(false)
  const [orderSelected, setOrderSelected] = useState<IOrder | null>(null)

  const handleCancelOrder = (order: IOrder) => {
    setOrderSelected(order)
    setIsOpenModalCancel(true)
  }

  const [reOrderLoading, setReOrderLoading] = useState<boolean>(false)

  const handleReOrder = async (order: IOrder) => {
    setReOrderLoading(true)

    if (order.status == 'wc-order-payment') {
      await axios.post(`/wp-json/order-management/order_cancel`, {
        order_id: order.order_id,
        message: 'Khách hàng không thanh toán',
        code_reason: 'REASON_8'
      })
    }
    const response = await fetch('/api/order-management/reorder', {
      method: 'POST',
      body: JSON.stringify({ orderId: order.order_id })
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
      router.push('/cart')
    }
  }

  return (
    <>
      <div className='flex items-center justify-between px-[15px] lg:px-[30px] py-[11px] lg:py-[22px]'>
        <div className='flex items-center'>
          <div className='me-[6px] flex items-center justify-center w-4 h-4'>
            <Image src='/icons/house.svg' width={14} height={13} alt='supplier' />
          </div>
          <span className='text-14 font-medium leading-[16px]'>
            {order.supplier.name || 'GONSA phân phối'}
          </span>
        </div>
        <div className='flex items-center'>
          <div className='me-[5px] lg:me-[15px] flex items-center justify-center w-4 h-4'>
            <Image
              id={`tooltip-status-order-${order.order_id}`}
              src='/icons/help.svg'
              width={16}
              height={16}
              alt='help'
              className='cursor-pointer'
            />
          </div>
          <ReactTooltip
            anchorSelect={`#tooltip-status-order-${order.order_id}`}
            place='top'
            clickable
            content='Cập nhật mới nhất 23:00 23/01/2024'
            openOnClick={false}
            offset={7}
            className='max-w-[143px] text-center !text-abbey !bg-white shadow-2xl !opacity-100 !rounded-[10px]'
            style={{
              fontSize: '14px',
              paddingLeft: '12px',
              paddingRight: '12px',
              paddingTop: '6px',
              paddingBottom: '10px',
              lineHeight: '16px'
            }}
          />
          <span className='text-14 font-medium leading-[17px] text-primary uppercase'>
            {statusMapping[order.status]}
          </span>
        </div>
      </div>
      <div className='flex items-center justify-between px-[15px] lg:px-[30px] py-[15px] border-t border-gray-10'>
        <div className='flex items-center '>
          <Link href={`/account/orders/${order.order_id}`}>
            <span className='text-14 font-medium leading-[16px] hover:underline hover:text-primary'>
              Mã đơn hàng: {order.order_id}
            </span>
          </Link>
          <Image
            src={'/icons/copy-ico-gray.svg'}
            width={13}
            height={13}
            alt='copy-icon'
            className='ms-[4px] lg:ms-[10px] cursor-pointer'
            id={`tooltip-copy-order-${order.order_id}`}
            onClick={coppyOrderIdToClipboard}
          />
          <ReactTooltip
            anchorSelect={`#tooltip-copy-order-${order.order_id}`}
            place='top'
            clickable
            content='Copied!'
            openOnClick={true}
            offset={7}
            isOpen={openCopyTooltip}
            style={{
              fontSize: '12px',
              paddingLeft: '5px',
              paddingRight: '5px',
              paddingTop: '4px',
              paddingBottom: '4px'
            }}
          />
        </div>
        <div className='text-14 font-normal leading-[16px]'>Chi tiết đơn hàng</div>
      </div>
      {order.product.map((item, index) => (
        <div
          key={index}
          className='flex justify-between px-[15px] lg:px-[30px] py-4 border-t border-gray-10'
        >
          <div className='flex flex-col'>
            <label className='text-16 font-bold leading-[19px] cursor-pointer'>
              {item.product_name}
            </label>
            <p className='text-12 font-normal leading-[14px] mt-[1px]'>{item.dosage_form}</p>
          </div>
          <div className='text-right'>
            {item.sale_price ? (
              <>
                <div className='text-primary text-14 font-bold leading-[16px] mb-[5px]'>
                  {formatVND(item.sale_price)}
                </div>
                <div className='text-10 text-normal leading-3 line-through mb-[5px]'>
                  {formatVND(item.regular_price)}
                </div>
              </>
            ) : (
              <div className='text-primary text-14 font-bold leading-[14px] mb-[5px]'>
                {formatVND(item.regular_price)}
              </div>
            )}
            <div className='text-10 text-normal leading-3'>x{item.quantity}</div>
          </div>
        </div>
      ))}
      <div className='px-[15px] lg:px-[30px] py-[25px] border-t border-gray-10'>
        <div className='flex flex-col-reverse md:flex-row md:items-center justify-between mb-[15px]'>
          <div className='text-12 text-stone-cairn'>
            {['wc-order-payment'].includes(order.status) ? (
              <span className='inline-block mt-2 lg:mt-0'>
                Đơn hàng sẽ tự động hủy sau <span className='font-bold'>24h</span>
              </span>
            ) : (
              <>
                {order.dayShip &&
                  ![
                    'wc-order-complete',
                    'wc-order-cancel',
                    'wc-order-return',
                    'wc-order-exchange'
                  ].includes(order.status.toLowerCase()) && (
                    <span className='inline-block mt-2 lg:mt-0'>
                      Đơn hàng dự kiến giao: <span className='font-bold'>{order.dayShip}</span>
                    </span>
                  )}
              </>
            )}
          </div>
          <div className='text-16 text-nevada leading-[19px]'>
            <span>
              Thành tiền: <span className='font-medium text-primary'>{formatVND(order.total)}</span>
            </span>
          </div>
        </div>
        <div className='flex flex-col md:flex-row md:items-center justify-between'>
          <div className='mb-2 lg:mb-0'>
            <div className='flex items-center'>
              {order.progress && (
                <>
                  {order.progress.toLowerCase() === 'order_payment' ? (
                    <Image
                      src={'/icons/payment-icon.svg'}
                      width={10}
                      height={12}
                      alt='shipping-icon'
                      className='me-[10px]'
                    />
                  ) : (
                    <Image
                      src={'/icons/shipping.svg'}
                      width={24}
                      height={15}
                      alt='shipping-icon'
                      className='me-[10px]'
                    />
                  )}
                  <span className='font-normal text-14 text-dodger-blue leading-[16px]'>
                    {progressMapping[order.progress.toLowerCase()]}
                  </span>
                </>
              )}
            </div>
            {order.is_receipt_exported && (
              <div className='flex items-center mt-[10px]'>
                <Image
                  src={'/icons/checked.svg'}
                  width={15}
                  height={9}
                  alt='checked-icon'
                  className='me-[5px]'
                />
                <span className='font-normal text-12 text-primary leading-[14px]'>
                  Đã xuất hoá đơn
                </span>
              </div>
            )}
          </div>
          <div className='flex justify-center gap-1 lg:gap-4'>
            {(order.status === 'wc-order-payment' || order.status === 'wc-order-waiting') && (
              <button
                className='border border-primary text-primary text-14 font-medium w-[103px] h-9 rounded-[10px] hover:opacity-85'
                onClick={() => handleCancelOrder(order)}
              >
                Huỷ đơn
              </button>
            )}
            {order.status === 'wc-order-complete' && (
              <button className='border border-primary text-primary text-14 font-medium w-[106px] h-9 rounded-[10px] hover:opacity-85'>
                Đánh giá
              </button>
            )}
            {['wc-order-return', 'wc-order-exchange'].includes(order.status) && (
              <Link href={`/account/orders/returns/${order.order_id}/details`}>
                <button className='border border-primary text-primary text-14 font-medium w-[147px] h-9 rounded-[10px] hover:opacity-85'>
                  Chi tiết yêu cầu
                </button>
              </Link>
            )}
            {['wc-order-payment'].includes(order.status) && (
              <button
                className='border border-primary text-primary text-14 font-medium w-[118px] h-9 rounded-[10px] hover:opacity-85'
                onClick={() => handleReOrder(order)}
              >
                {reOrderLoading ? <Spinner size='xs' /> : 'Đặt lại đơn'}
              </button>
            )}
            {[
              'wc-order-cancel',
              'wc-order-return',
              'wc-order-exchange',
              'wc-order-complete'
            ].includes(order.status) ? (
              <button
                className='w-[118px] h-9 rounded-[10px] bg-primary text-white text-14 font-medium hover:opacity-85'
                onClick={() => handleReOrder(order)}
              >
                {reOrderLoading ? <Spinner size='xs' /> : 'Đặt lại đơn'}
              </button>
            ) : (
              <Link href={`/account/orders/${order.order_id}`}>
                <button className='w-[125px] h-9 rounded-[10px] bg-primary text-white text-14 font-medium hover:opacity-85'>
                  Xem chi tiết
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <ModalCancelOrder
        isOpenModalCancel={isOpenModalCancel}
        setIsOpenModalCancel={setIsOpenModalCancel}
        order={orderSelected}
        listReasons={listReasons}
        syncOrder={syncOrder}
      />
    </>
  )
}

export default Order
