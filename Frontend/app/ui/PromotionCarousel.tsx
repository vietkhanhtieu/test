'use client'

import { usePrevNextButtons } from '@/components/CustomCarousel/CarouselArrowButtons'
import { DotButton, useDotButton } from '@/components/CustomCarousel/CarouselDotButton'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

export default function PromotionCarousel() {
  const [ref, api] = useEmblaCarousel({ loop: true })
  const { selectedIndex, onDotButtonClick } = useDotButton(api)
  usePrevNextButtons(api)

  const banners = [
    '/banner-carousel-search-1.png',
    '/banner-carousel-search-2.png',
    '/banner-carousel-search-3.png',
    '/banner-carousel-search-1.png',
    '/banner-carousel-search-2.png',
    '/banner-carousel-search-3.png',
    '/banner-carousel-search-1.png'
  ]

  const groupBanners = banners.reduce<string[][]>((acc, curr, index) => {
    if (index % 3 === 0) {
      acc.push([curr])
    } else {
      if (acc.length > 0) {
        acc[acc.length - 1].push(curr)
      }
    }
    return acc
  }, [])

  return (
    <div className='container mt-20 p-0'>
      <h1 className='w-full text-center text-24 font-semibold mb-[46px]'>Xem thêm ưu đãi</h1>
      <div className='h-[268px] w-full rounded-[10px]'>
        <section className='relative w-full rounded-[10px]'>
          <div className='overflow-hidden h-[268px]' ref={ref}>
            <div className='flex'>
              {groupBanners.map((banners: string[], index: number) => (
                <div
                  className='flex gap-[22px] justify-center ml-1'
                  key={index}
                  style={{ flex: '0 0 105%' }}
                >
                  {banners.map((banner: string, index: number) => (
                    <Image key={index} src={banner} height={268} width={380} alt='' />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className='absolute bottom-[-26px] justify-center flex gap-2.5 w-full'>
            {groupBanners.map((banner: string[], index: number) => (
              <DotButton key={index} onClick={() => onDotButtonClick(index)}>
                <div
                  className={`${index === selectedIndex ? 'w-[30px] bg-primary' : 'w-[11px] border border-primary'} h-[11px] rounded-full`}
                  onClick={() => onDotButtonClick(index)}
                ></div>
              </DotButton>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
