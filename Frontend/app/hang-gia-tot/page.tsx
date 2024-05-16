'use client'

import SaleFlameIcon from '@/components/icons/categoryItem/saleFlame.svg'
import fetchData from '@/mock_data/product_details/fetch-data'
import { BestPriceInfo } from '@/public/icons'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

import useFilter from '../_hooks/useFilter'
import { Breadcrumb, CartHeader, PromotionCarousel, TableProduct } from '../ui'
import { IProductListProps, mappingProductData } from '../ui/TableProduct'

export default function HangGiaTot() {
  const [hasResult, setHasResult] = useState<boolean>(false)
  const [productList, setProductList] = useState<IProductListProps[]>([])
  const [filteredProducts, setFilteredProducts] = useState<IProductListProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/product/list`,
          {
            limit: 1000,
            keyword: null,
            type_category: 'HGT'
          }
        )

        const products = response.data.data.data.map((product: any) => {
          return mappingProductData(product)
        })

        setProductList(products)
        setFilteredProducts(products)
      } catch (error) {
        console.error(`Failed to fetch products: ${error}`)
      }

      setIsLoading(false)
    }

    fetchData()
    setHasResult(true)
  }, [])

  useFilter(productList, filteredProducts, setFilteredProducts)

  return (
    <>
      <Breadcrumb
        links={[
          { title: 'Trang chủ', url: '/' },
          { title: 'Hàng giá tốt', url: '/hang-gia-tot' }
        ]}
      />
      <CartHeader />
      <div className='container'>
        <div className='flex my-6'>
          <Image alt='Hàng giá tốt' src={SaleFlameIcon} width={23} height={23} />
          <h1 className='text-[24px] font-medium mx-2'>Hàng giá tốt</h1>
          <Image
            alt='Info'
            src={BestPriceInfo}
            width={16}
            height={16}
            className='info-best-price'
          />
          <ReactTooltip
            anchorSelect='.info-best-price'
            place='right'
            render={({ content }) => (
              <div className='text-center text-[12px] leading-[15px]'>
                <span className='text-primary font-semibold'>Lưu ý: </span>
                Hàng giá tốt gồm những sản phẩm
                <span className='underline'> cận hạn sử dụng </span>
                nhưng
                <span className='font-bold'> chất lượng vẫn hoàn toàn đảm bảo.</span>
              </div>
            )}
            border='1px solid #4D4D4F'
            style={{
              fontSize: '12px',
              padding: '10px 15px',
              width: '258px',
              height: '62px',
              borderRadius: '10px',
              backgroundColor: '#fff',
              color: '#4D4D4F',
              fontWeight: '400',
              lineHeight: 'normal'
            }}
          />
        </div>
      </div>
      <div className='container px-5'>
        <TableProduct
          canActionSearch={hasResult}
          canActionProduct={hasResult}
          productLists={filteredProducts}
        />
      </div>

      <PromotionCarousel />
    </>
  )
}
