import Modal from '@/components/common/Modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Spinner from '@/components/ui/spinner'
import axios from 'axios'
import Image from 'next/image'
import { ChangeEvent, KeyboardEventHandler, MouseEventHandler, useState } from 'react'

// TODO: phone and email types needs to check again, hot fix any[] to build successfully
interface IUpdatePasswordProps {
  open: boolean
  phone: string // Optional phone number
  setIsUpdatePasswordModalOpen: (arg: boolean) => void
}

export const UpdatePasswordModal: React.FC<IUpdatePasswordProps> = ({
  open,
  setIsUpdatePasswordModalOpen,
  phone
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [showSuccessScreen, setShowSuccessScreen] = useState<boolean>(false)

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    // TODO
  }
  const handleTogglePasswordVisibility: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleTogglePasswordConfirmationVisibility: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault()
    setIsPasswordConfirmationVisible(!isPasswordConfirmationVisible)
  }

  const handleSubmit = async () => {
    setLoading(true)
    const dataParams = {
      username: phone,
      password: password,
      password_confirmation: passwordConfirmation
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/v1/change_password`,
      dataParams
    )
    if (response.data.message === 'Successfully') {
      setShowSuccessScreen(true)
    } else {
      const errorMsg = response.data.error
        ? (Object.values(response.data.error)[0] as string)
        : response.data.message
      setErrorMessage(errorMsg)
    }

    setLoading(false)
  }

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setPassword(target.value)
    setErrorMessage('')
  }

  const handleChangePasswordConfirmation = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setPasswordConfirmation(target.value)
    setErrorMessage('')
  }

  const handleOnClose = () => {
    setErrorMessage('')
    setIsPasswordVisible(false)
    setIsPasswordConfirmationVisible(false)
    setPassword('')
    setPasswordConfirmation('')
    setShowSuccessScreen(false)
    setIsUpdatePasswordModalOpen(false)
  }

  return (
    <Modal
      isOpen={open}
      onClose={handleOnClose}
      containerClass='rounded-lg !px-0 max-w-[562px] min-h-[349px] pt-0 pb-0'
    >
      <div className='flex min-w-[345px] flex-col items-center md:w-[562px] text-abbey'>
        <div className='w-full h-[42px] flex justify-end px-[15px]'>
          <Image
            alt='crossIcon'
            src={'/icons/cross.svg'}
            width={12}
            height={12}
            className='cursor-pointer'
            onClick={handleOnClose}
          />
        </div>
        {showSuccessScreen ? (
          <div className='text-center'>
            <Image
              className='mx-auto'
              alt='Success Icon'
              src='/assets/icon-success.svg'
              width={52}
              height={52}
            />

            <p className='mt-4 text-xl font-semibold'>
              Chúc mừng bạn đã thay đổi mật khẩu thành công.
            </p>

            <Image
              className='mx-auto mt-4'
              alt='Change Password Image'
              src='/change_password_popup_img.svg'
              width={175}
              height={175}
            />

            <Button
              className='btn-primary w-[255px] rounded-3xl mt-4 mb-4 disabled:bg-gray-10'
              onClick={handleOnClose}
            >
              Đóng
            </Button>
          </div>
        ) : (
          <div className='px-[30px] w-full flex flex-col items-center'>
            <div className='mb-[30px] text-24 font-semibold'>Thay đổi mật khẩu</div>
            <div className='mt-1 w-full'>
              <label className='mb-[11px] block text-16 font-medium'>Mật khẩu</label>
              <div className='relative flex w-full items-center'>
                <Image
                  alt=''
                  src='/icons/password.svg'
                  width={22}
                  height={20}
                  className='absolute left-3 top-7 -translate-y-1/2 transform'
                />
                <div className='w-full'>
                  <Input
                    className={`h-14 rounded-lg px-12 ${errorMessage ? 'border-red' : 'border-alto'} focus-visible:ring-0 focus-visible:ring-offset-0`}
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder='Mật khẩu mới'
                    name='password'
                    required
                    onKeyDown={handleKeyDown}
                    onChange={handleChangePassword}
                  />
                  {isPasswordVisible && (
                    <p className='text-12 text-gray-40 mt-1.5 mb-[11px]'>
                      Mật khẩu phải có ít nhất
                      <span className='text-primary'> 6 ký tự </span>
                      <span>và chứa ít nhất </span>
                      <span className='text-primary'>một chữ in hoa, chữ số </span>
                      <span>và </span>
                      <span className='text-primary'>một ký tự đặc biệt.</span>
                    </p>
                  )}
                </div>
                <button
                  type='button'
                  onClick={handleTogglePasswordVisibility}
                  className='absolute right-3 top-7 -translate-y-1/2 transform focus:outline-none'
                >
                  <Image
                    alt=''
                    src={isPasswordVisible ? '/icons/eye-open.svg' : '/icons/eye.svg'}
                    width={22}
                    height={20}
                  />
                </button>
              </div>

              <div
                className={`relative flex w-full items-center ${isPasswordVisible ? 'mt-0' : 'mt-[11px]'} `}
              >
                <Image
                  alt=''
                  src='/icons/password.svg'
                  width={22}
                  height={20}
                  className='absolute left-3 top-7 -translate-y-1/2 transform'
                />
                <div className='w-full'>
                  <Input
                    className={`h-14 rounded-lg px-12 ${errorMessage ? 'border-red' : 'border-alto'} focus-visible:ring-0 focus-visible:ring-offset-0`}
                    type={isPasswordConfirmationVisible ? 'text' : 'password'}
                    placeholder='Mật khẩu xác nhận'
                    name='password_confirmation'
                    required
                    onKeyDown={handleKeyDown}
                    onChange={handleChangePasswordConfirmation}
                  />
                  {isPasswordConfirmationVisible && !errorMessage && (
                    <p className='text-12 text-gray-40 mt-1.5'>
                      Mật khẩu phải có ít nhất
                      <span className='text-primary'> 6 ký tự </span>
                      <span>và chứa ít nhất </span>
                      <span className='text-primary'>một chữ in hoa, chữ số </span>
                      <span>và </span>
                      <span className='text-primary'>một ký tự đặc biệt.</span>
                    </p>
                  )}
                  {errorMessage && <p className='text-12 text-red ms-1'>{errorMessage}</p>}
                </div>
                <button
                  type='button'
                  onClick={handleTogglePasswordConfirmationVisibility}
                  className='absolute right-3 top-7 -translate-y-1/2 transform focus:outline-none'
                >
                  <Image
                    alt=''
                    src={isPasswordConfirmationVisible ? '/icons/eye-open.svg' : '/icons/eye.svg'}
                    width={22}
                    height={20}
                  />
                </button>
              </div>
            </div>
            <Button
              disabled={
                !password.length ||
                !passwordConfirmation.length ||
                password.length !== passwordConfirmation.length ||
                loading
              }
              className={`btn-primary w-[255px] h-9 py-0 text-normal text-white rounded-[50px] my-[30px] disabled:bg-gray-10`}
              onClick={() => handleSubmit()}
            >
              {loading ? <Spinner size='md' /> : 'Lưu'}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  )
}
