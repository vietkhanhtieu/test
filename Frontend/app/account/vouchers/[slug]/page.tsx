'use client'

import axios from '@/app/api/axios'
import { ICoupon } from '@/app/api/definitions/voucher'
import TableProduct, { IProductListProps, mappingProductData } from '@/app/ui/TableProduct'
import Coupon from '@/app/ui/vouchers/Coupon'
import CouponModal from '@/app/ui/vouchers/CouponModal'
import { setLinks } from '@/lib/redux/slices/breadcrumb'
import { RootState } from '@/lib/redux/store'
import { ArrowBack } from '@/public/icons'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Page = () => {
  const coupon: ICoupon | null = useSelector((state: RootState) => state.vouchers.selectedCoupon)

  const [productList, setProductList] = useState<IProductListProps[]>([])

  const currentPage: string = usePathname()

  const dispatch = useDispatch()

  dispatch(
    setLinks([
      { title: 'Trang chủ', url: '/' },
      { title: 'Tài khoản', url: '/account' },
      { title: 'Hệ thống voucher', url: '/account/vouchers' },
      { title: currentPage.split('/').pop(), url: currentPage }
    ])
  )

  const fetchData = async () => {
    try {
      const response = await axios.post('/wp-json/product/list', {
        coupon: coupon?.couponCode
      })

      const products = response.data.data.data.map((product: any) => {
        return mappingProductData(product)
      })

      setProductList(products)
    } catch (error) {
      console.error(`Failed to fetch coupon products: ${error}`)
    }
  }

  useEffect(() => {
    if (coupon) {
      fetchData()
    }
  }, [])

  return (
    <>
      {coupon && (
        <div className='col-span-4 md:col-span-3 rounded-lg max-w-[880px] h-auto bg-white'>
          <div className='flex justify-between p-2.5 sm:py-[25px] sm:px-[30px] font-medium'>
            <div
              onClick={() => history.back()}
              className='flex items-center gap-2.5 text-nevada leading-[19px] cursor-pointer'
            >
              <Image src={ArrowBack} alt='back icon' width={12} height={10} />
              Trở lại
            </div>

            <h3 className='text-20 leading-[23px]'>Sản phẩm áp Voucher</h3>
          </div>

          <div className='relative h-28 mb-[52px] bg-vivid-orange'>
            <Coupon
              coupon={coupon}
              containerStyles='absolute top-[34px] left-0 right-0 w-full max-w-[485px] rounded-[10px] mx-auto shadow-coupon cursor-default'
              buttonText='Sao chép'
            />
          </div>

          <TableProduct productLists={productList} forCoupon={true} />

          <CouponModal />
        </div>
      )}
    </>
  )
}

export default Page
