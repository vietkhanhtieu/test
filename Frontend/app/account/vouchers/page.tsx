import { getCouponLists } from '@/app/api/voucher'
import CouponModal from '@/app/ui/vouchers/CouponModal'
import { Metadata } from 'next'

import Tabs from './Tabs'
import './page.css'

export const metadata: Metadata = {
  title: 'Gonsa - Hệ thống voucher',
  description: 'Gonsa - Hệ thống voucher'
}

const Page = async () => {
  const { pharmacyCoupons, vendorCoupons } = await getCouponLists()

  return (
    <div className='col-span-4 md:col-span-3 rounded-lg max-w-[880px] h-auto bg-white'>
      <div className='account-vouchers'>
        <h3 className='my-6 ml-2.5 md:ml-[30px] text-20 leading-[23px] font-medium'>
          Voucher của tôi
        </h3>
        <Tabs pharmacyCoupons={pharmacyCoupons} vendorCoupons={vendorCoupons} />
        <CouponModal />
      </div>
    </div>
  )
}

export default Page
