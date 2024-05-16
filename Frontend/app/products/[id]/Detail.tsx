'use client'

import { CartApi } from '@/app/api/cart'
import ModalReviewProduct from '@/app/ui/ModalReviewProduct'
import { IProductCarousel } from '@/app/ui/ModalReviewProduct'
import ProductCarousel from '@/components/ProductCarousel/ProductCarousel'
import SaleFlameIcon from '@/components/icons/categoryItem/saleFlame.svg'
import Spinner from '@/components/ui/spinner'
import axios from '@/lib/axios'
import { addItems, setUserCart } from '@/lib/redux/slices/user_cart'
import { RootState } from '@/lib/redux/store'
import { formatVND } from '@/lib/utils'
import { CopyIcon, MinusItemTwo, PlusItemTwo, SalePercent, Star, StarBlack } from '@/public/icons'
import { AttentionIcon } from '@/public/icons'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

import revalidateProduct from './action'

export interface IProductDetail {
  id: number
  productName: string | null
  status: string | null
  soldProduct: number | null
  rating: string
  sale: boolean
  price: string | null
  originPrice: string | null
  unitSell: string | null
  code: string | null
  declarationPrice: number
  baseUnit: string | null
  packing: string | null
  ingredient: string | null
  treatmentGroup: string | null
  producerName: string | null
  national: string | null
  dosageForm: string | null
  percentageReduction: string
  imageList: string[] | null
  licenseLink: string | null
  inWishList: boolean
  expired: string | null
  quantity: number
}

interface Detail {
  data: IProductDetail
}

