'use client'

import {
  ModalNextButton,
  ModalPrevButton,
  usePrevNextButtons
} from '@/components/CustomCarousel/CarouselArrowButtons'
import { DotButton, useDotButton } from '@/components/CustomCarousel/CarouselDotButton'
import { ZoomIn, ZoomOut } from '@/public/icons/index'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

export default function ProductCarouselModal({
  data,
  isZoom,
  setIsZoom
}: {
  data: any
  isZoom: boolean
  setIsZoom: any
}) {
  const [ref, api] = useEmblaCarousel({ loop: true })
  const { selectedIndex, onDotButtonClick } = useDotButton(api)
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(api)

  const ImageHorizontal = ({ url, isZoom = false }: { url: string; isZoom: boolean }) => {
    if (isZoom) {
      return (
        <div className='flex items-center'>
          <Image
            src={url}
            width={693}
            height={425}
            alt='image'
            className='h-[425px] object-contain'
          />
        </div>
      )
    }
    return (
      <div className='flex items-center'>
        <Image
          src={url}
          width={403}
          height={247}
          alt='image'
          className='h-[247px] object-contain'
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
      <div className={`w-[91px] border rounded-[10px] ${className}`} onClick={onClick}>
        <Image
          src={url}
          width={91}
          height={100}
          alt='image'
          className='h-[98px] rounded-[10px] object-contain'
        />
      </div>
    )
  }

  const openModal = () => {
    const modal = document.getElementById('review_product') as HTMLDialogElement | null
    if (modal) {
      modal.showModal()
    }
  }

  return (
    <>
      <section
        className={`relative ${!isZoom ? 'mb-5 md:mb-10 lg:mb-[137px]' : 'md:pb-[62px] lg:pb-[119px]'}`}
      >
        <div className='overflow-hidden' ref={ref}>
          <div className='flex -ml-[16px]'>
            {data &&
              data.map((d: any, index: number) => (
                <div className='pl-4 flex justify-center' key={index} style={{ flex: '0 0 100%' }}>
                  <ImageHorizontal url={d} isZoom={isZoom} />
                </div>
              ))}
          </div>
        </div>

        <div className='absolute top-0 flex justify-between w-full h-full pr-[22px]'>
          <ModalPrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <ModalNextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
        <button
          className={`absolute left-1/2 bottom-1.5 translate-x-[-50%] ${isZoom ? 'bottom-0' : ''}`}
          onClick={() => setIsZoom(!isZoom)}
        >
          <Image alt='Zoom' src={isZoom ? ZoomOut : ZoomIn} width={44} height={44} />
        </button>
      </section>
      <div className={`flex justify-end pr-[22px] ${isZoom ? 'bottom-[145px]' : ''}`}>
        <span
          className={`w-[75px] h-8 rounded-xl bg-athens-gray-solid flex items-center justify-center`}
        >
          {selectedIndex + 1 + '/' + data?.length}
        </span>
      </div>
      <div
        className={`${isZoom ? 'hidden' : 'flex'} mt-[19px] pr-[13px] justify-start gap-[13px] overflow-x-auto overflow-y-hidden`}
        style={{ scrollbarWidth: 'none' }}
      >
        {data &&
          data.map((d: any, index: number) => (
            <DotButton key={index} onClick={() => onDotButtonClick(index)}>
              <ImageBottom
                className={
                  index === selectedIndex ? 'border-primary' : 'border-gray-40 border-opacity-50'
                }
                url={d}
                key={index}
                onClick={() => onDotButtonClick(index)}
              />
            </DotButton>
          ))}
      </div>
    </>
  )
}
