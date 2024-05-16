'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'

interface Props {
  currentStep: number
}

export const StepHeader: React.FC<Props> = ({ currentStep = 1 }) => {
  let classStep1 = 'text-primary'
  let classStep2 = ''
  let classStep3 = ''
  let stepOneImageURL = '/assets/signup_step_1.svg'
  let stepTwoImageURL = '/assets/signup_step_2.svg'
  let stepThreeImageURL = '/assets/signup_step_3.svg'
  let nextStep1ImageUrl = '/icons/next-step-gray.svg'
  let nextStep2ImageUrl = '/icons/next-step-gray.svg'

  if (currentStep >= 2) {
    classStep2 = 'text-primary'
    nextStep1ImageUrl = '/assets/signup_next_step.svg'
    stepTwoImageURL = '/assets/signup_step_2_highlight.svg'
  }
  if (currentStep == 3) {
    classStep3 = 'text-primary'
    nextStep1ImageUrl = '/assets/signup_next_step.svg'
    nextStep2ImageUrl = '/assets/signup_next_step.svg'
    stepThreeImageURL = '/assets/signup_step_3_highlight.svg'
  }

  return (
    <>
      <div className='flex items-center h-12 text-abbey justify-center md:justify-start'>
        <div className='text-16 lg:text-24 font-semibold leading-7 text-abbey me-6'>
          Giỏ hàng của tôi
        </div>

        <div className='w-30 flex'>
          <div className='flex me-[11px]'>
            <Image className='inline-block' alt='' src={stepOneImageURL} width={33} height={33} />
          </div>
          <div className={cn(classStep1, 'hidden md:block min-w-[62px] me-[25px]')}>
            <p className='font-bold text-16 leading-[19px] mb-[5px]'>Bước 1</p>
            <p className='text-14 text-normal leading-4 hidden md:block '>Giỏ hàng</p>
          </div>
        </div>

        <div className='flex items-center me-[25px]'>
          <Image
            alt=''
            className='inline-block'
            src={nextStep1ImageUrl}
            width={19.53}
            height={25}
          />
        </div>

        <div className='w-30 flex'>
          <div className='flex me-[11px]'>
            <Image className='inline-block' alt='' src={stepTwoImageURL} width={33} height={33} />
          </div>
          <div className={cn(classStep2, 'hidden md:block min-w-[114px] me-[25px]')}>
            <p className='font-bold text-16 leading-[19px] mb-[5px]'>Bước 2</p>
            <p className='text-14 text-normal leading-4 hidden md:block '>Chi tiết thanh toán</p>
          </div>
        </div>

        <div className='flex items-center me-[25px]'>
          <Image
            alt=''
            className='inline-block'
            src={nextStep2ImageUrl}
            width={19.53}
            height={25}
          />
        </div>

        <div className='w-30 flex'>
          <div className='flex me-[11px]'>
            <Image className='inline-block' alt='' src={stepThreeImageURL} width={33} height={33} />
          </div>
          <div className={cn(classStep3, 'hidden md:block min-w-[54px]')}>
            <p className='font-bold text-16 leading-[19px] mb-[5px]'>Bước 3</p>
            <p className='text-14 text-normal leading-4 hidden md:block '>Hoàn tất</p>
          </div>
        </div>
      </div>
    </>
  )
}
