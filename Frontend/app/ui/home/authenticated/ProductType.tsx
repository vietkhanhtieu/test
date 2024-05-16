import axios from '@/app/api/axios'
import Spinner from '@/components/ui/spinner'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export interface IProductData {
  productname: string
  description: string
  saleprice: string
}

const ProductType = () => {
  const [isFetchData, setIsFetchData] = useState<boolean>(false)
  const [productData, setProductData] = useState<IProductData[]>([])

  useEffect(() => {
    const fetchProductData = async () => {
      setIsFetchData(true)
      try {
        const response = await fetch('http://localhost:7111/api/products/get-all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        // console.log('Data from API:', data)
        // console.log('Data message:', data.message);
        // if (data.message == 'Successfully') {
        setProductData(data)
        // console.log('Successfully')
        console.log(productData);
          
        // }
      } catch (error) {
        console.error('Failed to ProductType:', error)
      }
      setIsFetchData(false)
    }
    fetchProductData()
  }, [])

  return (
    <div className='home__section'>
      {isFetchData ? (
        <div className='flex items-center justify-center my-8'>
          <Spinner size='md' />
        </div>
      ) : (
        <>
  {productData && (
    <div className='mt-[70px]'>
      <div className='grid w-full grid-cols-2 lg:grid-cols-4 gap-[20px] '>
        {productData.slice(0, 20).map((product, idx) => {
          return (
            <Link
              key={idx}
              href="#"
              className='flex flex-col gap-2.5 bg-white rounded-[10px] h-[280px] justify-center items-center container-product-type px-2.5 text-center'
            >
              {/* <Image src={product.img} width={54} height={54} alt={productType.img} /> */}
              <p className='text-25 font-semibold'>{product.productname}</p>
              <p className='text-18 font-semibold'>{product.saleprice}</p>
            </Link>
          );
        })}
      </div>
    </div>
  )}
</>
      )}
    </div>
  )
}

export default ProductType



