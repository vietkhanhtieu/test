import { FireIcon } from '@/public/icons'
import { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'

import { Banner } from '../nhom-dieu-tri/Banner'
import { Breadcrumb } from '../ui'
import Loading from '../ui/daisy/Loading'
import CouponModal from '../ui/vouchers/CouponModal'
import CouponSection from './CouponSection'
import ProductSection from './ProductSection'

export const metadata: Metadata = {
  title: 'Gonsa - Siêu khuyến mãi',
  description: 'Gonsa - Siêu khuyến mãi'
}

const Page = () => {
  return (
    <>
      <Breadcrumb
        links={[
          { title: 'Trang chủ', url: '/' },
          { title: 'Siêu khuyến mãi', url: '/sieu-khuyen-mai' }
        ]}
      />

      <div className='container pb-1'>
        <Banner />

        <CouponSection couponType='salers' title='Voucher từ nhà bán' />

        <CouponSection couponType='pharmacy_center' title='Voucher trungtamduocpham' />

        <h2 className='flex gap-2.5 items-center mb-[30px] text-24 font-bold'>
          <Image src={FireIcon} alt='Fire' />
          Sản phẩm khuyến mãi
        </h2>
        <Suspense fallback={<Loading className='block m-auto' />}>
          <ProductSection />
        </Suspense>
      </div>

      <CouponModal />
    </>
  )
}

export default Page
