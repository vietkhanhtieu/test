'use client'

import { showDialogModal } from '@/app/ui/daisy/DialogModal'
import { Progress } from '@/components/ui/progress'
import { cn, copy, displayDateTimeLeft } from '@/lib/utils'
import CouponImage from '@/public/coupons/coupon.svg'
import { CirclePlusFill } from '@/public/icons'
import Clock from '@/public/icons/svg_components/Clock'
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'

import { ICoupon } from '../api/definitions/voucher'
import './styles/coupon.css'

interface Props {
  coupon: ICoupon
  setSelectedCoupon?: Dispatch<SetStateAction<ICoupon | undefined>>
  type?: 'normal' | 'for_order'
  selected?: boolean
  customStyle?: string
  setSelectedCouponOrder?: (couponCode: string) => void
  containerStyles?: string
  buttonText?: string
}

const Coupon = (props: Props) => {
  const {
    coupon,
    setSelectedCoupon,
    type = 'normal',
    setSelectedCouponOrder,
    containerStyles,
    buttonText
  } = props
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const endDate: string | null = displayDateTimeLeft(coupon?.endDate)

  const handleOnCopy = () => {
    if (buttonText === 'Sao chép') {
      copy(coupon.couponCode)
      setIsCopied(true)
    }
  }

  const handleClick = () => {
    if (setSelectedCoupon && type === 'normal') {
      setSelectedCoupon(coupon)
      showDialogModal('voucher')
    }
  }

  const handleShowModal = () => {
    if (setSelectedCoupon) {
      setSelectedCoupon(coupon)
    }

    showDialogModal('voucher')
  }

  const selectCoupon = () => {
    if (setSelectedCouponOrder && type === 'for_order' && coupon.canApply) {
      setSelectedCouponOrder(coupon.couponCode)
    }
  }

  const spacingStyle = {
    normal: '7px',
    for_order: '5px'
  }

  return (
    <div
      className={cn(
        'coupon flex md:justify-center',
        type === 'normal' && 'cursor-pointer',
        props.customStyle,
        type === 'for_order' && !coupon.canApply && 'text-gray-10',
        containerStyles
      )}
      onClick={handleClick}
    >
      {coupon.supplierIcon ? (
        <div
          className={cn(
            'flex items-center p-[15px] bg-coupon bg-cover',
            type === 'for_order' && !coupon.canApply && 'disabled'
          )}
        >
          <div className='p-[15px] rounded-full bg-white'>
            <Image
              src={coupon.supplierIcon}
              alt='Vendor logo'
              width={40}
              height={40}
              className='object-cover'
            />
          </div>
        </div>
      ) : (
        <Image
          src={CouponImage}
          alt='Gonsa logo'
          className={cn('object-cover', type === 'for_order' && !coupon.canApply && 'disabled')}
        />
      )}
      <div
        className={cn(
          'flex-auto py-[11px] px-1 md:px-4 border-y border-r rounded-[0_10px_10px_0] bg-white overflow-hidden',
          type === 'for_order' && !coupon.canApply ? 'border-gray-10' : 'border-pumpkin'
        )}
      >
        <div className='flex items-center justify-between'>
          <p className='text-16 leading-[19px] font-semibold overflow-x-hidden line-clamp'>
            {coupon.postTitle}
          </p>
          <button
            className={`min-w-14 text-12 ${((type === 'for_order' && coupon.canApply) || coupon.canApply === undefined) && 'text-dodger-blue'} underline`}
            onClick={handleShowModal}
          >
            Điều kiện
          </button>
        </div>
        <Progress
          value={coupon.percentUsage}
          className={cn(
            'h-1',
            type === 'for_order' ? 'my-[5px]' : 'my-[7px]',
            type === 'for_order' && !coupon.canApply && 'disabled'
          )}
        />
        <div
          className={cn(
            'flex justify-between text-12 leading-[14px]',
            `mb-[${spacingStyle[type]}]`
          )}
        >
          <p className='line-clamp'>{coupon.shortDescription}</p>
          <span className={cn(type === 'for_order' && !coupon.canApply && 'text-dusty-gray')}>
            {coupon.percentUsage}%
          </span>
        </div>
        <div className='flex items-center justify-between text-12 leading-[14px]'>
          <div className='flex items-center gap-[5px]'>
            {endDate && endDate !== 'Invalid date' && (
              <>
                <Clock disabled={type === 'for_order' && !coupon.canApply} />
                HSD: {endDate}
              </>
            )}
          </div>
          {type === 'normal' && (
            <div className={isCopied ? 'dy-tooltip dy-tooltip-top' : ''} data-tip='Đã sao chép'>
              <button
                className='dy-btn dy-btn-primary copy-btn h-auto min-h-0 py-[1px] px-[5px] rounded-md font-medium'
                onClick={handleOnCopy}
              >
                {buttonText || 'Dùng ngay'}
              </button>
            </div>
          )}
          {type === 'for_order' &&
            (!props.selected ? (
              <Image
                src={CirclePlusFill}
                alt='coupon'
                width={25}
                height={25}
                className={cn(
                  type === 'for_order' && !coupon.canApply ? 'disabled' : 'cursor-pointer',
                  'min-h-0'
                )}
                onClick={selectCoupon}
              />
            ) : (
              <Image
                src='/assets/icon-success.svg'
                alt='coupon'
                width={25}
                height={25}
                className={cn(
                  type === 'for_order' && !coupon.canApply ? 'disabled' : 'cursor-pointer'
                )}
                onClick={selectCoupon}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Coupon