export default function Detail(props: Detail) {
  const product = props.data

  const [quantity, setQuantity] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [openCopyTooltip, setOpenCopyTooltip] = useState<boolean>(false)
  const [indexImage, setIndexImage] = useState<number>(0)
  const [isHiddenImage, setIsHiddenImage] = useState<boolean>(false)
  const [listShowImage, setListShowImage] = useState<string[]>([])
  const [isFavorite, setIsFavorite] = useState(product.inWishList)
  const [errOutStock, setErrorStock] = useState<boolean>(false)
  const router = useRouter()

  const dispatch = useDispatch()
  const cart = useSelector((state: RootState) => state.userCart)

  const handleIncrement = () => {
    setQuantity((prevQuantity: number) => prevQuantity + 1)
    setErrorStock(false)
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity: number) => prevQuantity - 1)
    }
    setErrorStock(false)
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

  const copyReferralCodeToClipboard = () => {
    navigator.clipboard.writeText(product.code ? product.code : '').then(() => {
      setOpenCopyTooltip(true)

      setTimeout(() => {
        setOpenCopyTooltip(false)
      }, 2000)
    })
  }

  const handleSetIndexImage = (index: number) => {
    setIndexImage(index)
  }

  useEffect(() => {
    if (product.imageList) {
      if (product.imageList.length > 4) {
        setIsHiddenImage(true)
        setListShowImage(product.imageList.slice(0, 3))
      } else {
        setIsHiddenImage(false)
        setListShowImage(product.imageList)
      }
    } else {
      setIsHiddenImage(false)
      setListShowImage([])
    }
  }, [product])

  const openModal = () => {
    const modal = document.getElementById('review_product') as HTMLDialogElement | null
    if (modal) {
      modal.showModal()
    }
  }

  const handleWishList = async (productId: number) => {
    try {
      setIsFavorite(!isFavorite)
      const url: string = isFavorite
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wishlist/remove`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wishlist/add`
      const response = await axios.post(url, {
        product_id: productId
      })
      if (response.data.message === 'Successfully') {
        const data = response.data.data
        revalidateProduct()
      } else {
        setIsFavorite(!isFavorite)
        console.log('Error')
      }
    } catch (error) {
      console.log('Error')
    }
  }

  const buttonGroupEnum = {
    buyNow: 'buyNow',
    addToCart: 'addToCart'
  }

  const [buttonStates, setButtonState] = useState({
    addToCart: false,
    buyNow: false
  })

  const handleAddCart = (buttonType: string) => {
    switch (buttonType) {
      case buttonGroupEnum.buyNow:
        setButtonState({ buyNow: true, addToCart: false })
        break
      case buttonGroupEnum.addToCart:
        setButtonState({ buyNow: false, addToCart: true })
        break
      default:
        break
    }
    handleAddItemToCard(buttonType)
  }

  const handleAddItemToCard = async (buttonType: string) => {
    const checkOutStock = checkOutOfStock()
    if (!checkOutStock) {
      try {
        setIsLoading(true)
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/cart/add`,
          {
            product_id: product.id,
            quantity: quantity
          }
        )
        if (response.data.message === 'Successfully') {
          setIsLoading(false)
          const data = response.data.data
          dispatch(
            addItems({
              items: data.cart,
              total_quantity: data.total_quantity,
              total_amount: data.total_amount
            })
          )
          fetchCart()
          if (buttonType === buttonGroupEnum.buyNow) {
            router.push('/cart')
          }
        } else {
          setIsLoading(false)
          setButtonState({ buyNow: false, addToCart: false })
          console.log('Error')
        }
      } catch (error) {
        console.error(error)
      }
    }
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
    if (product.status === 'outofstock' || quantity > product.quantity) {
      setErrorStock(true)
      return true
    } else {
      setErrorStock(false)
    }
    return false
  }

  const renderButtonGroup = () => {
    return (
      <>
        <button
          disabled={isLoading && buttonStates.buyNow}
          className='dy-btn dy-btn-primary dy-btn-outline dy-btn-sm w-[198px] disabled:bg-gray-10 lg:w-[125px] xl:w-[198px] h-[38px] rounded-full'
          onClick={() => handleAddCart(buttonGroupEnum.buyNow)}
        >
          {isLoading && buttonStates.buyNow ? <Spinner /> : 'Đặt hàng ngay'}
        </button>
        <button
          disabled={isLoading && buttonStates.addToCart}
          className='dy-btn dy-btn-primary dy-btn-sm w-[198px] lg:w-[165px] xl:w-[198px] disabled:bg-gray-10 h-[38px] rounded-full'
          onClick={() => handleAddCart(buttonGroupEnum.addToCart)}
        >
          {isLoading && buttonStates.addToCart ? <Spinner /> : 'Thêm vào giỏ hàng'}
        </button>
      </>
    )
  }

  return (
    <>
      <div className='flex flex-col lg:flex-row gap-10 lg:gap-2.5 xl:gap-5 p-[59px_20px_55px_20px] bg-white mt-6 rounded-[10px] text-abbey'>
        <div className='flex flex-col'>
          <ProductCarousel status={product.status || ''} product={product} />
          <div className='mt-[49px] text-center lg:text-left'>
            {product.licenseLink ? (
              <Link
                target='_blank'
                href={product.licenseLink}
                className='text-abbey text-14 underline leading-4'
              >
                Link giấy phép/ chứng nhận của sản phẩm
              </Link>
            ) : (
              <>
                <span className='text-abbey text-14 underline leading-4' id='tooltip-license-link'>
                  Link giấy phép/ chứng nhận của sản phẩm
                </span>
                <ReactTooltip
                  anchorSelect='#tooltip-license-link'
                  place='top-end'
                  clickable
                  render={({ content }) => (
                    <div className='w-[223px] h-[39px] flex items-center justify-center py-[11px] shadow-md'>
                      <Image
                        src={AttentionIcon}
                        alt='AttentionIcon'
                        width={15}
                        height={15}
                        className='cursor-pointer mr-1'
                      />
                      <span className='text-primary text-center text-14 font-normal"'>
                        Nội dung đang cập nhật...
                      </span>
                    </div>
                  )}
                  style={{
                    backgroundColor: 'white',
                    fontSize: '12px',
                    paddingLeft: '10px',
                    paddingRight: '10px',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    borderRadius: '6px'
                  }}
                />
              </>
            )}
          </div>
        </div>
        <div className='w-full sm:px-5'>
          <h1 className='text-[24px] leading-[30px] font-semibold'>
            {product.productName} ({product.packing})
          </h1>
          <div className='flex flex-col sm:flex-row sm:items-center my-5 leading-[19px]'>
            <span>
              Tình trạng: <br className='hidden lg:block xl:hidden' />
              {product.status == 'instock' ? 'Còn hàng' : 'Đã hết hàng'}
            </span>
            <span className='hidden sm:block mx-[13px]'>|</span>
            <span>
              Đã bán: <br className='hidden lg:block xl:hidden' />
              {product.soldProduct} sản phẩm
            </span>
            <span className='hidden sm:block mx-[13px]'>|</span>
            <div className='flex'>
              {product &&
                [...Array(5)].map((_, index) => (
                  <Image
                    key={index}
                    src={index < Math.floor(parseFloat(product.rating)) ? Star : StarBlack}
                    alt='Star'
                    width={19}
                    height={19}
                    className='cursor-pointer'
                  />
                ))}
            </div>
          </div>
          <div className='gap-[13px] flex flex-col mb-[27px]'>
            <div className='flex items-center gap-[9px]'>
              <span className='text-[36px] leading-[22px] text-primary font-semibold'>
                {formatVND(product.price)}
              </span>

              {product.unitSell && (
                <span className='text-[24px] leading-[22px] font-normal'>/ {product.unitSell}</span>
              )}
            </div>
            {product.originPrice ? (
              <span className='text-[24px] leading-[22px] line-through'>
                {formatVND(product.originPrice)}
              </span>
            ) : null}
          </div>
          <div className='max-h-[331px] info gap-5 flex flex-col font-normal mb-[35px] text-16 leading-[18px] text-abbey'>
            <div className='flex sm:gap-[51px] items-center'>
              <span className='w-[153px]'>Mã sản phẩm:</span>
              <div className='flex gap-[15px]'>
                <span className='font-semibold'>{product.code}</span>
                <Image
                  src={CopyIcon}
                  width={17}
                  height={17}
                  alt='Copy Icon'
                  className='cursor-pointer'
                  id='tooltip-copy-product-code'
                  onClick={copyReferralCodeToClipboard}
                />
                <ReactTooltip
                  anchorSelect='#tooltip-copy-product-code'
                  place='top'
                  clickable
                  content='Copied!'
                  openOnClick={true}
                  offset={1}
                  isOpen={openCopyTooltip}
                  style={{
                    fontSize: '12px',
                    paddingLeft: '5px',
                    paddingRight: '5px',
                    paddingTop: '4px',
                    paddingBottom: '4px'
                  }}
                />
              </div>
            </div>
            <div className='flex sm:gap-[51px] items-center'>
              <span className='w-[153px]'>Giá kê khai:</span>
              <span>
                {formatVND(product.declarationPrice)}/ {product.baseUnit}{' '}
              </span>
            </div>
            <div className='flex sm:gap-[51px] items-center'>
              <span className='w-[153px] shrink-0'>Nhóm điều trị:</span>
              <span className='text-primary'>{product.treatmentGroup}</span>
            </div>
            <div className='flex sm:gap-[51px] items-center'>
              <span className='w-[153px]'>Hoạt chất:</span>
              <span
                className='truncate cursor-pointer'
                id='tooltip-ingredient'
                data-tooltip-content={product.ingredient}
              >
                {product.ingredient}
              </span>
              <ReactTooltip
                anchorSelect='#tooltip-ingredient'
                place='top-end'
                clickable
                render={({ content }) => (
                  <div className='max-w-[283px] flex items-center justify-center'>{content}</div>
                )}
                style={{
                  backgroundColor: '#4D4D4F',
                  fontSize: '12px',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                  lineHeight: '15px',
                  borderRadius: '6px'
                }}
              />
            </div>
            <div className='flex sm:gap-[51px] items-center'>
              <span className='w-[153px]'>Quy cách đóng gói:</span>
              <span>{product.packing}</span>
            </div>
            <div className='flex sm:gap-[51px] items-center'>
              <span className='w-[153px]'>Dạng bào chế:</span>
              <span>{product.dosageForm}</span>
            </div>
            <div className='flex sm:gap-[51px] items-center'>
              <span className='w-[153px]'>Nhà sản xuất:</span>
              <Link href='#' className='text-dodger-blue underline'>
                {product.producerName}
              </Link>
            </div>
            {product.expired && (
              <div className='flex sm:gap-[51px] items-center'>
                <span className='w-[153px]'>Hạn sử dụng:</span>
                <Link href='#' className='text-dodger-blue underline'>
                  {product.expired}
                </Link>
              </div>
            )}
            <div className='flex sm:gap-[51px] items-center'>
              <span className='w-[153px]'>Nơi sản xuất:</span>
              <span>{product.national}</span>
            </div>
          </div>
          <div className='rounded-[10px] border mb-[27px]'>
            <div className='bg-tuft-bush h-[34px] rounded-t-[10px] flex items-center'>
              <div className='flex gap-1 px-6 py-1.5'>
                <Image
                  src={SaleFlameIcon}
                  width={20}
                  height={20}
                  alt='Siêu khuyến mãi'
                  className='cursor-pointer'
                />
                <span>khuyến mãi được áp dụng</span>
              </div>
            </div>
            <div className='py-[15px] px-[22px] sm:pr-[78px]'>
              {product.sale && (
                <>
                  <div className='flex items-center gap-[13px]'>
                    <Image
                      src={SalePercent}
                      width={26}
                      height={26}
                      alt='Siêu khuyến mãi'
                      className='h-[26px] cursor-pointer'
                    />
                    <span className='text-16 leading-4 text-primary'>
                      {' '}
                      Giảm {product.percentageReduction} giá trị sản phẩm
                    </span>
                  </div>
                  <span className='text-sm italic leading-[22px]'>
                    Lưu ý: Mức giảm giá được áp dụng trên đơn giá bán trước thuế
                  </span>
                </>
              )}
            </div>
          </div>
          {product.status != 'instock' ? (
            <Link href='#'>
              <span className='w-full sm:w-[198px] h-10 py-2 px-[15px] text-white bg-primary text-lg rounded-[31px] font-semibold flex items-center justify-center cursor-pointer'>
                Hỗ trợ ngay
              </span>
            </Link>
          ) : (
            <div className='gap-5 flex flex-col'>
              <span className='hidden sm:block text-base leading-[22px]'>Chọn số lượng</span>
              <div className='flex flex-col sm:flex-row gap-9 lg:gap-0 items-start justify-center lg:justify-between w-full sm:h-[38px]'>
                <div className='flex sm:flex-row items-start'>
                  <span className='text-base leading-[38px] sm:hidden block w-[153px]'>
                    Chọn số lượng
                  </span>
                  <div className='flex flex-col'>
                    <div className='flex justify-center w-[123px] h-[38px]'>
                      <Image
                        alt='Logo Thêm sản phẩm'
                        src={MinusItemTwo}
                        width={35}
                        height={38}
                        onClick={handleDecrement}
                        className='w-full h-full hover:pointer-events-auto cursor-pointer'
                      />
                      <input
                        type='number'
                        value={quantity}
                        onBlur={handleBlurQuantity}
                        onChange={handleInputQuantity}
                        className={`w-[53px] h-[37.1px] border-y text-center font-medium mx-[-1.5px] ${errOutStock ? 'bg-unbur-pink' : 'bg-white'}`}
                        onKeyDown={(evt) =>
                          ['e', 'E', '.', '-'].includes(evt.key) && evt.preventDefault()
                        }
                      />
                      <Image
                        alt='Logo Trừ sản phẩm'
                        src={PlusItemTwo}
                        width={35}
                        height={38}
                        onClick={handleIncrement}
                        className='w-full h-full hover:pointer-events-auto cursor-pointer'
                      />
                    </div>
                    {errOutStock && (
                      <span className='text-red text-16 my-2'>
                        Đặt tối đa {product.quantity} sản phẩm
                      </span>
                    )}
                  </div>
                </div>
                {renderButtonGroup()}
              </div>
            </div>
          )}
        </div>
      </div>
      <ModalReviewProduct
        name={`${product.productName} (${product.packing})`}
        list_image_product={product.imageList}
        isLoadingImage={false}
      />
    </>
  )
}
