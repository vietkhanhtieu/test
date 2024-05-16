import { ICoupon } from '@/app/api/definitions/voucher'
import Coupon from '@/app/ui/vouchers/Coupon'
import { toNonAccentVietnamese } from '@/lib/utils'
import { SearchIcon } from '@/public/icons'
import Image from 'next/image'
import { useState } from 'react'

interface Props {
  activeTab: number
  pharmacyCoupons: ICoupon[]
  vendorCoupons: ICoupon[]
}

const Tab = (props: Props) => {
  const { activeTab, pharmacyCoupons, vendorCoupons } = props

  const [term, setTerm] = useState<string>('')

  const couponList: ICoupon[] = activeTab === 0 ? pharmacyCoupons : vendorCoupons

  const filteredList: ICoupon[] = couponList?.filter((coupon: ICoupon) => {
    const customTerm = toNonAccentVietnamese(term)

    return (
      toNonAccentVietnamese(coupon.postTitle).includes(customTerm) ||
      toNonAccentVietnamese(coupon.couponCode).includes(customTerm)
    )
  })

  return (
    <>
      <label className='dy-input flex items-center gap-[19px] max-w-[539px] h-auto py-[11px] md:p-[12px_90px_10px_88px] border-0 rounded-full mx-auto mb-[25px] bg-snowflake text-14 leading-4'>
        <Image src={SearchIcon} alt='Search icon' width={14} height={14} />
        <input
          type='text'
          placeholder='Tìm kiếm theo mã giảm, chương trình khuyến mãi,...'
          className='w-full placeholder:text-gray-40'
          onChange={(e) => setTerm(e.target.value)}
        />
      </label>

      {filteredList && filteredList.length > 0 ? (
        <div className='grid xl:grid-cols-2 gap-x-2.5 xl:gap-x-5 gap-y-[15px]'>
          {filteredList.map((value: ICoupon, index: number) => (
            <Coupon key={index} coupon={value} />
          ))}
        </div>
      ) : (
        <p className='text-center'>Không có voucher!</p>
      )}
    </>
  )
}

export default Tab
