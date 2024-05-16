'use client'

import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from '@/components/CustomCarousel/CarouselArrowButtons'
import { DotButton, useDotButton } from '@/components/CustomCarousel/CarouselDotButton'
import BannerConq from '@/public/banners/conq-1.png'
import BannerHfmd from '@/public/banners/hfmd.png'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

export const Banner = () => {
  const [ref, api] = useEmblaCarousel({ loop: true })
  const { selectedIndex, onDotButtonClick } = useDotButton(api)
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(api)
  const slides = [BannerConq.src, BannerConq.src, BannerConq.src]

  return (
    <div className='flex flex-col sm:flex-row gap-5 w-full my-[46px]'>
      <section className='relative w-full'>
        <div className='rounded-[10px] overflow-hidden' ref={ref}>
          <div className='flex'>
            {slides.map((slide: string, index: number) => (
              <div className='' key={index} style={{ flex: '0 0 100%' }}>
                <Image
                  src={slide}
                  alt=''
                  width={780}
                  height={250}
                  className='xl:h-[250px] object-cover'
                />
              </div>
            ))}
          </div>
        </div>
        <div className='absolute top-0 flex justify-between px-6 w-full h-full'>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton className='' onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
        <div className='absolute bottom-[19px] justify-center flex gap-2.5 w-full'>
          {slides.map((slide: string, index: number) => (
            <DotButton key={index} onClick={() => onDotButtonClick(index)}>
              <div
                className={`${index === selectedIndex ? 'bg-abbey' : 'bg-black opacity-30'} h-2.5 w-2.5 rounded-full`}
                onClick={() => onDotButtonClick(index)}
              ></div>
            </DotButton>
          ))}
        </div>
      </section>
      <Image
        src={BannerHfmd}
        alt=''
        width={382}
        className='sm:max-w-[190px] md:max-w-[232px] lg:max-w-[316px] xl:max-w-none max-h-48 sm:max-h-none rounded-[10px] mx-auto object-contain sm:object-fill'
      />
    </div>
  )
}
