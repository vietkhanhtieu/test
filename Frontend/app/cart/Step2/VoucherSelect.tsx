import { ICoupon } from '@/app/api/definitions/voucher'
import { ExpandIcon, MenuVouchersIcon, PinVoucherIcon } from '@/public/icons'
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'

import ModalCouponSelection from './ModalCouponSelection'

interface IVoucherSelect {
  vouchers: any
  appliedCoupons: any
  setAppliedCoupons: any
  setSelectedCoupon: Dispatch<SetStateAction<ICoupon | undefined>>
}

const VoucherSelect: React.FC<IVoucherSelect> = ({
  vouchers,
  appliedCoupons,
  setAppliedCoupons,
  setSelectedCoupon
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <>
      <div className='pl-[18px] py-3 flex flex-col gap-2.5'>
        <p className='text-primary text-14 font-medium'>Nhập/chọn khuyến mãi</p>
        <div
          className='py-[7px] px-[13.5px] items-center justify-between flex rounded-[50px] mr-[17px] bg-lighthouse cursor-pointer'
          onClick={() => setIsModalOpen(true)}
        >
          <p className='text-14 mr-1 truncate'>{appliedCoupons.join(',')}</p>
          <Image
            src={MenuVouchersIcon}
            alt='Voucher đã áp dụng'
            width='25'
            height='14'
            className='cursor-pointer'
          />
        </div>
        <div className='flex gap-2'>
          <Image src={PinVoucherIcon} alt='Voucher đã áp dụng' width='11' height='11' />
          <div className='flex gap-[5px] cursor-pointer' onClick={() => setIsModalOpen(true)}>
            <p className='text-[11px]'>
              <span className='text-dodger-blue'>
                Đã áp dụng {appliedCoupons.length} khuyến mãi.
              </span>{' '}
              Chọn ưu đãi khác
            </p>
            <Image src={ExpandIcon} width='16' height='16' alt='Chọn voucher' />
          </div>
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

export default VoucherSelect
