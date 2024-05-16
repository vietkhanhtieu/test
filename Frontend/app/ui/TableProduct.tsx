'use client'

import { SelectComponent } from '@/components/common/Select/SelectComponent'
import { Button } from '@/components/ui/button'
import Spinner from '@/components/ui/spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import axios from '@/lib/axios'
import { setDrugCategories } from '@/lib/redux/slices/product_categories'
import { addItems, setUserCart } from '@/lib/redux/slices/user_cart'
import { RootState } from '@/lib/redux/store'
import { NormalizeVietnameseText } from '@/lib/utils'
import { formatVND } from '@/lib/utils'
import {
  AddCart,
  ChevronDownA as ChevronDown,
  HeartCircle,
  Hoocmon,
  HouseIcon,
  ImageIcon,
  LikeProduct,
  MinusItem,
  PlusItem
} from '@/public/icons'
import { Pagination } from '@mui/material'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tooltip as ReactTooltip } from 'react-tooltip'

import { CartApi } from '../api/cart'
import { IProductDetail } from '../products/[id]/Detail'
import { mapProductDetail } from '../products/[id]/ProductMap'
import revalidateProduct from '../products/[id]/action'
import ModalReviewProduct from './ModalReviewProduct'
import { SelectSortOption } from './SelectSortOption'
import { PriceDropdown, ProductDropdown } from './dropdowns'
import './styles/table_product.css'

export interface IProductListProps {
  id: string
  name: string
  manufacturer: string
  manufacturerId: number
  supplier: string
  dueDate: string | null
  treatmentGroup: string
  activeIngredientConcentration: string
  dosageForm: string
  packagingSpecification: string
  unit: string
  price: number
  priceSale: number
  inWishList: boolean
  coupon: boolean | null
  publicDate: string | null
  stockQuantity: number | null
  stockStatus: string
  [key: string]: string | number | boolean | null
}

export interface IOption {
  readonly value: string | number
  readonly label: string | number
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}

export const mappingProductData = (product: any) => {
  return {
    id: product.id,
    name: product.tenThuongMai || `${product.title}`,
    manufacturer: product.nhaSanXuat?.tenNhaSanXuat,
    manufacturerId: product.nhaSanXuat?.maNhaSanXuat,
    supplier: product.supplier ? product.supplier.name : 'Gonsa Thương Mại',
    dueDate: product.due_date ? moment(product.due_date, 'DDMMYYYY').format('DD/MM/YYYY') : null,
    treatmentGroup: product.nhomDieuTri?.tenNhomDieuTri,
    activeIngredientConcentration: product.hoatChatHamLuong || product.active_element,
    dosageForm: product.dangBaoChe?.tenDangBaoCheCap2,
    packagingSpecification: product.quyCachDongGoi,
    unit: product.donViTinh || product.unit_sell,
    price: product.regular_price,
    priceSale: product.sale_price || 0,
    inWishList: product.in_wishlist,
    coupon: product.coupon,
    publicDate: product.public_at,
    bestSell: product.total_sales,
    stockQuantity: product.stock_quantity || 0,
    stockStatus: product.stock_status
  }
}

