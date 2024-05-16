'use client'

import { Breadcrumb } from '@/app/ui'
import ProductDataByCategoryComponent from '@/app/ui/product_search/ProductDataByCategoryComponent'
import { RootState } from '@/lib/redux/store'
import { NormalizeVietnameseText } from '@/lib/utils'
import { FlaskIcon } from '@/public/icons/index'
import Image from 'next/image'
import { useSelector } from 'react-redux'

interface TreatmentParams {
  slug: string
}

export default function NhomDieuTri({ params }: { params: TreatmentParams }) {
  let selectedActiveElement = ''
  if (params.slug) {
    selectedActiveElement = decodeURIComponent(params.slug)
  }

  const { icon } = useSelector((state: RootState) => state.treatmentItem)

  return (
    <>
      <Breadcrumb
        links={[
          { title: 'Trang chủ', url: '/' },
          { title: 'Nhóm điều trị', url: '/nhom-dieu-tri' },
          { title: selectedActiveElement, url: 'javascript:void(0)' }
        ]}
      />
      <div className='container'>
        <div className='flex mt-[34px] my-[7px] gap-4'>
          {icon && <Image alt={selectedActiveElement} src={icon} width={34} height={34} />}
          <h1 className='text-24 font-medium'>{NormalizeVietnameseText(selectedActiveElement)}</h1>
        </div>
      </div>
      <ProductDataByCategoryComponent typeCategory={'NDT'} categoryName={selectedActiveElement} />
    </>
  )
}
