import { getListDashboard } from '@/app/api/category'
import { Breadcrumb, CartHeader } from '@/app/ui'
import ProductDataByCategoryComponent from '@/app/ui/product_search/ProductDataByCategoryComponent'
import Image from 'next/image'

const Page = async ({ params }: { params: { slug: string } }) => {
  let selectedProductType = ''
  if (params.slug) {
    selectedProductType = decodeURIComponent(params.slug)
  }
  const listDashboard = await getListDashboard()
  const productTypeData = listDashboard.filter((item: any) => item.slug === selectedProductType)[0]

  return (
    <>
      <Breadcrumb
        links={[
          { title: 'Trang chủ', url: '/' },
          { title: productTypeData.title, url: 'javascript:void(0)' }
        ]}
      />
      <div className='mt-5'>
        <CartHeader bgClass={'bg-cart-header-product-type'} />
      </div>
      <div className='container'>
        <div className='mt-[45px] flex gap-4'>
          <Image alt={productTypeData.title} src={productTypeData.icon} width={38} height={33} />
          <h1 className='text-24 font-medium'>{productTypeData.title}</h1>
        </div>
      </div>

      <ProductDataByCategoryComponent typeCategory='TKDCB' categoryName={productTypeData.title} />
    </>
  )
}
export default Page