export default function TableProduct(props: any) {
  const {
    canActionProduct,
    productLists,
    fromSearch,
    fetchingData,
    canActionSearch,
    category,
    forCoupon = false,
    classTable = '',
    forFavoriteList = false,
    hiddenPagination = false,
    syncProductFavorite
  } = props

  const dispatch = useDispatch()
  const drugCategories = useSelector((state: RootState) => state.productCategories.drugCategories)
  const [sort, setSort] = useState<string>('')
  const [productDetail, setProductDetail] = useState<IProductDetail>()
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false)
  const [nameProduct, setNameProduct] = useState<string>('')
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [startItemPerPage, setStartItemPerPage] = useState<number>(0)
  const [endItemPerPage, setEndItemPerPage] = useState<number>(10)
  const [disableButtonWhileFetching, setDisableButtonWhileFetching] = useState<boolean>(false)

  useEffect(() => {
    if (productDetail?.productName && productDetail?.productName) {
      setNameProduct(productDetail?.productName + ' (' + productDetail?.packing + ')')
    } else {
      setNameProduct('')
    }
  }, [productDetail])

  useEffect(() => {
    if (!drugCategories.length) getTreatments()
  }, [drugCategories])

  const getTreatments = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/category/list-dashboard`,
      {
        category: 'thuoc'
      }
    )

    const data = response.data

    if (data['status'] === 200) {
      const drugCategories = data['data'].map((item: any) => {
        return {
          id: item['title'] ?? '',
          label: NormalizeVietnameseText(item['title']) ?? '',
          icon: item['icon'] ?? '',
          checked: false
        }
      })

      dispatch(setDrugCategories(drugCategories))
    }
  }

  const actionProductChange = (value: any) => {
    setSort(value)
  }

  useEffect(() => {
    const startItem = (currentPage - 1) * numberOfItemsPerPage
    const endItem = currentPage * numberOfItemsPerPage
    setStartItemPerPage(startItem)
    setEndItemPerPage(endItem)
  }, [currentPage, numberOfItemsPerPage])

  const defaultProductList = useMemo(() => {
    return productLists.slice(startItemPerPage, endItemPerPage)
  }, [productLists, startItemPerPage, endItemPerPage])

  // Memoize number of pages based on total product count and items per page
  const numberOfPages = useMemo(
    () => Math.ceil(productLists.length / numberOfItemsPerPage),
    [productLists.length, numberOfItemsPerPage]
  )

  // Handle pagination change
  const handleOnChangePagination = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setCurrentPage(value)
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    },
    [setCurrentPage]
  )

  // Handle updating number of items per page
  const handleUpdateNumberOfItem = useCallback(
    (n: number) => {
      setCurrentPage(1)
      setNumberOfItemsPerPage(n)
    },
    [setCurrentPage, setNumberOfItemsPerPage]
  )

  return (
    <>
      <div className='container px-0'>
        {fetchingData ? (
          <div className='flex items-center justify-center my-8'>
            <Spinner size='md' />
          </div>
        ) : (
          <>
            {canActionSearch ? (
              <ActionProduct
                fromSearch={fromSearch}
                category={category}
                numberOfResults={productLists.length}
                onChangeFilters={actionProductChange}
                updateNumberOfItems={(n: number) => handleUpdateNumberOfItem(n)}
                pageStartEnd={{
                  start: startItemPerPage,
                  end: endItemPerPage
                }}
              />
            ) : null}
            <div className='rounded-xl border-t-[3px] border-primary'>
              <div
                className={`table-wrapper relative w-full overflow-auto scrollbar-none min-h-[580px] ${classTable}`}
              >
                <Table className='w-full'>
                  <TableHeader className='text-xs text-black'>
                    <TableRow>
                      <TableHead className='text-black min-w-[250px]'>
                        {forCoupon
                          ? 'TÊN THƯƠNG MẠI / NHÀ SẢN XUẤT'
                          : 'TÊN THƯƠNG MẠI/NHÀ SẢN XUẤT'}
                      </TableHead>
                      {canActionProduct ? (
                        <TableHead className='text-black text-center min-w-[150px]'>
                          <div className='flex justify-center'>
                            <div className='dy-dropdown dy-dropdown-bottom dy-dropdown-end'>
                              <div tabIndex={0} role='button' className='flex'>
                                <div>NHÓM ĐIỀU TRỊ</div>
                                {canActionProduct ? (
                                  <>
                                    <Image
                                      alt='Logo down dropdown'
                                      src={ChevronDown}
                                      width={14}
                                      height={14}
                                      className='ml-1 tooltip-filter-table'
                                    />
                                    <ProductDropdown
                                      type='treatmentGroup'
                                      defaultOptions={drugCategories}
                                    />
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </TableHead>
                      ) : null}
                      <TableHead
                        className={`text-black ${forFavoriteList ? 'min-w-[170px]' : 'min-w-[195px]'}`}
                      >
                        <div className='flex justify-center text-center'>
                          <div className='dy-dropdown dy-dropdown-bottom dy-dropdown-end'>
                            <div tabIndex={1} role='button' className='flex'>
                              <div>{forCoupon ? 'HOẠT CHẤT' : 'HOẠT CHẤT/HÀM LƯỢNG'}</div>
                              {canActionProduct ? (
                                <>
                                  <Image
                                    alt='Logo down dropdown'
                                    src={ChevronDown}
                                    width={14}
                                    height={14}
                                    className='ml-1 tooltip-filter-table'
                                  />
                                  <ProductDropdown type='activeIngredientConcentration' />
                                </>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </TableHead>
                      {canActionProduct ? (
                        <TableHead className='text-black text-center min-w-[165px]'>
                          <div className='flex justify-center'>
                            <div className='dy-dropdown dy-dropdown-bottom dy-dropdown-end'>
                              <div tabIndex={2} role='button' className='flex'>
                                <div>DẠNG BÀO CHẾ</div>
                                {canActionProduct ? (
                                  <>
                                    <Image
                                      alt='Logo down dropdown'
                                      src={ChevronDown}
                                      width={14}
                                      height={14}
                                      className='ml-1 tooltip-filter-table'
                                    />
                                    <ProductDropdown type='dosageForm' />
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </TableHead>
                      ) : null}
                      <TableHead className='text-black text-center min-w-[120px]'>
                        <div className='flex justify-center'>
                          <div>ĐƠN VỊ TÍNH</div>
                          {canActionProduct ? (
                            <Image
                              alt='Logo down dropdown'
                              src={ChevronDown}
                              width={14}
                              height={14}
                              className='ml-1 tooltip-filter-table'
                            />
                          ) : null}
                        </div>
                      </TableHead>
                      <TableHead
                        className={`text-black text-center ${forFavoriteList ? 'min-w-[110px]' : 'min-w-[155px]'}`}
                      >
                        <div className='flex justify-center'>
                          <div className='dy-dropdown dy-dropdown-bottom dy-dropdown-end'>
                            <div tabIndex={0} role='button' className='flex'>
                              <div>GIÁ BÁN</div>
                              {canActionProduct ? (
                                <>
                                  <Image
                                    alt='Logo down dropdown'
                                    src={ChevronDown}
                                    width={14}
                                    height={14}
                                    className='ml-1 tooltip-filter-table'
                                  />
                                  <PriceDropdown />
                                </>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </TableHead>
                      <TableHead
                        className={`text-black text-center ${forFavoriteList ? 'min-w-[185px]' : 'min-w-[155px]'}`}
                      >
                        {forCoupon ? 'THÊM VÀO GIỎ HÀNG' : 'THÊM GIỎ HÀNG'}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className='bg-white'>
                    {defaultProductList.map((product: IProductListProps, index: number) => {
                      return (
                        <>
                          <TableRow
                            key={`${product.id}-${index}`}
                            className='align-middle cursor-pointer hovered-text-after-block'
                          >
                            <TableCell
                              className={`min-w-[250px] ${forFavoriteList && 'max-w-[250px]'}`}
                            >
                              <Link href={`/products/${product.id}`}>
                                <div className='flex flex-col items-start'>
                                  <div className='flex items-center gap-x-2.5'>
                                    {!forFavoriteList && product.coupon ? (
                                      <Button className='text-xs w-[76px] h-6'>Mã giảm giá</Button>
                                    ) : (
                                      <></>
                                    )}
                                    <span
                                      className={`text-base font-medium ${forFavoriteList && 'w-[250px] truncate'}`}
                                      id={`tooltip-view-product-name-${product.id}`}
                                    >
                                      {product.name}
                                    </span>
                                    {forFavoriteList && (
                                      <ReactTooltip
                                        anchorSelect={`#tooltip-view-product-name-${product.id}`}
                                        content={product.name}
                                        place='bottom'
                                        opacity={0.8}
                                        style={{
                                          fontSize: '16px',
                                          paddingLeft: '11px',
                                          paddingRight: '11px',
                                          paddingTop: '9px',
                                          paddingBottom: '9px',
                                          width: '260px',
                                          borderRadius: '10px',
                                          textAlign: 'center',
                                          backgroundColor: '#000',
                                          fontWeight: '500',
                                          color: '#F3F3FC'
                                        }}
                                      />
                                    )}
                                  </div>
                                  <span className='text-[10px]'>
                                    Nhà sản xuất:
                                    <Link
                                      href={`/nha-san-xuat/${product.manufacturerId}`}
                                      className='text-dodger-blue ml-2 underline'
                                    >
                                      {product.manufacturer}
                                    </Link>
                                  </span>
                                  {product.dueDate ? (
                                    <span className='text-[10px]'>
                                      Hạn sử dụng:
                                      <span className='text-dodger-blue ml-2'>
                                        {product.dueDate}
                                      </span>
                                    </span>
                                  ) : null}
                                  <div className='flex justify-center mt-2 text-sm'>
                                    <Image
                                      alt='Logo Nhà cung cấp'
                                      src={HouseIcon}
                                      width={16}
                                      height={16}
                                      className='mr-2'
                                    />
                                    <span className='text-xs'>{product.supplier}</span>
                                  </div>
                                </div>
                              </Link>
                            </TableCell>
                            {canActionProduct ? (
                              <TableCell className='min-w-[150px]'>
                                <Link href={`/products/${product.id}`}>
                                  <div className='flex justify-center tooltip relative [&>.tooltip-text]:hover:visible'>
                                    <Image
                                      alt='Logo hoocmon'
                                      src={Hoocmon}
                                      width={28}
                                      height={19}
                                      className='mr-2'
                                    />
                                    <span className='text-xs relative line-clamp-1 table-cell-line-clamp-bottom-block after:bottom-0'>
                                      {product.treatmentGroup}
                                    </span>
                                    <span className='tooltip-text'>{product.treatmentGroup}</span>
                                  </div>
                                </Link>
                              </TableCell>
                            ) : null}
                            <TableCell
                              className={`${forFavoriteList ? 'min-w-[170px]' : 'min-w-[195px]'}`}
                            >
                              <Link
                                href={`/products/${product.id}`}
                                className='tooltip relative [&>.tooltip-text]:hover:visible'
                              >
                                <span className='text-xs line-clamp-2 table-cell-line-clamp-bottom-block relative after:-bottom-1.5 text-center'>
                                  {product.activeIngredientConcentration}
                                </span>
                                <span className='tooltip-text'>
                                  {product.activeIngredientConcentration}
                                </span>
                              </Link>
                            </TableCell>
                            {canActionProduct ? (
                              <TableCell className='text-center min-w-[165px]'>
                                <Link href={`/products/${product.id}`}>
                                  <div className='text-xs font-medium'>{product.dosageForm}</div>
                                  <div className='text-[10px]'>
                                    {product.packagingSpecification}
                                  </div>
                                </Link>
                              </TableCell>
                            ) : null}
                            <TableCell className='text-center min-w-[120px]'>
                              <Link href={`/products/${product.id}`}>
                                <span className='text-xs'>{product.unit}</span>
                              </Link>
                            </TableCell>
                            <TableCell
                              className={`text-center ${forFavoriteList ? 'min-w-[110px]' : 'min-w-[155px]'}`}
                            >
                              <Link href={`/products/${product.id}`}>
                                <div className='font-medium text-primary text-sx'>
                                  {product.priceSale > 0
                                    ? formatVND(product.priceSale)
                                    : formatVND(product.price)}
                                </div>
                                {product.priceSale > 0 && (
                                  <div className='text-[10px] line-through'>
                                    {formatVND(product.price)}
                                  </div>
                                )}
                              </Link>
                            </TableCell>
                            <TableCell
                              className={`${forFavoriteList ? 'min-w-[185px]' : 'min-w-[155px]'}`}
                            >
                              <div className='flex justify-center'>
                                <InputCart
                                  isDisable={disableButtonWhileFetching}
                                  productId={product.id}
                                  inWishList={product.inWishList}
                                  setProductDetail={setProductDetail}
                                  setIsLoadingImage={setIsLoadingImage}
                                  forCoupon={forCoupon}
                                  stockQuantity={product.stockQuantity}
                                  stockStatus={product.stockStatus}
                                  forFavoriteList={forFavoriteList}
                                  syncProductFavorite={syncProductFavorite}
                                  isFetching={(n: boolean) => setDisableButtonWhileFetching(n)}
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        </>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
            {!hiddenPagination && (
              <div className='flex justify-center bg-white py-8 rounded-b-lg border-t-[1px]'>
                <Pagination
                  count={numberOfPages}
                  page={currentPage}
                  variant='outlined'
                  siblingCount={-1}
                  boundaryCount={1}
                  onChange={handleOnChangePagination}
                />
              </div>
            )}
          </>
        )}
        <ModalReviewProduct
          name={nameProduct}
          list_image_product={
            productDetail ? productDetail?.imageList : ['/assets/default-not-found-image.jpeg']
          }
          isLoadingImage={isLoadingImage}
        />

        <ReactTooltip
          anchorSelect='.tooltip-filter-table'
          place='top'
          content='Bạn dùng bộ lọc tại đây'
          style={{
            fontSize: '12px',
            paddingLeft: '10px',
            paddingRight: '10px',
            paddingTop: '6px',
            paddingBottom: '6px',
            width: '145px',
            borderRadius: '6px'
          }}
        />
        <ReactTooltip
          anchorSelect='#tooltip-view-image'
          content='Xem hình ảnh tại đây'
          place='top'
          style={{
            fontSize: '12px',
            paddingLeft: '10px',
            paddingRight: '10px',
            paddingTop: '6px',
            paddingBottom: '6px',
            width: '85px',
            borderRadius: '6px',
            textAlign: 'center'
          }}
        />
        <ReactTooltip
          anchorSelect='#tooltip-like-product'
          content='Yêu thích sản phẩm'
          style={{
            fontSize: '12px',
            paddingLeft: '10px',
            paddingRight: '10px',
            paddingTop: '6px',
            paddingBottom: '6px',
            width: '77px',
            borderRadius: '6px',
            textAlign: 'center'
          }}
        />
      </div>
    </>
  )
}

