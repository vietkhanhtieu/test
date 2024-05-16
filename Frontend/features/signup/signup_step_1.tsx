import Modal from '@/components/common/Modal'
import { OtpPopup } from '@/components/common/OtpPopup/OtpPopup'
import LayoutSignup from '@/components/signup/layout'
import { Button } from '@/components/ui/button'
import CustomCheckbox from '@/components/ui/custom_checkbox/custom_checkbox'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItemNoChevron,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import Spinner from '@/components/ui/spinner'
import { ISignupStepProps } from '@/features/signup/index'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { fetchAPI } from '../../apiconfi.js'

import { ChangeEvent, FormEvent, KeyboardEvent, createRef, useEffect, useState } from 'react'

import PasswordInput from './password_input'
import './signup_form_style.css'

const SignupFeatureStep1: React.FC<ISignupStepProps> = ({
  onNext,
  currentStep,
  formData,
  setFormData
}) => {
  const [isModalOpen, setModalOpen] = useState(false)

  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    pronoun: '',
    password: '',
    password_confirmation: '',
    acceptPolicy: '',
    otpMessage: ''
  })

  const [countdown, setCountdown] = useState(59)
  const [showResendButton, setShowResendButton] = useState(false)
  const inputRefs = Array.from({ length: 6 }, (_, i) => createRef<HTMLInputElement>())
  const [disableSubmitForm, setDisableSubmitForm] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const [isOtpLoading, setIsOtpLoading] = useState(false)
  const [isAddNotePassword, setIsAddNotePassword] = useState(false)

  useEffect(() => {
    if (isModalOpen && inputRefs[0].current) {
      inputRefs[0].current.focus()
    }
  }, [isModalOpen])

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined
    if (isModalOpen && countdown > 0) {
      setShowResendButton(false)
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1)
      }, 1000)
    } else {
      clearInterval(intervalId)
      setShowResendButton(true)
    }

    return () => clearInterval(intervalId)
  }, [isModalOpen, countdown])

  useEffect(() => {
    setDisableSubmitForm(checkDisable())
  }, [formData])

  // const handleResendClick = () => {
  //   setErrorMessage((errorMessage) => ({
  //     ...errorMessage,
  //     otpMessage: ''
  //   }))
  //   //const sendOtp = requestSendOtp()
  //   setCountdown(59)
  //   setShowResendButton(false)
  // }

  const handleChange = (e: { target: { name: any; value: any; checked: any } }) => {
    const name = e.target.name
    let value = e.target.value
    if (name == 'acceptPolicy') {
      value = e.target.checked
    }
    if (name == 'password') {
      setIsAddNotePassword(true)
    }

    if (['password', 'password_confirmation'].includes(name)) {
      setErrorMessage((errorMessage) => ({
        ...errorMessage,
        password: '',
        password_confirmation: ''
      }))
    } else {
      setErrorMessage((errorMessage) => ({
        ...errorMessage,
        [name]: ''
      }))
    }

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const onPronounChange = (value: any) => {
    setErrorMessage((errorMessage) => ({
      ...errorMessage,
      pronoun: ''
    }))
    setFormData({
      ...formData,
      pronoun: value
    })
  }

  const checkDisable = () => {
    const {
      first_name,
      last_name,
      phone,
      pronoun,
      email,
      password,
      password_confirmation,
      acceptPolicy
    } = formData

    return (
      first_name.trim().length === 0 ||
      last_name.trim().length === 0 ||
      phone.trim().length === 0 ||
      pronoun.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      password_confirmation.trim().length === 0 ||
      !acceptPolicy
    )
  }

  interface IFormError {
    first_name?: string
    last_name?: string
    email?: string
    acceptPolicy?: string
    phone?: string
    pronoun?: string
    password_confirmation?: string
    password?: string
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let formErrors: IFormError = {}

    if (!formData.acceptPolicy) {
      formErrors.acceptPolicy = 'Vui lòng chấp nhận điều khoản'
    }

    // Validate first name
    if (formData.first_name.trim().length === 0) {
      formErrors.first_name = 'Vui lòng nhập họ tên'
    }

    // Validate last name
    if (formData.last_name.trim().length === 0) {
      formErrors.last_name = 'Vui lòng nhập Tên'
    }

    // Validate phone number
    if (formData.phone.trim().length === 0) {
      formErrors.phone = 'Vui lòng nhập số điện thoại'
    }

    // Validate email
    if (formData.email.trim().length === 0) {
      formErrors.email = 'Vui lòng nhập email'
    }
    if (formData.pronoun.trim().length === 0) {
      formErrors.pronoun = 'Vui lòng nhập danh xưng'
    }
    if (formData.password.trim().length === 0) {
      formErrors.password = 'Vui lòng nhập mật khẩu'
    }
    if (formData.password_confirmation.trim().length === 0) {
      formErrors.password_confirmation = 'Vui lòng xác nhận mật khẩu'
    }
    requestRegisterUser()
    setErrorMessage(formErrors as Record<string, string>)
    console.error(formErrors)
    try {
      const areAllErrorsEmpty = Object.values(formErrors).every((value) => value === '')
      if (!areAllErrorsEmpty) {
        return
      }
    } catch (error) {
      console.log('An unexpected error occurred:', error)
    }

    
    
  }


  // const requestValidateKeyword = async (data: { paragraph: string[] }): Promise<void> => {
  //   const checkValidKeywordResponse = await axios.post(
  //     `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/validate/keyword`,
  //     data
  //   )
  //   const response = checkValidKeywordResponse.data
  //   interface ErrorSensitiveMap {
  //     first_name?: string
  //     last_name?: string
  //     email?: string
  //   }
  //   let errorSensitive: ErrorSensitiveMap = {}
  //   response.data.forEach((data: { suggestedKeywords: any }, index: any) => {
  //     const suggestedKeywords = data.suggestedKeywords
  //     let key: keyof ErrorSensitiveMap | null = null
  //     if (suggestedKeywords.length > 0) {
  //       switch (index) {
  //         case 0:
  //           key = 'first_name'
  //           break
  //         case 1:
  //           key = 'last_name'
  //           break
  //         case 2:
  //           key = 'email'
  //           break
  //         default:
  //           key = null
  //       }

  //       if (key) {
  //         let sensitiveMessage = `Từ khóa thuộc danh mục kiểm soát.`
  //         if (suggestedKeywords[0].replace_keyword) {
  //           sensitiveMessage += `. Vui lòng thay thế, Gợi ý:  ${suggestedKeywords[0].replace_keyword}`
  //         }
  //         errorSensitive[key] = sensitiveMessage
  //       }
  //     }
  //   })
  //   if (Object.keys(errorSensitive).length > 0) {
  //     setErrorMessage({ ...errorMessage, ...errorSensitive })
  //     return Promise.reject(response)
  //   }
  //   return Promise.resolve(response)
  // }

  // const requestSendOtp = async () => {
  //   const data = {
  //     phone: formData.phone,
  //     email: formData.email,
  //     type: 'register'
  //   }
  //   const response = await axios.post(
  //     `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/otp/send`,
  //     data
  //   )
  //   if (response.status != 200) {
  //     return Promise.reject(response)
  //   }
  //   return Promise.resolve(response)
  // }

  // const createUser = async () => {
  //   try {
  //     setIsLoading(true)
  //     const userValidationResponse = await requestValidUser()
  //     const validateKeywordParams = {
  //       paragraph: [formData.first_name, formData.last_name, formData.email]
  //     }
  //     //const keywordValidationResponse = await requestValidateKeyword(validateKeywordParams)
  //     //const sendOtp = await requestSendOtp()
  //     setModalOpen(true)
  //     setIsLoading(false)
  //   } catch (error) {
  //     setIsLoading(false)
  //     return
  //   }
  // }

  // const processWithOtp = async () => {
  //   await requestRegisterUser()
  //   onNext()
  // }

  // const requestValidUser = async () => {
  //   const checkValidUserResponse = await axios.post(
  //     `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/auth/check_info`,
  //     formData
  //   )
  //   const response = checkValidUserResponse.data
  //   if (response.status != 200) {
  //     const errorResponse = response.error
  //     if (errorResponse.password) {
  //       setIsAddNotePassword(false)
  //     }
  //     setErrorMessage((prevState) => ({
  //       ...prevState,
  //       ...errorResponse
  //     }))
  //     return Promise.reject(response)
  //   }
  //   return Promise.resolve(response)
  // }

  const requestRegisterUser = async () => {
    const requestData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
      emailUser: formData.email,
      password: formData.password,
      password_confirmation: formData.password_confirmation,
      pronoun: formData.pronoun === "anh" ? 1 : 2
    }
    const response = await fetchAPI('user/register', {
      method: 'POST',
      body: JSON.stringify(requestData)
    })
    console.log(response)
    const errorResponse = response.data.phone
    console.log(errorResponse)
    if (response.status !== 200) {
      setIsOtpLoading(false);
      setErrorMessage(prevState => ({
        ...prevState,
        ...errorResponse
      }));
      console.error('Registration failed:', response);
      return Promise.reject(new Error('Registration failed'));
    }
    else{
      location.href = '/'
    }
   

    setIsOtpLoading(false)
    return Promise.resolve(response)
  }

  return (
    <>
      <LayoutSignup currentStep={currentStep}>
        <div className='flex flex-col items-center'>
          <div>
            <h1 className='text-3xl font-semibold text-[#FF6B00]'> Đăng kí cơ bản</h1>
          </div>
          <div>
            <p>
              Bạn đã có tài khoản vui lòng
              <Link href='/login' className='ml-2 font-semibold text-blue-400 underline'>
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className='md:w-[581px] md:mx-auto'>
          <div className='mt-6'>
            <div className='grid md:flex grid-cols-1 gap-3 md:grid-cols-3'>
              <div>
                <p className='label-form'>
                  {' '}
                  Tên <span className='text-red'>(*)</span>
                </p>
                <Input
                  type='text'
                  name='last_name'
                  placeholder='Vui lòng nhập tên'
                  onChange={handleChange}
                  className='mt-1 md:w-[150px]'
                />
                {errorMessage.last_name && (
                  <p className='text-error-message text-red '>{errorMessage.last_name}</p>
                )}
              </div>
              <div className='flex-grow'>
                <p className='label-form'>
                  {' '}
                  Họ & tên đệm <span className='text-red'>(*)</span>
                </p>
                <Input
                  type='text'
                  name='first_name'
                  placeholder='Vui lòng nhập Họ & tên đệm'
                  onChange={handleChange}
                  className='mt-1'
                />
                {errorMessage.first_name && (
                  <p className='text-error-message text-red '>{errorMessage.first_name}</p>
                )}
              </div>
              <div>
                <p className='label-form mb-1'>
                  {' '}
                  Danh xưng <span className='text-red'>(*)</span>
                </p>
                <Select name='pronoun' onValueChange={onPronounChange}>
                  <SelectTrigger className='rounded-[10px] h-[56px] md:w-[150px]'>
                    <SelectValue placeholder='Danh Xưng' />
                  </SelectTrigger>
                  <SelectContent sideOffset={-4} position='popper'>
                    <SelectItemNoChevron value='HE'>Anh</SelectItemNoChevron>
                    <SelectItemNoChevron value='SHE'>Chị</SelectItemNoChevron>
                  </SelectContent>
                </Select>
                {errorMessage.pronoun && (
                  <p className='text-error-message text-red '>{errorMessage.pronoun}</p>
                )}
              </div>
            </div>
            <div className='mt-3 grid grid-cols-1 md:grid-cols-1'>
              <div className=''>
                <p className='label-form'>
                  {' '}
                  Số điện thoại <span className='text-red'>(*)</span>
                </p>
                <Input
                  type='tel'
                  name='phone'
                  placeholder='Vui lòng nhập số điện thoại của bạn'
                  onChange={handleChange}
                  className='mt-1'
                />
                {errorMessage.phone && (
                  <p className='text-error-message text-red '>{errorMessage.phone}</p>
                )}
              </div>
            </div>
            <div className='mt-3 grid grid-cols-1 md:grid-cols-1'>
              <div className=''>
                <p className='label-form'>
                  {' '}
                  Email <span className='text-red'>(*)</span>
                </p>
                <Input
                  type='email'
                  name='email'
                  placeholder='Vui lòng nhập địa chỉ email'
                  onChange={handleChange}
                  className='mt-1'
                />
                {errorMessage.email && (
                  <p className='text-error-message text-red '>{errorMessage.email}</p>
                )}
              </div>
            </div>
            <div className='mt-3 grid grid-cols-1 gap-2 md:grid-cols-2'>
              <div className=''>
                <p className='label-form'>
                  {' '}
                  Mật khẩu <span className='text-red'>(*)</span>
                </p>
                <PasswordInput
                  placeholder='Vui lòng nhập mật khẩu'
                  name='password'
                  onChange={handleChange}
                  className='mt-1'
                />
                {errorMessage.password && (
                  <p className='text-error-message text-red '>{errorMessage.password}</p>
                )}
              </div>
              <div className='mt-3 md:mt-0 '>
                <p className='label-form'>
                  {' '}
                  Xác nhận mật khẩu <span className='text-red'>(*)</span>
                </p>
                <PasswordInput
                  placeholder='Vui lòng nhập lại mật khẩu'
                  name='password_confirmation'
                  onChange={handleChange}
                  className='mt-1'
                />
                {errorMessage.password_confirmation && (
                  <p className='text-error-message text-red '>
                    {errorMessage.password_confirmation}
                  </p>
                )}
              </div>
            </div>

            <div className='text-sm text-gray-400'>
              {isAddNotePassword ? (
                <p>
                  Mật khẩu phải có ít nhất
                  <span className='text-orange-500'> 6 ký tự </span>
                  <span>và chứa ít nhất </span>
                  <span className='text-orange-500'>một chữ in hoa, chữ số </span>
                  <span>và </span>
                  <span className='text-orange-500'>một ký tự đặc biệt.</span>
                </p>
              ) : null}
            </div>
            <label key='acceptPolicy' className='mt-3 flex items-center'>
              <CustomCheckbox
                name='acceptPolicy'
                labelHTML={`<span class="flex">Đồng ý với
                <a href='/#' class="text-blue-400">
                  Điều khoản sử dụng
                </a>
                và
                <a href='/#' class="text-blue-400">
                  Chính sách quyền riêng tư
                </a>
                của chúng tôi</span>`}
                checked={formData.acceptPolicy}
                handleOnChange={handleChange}
              />
            </label>
            {errorMessage.acceptPolicy && (
              <p className='text-error-message text-red '>{errorMessage.acceptPolicy}</p>
            )}
            <div className='mt-6 grid grid-cols-1 md:grid-cols-1'>
              <div className='flex items-center justify-center'>
                <Button
                  type='submit'
                  className={`rounded-[50px] border-0 px-11 py-7 text-xl font-black ${disableSubmitForm ? 'bg-gray-200' : 'bg-orange-500'}`}
                  disabled={disableSubmitForm || isLoading}
                >
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <>
                      <span>Tiếp theo </span>
                      <span className='ml-3'>
                        {' '}
                        <Image
                          className='inline-block'
                          alt=''
                          src='/assets/icon_next_button.svg'
                          width={30}
                          height={30}
                        />{' '}
                      </span>
                    </>
                  )}
                </Button>
                {isLoading && <div className='overlay'></div>}
              </div>
            </div>
          </div>
        </form>

        {/* <OtpPopup
          open={isModalOpen}
          phone={formData.phone}
          email={formData.email}
          type='register'
          onNext={processWithOtp}
        /> */}
      </LayoutSignup>
    </>
  )
}
export default SignupFeatureStep1
