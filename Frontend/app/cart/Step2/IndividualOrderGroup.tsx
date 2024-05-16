import { ICoupon } from '@/app/api/definitions/voucher'
import { CartItem } from '@/lib/types/user'
import { formatVND } from '@/lib/utils'
import { ClockDeliveryIcon, ExpandIcon, VoucherSelectIcon } from '@/public/icons'
import Image from 'next/image'
import Link from 'next/link'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { IShippingMethodProps } from '../page'
import IndividualOrderItem from './IndividualOrderItem'
import ModalCouponSelection from './ModalCouponSelection'

interface IIndividualOrderGroupProps {
  groupName: string
  groupId: number
  cartItem: ProductItem[]
  selectedShippingMethod: IShippingMethodProps | null
  amountTotal: number
  vouchers: any
  fetching: boolean
  setAppliedSellerCoupons: Dispatch<any>
  exceedStock: number[]
  setSelectedCoupon: Dispatch<SetStateAction<ICoupon | undefined>>
  totalShipping: number
}

export interface ProductItem extends CartItem {
  product_id: number
}

const IndividualOrderGroup: React.FC<IIndividualOrderGroupProps> = ({
  groupName,
  groupId,
  cartItem,
  selectedShippingMethod,
  amountTotal,
  vouchers,
  fetching,
  setAppliedSellerCoupons,
  exceedStock,
  setSelectedCoupon,
  totalShipping
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [appliedCoupons, setAppliedCoupons] = useState<string[]>([])

  useEffect(() => {
    setAppliedSellerCoupons((prev: any) => ({ ...prev, [groupId]: appliedCoupons }))
  }, [appliedCoupons])

  return (
    <>
      <div className='bg-white'>
        <div className='py-3 px-[9px] border-b border-gainsboro'>
          <div className='flex flex-col'>
            <p className='leading-[14px] px-[7px]'>
              Nhà bán:
              <Link href='#' className='ml-[5px] text-dodger-blue'>
                {groupName}
              </Link>
            </p>
            {cartItem.map((item: ProductItem, index: number) => (
              <IndividualOrderItem
                key={index}
                item={item}
                isExceedStock={exceedStock.includes(item.product_id)}
                fetching={fetching}
              />
            ))}
            {selectedShippingMethod && (
              <div className='flex items-center mt-3'>
                <Image src={ClockDeliveryIcon} alt='nhận hàng' width='16' height='16' />
                <div className='flex flex-col ml-[5px]'>
                  <p className='text-12 leading-4'>Nhận hàng</p>
                  <p className='text-12 leading-4'>{selectedShippingMethod.dayShip}</p>
                </div>
                <div className='flex flex-col ml-auto'>
                  <p className='text-14 font-semibold'>{formatVND(totalShipping)}</p>
                </div>
              </div>
            )}
            <div className='flex justify-between w-full'>
              <p className='text-12 leading-4 text-gray-40'>Voucher</p>
              <p className='text-12 leading-4 text-primary truncate ml-1'>
                {appliedCoupons.join(',')}
              </p>
            </div>
          </div>
        </div>
        <div
          className='flex px-[18px] cursor-pointer py-[9px] border-b border-gainsboro'
          onClick={() => setIsModalOpen(true)}
        >
          <Image src={VoucherSelectIcon} alt='voucher' width='16' height='12' />
          <p className='text-14 leading-5 text-gray-40 ml-[9px] mr-auto'>
            Thêm mã giảm giá của nhà bán
          </p>
          <Image src={ExpandIcon} alt='chọn voucher' width='16' height='16' />
        </div>
        <div className='flex justify-between items-center border-b border-gainsboro px-[19px] py-2.5'>
          <p className='text-12 leading-[14px]'>
            Tổng tiền (
            {cartItem.reduce(
              (accumulator: any, currentValue: any) => accumulator + currentValue.quantity,
              0
            )}{' '}
            sản phẩm):
          </p>
          <p className='text-16 leading-[18px] text-primary font-semibold'>
            {formatVND(amountTotal)}
          </p>
        </div>
      </div>
      <ModalCouponSelection
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        applyCoupon={setAppliedCoupons}
        vouchers={vouchers}
        setSelectedCoupon={setSelectedCoupon}
      />
    </>
  )
}

export default IndividualOrderGroup
