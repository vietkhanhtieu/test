'use client'

import CustomCheckbox from '@/components/ui/custom_checkbox/custom_checkbox'
import { Input } from '@/components/ui/input'
import Spinner from '@/components/ui/spinner'
import axios from '@/lib/axios'
import { USER_TOKEN_NAME } from '@/lib/constants'
import { setCurrentUser } from '@/lib/redux/slices/current_user'
import { setLoadingFetch, setUserCart } from '@/lib/redux/slices/user_cart'
import { cn } from '@/lib/utils'
import { EyeBlackIcon, EyeBlackOpenIcon, EyeIcon, EyeOpenOrange } from '@/public/icons'
import { setCookie } from 'cookies-next'
import Image from 'next/image'
import Link from 'next/link'
import { ChangeEvent, FormEvent, KeyboardEventHandler, MouseEventHandler } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAPI } from '../../../apiconfi.js';

export default function LoginPage() {
  const dispatch = useDispatch()
  const [isValidPhone, setIsValidPhone] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [isLockAccount, setIsLockAccount] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [canSubmitForm, setCanSubmitForm] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [userId, setUserId] = useState('')

  const checkPhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const isValid = value.length === 10 && value.startsWith('0')
    setIsValidPhone(isValid)
    setIsLogin(true)
    setCanSubmitForm(isValid && isPassword)
    setIsLockAccount(false)
  }

  const handleTogglePasswordVisibility: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      document.getElementById('loginButton')?.click()
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')

    try {
      setIsLoading(true)
      const response = await fetchAPI('user/login', {
        method: 'POST',
        body: JSON.stringify({ "phone": username, "password": password })
      })
      if (response.status === 200) {
        const data = response.data
        console.log(data)
        //setUserId(data.userid)

        // TODO: handle token change
        //setCookie(USER_TOKEN_NAME, "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3N0YWdpbmcudHJ1bmd0YW1kdW9jcGhhbS5jb20iLCJpYXQiOjE3MTQzNzM4MzYsIm5iZiI6MTcxNDM3MzgzNiwiZXhwIjoxNzE0OTc4NjM2LCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxOTI4In19fQ.q_yYi2SkWvWq7NqUO9jAuP2AtwEXAc_X9PukD24kq0w")
        dispatch(setCurrentUser({ user: data, isSignedIn: true, userid: data.userid }))

        //TODO fetch cart
        // Promise.all([fetchProfileData(data.userid), fetchCartData()]).then(() => {
        //   //force a full page load to clear cache
        //   location.href = '/'
        // })
        Promise.all([fetchProfileData(data.userid)]).then(() => {
          //force a full page load to clear cache
          location.href = '/'
        })
      } else {
        setIsLogin(false)
        setIsLockAccount(false)
        setIsLoading(false)
      }
    } catch (error: any) {
      setIsLogin(false)
      setIsLoading(false)
      setCanSubmitForm(false)

      if (error.response?.data?.status == 403) {
        setIsLockAccount(true)
      }
    }
  }

  const fetchProfileData = async (userId: string ) => {
    const response = await fetchAPI(`user/${userId}`)
    dispatch(setCurrentUser({ user: response.data, isSignedIn: true }))
  }

  // const fetchCartData = async () => {
  //   dispatch(setLoadingFetch(true))
  //   try {
  //     const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/cart/get`)
  //     if (response.data.message === 'Successfully') {
  //       dispatch(setUserCart(response.data.data))
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  //   dispatch(setLoadingFetch(false))
  // }

  const handleToggleRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setRememberMe(target.checked)
  }

  return (
    <div className='mx-auto mt-[50px] max-w-[780px] rounded-lg bg-background px-5'>
      <div className='mx-auto max-w-[581px] py-[58px]'>
        <div className='text-center'>
          <h1 className='my-2 text-[40px] font-bold text-abbey'> Đăng nhập 1</h1>
          <h3 className='text-16 text-abbey'>
            Bạn chưa có tài khoản?{' '}
            <Link href='/signup' passHref legacyBehavior>
              <a className='underline text-dodger-blue font-medium'>Đăng ký</a>
            </Link>
          </h3>
        </div>
        <div className=''>
          <form onSubmit={handleSubmit}>
            <div className='my-5'>
              <label className='my-2 block text-16 font-bold text-abbey'>Số điện thoại</label>
              <div className='relative flex w-full items-center'>
                <Image
                  alt=''
                  src='/icons/user.svg'
                  width={24}
                  height={24}
                  className='absolute left-3 top-1/2 -translate-y-1/2 transform !h-6'
                />
                <Input
                  className={`h-14 rounded-[12px] caret-primary !text-16 text-abbey px-12 ${isLockAccount ? 'border-regent-st-blue bg-zumthor' : isLogin ? 'border-alto' : 'border-primary'} focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-40`}
                  type='text'
                  name='username'
                  required
                  maxLength={10}
                  pattern='0[0-9]{9}'
                  placeholder='Số điện thoại'
                  onChange={checkPhoneNumber}
                  onKeyDown={(e) => {
                    if (
                      (e.ctrlKey || e.metaKey) &&
                      (e.key === 'a' || e.key === 'c' || e.key === 'v')
                    ) {
                      return
                    }
                    if (e.key === 'Tab') {
                      return
                    }
                    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace') {
                      e.preventDefault()
                    }
                  }}
                />
                {isValidPhone && (
                  <Image
                    alt=''
                    src='/icons/yes.svg'
                    width={24}
                    height={24}
                    className='absolute right-3 top-1/2 -translate-y-1/2 transform'
                  />
                )}
              </div>
            </div>
            <div className='mt-5'>
              <label className='my-2 block text-16 font-bold text-abbey'>Mật khẩu</label>
              <div className='relative flex w-full items-center'>
                <Image
                  alt=''
                  src='/icons/password.svg'
                  width={24}
                  height={24}
                  className='absolute left-3 top-1/2 -translate-y-1/2 transform'
                />
                <Input
                  className={`h-14 rounded-[12px] caret-primary !text-16 ${isPassword ? 'text-abbey' : 'text-gray-40'} border px-12 ${isLockAccount ? 'border-regent-st-blue bg-zumthor' : isLogin ? 'border-alto' : 'border-primary'} focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-40`}
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder='Mật khẩu của tôi'
                  name='password'
                  required
                  onKeyDown={handleKeyDown}
                  onChange={(event) => {
                    setIsPassword(event.target.value.length > 0)
                    setIsLogin(true)
                    setCanSubmitForm(isValidPhone && event.target.value.length > 0)
                    setIsLockAccount(false)
                  }}
                />
                <button
                  type='button'
                  onClick={handleTogglePasswordVisibility}
                  className='absolute right-3 top-1/2 -translate-y-1/2 transform focus:outline-none'
                >
                  <Image
                    alt='eye-icons'
                    src={
                      isPassword
                        ? isPasswordVisible
                          ? EyeOpenOrange
                          : EyeIcon
                        : isPasswordVisible
                          ? EyeBlackOpenIcon
                          : EyeBlackIcon
                    }
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </div>
            <div>
              {!isLogin && !isLockAccount && (
                <span className='text-14 text-primary'>
                  Số điện thoại hoặc mật khẩu không chính xác, vui lòng thử lại.
                </span>
              )}
              {isLockAccount && (
                <>
                  <p className='mx-auto mt-2 text-center text-14 text-red'>
                    Tài khoản của bạn đang tạm ngưng hoạt động.
                  </p>
                  <p className='text-center text-14 text-red'>
                    Gọi ngay <span className='font-semibold'>Hotline 028 7779 6768</span> hoặc liên
                    hệ trực tiếp với CSKH để được hỗ trợ{' '}
                  </p>
                </>
              )}
            </div>

            <div className='my-[30px] flex justify-between'>
              <label className='flex items-center'>
                <CustomCheckbox
                  label='Ghi nhớ đăng nhập của tôi'
                  labelClassName='text-abbey'
                  checked={rememberMe}
                  handleOnChange={handleToggleRememberMe}
                />
              </label>
              <a className='text-sm text-dodger-blue hover:underline' href='/reset-password'>
                Quên mật khẩu?
              </a>
            </div>

            <div className='my-2 text-center'>
              <button
                id='loginButton'
                className={cn(
                  'w-[289px] px-16 py-[18px] rounded-full text-2xl leading-7 text-white focus-visible:ring-0 focus-visible:ring-offset-0 font-bold',
                  `${canSubmitForm ? 'bg-primary' : 'bg-gray-10'}`
                )}
                type='submit'
                disabled={!canSubmitForm}
              >
                {isLoading ? <Spinner /> : 'Đăng nhập'}
              </button>
              {isLoading && <div className='overlay'></div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
