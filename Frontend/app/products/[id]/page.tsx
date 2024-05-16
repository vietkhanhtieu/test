import { _fetch } from '@/app/actions'
import { Breadcrumb, TableProduct } from '@/app/ui'
import { notFound } from 'next/navigation'

import CompanyInfo from './CompanyInfo'
import Detail from './Detail'
import ProductInfo from './ProductInfo'
import { mapProduct, mapProductDetail, mapProductLists, mapSupplier } from './ProductMap'

interface ProductDetailParams {
  id: string
}

const getData = async (id: string) => {
  const response = await _fetch(
    '/wp-json/product/get',
    'POST',
    { id: id },
    { tags: ['product'], revalidate: 3600 },
    'force-cache'
  )

  if (response.status === 200) {
    const data = response.data
    const productDetails = mapProductDetail(data)
    const product = mapProduct(data)
    const supplier = mapSupplier(data.supplier)
    const relatedProducts = mapProductLists(response.moreData.relatedProducts)

    return {
      productDetails,
      product,
      supplier,
      relatedProducts
    }
  } else {
    return {
      productDetails: null,
      product: null,
      supplier: null,
      relatedProducts: []
    }
  }
}

export default async function Products({ params }: { params: ProductDetailParams }) {
  const { productDetails, product, supplier, relatedProducts } = await getData(params.id)

  if (!productDetails) {
    notFound()
  }

  return (
    <>
      <Breadcrumb
        links={[
          { title: 'Trang chủ', url: '/' },
          { title: 'Sản phẩm', url: '#' },
          { title: productDetails?.productName ? productDetails?.productName : '', url: '#' }
        ]}
      />
      <div className='container'>
        {productDetails && <Detail data={productDetails} />}
        <ProductInfo data={product} />
        <CompanyInfo data={supplier} />
        <div className='flex mt-6 mb-4'>
          <h1 className='text-2xl font-medium'>Sản phẩm liên quan</h1>
        </div>
      </div>
      <TableProduct
        canActionSearch={false}
        canActionProduct={true}
        productLists={relatedProducts}
      />
    </>
  )
}
