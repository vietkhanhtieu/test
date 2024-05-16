'use client'

import NotFoundProduct from '@/app/tim-kiem/NotFoundProduct'
import Spinner from '@/components/ui/spinner'
import axios from 'axios'
import _ from 'lodash'
import { useEffect, useState } from 'react'

import TableProduct, { IProductListProps, mappingProductData } from '../TableProduct'

export default function ProductDataByCategoryComponent(props: any) {
  const { typeCategory, categoryName } = props

  const [productLists, setProductLists] = useState<IProductListProps[]>([])
  const [isLoadingProduct, setIsLoadingProduct] = useState<boolean>(false)
  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoadingProduct(true)
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/search/get-product-by-category`,
          {
            category_name: categoryName,
            type_category: typeCategory,
            limit: 1000
          }
        )
        const productList: IProductListProps[] = response.data.data.list_product.data.map(
          (item: any) => {
            return mappingProductData(item)
          }
        )

        setProductLists(productList)
      } catch (error) {
        console.error('Failed to CouponList:', error)
      }
      setIsLoadingProduct(false)
    }

    fetchProductData()
  }, [])
  return (
    <>
      {isLoadingProduct ? (
        <div className='container flex mt-24 justify-center items-center w-full'>
          <Spinner size='lg' />
        </div>
      ) : (
        <>
          {productLists.length > 0 ? (
            <>
              <div className='flex justify-center py-2 my-7'>
                <span className='text-base'>
                  Tìm thấy {productLists.length} kết quả từ khoá{' '}
                  <span className='uppercase font-medium'>&quot;{categoryName}&quot;</span>
                </span>
              </div>
              <div className='mt-[26px] container px-5'>
                <TableProduct
                  canActionSearch={productLists.length > 0}
                  canActionProduct={productLists.length > 0}
                  productLists={productLists}
                  fromSearch={false}
                  fetchingData={isLoadingProduct}
                />
              </div>
            </>
          ) : (
            <NotFoundProduct productLists={productLists} />
          )}
        </>
      )}
    </>
  )
}
