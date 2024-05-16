'use client'

import Spinner from '@/components/ui/spinner'
import axios from '@/lib/axios'
import _ from 'lodash'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import useFilter from '../_hooks/useFilter'
import { mapProductLists } from '../products/[id]/ProductMap'
import { Breadcrumb, PromotionCarousel, TableProduct } from '../ui'
import { IProductListProps, mappingProductData } from '../ui/TableProduct'
import NotFoundProduct from './NotFoundProduct'

export default function TimKiem() {
  const [hasResult, setHasResult] = useState<boolean>(false)
  const [productList, setProductList] = useState<IProductListProps[]>([])
  const [filteredProducts, setFilteredProducts] = useState<IProductListProps[]>([])
  const [fetchingData, setFetchingData] = useState<boolean>(false)

  const searchParams = useSearchParams()

  const fetchProducts = async () => {
    const bodyParams = {
      keyword: searchParams.get('keyword'),
      type: searchParams.get('type')
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/search/search-dashboard-new`,
      bodyParams
    )
    return response.data.data
  }

  useEffect(() => {
    const getProducts = async () => {
      setFetchingData(true)

      const data = await fetchProducts()
      if (data.list_product.data.length > 0) {
        const products = data.list_product.data.map((item: any) => {
          return mappingProductData(item)
        })
        setHasResult(true)
        setProductList(products)
        setFilteredProducts(products)
      } else {
        setHasResult(false)
        setProductList(mapProductLists(data.most_searched))
        setFilteredProducts(mapProductLists(data.most_searched))
      }

      setFetchingData(false)
    }

    // KEEP FOLLOWING LINES FOR FUTURE, PLEASE DO NOT REMOVE

    // if (!!items.length) {
    //   setHasResult(true)
    //   const products = items.map((item: any) => {
    //     return mappingProductData(item)
    //   })
    //   setProductList(products)
    //   setFilteredProducts(products)
    // } else {
    //   getProducts()
    // }

    getProducts()
  }, [searchParams])

  useFilter(productList, filteredProducts, setFilteredProducts)

  return (
    <>
      {fetchingData ? (
        <div className='container flex mt-24 justify-center items-center w-full'>
          <Spinner size='lg' />
        </div>
      ) : (
        <>
          <Breadcrumb
            links={[
              { title: 'Trang chủ', url: '/' },
              { title: 'Tìm kiếm', url: '/tim-kiem' },
              { title: searchParams.get('keyword') || 'Kết quả', url: 'javascript:void(0)' }
            ]}
          />
          {hasResult ? (
            <TableProduct
              canActionSearch={hasResult}
              canActionProduct={hasResult}
              productLists={filteredProducts}
              fromSearch={true}
              fetchingData={fetchingData}
            />
          ) : (
            <NotFoundProduct productLists={productList} />
          )}
          {hasResult && <PromotionCarousel />}
        </>
      )}
    </>
  )
}
