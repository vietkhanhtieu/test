'use client'

import NotFoundProduct from '@/app/tim-kiem/NotFoundProduct'
import { Breadcrumb, CartHeader, PromotionCarousel } from '@/app/ui'
import TableProduct, { IProductListProps } from '@/app/ui/TableProduct'
import Spinner from '@/components/ui/spinner'
import axios from '@/lib/axios'
import { setSearchKey } from '@/lib/redux/slices/search_results'
import { RootState } from '@/lib/redux/store'
import { NormalizeVietnameseText } from '@/lib/utils'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface CategoryParams {
  slug: string
}

interface ILink {
  title: string
  url: string
}

interface IProduct {
  term_id: number
  title: string
  icon: string
  slug: string
  children?: IProduct[]
}

export default function KetQuaTimKiem({ params }: { params: CategoryParams }) {
  const [hasResult, setHasResult] = useState<boolean>(false)
  const [productLists, setProductLists] = useState<IProductListProps[]>([])
  const [product, setProduct] = useState<IProduct | {}>()
  const [urlParent, setUrlParent] = useState<string>('')
  const [links, setLinks] = useState<ILink[]>([{ title: 'Trang chủ', url: '' }])
  const [filteredProductLists, setFilteredProductLists] = useState<IProductListProps[]>([])
  const [loadingData, setLoadingData] = useState<boolean>(false)
  const productCategories = useSelector((state: RootState) => state.productCategories.categories)
  const dispatch = useDispatch()

  useEffect(() => {
    setHasResult(true)
    getProducts()
    setProduct(findProductBySlug(params.slug, productCategories))
  }, [product])

  const findProductBySlug = (slug: string, products: IProduct[]): IProduct | {} => {
    for (let product of products) {
      if (product.slug === slug) {
        return product
      }
      if (Array.isArray(product.children)) {
        const found: IProduct | {} = findProductBySlug(slug, product.children)
        if (found && Object.keys(found).length !== 0) {
          setUrlParent(product.title)
          return found
        }
      }
    }
    return {}
  }

  useEffect(() => {
    if (product && 'title' in product) {
      const productWithProperties = product as IProduct
      dispatch(setSearchKey(NormalizeVietnameseText(productWithProperties.title)))
      const newLinks = [
        ...links,
        {
          title: NormalizeVietnameseText(urlParent),
          url: ''
        },
        {
          title: NormalizeVietnameseText(productWithProperties.title),
          url: ''
        }
      ]
      setLinks(newLinks)
    }
  }, [product])

  const getProducts = async () => {
    setLoadingData(true)

    if (product) {
      const productWithProperties = product as IProduct
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/search/get-product-by-category`,
        {
          category_name: productWithProperties.title,
          type_category: 'NDT',
          slug: productWithProperties.slug
        }
      )

      const data = response.data

      if (data['status'] === 200) {
        const products = data['data']['list_product']['data'].map((item: any) => {
          return {
            id: item.maSanPhamEc,
            name: item.tenThuongMai,
            manufacturer: item.nhaSanXuat.tenNhaSanXuat,
            manufacturerId: item.nhaSanXuat.maNhaSanXuat,
            supplier: item.supplier ? item.supplier.name : '',
            dueDate: item.due_date ? moment(item.due_date, 'DDMMYYYY').format('DD/MM/YYYY') : null,
            treatmentGroup: item.nhomDieuTri.tenNhomDieuTri,
            activeIngredientConcentration: item.hoatChatHamLuong,
            dosageForm: item.dangBaoChe.tenDangBaoCheCap3,
            packagingSpecification: item.quyCachDongGoi,
            unit: item.donViTinh,
            price: item.regular_price,
            priceSale: item.giaSale,
            inWishList: item.in_wishlist,
            coupon: item.coupon,
            publicDate: item.public_at,
            bestSell: item.total_sales,
            stockQuantity: item.stock_quantity || 0,
            stockStatus: item.stock_status
          }
        })

        setProductLists(products)
        setFilteredProductLists(products)
      }
      setLoadingData(false)
    }
  }

  return (
    <>
      <Breadcrumb links={links} />
      <CartHeader />
      <div className='container mt-[34px] mb-[7px]'>
        <div className='flex items-center'>
          {/* eslint-disable @next/next/no-img-element */}
          <img alt='' src={product && 'icon' in product ? product.icon : undefined} />
          <h1 className='text-[24px] font-semibold leading-7 items-center ml-4 h-full'>
            {product && 'title' in product ? NormalizeVietnameseText(product.title) : ''}
          </h1>
        </div>
      </div>
      {loadingData ? (
        <div className='container flex mt-24 justify-center items-center w-full'>
          <Spinner size='lg' />
        </div>
      ) : (
        <>
          {hasResult ? (
            <TableProduct
              canActionSearch={hasResult}
              canActionProduct={hasResult}
              productLists={filteredProductLists}
              fromSearch={false}
              category={true}
            />
          ) : (
            <NotFoundProduct productLists={productLists} />
          )}
          {hasResult && <PromotionCarousel />}
        </>
      )}
    </>
  )
}
