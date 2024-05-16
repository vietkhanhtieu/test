'use client'

import { ICoupon } from '@/app/api/definitions/voucher'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import Tab from './Tab'

interface Props {
  pharmacyCoupons: ICoupon[]
  vendorCoupons: ICoupon[]
}

const Tabs = (props: Props) => {
  const { pharmacyCoupons, vendorCoupons } = props

  const [activeTab, setActiveTab] = useState<number>(0)

  const searchParams = useSearchParams()
  const couponType = searchParams.get('type')
  const router = useRouter()

  // Remove query string after select tab
  useEffect(() => {
    switch (couponType) {
      case 'pharmacy_center':
        setActiveTab(0)
        router.push('/account/vouchers')
        break
      case 'salers':
        setActiveTab(1)
        router.push('/account/vouchers')
        break
    }
  }, [])

  return (
    <>
      <div className='flex justify-center p-2.5 md:px-0 mb-[30px] border-t border-b border-lighthouse bg-brilliance text-14'>
        <div role='tablist' className='dy-tabs dy-tabs-boxed items-center p-0 bg-transparent'>
          <a
            role='tab'
            className={`dy-tab ${activeTab === 0 && 'dy-tab-active'} h-auto min-h-[35px] md:px-[29px] leading-4`}
            onClick={() => setActiveTab(0)}
          >
            Voucher từ Trung Tâm Dược Phẩm
          </a>
          <a
            role='tab'
            className={`dy-tab ${activeTab === 1 && 'dy-tab-active'} h-auto min-h-[35px] md:px-[29px] leading-4`}
            onClick={() => setActiveTab(1)}
          >
            Voucher từ Nhà Bán
          </a>
        </div>
      </div>

      <div className='px-2.5 mb-[30px] md:px-7'>
        <Tab
          activeTab={activeTab}
          pharmacyCoupons={pharmacyCoupons}
          vendorCoupons={vendorCoupons}
        />
      </div>
    </>
  )
}

export default Tabs