const ActionProduct = (props: any) => {
  const {
    fromSearch,
    numberOfResults,
    onChangeFilters,
    category,
    updateNumberOfItems,
    pageStartEnd
  } = props
  const [selectItem, setSelectedItem] = useState(10)
  const [sortItem, setSortItem] = useState('Mới nhất')

  const showItems = [
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 30, value: 30 }
  ]

  const { searchKey } = useSelector((state: RootState) => state.searchResults)

  const onChangeProducts = (newValue: any) => {
    setSelectedItem(parseInt(newValue.value))
  }

  const onChangeSort = (newValue: any) => {
    setSortItem(newValue.value)
    onChangeFilters(newValue.value)
  }

  useEffect(() => {
    if (selectItem) updateNumberOfItems(selectItem)
  }, [selectItem])

  return (
    <>
      {fromSearch ? (
        <div className='flex justify-center py-2 my-7'>
          <span className='text-base'>
            Tìm thấy {numberOfResults} kết quả từ khoá{' '}
            <span className='uppercase font-medium'>&quot;{searchKey}&quot;</span>
          </span>
        </div>
      ) : null}
      {category ? (
        <div className='flex justify-center py-2 my-7'>
          <span className='text-base'>
            Có {numberOfResults} kết quả với danh mục{' '}
            <span className='font-medium'>&quot;{searchKey}&quot;</span>
          </span>
        </div>
      ) : null}
      <div className='flex flex-col md:flex-row justify-between py-3'>
        <div className='flex items-center mb-2 text-sm'>
          <p className='mr-3'>
            {`${Math.min(pageStartEnd.start + 1, numberOfResults)}-${Math.min(pageStartEnd.end, numberOfResults)}/${numberOfResults} sản phẩm`}
          </p>
          <div className='min-w-[86px]'>
            <SelectComponent
              options={showItems}
              isSearchable={false}
              value={selectItem}
              handleOnChange={onChangeProducts}
            />
          </div>
        </div>
        <div className='flex mb-2 w-fit text-sm'>
          <SelectSortOption sortItem={sortItem} onChangeSort={onChangeSort} />
        </div>
      </div>
    </>
  )
}

