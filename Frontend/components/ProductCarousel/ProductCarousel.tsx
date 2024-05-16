'use client'

import revalidateProduct from '@/app/products/[id]/action'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from '@/components/CustomCarousel/CarouselArrowButtons'
import { DotButton, useDotButton } from '@/components/CustomCarousel/CarouselDotButton'
import axios from '@/lib/axios'
import { HeartIconOrange, HeartIconWhite } from '@/public/icons'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useState } from 'react'

import { IProductDetail } from '../../app/products/[id]/Detail'

export default function ProductCarousel({
  status = 'instock',
  product
}: {
  status: string
  product: IProductDetail
}) {
  const [ref, api] = useEmblaCarousel({ loop: true })
  const { selectedIndex, onDotButtonClick } = useDotButton(api)
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(api)
  const [favorite, setFavorite] = useState<boolean>(product.inWishList)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  const ImageHorizontal = ({ url }: { url: string }) => {
    return (
      <div className='flex items-center w-[483px] h-[483px] px-[60px] justify-center'>
        <Image
          src={url}
          sizes='100%'
          width={483}
          height={483}
          alt='image'
          className='absolute w-auto h-1/2'
        />
      </div>
    )
  }

  const ImageBottom = ({
    url,
    className,
    onClick
  }: {
    url: string
    className: string
    onClick: () => void
  }) => {
    return (
      <div
        className={`w-16 sm:w-[105px] h-16 sm:h-[105px] flex items-center justify-center relative ${className}`}
        onClick={onClick}
      >
        <Image src={url} layout='fill' alt='image' className='rounded-[10px] object-contain' />
      </div>
    )
  }

  const openModal = () => {
    const modal = document.getElementById('review_product') as HTMLDialogElement | null
    if (modal) {
      modal.showModal()
    }
  }

  const handleWishList = async (productId: number) => {
    try {
      setIsDisabled(true)
      setFavorite(!favorite)
      const url: string = favorite
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wishlist/remove`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wishlist/add`
      const response = await axios.post(url, {
        product_id: productId
      })
      if (response.data.message === 'Successfully') {
        const data = response.data.data
        revalidateProduct()
      } else {
        setFavorite(!favorite)
        console.log('Error')
      }
      setTimeout(() => {
        setIsDisabled(false)
      }, 2000)
    } catch (error) {
      console.log('Error')
    }
  }

  return (
    <>
      <section className='relative w-full sm:max-w-[483px] border border-athens-gray rounded-[10px] mx-auto'>
        <button onClick={() => handleWishList(product.id)} disabled={isDisabled}>
          <Image
            src={favorite ? HeartIconOrange : HeartIconWhite}
            alt='favorite icon'
            width={25}
            height={20}
            className={`absolute top-[15px] right-[18px] z-[1] ${!isDisabled ? 'cursor-pointer' : 'cursor-auto'}`}
          />
        </button>
        <div className='overflow-hidden' ref={ref}>
          <div className='flex -ml-4'>
            {product.imageList &&
              product.imageList
                .slice(0, Math.min(product.imageList.length, 4))
                .map((d: any, index: number) => (
                  <div className='pl-4' key={index} style={{ flex: '0 0 100%' }}>
                    <ImageHorizontal url={d} />
                  </div>
                ))}
          </div>
        </div>

        <div className='absolute top-0 flex justify-between px-2.5 w-full h-full'>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton className='sm:mr-3' onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
        {status !== 'instock' && (
          <div className='absolute top-0 w-full h-full flex items-center justify-center pointer-events-none'>
            <div className='relative w-[140px] h-[140px] bg-black bg-opacity-50 rounded-full'>
              <div className='absolute top-0 left-0 right-0 bottom-0 z-20 flex items-center justify-center'>
                <span className='text-white font-semibold text-[24px]'>Hết Hàng</span>
              </div>
            </div>
          </div>
        )}
      </section>
      <div className='flex gap-3 sm:gap-[21px] w-full mt-5'>
        {product.imageList &&
          product.imageList
            .slice(0, Math.min(product.imageList.length, 4))
            .map((d: any, index: number) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={index === 3 ? 'hidden' : ''}
              >
                <ImageBottom
                  className={index === selectedIndex ? 'border border-primary rounded-[10px]' : ''}
                  url={d}
                  onClick={() => onDotButtonClick(index)}
                />
              </DotButton>
            ))}
        {product.imageList && product.imageList.length > 4 && (
          <div
            className='relative cursor-pointer rounded-[10px] w-16 sm:w-[105px] h-16 sm:h-[105px]'
            onClick={openModal}
          >
            <Image src={product.imageList[3]} width={105} height={105} alt='image' />
            <div className='bg-black rounded-[10px] absolute inset-y-0 inset-x-0 bg-opacity-30 flex items-center justify-center'>
              <p className='font-16 font-bold leading-[19px] text-white text-center'>
                Xem thêm
                <br />
                {product.imageList && product.imageList.length - 3} ảnh
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
