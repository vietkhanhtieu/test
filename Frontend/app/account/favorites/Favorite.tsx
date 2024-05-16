'use client'

import { useState } from 'react'

import { FavoriteProducts } from './FavoriteProducts'
import { FavoriteSupplier } from './FavoriteSupplier'

export const Favorite = () => {
  const [activeTab, setActiveTab] = useState<number>(1)

  return (
    <div className='flex flex-col'>
      <div className='px-6 py-[22px]'>
        <span className='text-20 font-medium'>Danh sách yêu thích</span>
      </div>
      <div className='w-full h-14 py-[10.5px] px-[23px] bg-brilliance flex border-y border-lighthouse'>
        <div
          className={`${activeTab === 1 ? 'bg-primary text-white' : 'text-abbey'} text-14 font-semibold h-[35px] rounded-[50px] flex justify-center items-center cursor-pointer py-2.5 md:px-[45px] px-10 leading-[21px]`}
          onClick={() => setActiveTab(1)}
        >
          Sản phẩm
        </div>
        <div
          className={`${activeTab === 2 ? 'bg-primary text-white' : 'text-abbey'} text-14 font-semibold h-[35px] rounded-[50px] flex justify-center items-center cursor-pointer py-2.5 md:px-[45px] px-10 leading-[21px]`}
          onClick={() => setActiveTab(2)}
        >
          Nhà bán
        </div>
      </div>
      {activeTab === 1 && <FavoriteProducts />}
      {activeTab === 2 && <FavoriteSupplier />}
    </div>
  )
}