const InputCart = (props: any) => {
  const dispatch = useDispatch()
  const cart = useSelector((state: RootState) => state.userCart)
  const {
    productId,
    inWishList,
    setProductDetail,
    setIsLoadingImage,
    forCoupon,
    stockQuantity,
    stockStatus,
    isDisable,
    isFetching,
    forFavoriteList,
    syncProductFavorite
  } = props

  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isFavorite, setIsFavorite] = useState(inWishList)
  const [isDisabled, setIsDisabled] = useState(false)
  const [errOutStock, setErrorStock] = useState<boolean>(false)

  const handleIncrement = () => {
    setErrorStock(false)
    setQuantity((prevQuantity) => prevQuantity + 1)
  }

  const handleDecrement = () => {
    setErrorStock(false)
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1)
    }
  }

  const handleAddCart = async (quantity: number, productId: number) => {
    setIsLoading(true)
    isFetching(true)
    const outStock = checkOutOfStock()
    if (!outStock) {
      try {
        const response = await CartApi.addItemToCart({
          product_id: productId,
          quantity: quantity
        })
        if (response.message === 'Successfully') {
          const data = response.data
          dispatch(
            addItems({
              items: data.cart,
              total_quantity: data.total_quantity,
              total_amount: data.total_amount
            })
          )
          fetchCart()
        } else {
          console.log('Error')
        }
      } catch (error) {
        console.log('Error')
      }
    }
    setIsLoading(false)
    isFetching(false)
  }

  const fetchCart = async () => {
    try {
      const response = await CartApi.getCart()
      dispatch(setUserCart(response.data))
    } catch (error) {
      console.error(error)
    }
  }

  const checkOutOfStock = () => {
    if (
      stockStatus === 'outofstock' ||
      stockQuantity === 0 ||
      stockQuantity === null ||
      quantity > stockQuantity
    ) {
      setErrorStock(true)
      return true
    } else {
      setErrorStock(false)
    }
    return false
  }

  const handleWishList = async (productId: number) => {
    try {
      setIsDisabled(true)
      const url: string = inWishList
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wishlist/remove`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wishlist/add`
      const response = await axios.post(url, {
        product_id: productId
      })
      if (response.data.message === 'Successfully') {
        const data = response.data.data
        setIsFavorite(!isFavorite)
        if (forFavoriteList) {
          syncProductFavorite(productId)
        }
        revalidateProduct()
      } else {
        setIsFavorite(!isFavorite)
        console.log('Error')
      }
      setTimeout(() => {
        setIsDisabled(false)
      }, 2000)
    } catch (error) {
      console.log('Error')
    }
  }

  const fetchProductDetail = async (productId: number) => {
    try {
      setIsLoadingImage(true)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/product/get`,
        {
          id: productId
        }
      )
      if (response.data.message === 'Successfully') {
        const data = response.data.data

        setProductDetail(mapProductDetail(data))
      } else {
        setIsLoadingImage(false)
        console.log('Error')
      }
      setIsLoadingImage(false)
    } catch (error) {
      console.log('Error')
    }
  }

  const openModal = (productId: number) => {
    fetchProductDetail(productId)
    const modal = document.getElementById('review_product') as HTMLDialogElement | null
    if (modal) {
      modal.showModal()
    }
  }

  const handleInputQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(event.target.value))
    setErrorStock(false)
  }

  const handleBlurQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!quantity) {
      setQuantity(1)
    }
  }

  return (
    <div>
      {errOutStock && (
        <span className='text-red text-12'>
          {stockStatus === 'outofstock' ? 'Hết sản phẩm' : `Đặt tối đa ${stockQuantity} sản phẩm`}
        </span>
      )}
      <div className={`flex ${forFavoriteList ? 'gap-7' : 'gap-[21px]'}`}>
        <div className='flex flex-col gap-[5px] py-2.5'>
          <div className='flex justify-center'>
            <Image
              alt='Logo Thêm sản phẩm'
              src={MinusItem}
              width={20}
              height={24}
              onClick={handleDecrement}
            />
            <input
              type='number'
              value={quantity}
              onChange={handleInputQuantity}
              onBlur={handleBlurQuantity}
              className={`w-9 border-y border-alto text-center text-primary font-medium text-xs ${errOutStock ? 'bg-unbur-pink' : 'bg-white'}`}
              onKeyDown={(evt) => ['e', 'E', '.', '-'].includes(evt.key) && evt.preventDefault()}
            />
            <Image
              alt='Logo Trừ sản phẩm'
              src={PlusItem}
              width={20}
              height={24}
              onClick={handleIncrement}
            />
          </div>
          <div className='w-[76px]'>
            <Button
              // disabled={isDisable}
              className='w-full h-[20px] bg-primary rounded-full'
              onClick={() => handleAddCart(quantity, productId)}
            >
              {isLoading ? (
                <svg
                  aria-hidden='true'
                  className='inline h-3 w-3 animate-spin fill-primary text-white dark:text-gray-600'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentFill'
                  />
                </svg>
              ) : (
                <Image alt='Logo Thêm vào giỏ hàng' src={AddCart} width={15} height={14} />
              )}
            </Button>
          </div>
        </div>
        {forCoupon ? (
          <div className='flex items-center'>
            <button
              onClick={() => handleWishList(productId)}
              disabled={isDisabled}
              id='tooltip-like-product'
            >
              <Image
                alt='Logo yêu thích sản phẩm'
                src={isFavorite ? HeartCircle : LikeProduct}
                width={21}
                height={21}
                className={`${forFavoriteList && '!h-[26px] !w-[26px]'} `}
              />
            </button>
          </div>
        ) : (
          <div className='flex flex-col gap-[5px] py-2.5'>
            <button onClick={() => openModal(productId)} id='tooltip-view-image'>
              <Image alt='Ảnh sản phẩm' src={ImageIcon} width={21} height={21} />
            </button>
            <button
              onClick={() => handleWishList(productId)}
              disabled={isDisabled}
              id='tooltip-like-product'
            >
              <Image
                alt='Logo yêu thích sản phẩm'
                src={isFavorite ? HeartCircle : LikeProduct}
                width={21}
                height={21}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
