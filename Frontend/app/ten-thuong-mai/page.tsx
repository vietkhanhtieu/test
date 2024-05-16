import { AttachmentIcon } from '@/public/icons/index'
import Image from 'next/image'
import React from 'react'

import { Breadcrumb } from '../ui'
import QuickSearchComponent from '../ui/product_search/QuickSearchComponent'

export default function TenThuongMai() {
  return (
    <>
      <Breadcrumb
        links={[
          { title: 'Trang chủ', url: '/' },
          { title: 'Tên Thương Mại', url: '/ten-thuong-mai' }
        ]}
      />
      <div className='container'>
        <div className='flex my-6 '>
          <Image alt='Tên Thương Mại' src={AttachmentIcon} width={28} height={29} />
          <h1 className='text-2xl font-medium ml-2'>Tên Thương Mại</h1>
        </div>
      </div>
      <QuickSearchComponent page='commerce' />
    </>
  )
}
