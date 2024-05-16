'use client'

import Modal from '@/components/common/Modal'
import ResetPasswordIcon from '@/components/icons/resetPasswordIcon.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react'

import styles from './page.module.css'

export default function ChangePassword() {
  const router = useRouter()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const [validPassword, setValidPassword] = useState<string | boolean>(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState<string | null>('')
  const [isModalOpen, setModalOpen] = useState(false)

  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({
    password: '',
    confirmPassword: '',
    changePasswordMessage: ''
  })

  const handleTogglePasswordVisibility: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleToggleConfirmPasswordVisibility: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
  }

  const handleIconEyes = (error: boolean, isPasswordVisible: boolean, password: string): string => {
    if ((password || error) && isPasswordVisible) {
      return 'icons/eye-open.svg'
    } else if (password || error) {
      return 'icons/eye.svg'
    } else if (isPasswordVisible) {
      return 'icons/eye-black-open.svg'
    } else {
      return 'icons/eye-black.svg'
    }
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    resetChangePasswordMessage()
  }

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value)
    resetChangePasswordMessage()
  }

  useEffect(() => {
    const resetPasswordUserName = localStorage.getItem('resetPasswordUsername')

    if (!resetPasswordUserName) {
      router.push('/')
    }

    setUsername(resetPasswordUserName)
  }, [router])

  useEffect(() => {
    setValidPassword(password && confirmPassword)
  }, [password, confirmPassword])

  const handleSubmit = async () => {
    if (!username) {
      return
    }

    await requestChangePassword()

    setModalOpen(true)

    removeLocalStorage()
  }

  const requestChangePassword = async () => {
    setIsLoading(true)

    const input = {
      username: username,
      password: password,
      password_confirmation: confirmPassword
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/v1/change_password`,
      input
    )

    setIsLoading(false)

    if (response.data.status != 1) {
      setErrorMessage((errorMessage) => ({
        ...errorMessage,
        changePasswordMessage: response.data.error.password_confirmation
      }))

      return Promise.reject(response)
    }
    return Promise.resolve(response)
  }

  const removeLocalStorage = () => {
    localStorage.removeItem('resetPasswordUsername')
  }

  const resetChangePasswordMessage = () => {
    if (errorMessage.changePasswordMessage) {
      setErrorMessage((errorMessage) => ({
        ...errorMessage,
        changePasswordMessage: ''
      }))
    }
  }

  return (
    <div className={styles.container}>
      <div className='mx-auto max-w-[657px]'>
        <div className='py-[67px]'>
          <Image
            className='mx-auto'
            alt='Reset Password Icon'
            src={ResetPasswordIcon}
            width={220}
          />

          <h2 className='mt-[45px] text-center text-[40px] font-bold leading-normal'>
            Đặt lại mật khẩu
          </h2>

          <p className='mx-auto mt-[24px] max-w-[439px] text-center text-[14px]'>
            Mật khẩu phải có ít nhất 6 ký tự và phải chứa một chữ in hoa, một số và một ký tự đặc
            biệt.
          </p>

          <div className='mx-auto mt-8 max-w-[31.5rem] gap-6'>
            <div className='relative flex w-full items-center'>
              <Image
                alt=''
                src={
                  errorMessage.changePasswordMessage || password
                    ? 'icons/password.svg'
                    : 'icons/password-black.svg'
                }
                width={24}
                height={24}
                className='absolute left-3 top-1/2 -translate-y-1/2 transform'
              />
              <Input
                className={cn(
                  'h-14 rounded-xl px-12 focus-visible:ring-0 focus-visible:ring-offset-0',
                  errorMessage.changePasswordMessage ? 'border-red' : '',
                  password && !isPasswordVisible ? 'text-[30px]' : 'text-sm'
                )}
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder='Mật khẩu mới'
                name='password'
                required
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                onClick={handleTogglePasswordVisibility}
                className='absolute right-3 top-1/2 -translate-y-1/2 transform focus:outline-none'
              >
                <Image
                  alt=''
                  src={handleIconEyes(
                    !!errorMessage.changePasswordMessage,
                    isPasswordVisible,
                    password
                  )}
                  width={22}
                  height={20}
                />
              </button>
            </div>

            <div className='relative mt-4 flex w-full items-center'>
              <Image
                alt=''
                src={
                  errorMessage.changePasswordMessage || confirmPassword
                    ? 'icons/password.svg'
                    : 'icons/password-black.svg'
                }
                width={24}
                height={24}
                className='absolute left-3 top-1/2 -translate-y-1/2 transform'
              />
              <Input
                className={cn(
                  'h-14 rounded-xl px-12 focus-visible:ring-0 focus-visible:ring-offset-0',
                  errorMessage.changePasswordMessage ? 'border-red' : '',
                  confirmPassword && !isConfirmPasswordVisible ? 'text-[30px]' : 'text-sm'
                )}
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                placeholder='Xác nhận lại mật khẩu'
                name='confirm-password'
                required
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <button
                onClick={handleToggleConfirmPasswordVisibility}
                className='absolute right-3 top-1/2 -translate-y-1/2 transform focus:outline-none'
              >
                <Image
                  alt=''
                  src={handleIconEyes(
                    !!errorMessage.changePasswordMessage,
                    isConfirmPasswordVisible,
                    confirmPassword
                  )}
                  width={22}
                  height={20}
                />
              </button>
            </div>

            {errorMessage.changePasswordMessage && (
              <p className='mt-2 border-red text-sm text-red dark:text-red'>
                {errorMessage.changePasswordMessage}
              </p>
            )}
          </div>

          <div className='mt-[45px] flex flex-col justify-between gap-5 sm:flex-row'>
            <Link
              href='/reset-password'
              onClick={removeLocalStorage}
              className='order-2 sm:order-1'
            >
              <Button
                className={cn(
                  styles.button,
                  'bg-gray-40 text-[24px] !px-[53px] w-full sm:w-[250px]'
                )}
              >
                <Image
                  className={styles.leftIcon}
                  alt='Button Icon'
                  src='/icons/double-expland-icon.svg'
                  width={23}
                  height={18}
                />
                Quay lại
              </Button>
            </Link>
            <Button
              className={cn(styles.button, 'w-full sm:w-[250px] text-[24px] order-1 sm:order-2')}
              disabled={!validPassword || isLoading}
              onClick={handleSubmit}
            >
              Xác nhận
              {isLoading ? (
                <svg
                  aria-hidden='true'
                  className='ml-6 inline h-6 w-6 animate-spin fill-primary text-white dark:text-gray-600'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentFill'
                  />
                </svg>
              ) : (
                <Image
                  className={styles.rightIcon}
                  alt='Button Icon'
                  src='/icons/double-expland-icon.svg'
                  width={23}
                  height={18}
                />
              )}
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        containerClass='max-w-[577px] px-[44px] py-[40px]'
      >
        <div className='text-center'>
          <Image
            className='mx-auto'
            alt='Success Icon'
            src='/assets/icon-success.svg'
            width={56}
            height={56}
          />

          <p className='mt-5 text-xl font-semibold text-abbey'>
            Chúc mừng bạn đã thay đổi mật khẩu thành công. Hãy đăng nhập để trải nghiệm mua hàng.
          </p>

          <Image
            className='mx-auto mt-5'
            alt='Change Password Image'
            src='/change_password_popup_img.svg'
            width={175}
            height={175}
          />

          <div className='mx-5 mt-9'>
            <Link href='/login'>
              <Button className='w-full rounded-xl text-[16px] leading-[19px]'>Đăng nhập</Button>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  )
}
