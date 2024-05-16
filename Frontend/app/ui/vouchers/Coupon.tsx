'use client'

import { ICoupon } from '@/app/api/definitions/voucher'
import { showDialogModal } from '@/app/ui/daisy/DialogModal'
import { Progress } from '@/components/ui/progress'
import { setSelectedCoupon } from '@/lib/redux/slices/vouchers'
import { cn, displayDateTimeLeft } from '@/lib/utils'
import CouponImage from '@/public/coupons/coupon.svg'
import Clock from '@/public/icons/svg_components/Clock'
import Image from 'next/image'
import { useDispatch } from 'react-redux'

import '../styles/coupon.css'
import CouponCta from './CouponCta'

interface Props {
  coupon: ICoupon
  containerStyles?: string
  contentStyles?: string
  buttonText?: string
  clockColor?: string
}

const Coupon = (props: Props) => {
  const { coupon, containerStyles, contentStyles, buttonText, clockColor } = props

  const dispatch = useDispatch()

  const endDate: string | null = displayDateTimeLeft(coupon?.endDate)

  const showModal = () => {
    dispatch(setSelectedCoupon(coupon))
    showDialogModal('voucher')
  }

  const handleClickContainer = () => {
    if (buttonText !== 'Sao chép') {
      showModal()
    }
  }

  return (
    <div
      className={cn('coupon flex md:justify-center cursor-pointer', containerStyles)}
      onClick={handleClickContainer}
    >
      {coupon.supplierIcon ? (
        <div className='flex items-center p-[15px] bg-coupon bg-cover'>
          <div className='p-[15px] rounded-full bg-white'>
            <Image
              src={coupon.supplierIcon}
              alt='Vendor logo'
              width={40}
              height={40}
              className='object-cover min-w-10 h-10'
            />
          </div>
        </div>
      ) : (
        <Image
          src={CouponImage}
          alt='Gonsa logo'
          className='object-cover rounded-[10px_0_0_10px]'
        />
      )}
      <div
        className={cn(
          'flex-auto py-[11px] px-1 md:px-4 border-y border-r border-pumpkin rounded-[0_10px_10px_0] bg-white overflow-hidden',
          contentStyles
        )}
      >
        <div className='flex items-center justify-between'>
          <p className='text-16 leading-[19px] font-semibold overflow-x-hidden line-clamp'>
            {coupon.postTitle}
          </p>
          <button className='min-w-14 text-12 text-dodger-blue underline' onClick={showModal}>
            Điều kiện
          </button>
        </div>
        <Progress value={coupon.percentUsage} className='h-1 my-[7px]' />
        <div className='flex justify-between text-12 leading-[14px] mb-[7px]'>
          <p className='line-clamp'>{coupon.shortDescription}</p>
          <span className='text-dusty-gray'>{coupon.percentUsage}%</span>
        </div>
        <div className='flex flex-col xs:flex-row gap-2.5 items-center justify-between text-12 leading-[14px]'>
          <div className='flex items-center mr-auto'>
            {endDate && endDate !== 'Invalid date' && (
              <>
                <Clock stroke={clockColor} className='mr-[5px]' />
                HSD: {endDate}
              </>
            )}
          </div>
          <CouponCta couponCode={coupon.couponCode} buttonText={buttonText} />
        </div>
      </div>
    </div>
  )
}

export default Coupon
