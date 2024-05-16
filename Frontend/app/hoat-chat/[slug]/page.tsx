import { Breadcrumb } from '@/app/ui'
import ProductDataByCategoryComponent from '@/app/ui/product_search/ProductDataByCategoryComponent'
import { FlaskIcon } from '@/public/icons/index'
import Image from 'next/image'

interface HoatChatDetailParams {
  slug: string
}

export default function HoatChat({ params }: { params: HoatChatDetailParams }) {
  let selectedActiveElement = ''
  if (params.slug) {
    selectedActiveElement = decodeURIComponent(params.slug)
  }
  return (
    <>
      <Breadcrumb
        links={[
          { title: 'Trang chủ', url: '/' },
          { title: 'Hoạt chất', url: '/hoat-chat' },
          { title: selectedActiveElement, url: 'javascript:void(0)' }
        ]}
      />
      <ProductDataByCategoryComponent typeCategory={'HC'} categoryName={selectedActiveElement} />
    </>
  )
}
