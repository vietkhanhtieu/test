import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { IProductCarousel } from './ModalReviewProduct'

interface ICarousel {
  productCarousel: IProductCarousel
  getImageIndex: (index: number) => void
  isZoom: boolean
}

const ProductCarousel = (props: ICarousel) => {
  const { productCarousel, getImageIndex, isZoom } = props

  return (
    <div id='myCarousel' className='dy-carousel w-full'>
      {productCarousel &&
        productCarousel.list_image_product?.map((image: string, index: number) => {
          const listImageProduct = productCarousel.list_image_product || []
          const listSize = listImageProduct.length

          let leftItemIndex: number, rightItemIndex: number, leftItemId: string, rightItemId: string

          leftItemIndex = rightItemIndex = index + 1
          leftItemId = rightItemId = `#product-${index + 1}`

          if (listSize !== 1) {
            leftItemId = `#product-${index === 0 ? listSize : index}`
            rightItemId = `#product-${index === listSize - 1 ? 1 : index + 2}`
          }

          if (listSize === 2) {
            leftItemIndex = index === 0 ? 1 : 0
            rightItemIndex = index === listSize - 1 ? 0 : 1
          } else if (listSize !== 1) {
            leftItemIndex = index === 0 ? listSize - 1 : index - 1
            rightItemIndex = index === listSize - 1 ? 0 : index + 1
          }

          return (
            <div
              key={index + 1}
              id={`product-${index + 1}`}
              className='dy-carousel-item relative w-full flex justify-center'
            >
              <div
                className={`${isZoom ? 'w-[746px] h-[602px]' : 'w-[404px] h-[247px]'} flex items-center justify-center`}
              >
                <Image
                  src={image}
                  alt='Sản phẩm'
                  width={isZoom ? 746 : 404}
                  height={isZoom ? 602 : 247}
                  className='max-w-full max-h-full object-contain'
                />
              </div>
              <div className='absolute flex items-center left-0 top-1/2 transform -translate-y-1/2'>
                <a
                  onClick={() => getImageIndex(leftItemIndex)}
                  href={leftItemId}
                  className='dy-btn dy-btn-circle absolute bg-santas-gray text-white'
                >
                  <Image alt='' src='/icons/switch-left.svg' width={43} height={43} />
                </a>
              </div>
              <div className='absolute flex items-center right-0 top-1/2 transform -translate-y-1/2'>
                <a
                  onClick={() => getImageIndex(rightItemIndex)}
                  href={rightItemId}
                  className='dy-btn dy-btn-circle absolute right-0 bg-santas-gray text-white'
                >
                  <Image alt='' src='/icons/switch-right.svg' width={43} height={43} />
                </a>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default ProductCarousel
