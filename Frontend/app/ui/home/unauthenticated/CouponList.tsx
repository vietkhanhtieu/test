import { ICoupon, mappingCouponData } from '@/app/api/definitions/voucher'
import CouponModal from '@/app/ui/vouchers/CouponModal'
import Spinner from '@/components/ui/spinner'
import axios from '@/lib/axios'
import { ChevronRightIcon } from '@/public/icons'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import Coupon from '../../vouchers/Coupon'

const CouponList = () => {
  const [couponList, setCouponList] = useState<ICoupon[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchCouponData = async () => {
      setIsLoading(true)
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/voucher/list-coupons?limit=6`
        )
        const responseData: ICoupon = response.data.data.data

        const couponValues: ICoupon[] = mappingCouponData(responseData)
        setIsLoading(false)
        setCouponList(couponValues)
      } catch (error) {
        console.error('Failed to CouponList:', error)
      }
    }

    fetchCouponData()
  }, [])

  return (
    <div className='home__section'>
      <div className='home__wrapper mt-[30px] py-[30px]'>
        <h2 className='mb-[52px] text-[32px] text-abbey text-center font-bold leading-[38px]'>
          Siêu khuyến mãi
        </h2>

        {isLoading ? (
          <div className='flex items-center justify-center'>
            <Spinner />
          </div>
        ) : couponList.length === 0 ? (
          <div className='flex items-center justify-center'>
            <p>Không có voucher!</p>
          </div>
        ) : (
          <>
            <ul className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-[30px] md:gap-x-3.5 px-[15px] rounded-lg mb-[30px]'>
              {couponList.map((value: ICoupon, index: number) => {
                return (
                  <li key={index}>
                    <Coupon coupon={value} />
                  </li>
                )
              })}
            </ul>
            <Link
              href='/sieu-khuyen-mai'
              className='flex cursor-pointer items-center justify-center'
            >
              <span className='mr-2.5 text-dodger-blue font-medium leading-[19px]'>Xem tất cả</span>
              <Image alt='chevron-right' src={ChevronRightIcon} width={7} height={11} />
            </Link>
          </>
        )}
      </div>

      <CouponModal />
    </div>
  )
}

export default CouponList
