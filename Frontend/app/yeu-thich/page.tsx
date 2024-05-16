'use client'

import HeartIcon from '@/components/icons/categoryItem/heart.svg'
import fetchData from '@/mock_data/product_details/fetch-data'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import useFilter from '../_hooks/useFilter'
import { Breadcrumb, CartHeader, PromotionCarousel, TableProduct } from '../ui'
import { IProductListProps } from '../ui/TableProduct'

export default function YeuThich() {
  const [hasResult, setHasResult] = useState<boolean>(false)
  const [productList, setProductList] = useState<IProductListProps[]>([])
  const [filteredProducts, setFilteredProducts] = useState<IProductListProps[]>([])

  useEffect(() => {
    const response = fetchData()
    setHasResult(true)
    setProductList(response)
    setFilteredProducts(response)
  }, [])

  useFilter(productList, filteredProducts, setFilteredProducts)

  return (
    <>
      <Breadcrumb
        links={[
          { title: 'Trang chủ', url: '/' },
          { title: 'Yêu thích', url: '/yeu-thich' }
        ]}
      />
      <CartHeader />
      <div className='container'>
        <div className='flex my-6 '>
          <Image alt='Yêu thích' src={HeartIcon} width={28} height={29} />
          <h1 className='text-[24px] font-medium ml-2'>Yêu thích</h1>
        </div>
      </div>
      <TableProduct
        canActionSearch={hasResult}
        canActionProduct={hasResult}
        productLists={filteredProducts}
      />
      <PromotionCarousel />
    </>
  )
}
