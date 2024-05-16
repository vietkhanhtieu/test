import Modal from '@/components/common/Modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Spinner from '@/components/ui/spinner'
import axios from 'axios'
import Image from 'next/image'
import { ChangeEvent, KeyboardEvent, createRef, useEffect, useState } from 'react'

// TODO: phone and email types needs to check again, hot fix any[] to build successfully
interface OtpPopupProps {
  open: boolean
  phone: string // Optional phone number
  email: string // Optional email address
  type: string // Optional type of OTP (can be customized)
  onNext: () => void
}

export const OtpPopup: React.FC<OtpPopupProps> = ({ open, phone, email, type, onNext }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({
    otpMessage: ''
  })
  const [countdown, setCountdown] = useState(59)
  const [showResendButton, setShowResendButton] = useState(false)
  const inputRefs = Array.from({ length: 6 }, (_, i) => createRef<HTMLInputElement>())

  const [isOtpLoading, setIsOtpLoading] = useState(false)
  const [disableSubmitOtpForm, setDisableSubmitOtpForm] = useState(true)
  useEffect(() => {
    setModalOpen(open)
  }, [open])

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

  const handleResendClick = () => {
    setErrorMessage((errorMessage) => ({
      ...errorMessage,
      otpMessage: ''
    }))
    const sendOtp = requestSendOtp()
    setCountdown(59)
    setShowResendButton(false)
  }

  const handleChangeOtp = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage((errorMessage) => ({
      ...errorMessage,
      otpMessage: ''
    }))
    if (index < 5 && e.target.value.length > 0 && inputRefs[index + 1].current) {
      inputRefs[index + 1].current?.focus()
    }
    const valueOtp = inputRefs.map((ref) => ref.current?.value).join('')
    if (valueOtp.length === 6) {
      setDisableSubmitOtpForm(false)
    } else {
      setDisableSubmitOtpForm(true)
    }
  }

  const handleInputRemoveChangeOtp = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const value = target.value
    const key = e.key
    if (index > 0 && key === 'Backspace' && value === '') {
      e.preventDefault()
      const prevInput = inputRefs[index - 1].current
      prevInput?.focus()
      prevInput?.select()
    }
  }

  const handleSubmitOtp = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const value = inputRefs.map((ref) => ref.current?.value).join('')
    const validateOtp = await requestValidateOtp(value)

    onNext()
  }

  const requestSendOtp = async () => {
    const data = {
      phone: phone,
      email: email,
      type: type
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/otp/send`,
      data
    )
    if (response.status != 200) {
      return Promise.reject(response)
    }
    return Promise.resolve(response)
  }

  const requestValidateOtp = async (code: any) => {
    setIsOtpLoading(true)

    const data = {
      phone: phone,
      email: email,
      type: type,
      code: code
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/otp/validate`,
      data
    )
    if (response.data.status != 200) {
      setErrorMessage((errorMessage) => ({
        ...errorMessage,
        otpMessage: 'Sai mã xác minh. Vui lòng thử  lại!'
      }))
      setIsOtpLoading(false)

      let els = document.getElementsByClassName('otp-input')
      Array.prototype.forEach.call(els, (el) => {
        el.value = ''
      })

      return Promise.reject(response)
    }
    setIsOtpLoading(false)
    return Promise.resolve(response)
  }

  function maskString(string: string, numberCharacters: number) {
    if (string.length - numberCharacters * 2 < 0) {
      return string
    }
    const start = string.slice(0, numberCharacters)
    const end = string.slice(-numberCharacters)
    const maskedLength = string.length - numberCharacters * 2
    const maskedSection = '*'.repeat(maskedLength)
    return `${start}${maskedSection}${end}`
  }
  function maskEmail(email: string) {
    try {
      const [localPart, domain] = email.split('@')
      const firstFour = localPart.substring(0, 4)
      const [mainDomain, dotDomain] = domain.split('.')
      const numAsterisks = email.length - firstFour.length - dotDomain.length - 1
      const asterisks = '*'.repeat(numAsterisks)
      return `${firstFour}${asterisks}.${dotDomain}`
    } catch {
      return email
    }
  }
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setModalOpen(false)}
      containerClass='!rounded-2xl w-[542px] px-[37px] py-[46px]'
    >
      <div className='absolute right-3.5 top-3.5'>
        <Image
          alt='crossIcon'
          src={'/icons/cross.svg'}
          width={12}
          height={12}
          className='cursor-pointer'
          onClick={() => setModalOpen(false)}
        />
      </div>
      <form onSubmit={handleSubmitOtp} className='flex flex-col items-center'>
        <div>
          <Image alt='' src='/assets/icon_modal_otp.svg' width={54} height={54} />
        </div>
        <div className='mt-[17px]'>
          <p className='text-[24px] font-semibold text-primary leading-[28px]'>
            {' '}
            Vui lòng nhập mã xác minh
          </p>
        </div>
        <div className='mt-[10px]'>
          <p className='text-[16px] leading-[19px] text-center'>
            Truy cập Zalo hoặc Email để nhận mã xác minh
            {phone && email && (
              <div>
                {maskString(phone, 2)} - {maskEmail(email)}{' '}
              </div>
            )}
          </p>
        </div>

        <div className='mt-[26px] grid grid-cols-6 gap-5 md:grid-cols-6'>
          {inputRefs.map((ref, index) => (
            <Input
              type='text'
              className='otp-input h-[58px] w-[45px] caret-primary text-[34px] rounded-xl font-semibold focus:border-primary focus-visible:ring-0 py-3 text-center'
              onChange={(e) => handleChangeOtp(index, e)}
              onKeyDown={(e) => handleInputRemoveChangeOtp(index, e)}
              key={index}
              ref={ref}
              maxLength={1}
            />
          ))}
        </div>

        <div className='mt-[26px]'>
          {showResendButton ? (
            <button onClick={handleResendClick} className='text-[14px]'>
              Gửi lại OTP
            </button>
          ) : (
            <div className='text-[12px] leading-[14px]'>
              Nếu chưa nhận được mã xác nhận, vui lòng chờ{' '}
              <span className='text-[12px] text-dodger-blue'>{countdown}s</span>
            </div>
          )}
        </div>
        {errorMessage.otpMessage && (
          <p className='text-error-message text-[#FF0000] text-[14px] '>
            {errorMessage.otpMessage}
          </p>
        )}

        <div
          className={`${!!errorMessage.otpMessage ? 'mt-[20px]' : 'mt-[34px]'} grid w-[180px] grid-cols-1 md:grid-cols-1`}
        >
          <div className='flex w-full items-center justify-center'>
            <Button
              type='submit'
              className={` w-full rounded-[50px] h-9 text-[14px] font-black ${disableSubmitOtpForm ? 'bg-gray-10' : 'bg-primary'}`}
              disabled={disableSubmitOtpForm || isOtpLoading}
            >
              {isOtpLoading ? (
                <Spinner />
              ) : (
                <>
                  <span className='font-bold'>Xác minh</span>
                </>
              )}
            </Button>
            {isOtpLoading && <div className='overlay'></div>}
          </div>
        </div>
      </form>
    </Modal>
  )
}
