import ProductCarouselModal from '@/components/ProductCarousel/ProductCarouselModal'
import Spinner from '@/components/ui/spinner'
import Image from 'next/image'
import { useState } from 'react'

export interface IProductCarousel {
  name: string | null
  list_image_product: string[] | null
  isLoadingImage: boolean
}

export interface ICarouselList {
  productId?: number
  imageList?: IProductCarousel
}

const ModalReviewProduct = (props: IProductCarousel) => {
  const { name, list_image_product, isLoadingImage } = props
  const [isZoom, setIsZoom] = useState<boolean>(false)

  return (
    <dialog id='review_product' className='dy-modal px-4 overflow-y-scroll !block'>
      <div
        className={`dy-modal-box max-w-[650px] lg:max-w-[812px] max-h-none mx-auto !block my-8 w-full  ${isZoom ? 'p-[27px_0_56px_22px] lg:p-[102px_0_56px_22px]' : 'p-[43px_0_28px_22px]'}`}
      >
        <form method='dialog'>
          <button className='dy-btn dy-btn-sm dy-btn-circle dy-btn-ghost absolute right-[22px] top-[21px] text-2xl font-normal z-10'>
            <Image alt='' src='/icons/cross.svg' width={17} height={17} />
          </button>
        </form>
        {!isLoadingImage ? (
          <>
            <div
              className={`${isZoom ? 'hidden' : 'block'} dy-modal-content md:pr-[113px] mb-5 md:mb-[61px]`}
            >
              <h3 className='font-semibold text-2xl text-left'>{name}</h3>
            </div>
            <ProductCarouselModal data={list_image_product} isZoom={isZoom} setIsZoom={setIsZoom} />
          </>
        ) : (
          <div className='flex justify-center h-full items-center'>
            <Spinner />
          </div>
        )}
      </div>
    </dialog>
  )
}

export default ModalReviewProduct
