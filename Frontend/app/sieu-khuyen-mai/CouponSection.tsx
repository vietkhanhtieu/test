import ChevronRightIcon from '@/public/icons/svg_components/ChevronRight'
import Link from 'next/link'
import { Suspense } from 'react'

import Loading from '../ui/daisy/Loading'
import CouponList from './CouponList'

interface CouponSectionProps {
  couponType: 'pharmacy_center' | 'salers'
  title: string
}

const CouponSection = (props: CouponSectionProps) => {
  const { couponType, title } = props

  return (
    <div className='bg-white py-[25px] px-4 xs:px-[23px] rounded-md mb-[30px]'>
      <div className='flex justify-between mb-[30px]'>
        <h2 className='text-24 font-bold leading-7'>{title}</h2>
        <Link
          href={`/account/vouchers?type=${couponType}`}
          className='inline-flex gap-2.5 items-center text-right'
        >
          Xem thêm
          <ChevronRightIcon className='w-[7px] h-[11px]' />
        </Link>
      </div>

      <Suspense fallback={<Loading className='block m-auto' />}>
        <CouponList couponType={couponType} />
      </Suspense>
    </div>
  )
}

export default CouponSection
