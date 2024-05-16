import Image from 'next/image'
import { useEffect, useState } from 'react'

import { IProductCarousel } from './ModalReviewProduct'

interface ICarouselFullBleed {
  productCarousel: IProductCarousel
  imageIndex: number
  setImageIndex: (newIndex: number) => void
  getImageIndex: (index: number) => void
  isZoom: boolean
}

const ProductCarouselFullBleed = (props: ICarouselFullBleed) => {
  const { productCarousel, imageIndex, setImageIndex, getImageIndex, isZoom } = props

  const handleSelectImage = (index: number) => {
    setImageIndex(index)
  }

  return (
    <div
      className={`${isZoom ? 'hidden' : ''} dy-carousel dy-carousel-center space-x-1 w-auto gap-4 absolute bottom-5 left-0 right-0 mx-[22px]`}
    >
      {productCarousel &&
        productCarousel.list_image_product?.map((image: string, index: number) => (
          <div
            key={index}
            className={`dy-carousel-item w-[91px] h-[100px] border-2 rounded-box ${
              imageIndex === index ? 'border-primary' : ''
            }`}
          >
            <a href={`#product-${index + 1}`} className='rounded-box w-full h-full'>
              <Image
                src={image}
                alt='Sản phẩm'
                width={746}
                height={602}
                className='rounded-box w-full h-full object-contain'
                onClick={() => {
                  handleSelectImage(index)
                  getImageIndex(index)
                }}
              />
            </a>
          </div>
        ))}
    </div>
  )
}

export default ProductCarouselFullBleed
