'use client'

import { OtpPopup } from '@/components/common/OtpPopup/OtpPopup'
import ResetPasswordIcon from '@/components/icons/resetPasswordIcon.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { useFormik } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import * as Yup from 'yup'

export default function ResetPassword() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [checkInfoMessage, setCheckInfoMessage] = useState('')
  const [isOtpPopupOpen, setOtpPopupOpen] = useState(false)
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Vui lòng nhập email hoặc số điện thoại')
      .test('is-valid', ' ', function (value) {
        return (
          /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value) || // Check if it's a valid email
          /^\+?[0-9]{10}$/.test(value) // Check if it's a valid phone number
        )
      })
  })

  const initialValues = {
    username: '',
    isEmail: ''
  }

  const onSubmit = (values: any) => {
    handleCheckInfo()
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit
  })

  const handleSubmit = () => {
    formik.submitForm()
  }

  const handleInputChange = (e: any) => {
    resetCheckInfoMessage()

    formik.setFieldValue('isEmail', e.target.value.includes('@') ? '1' : '')

    formik.setFieldValue('username', e.target.value)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  const handleCheckInfo = async () => {
    setIsLoading(true)

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/auth/check_info`,
      {
        valid_check: true,
        check_step: 'SEND-OTP',
        email: formik.values.username,
        phone: formik.values.username
      }
    )

    const data = response.data

    if (data['status'] === 200) {
      setPhone(data['data']['phone'])
      setEmail(data['data']['email'])

      await requestSendOtp(data['data']['phone'], data['data']['email'])
    } else {
      if ([400, 401].includes(data['status'])) {
        setCheckInfoMessage('Tài khoản không hợp lệ, vui lòng thử lại.')
      }
      setIsLoading(false)
    }
  }

  const requestSendOtp = async (phoneInput: string, emailInput: string) => {
    setIsLoading(true)

    const input = {
      phone: phoneInput,
      email: emailInput,
      type: 'reset'
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/otp/send`,
      input
    )

    const data = response.data

    if (data['status'] === 2000) {
      setOtpPopupOpen(true)
      setIsLoading(false)
    }
  }

  const resetCheckInfoMessage = () => {
    setCheckInfoMessage('')
  }

  const handleOtpValidated = () => {
    localStorage.setItem('resetPasswordUsername', formik.values.username)

    router.push('/change-password')
  }

  return (
    <>
      <div className='container'>
        <div className='mx-auto mt-[50px] max-w-[980px] rounded-lg bg-background'>
          <div className='mx-auto max-w-[657px]'>
            <div className='py-[67px]'>
              <Image
                className='mx-auto'
                alt='Reset Password Icon'
                src={ResetPasswordIcon}
                width={220}
              />

              <h2 className='mt-[45px] text-center text-[40px] font-bold text-abbey leading-[47px]'>
                Đặt lại mật khẩu
              </h2>

              <p className='mx-auto mt-[24px] max-w-[31.5rem] text-center text-[14px] text-abbey'>
                Vui lòng nhập email hoặc số điện thoại để nhận mã xác minh, đặt lại mật khẩu.
              </p>

              <div className='mx-auto mt-[24px] max-w-[31.5rem]'>
                <div className='relative flex w-full items-center'>
                  <Input
                    className={cn(
                      'h-14 py-[27px] text-14 focus-visible:ring-0 focus-visible:ring-offset-0 text-abbey rounded-xl',
                      checkInfoMessage ? 'border-red-solid' : ''
                    )}
                    type='text'
                    name='username'
                    placeholder='Email/ Số điện thoại'
                    value={formik.values.username}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                  />

                  {formik.errors.username || !formik.values.username || checkInfoMessage ? (
                    ''
                  ) : (
                    <Image
                      alt=''
                      src='/icons/yes.svg'
                      width={22}
                      height={20}
                      className='absolute right-4 top-1/2 -translate-y-1/2 transform'
                    />
                  )}
                </div>

                {formik.errors.username || checkInfoMessage ? (
                  <p
                    className={
                      'mt-1.5 text-[14px] leading-[16px] text-red-solid dark:text-red-solid'
                    }
                  >
                    {formik.errors.username || checkInfoMessage}
                  </p>
                ) : (
                  ''
                )}

                <input
                  type='hidden'
                  name='isEmail'
                  value={formik.values.isEmail}
                  onChange={formik.handleChange}
                />
              </div>

              <div className='mt-[45px] flex flex-col justify-between gap-5 sm:flex-row'>
                <Link href='/login' className='order-2 sm:order-1'>
                  <Button className='disabled:bg-gray-10 disabled:opacity-100 h-[64px] rounded-[32px] px-[35px] w-full bg-gray-40 text-[24px] sm:w-auto'>
                    <Image
                      className='mr-8'
                      alt='Button Icon'
                      src='/icons/double-expland-icon.svg'
                      width={23}
                      height={18}
                    />
                    Quay lại
                  </Button>
                </Link>

                <Button
                  className='disabled:bg-gray-10 disabled:opacity-100 h-[64px] rounded-[32px] px-[35px] order-1 text-[24px] sm:order-2'
                  disabled={
                    !!formik.errors.username ||
                    !!!formik.values.username ||
                    !!checkInfoMessage ||
                    isLoading
                  }
                  onClick={() => handleSubmit()}
                >
                  Nhập mã xác minh
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
                      className='rotate-180 ml-2.5'
                      alt='Button Icon'
                      src='/icons/double-expland-icon.svg'
                      width={23}
                      height={18}
                    />
                  )}
                </Button>
              </div>
            </div>

            <OtpPopup
              open={isOtpPopupOpen}
              phone={phone}
              email={email}
              type='reset'
              onNext={handleOtpValidated}
            />
          </div>
        </div>
      </div>
    </>
  )
}
