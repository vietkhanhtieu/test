'use client'

import axios from '@/app/api/axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import revalidateProduct from './action'

export interface ICompany {
  id: number
  name: string
  term_id: number
  icon: string
  isWishlistSupplier: boolean
  star: string
  total_product: number
}

export default function CompanyInfo(props: any) {
  const { data } = props
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [isWishlistSupplier, setIsWishlistSupplier] = useState(data && data.isWishlistSupplier)

  const handleButtonFavorite = async (id: number) => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        `/wp-json/wishlist/${isWishlistSupplier ? 'remove' : 'add'}`,
        {
          supplier_id: id
        }
      )
      const data = response.data

      if (data.message === 'Successfully') {
        setIsWishlistSupplier(!isWishlistSupplier)
        revalidateProduct()
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  return (
    <div className='bg-white mt-8 px-0 rounded-lg'>
      <div className='flex w-full'>
        <div className='sm:flex w-full m-4 relative vendor-info bg-no-repeat	bg-right'>
          <div className='w-full sm:w-1/2 lg:w-1/3 flex'>
            <div className='flex flex-col justify-center mx-4'>
              <Image
                src={data ? data.icon : ''}
                alt='Logo nhà bán'
                className='rounded-full border-2 border-orange-500 w-[6rem] h-[6rem] object-contain'
                width={96}
                height={96}
              />
            </div>
            <div className='flex flex-col justify-center'>
              <p className='text-lg font-semibold my-[0.1rem]'>{data ? data.name : ''}</p>
              <div className='flex items-center my-[0.1rem]'>
                <p className='text-[1rem] mr-2 my-[0.1rem]'>Đánh giá:</p>
                <div className='flex items-center'>
                  {data &&
                    [...Array(5)].map((_, index) => (
                      <Image
                        key={index}
                        src={
                          index < Math.floor(parseFloat(data.star))
                            ? '/icons/star.svg'
                            : '/icons/star-black.svg'
                        }
                        alt='Star'
                        width={20}
                        height={20}
                        className='gap-[0.2rem]'
                      />
                    ))}
                </div>
              </div>
              <p className='text-[1rem] my-[0.1rem]'>
                Tổng số sản phẩm:{' '}
                <span className='font-semibold'>{data ? data.total_product : ''}</span>
              </p>
            </div>
          </div>
          <div className='sm:w-1/2 lg:w-2/3 flex flex-col justify-center'>
            <div className='flex py-4 justify-center sm:justify-end'>
              <div className='flex flex-col justify-center'>
                <Link
                  href='#'
                  className='text-[1rem] text-white px-8 py-2 rounded-full bg-[#FF6B00]'
                >
                  Thông tin nhà bán
                </Link>
              </div>
              <button onClick={() => handleButtonFavorite(data.id)} disabled={isLoading}>
                <Image
                  alt='Nút yêu thích'
                  src={
                    isWishlistSupplier
                      ? '/icons/heart-circle.svg'
                      : '/icons/heart-circle-outline.svg'
                  }
                  className='my-4 mx-6 w-10 h-10'
                  width={40}
                  height={40}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
