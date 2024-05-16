import { cn } from '@/lib/utils'
import Image from 'next/image'

import './signup_style.css'

interface LayoutProps {
  children?: React.ReactNode
  messageInfo?: string
  currentStep?: number
}

export const RenderSignupSteps: React.FC<LayoutProps> = ({ currentStep = 1 }) => {
  let classStep1 = 'text-primary'
  let classStep2 = ''
  let classStep3 = ''
  let stepOneImageURL = '/assets/signup_step_1.svg'
  let stepTwoImageURL = '/assets/signup_step_2.svg'
  let stepThreeImageURL = '/assets/signup_step_3.svg'
  let nextStepImageUrl = '/assets/signup_next_step.svg'

  if (currentStep >= 2) {
    classStep2 = 'text-primary'
    stepOneImageURL = '/assets/signup_completed_step.svg'
    stepTwoImageURL = '/assets/signup_step_2_highlight.svg'
  }
  if (currentStep == 3) {
    classStep3 = 'text-primary'
    stepTwoImageURL = '/assets/signup_completed_step.svg'
    stepThreeImageURL = '/assets/signup_step_3_highlight.svg'
  }

  return (
    <>
      <div className='flex text-abbey mx-auto md:w-[627px]'>
        {/* <div className='w-30 flex flex-auto items-center'>
          <Image
            className='inline-block h-8'
            alt='step-one-icon'
            src={stepOneImageURL}
            width={32}
            height={33}
          />
          <div className={cn(classStep1, 'ml-3 hidden md:flex flex-col justify-center')}>
            <div className='font-bold'> Bước 1</div>
            <div className='hidden md:block text-sm'> Đăng ký cơ bản</div>
          </div>
        </div> */}

        {/* <div className='flex w-6 flex-auto items-center'>
          <Image alt='' className='inline-block' src={nextStepImageUrl} width={25} height={25} />
        </div>

        <div className='w-30 flex flex-auto items-center'>
          <Image
            className='inline-block h-8'
            alt='step-two-icon'
            src={stepTwoImageURL}
            width={32}
            height={33}
          />
          <div className={cn(classStep2, 'ml-3 hidden md:flex flex-col justify-center')}>
            <div className='font-bold'> Bước 2</div>
            <div className='hidden md:block text-sm'>Phân loại tài khoản</div>
          </div>
        </div> */}

        {/* <div className='flex w-6 flex-auto items-center'>
          <Image className='inline-block' alt='' src={nextStepImageUrl} width={25} height={25} />
        </div> */}

        {/* <div className='w-30 flex flex-auto items-center'>
          <Image
            className='inline-block h-8'
            alt='step-three-icon'
            src={stepThreeImageURL}
            width={32}
            height={33}
          />
          <div className={cn(classStep3, 'ml-3 hidden md:flex flex-col justify-center')}>
            <p className='font-bold'> Bước 3</p>
            <p className='hidden md:block text-sm'>Bổ sung thông tin</p>
          </div>
        </div> */}
      </div>
    </>
  )
}

const LayoutSignup: React.FC<LayoutProps> = ({
  children,
  messageInfo = 'Tài khoản của quý khách chỉ được kích hoạt khi cung cấp đầy đủ các thông tin.',
  currentStep = 1
}) => {
  return (
    <>
      <div className='bg-alabaster'>
        <div className=' signup-container container flex justify-center md:w-[980px] pb-[43px]'>
          <div className='signup-content w-full md:w-[780px]'>
            <div className='flex rounded-[10px] bg-orange-100 py-4 px-6 max-w-[656px] mx-auto'>
              <Image
                alt=''
                className='inline-block h-5'
                src='/assets/signup_info.svg'
                width={20}
                height={20}
              />
              <div className='ml-4 text-14'>
                {currentStep == 3 ? (
                  <>
                    <span className='font-bold text-orange-600 text-base'> Lưu ý </span>
                    <span className='text-base text-slate-600'>
                      {' '}
                      Sau khi đăng ký, Người dùng sẽ được tạo tài khoản và có thể đăng nhập ngay để
                      sử dụng.
                    </span>
                    <p className='text-base text-slate-600'>
                      Nếu mua các sản phẩm là thuốc, hệ thống sẽ yêu cầu Người dùng bổ sung các
                      thông tin và giấy phép của tổ chức/doanh nghiệp để đảm bảo đủ điều kiện mua
                      hàng. Những yêu cầu này được căn cứ từ yêu cầu của Nhà bán.{' '}
                    </p>
                  </>
                ) : (
                  <span>{messageInfo}</span>
                )}
              </div>
            </div>
            <div className='mt-6'>
              <RenderSignupSteps currentStep={currentStep} />
            </div>
            <div className='mt-[30px] mx-auto'>{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}
export default LayoutSignup
