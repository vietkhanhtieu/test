'use client'

import {
  CarouselArrowLeft,
  CarouselArrowRight,
  ModalCarouselArrowLeft,
  ModalCarouselArrowRight
} from '@/public/icons'
import { EmblaCarouselType } from 'embla-carousel'
import Image from 'next/image'
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react'

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}

type PropType = PropsWithChildren<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button className='embla__button embla__button--prev sm:ml-3.5' type='button' {...restProps}>
      <Image src={CarouselArrowLeft} alt='arrow left' width={35} height={35} />

      {children}
    </button>
  )
}

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props
  return (
    <button className='embla__button embla__button--next' type='button' {...restProps}>
      <Image src={CarouselArrowRight} alt='arrow right' width={35} height={35} />

      {children}
    </button>
  )
}

export const ModalPrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button className='embla__button embla__button--prev' type='button' {...restProps}>
      <Image src={ModalCarouselArrowLeft} alt='arrow left' width={43} height={43} />

      {children}
    </button>
  )
}

export const ModalNextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props
  return (
    <button className='embla__button embla__button--next' type='button' {...restProps}>
      <Image src={ModalCarouselArrowRight} alt='arrow right' width={43} height={43} />

      {children}
    </button>
  )
}
