'use client'

import { ICoupon } from '@/app/api/definitions/voucher'
import DialogModal from '@/app/ui/daisy/DialogModal'
import { Progress } from '@/components/ui/progress'
import { RootState } from '@/lib/redux/store'
import { copy } from '@/lib/utils'
import { displayDateTimeLeft } from '@/lib/utils'
import CouponImage from '@/public/coupons/coupon-details.svg'
import { CopyIcon } from '@/public/icons'
import Clock from '@/public/icons/svg_components/Clock'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const CouponModal = () => {
  const coupon: ICoupon | null = useSelector((state: RootState) => state.vouchers.selectedCoupon)
  const endDate: string | null = displayDateTimeLeft(coupon?.endDate)

  const handleOnCopy = () => {
    copy(coupon?.couponCode)
  }

  return (
    <DialogModal modalId='voucher' modalBoxStyles='sm:max-w-[400px] p-0 rounded-t-[10px]'>
      {coupon && (
        <>
          <div className='flex border-b border-primary'>
            {coupon.supplierIcon ? (
              <div className='flex items-center p-[8px_7px_7px_8px] bg-coupon-details bg-cover'>
                <div className='p-[15px] rounded-full bg-white'>
                  <Image
                    src={coupon.supplierIcon}
                    alt='Vendor logo'
                    width={38}
                    height={38}
                    className='object-cover min-w-[38px] h-[38px]'
                  />
                </div>
              </div>
            ) : (
              <Image
                src={CouponImage}
                alt='Gonsa logo'
                width={86}
                height={83}
                className='object-cover'
              />
            )}
            <div className='w-full max-w-64 xs:max-w-[301px] p-[10px_0_8px_5px]'>
              <h6 className='truncate mr-7 mb-1 text-14 leading-4 font-medium'>
                {coupon.postTitle}
              </h6>
              <p className='truncate mr-7 text-12 leading-[14px]'>{coupon.shortDescription}</p>
              <Progress value={coupon.percentUsage} className='h-1 mt-[9px] mb-1' />
              <div className='flex gap-[5px] items-center text-12 leading-[14px] font-medium'>
                {endDate !== 'Invalid date' && (
                  <>
                    <Clock stroke='#ff6b00' />
                    HSD: {endDate}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className='p-[21px_15px_18px_15px]'>
            <div className='p-1.5 mb-[15px] text-14 leading-4'>
              <p className='font-medium'>
                Mã giảm giá:&nbsp;
                <span className='mr-5 text-dodger-blue text-12 font-normal'>
                  {coupon.couponCode}
                </span>
                <Image
                  src={CopyIcon}
                  alt='copy icon'
                  width={20}
                  height={20}
                  className='inline-block cursor-pointer'
                  onClick={handleOnCopy}
                />
              </p>
              <p className='my-[5px] font-medium'>Hiệu lực sử dụng:</p>
              <p className='text-12 leading-[20px]'>
                {endDate !== 'Invalid date'
                  ? `Từ ngày: ${coupon.startDate} - ${moment(coupon.endDate).format('DD/MM/YYYY')}`
                  : `Từ ngày: ${coupon.startDate}`}
              </p>
            </div>

            <div className='bg-lighthouse py-2.5 px-1.5 rounded-md mb-[18px]'>
              <h6 className='mb-[5px] text-14 font-medium'>Điều kiện:</h6>
              <p className='text-12 leading-5'>{coupon.postExcerpt}</p>
            </div>

            <Link
              href={`/account/vouchers/${coupon.couponCode}`}
              className='dy-btn dy-btn-primary h-9 min-h-9 w-full py-0.5 rounded-full font-medium'
            >
              Dùng ngay
            </Link>
          </div>
        </>
      )}
    </DialogModal>
  )
}

export default CouponModal
