'use client'

import Spinner from '@/components/ui/spinner'
import { NewProductIcon } from '@/public/icons/index'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import useFilter from '../_hooks/useFilter'
import axios from '../api/axios'
import { Breadcrumb, CartHeader, PromotionCarousel, TableProduct } from '../ui'
import { IProductListProps, mappingProductData } from '../ui/TableProduct'

export default function SanPhamMoi() {
  const [hasResult, setHasResult] = useState<boolean>(false)
  const [productList, setProductList] = useState<IProductListProps[]>([])
  const [filteredProducts, setFilteredProducts] = useState<IProductListProps[]>([])
  const [isFetchData, setIsFetchData] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsFetchData(true)
      try {
        const response = await axios.post(`/wp-json/search/get-product-by-category`, {
          limit: 1000,
          category_name: 'Sản phẩm mới',
          type_category: 'SPM',
          slug: 'san-pham-moi'
        })
        const products = response.data.data.list_product.data.map((product: any) => {
          return mappingProductData(product)
        })

        setProductList(products)
        setFilteredProducts(products)
      } catch (error) {
        console.error(`Failed to fetch products: ${error}`)
      }
      setIsFetchData(false)
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
          { title: 'Sản phẩm mới', url: '/san-pham-moi' }
        ]}
      />
      {isFetchData ? (
        <div className='flex items-center justify-center my-8'>
          <Spinner size='lg' />
        </div>
      ) : (
        <>
          <div className='container'>
            <div className='flex mt-[38px] mb-[30px] '>
              <Image
                className='!w-[28px] !h-[29px]'
                alt='Sản phẩm mới'
                src={NewProductIcon}
                width={28}
                height={29}
              />
              <h1 className='text-[24px] font-semibold ml-2'>Sản phẩm mới</h1>
            </div>
            <TableProduct
              canActionSearch={hasResult}
              canActionProduct={hasResult}
              productLists={filteredProducts}
            />
            <PromotionCarousel />
          </div>
        </>
      )}
    </>
  )
}
