import { FlaskIcon } from '@/public/icons/index'
import Image from 'next/image'
import React from 'react'

import { Breadcrumb } from '../ui'
import QuickSearchComponent from '../ui/product_search/QuickSearchComponent'

export default function HoatChat() {
  return (
    <>
      <Breadcrumb
        links={[
          { title: 'Trang chủ', url: '/' },
          { title: 'Hoạt chất', url: '/hoat-chat' }
        ]}
      />
      <div className='container'>
        <div className='flex mt-[26px] mb-[27px] items-center '>
          <Image alt='Hoạt chất' src={FlaskIcon} width={50} height={50} />
          <h1 className='text-2xl font-semibold ml-2'>Hoạt chất</h1>
        </div>
      </div>
      <QuickSearchComponent page='active-element' />
    </>
  )
}
