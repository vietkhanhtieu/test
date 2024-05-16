import Modal from '@/components/common/Modal'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { boolean } from 'yup'

interface IModelSignUpSuccessedProps {
  isModalSignupSuccessedOpen: boolean
  setIsModalSignupSuccessedOpen: Dispatch<SetStateAction<boolean>>
  countdownModalSuccessed: number | null
  setCountdownModalSuccessed: Dispatch<SetStateAction<number | null>>
}

const ModalSignupSuccessed: React.FC<IModelSignUpSuccessedProps> = ({
  isModalSignupSuccessedOpen,
  setIsModalSignupSuccessedOpen,
  countdownModalSuccessed,
  setCountdownModalSuccessed
}) => {
  const router = useRouter()

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined
    if (countdownModalSuccessed != null) {
      if (countdownModalSuccessed && isModalSignupSuccessedOpen && countdownModalSuccessed > 0) {
        intervalId = setInterval(() => {
          setCountdownModalSuccessed(countdownModalSuccessed - 1)
        }, 1000)
      } else {
        router.push('/login')
        clearInterval(intervalId)
      }
    }

    return () => clearInterval(intervalId)
  }, [isModalSignupSuccessedOpen, countdownModalSuccessed])
  return (
    <>
      <Modal
        isOpen={isModalSignupSuccessedOpen}
        onClose={() => setIsModalSignupSuccessedOpen(false)}
        containerClass={
          "bg-[url('/assets/signup_success_background.png')] bg-cover md:h-[380px] md:px-12 md:py-6 md:w-[612px] md:max-w-[1000px]"
        }
      >
        <div className='flex flex-col items-center text-center'>
          <div className='mb-5'>
            <Image alt='' src='/assets/icon-success.svg' width={56} height={56} />
          </div>
          <p className='mb-3 text-3xl font-bold'>Bạn đã đăng ký thành công</p>
          <p className='font-semibold mb-1'>
            Bắt đầu hành trình trải nghiệm của bạn tại Trung Tâm Dược Phẩm
          </p>
          <div className='mb-7 text-center text-xs text-abbey'>
            <p className='mb-3'>
              Nếu có thắc mắc hoặc cần hổ trợ thêm, vui lòng liên hệ qua hotline
              <br />
              <Link href='tel:+2877796768' className='text-blue-600'>
                028 7779 6768
              </Link>
              &nbsp;hoặc email&nbsp;
              <Link href='mailto:cskh@trungtamduocpham.com' className='text-blue-600'>
                cskh@trungtamduocpham.com
              </Link>
              &nbsp;để được hổ trợ
            </p>
          </div>
          <div className='mb-5'>
            <Link
              href='/login'
              className='rounded-[50px] bg-orange-500 px-11 py-3 text-xl font-black text-white'
            >
              <span>Đăng Nhập</span>
            </Link>
          </div>
          <div className='font-medium'>
            Tự động quay về màn hình đăng nhập sau{' '}
            <span className='text-[#FF6B00]'>({countdownModalSuccessed}s)</span>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ModalSignupSuccessed
