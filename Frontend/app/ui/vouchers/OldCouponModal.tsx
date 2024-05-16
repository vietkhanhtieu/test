import { ICoupon } from '@/app/api/definitions/voucher'
import DialogModal, { closeDialogModal } from '@/app/ui/daisy/DialogModal'
import { Progress } from '@/components/ui/progress'
import { RootState } from '@/lib/redux/store'
import { copy, displayDateTimeLeft } from '@/lib/utils'
import CouponImage from '@/public/coupons/coupon-details.svg'
import { ClockIcon, CopyIcon } from '@/public/icons'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { useSelector } from 'react-redux'

interface Props {
  coupon: ICoupon | undefined
  setToggleProductList?: Dispatch<SetStateAction<boolean>>
}

const OldCouponModal = (props: Props) => {
  const { coupon, setToggleProductList } = props

  const isSignedIn = useSelector((state: RootState) => state.currentUser.isSignedIn)
  const router = useRouter()
  const endDate: string | null = displayDateTimeLeft(coupon?.endDate)

  const handleOnCopy = () => {
    coupon && copy(coupon.couponCode)
  }

  const handleToggleProductList = () => {
    if (setToggleProductList) {
      setToggleProductList(true)
      closeDialogModal('voucher')
    } else {
      const path = isSignedIn ? '/account/vouchers' : '/login'
      router.push(path)
    }
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
                    className='object-cover'
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
                    <Image src={ClockIcon} alt='Clock' className='h-3.5' width={14} height={14} />
                    HSD: {endDate}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className='p-[21px_15px_18px_15px]'>
            <div className='p-1.5 mb-[15px] text-14 leading-4'>
              <p className='font-medium'>
                Mã giảm giá:{' '}
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

            {coupon.canApply === undefined && (
              <button
                className='dy-btn dy-btn-primary h-9 min-h-9 w-full py-0.5 rounded-full font-medium'
                onClick={handleToggleProductList}
              >
                Dùng ngay
              </button>
            )}
          </div>
        </>
      )}
    </DialogModal>
  )
}

export default OldCouponModal
