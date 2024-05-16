import { InputRadio } from '@/app/ui/daisy/input-radio'
import axios from 'axios'
import { useEffect, useState } from 'react'

interface IPayMethod {
  hasThuoc: boolean
  setOrderPaymentMethod: (arg: string) => void
}

export const PayMethod: React.FC<IPayMethod> = ({ hasThuoc, setOrderPaymentMethod }) => {
  const [payMethod, setPayMethod] = useState<string>('cod')
  const [receivePayMethod, setReceivePayMethod] = useState('qr-code')
  const [disableOnline, setDisableOnline] = useState<boolean>(true)

  const [statusOcs, setStatusOcs] = useState<number>(0)
  const [isExpired, setIsExpired] = useState<boolean>(false)

  useEffect(() => {
    checkApprovedRequest()
  }, [])

  const checkApprovedRequest = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/v1/check_approved`
    )
    if (response.data.message === 'Successfully') {
      const data = response.data.data
      setStatusOcs(data.status_ocs)
      setIsExpired(data.expired_gpp)
    }
  }
  const handleChangePaymentMethod = (e: {
    target: { name: any; value: any; getAttribute: any }
  }) => {
    const value = e.target.value
    const name = e.target.name
    if (name == 'payment-method') {
      setPayMethod(value)
    } else if (name == 'receive-payment-method') {
      setReceivePayMethod(value)
    }
  }

  useEffect(() => {
    setOrderPaymentMethod(payMethod)
  }, [payMethod])

  useEffect(() => {
    switch (statusOcs) {
      case 1:
        if (!hasThuoc) {
          setDisableOnline(false)
        }
        break
      case 4:
        if (!hasThuoc) {
          setDisableOnline(false)
        }
        break
      case 2:
        if (hasThuoc) {
          setDisableOnline(true)
        }
        break
      case 5:
        if (hasThuoc) {
          setDisableOnline(true)
        }
        break
      case 3:
        if (!hasThuoc) {
          setDisableOnline(false)
        } else {
          if (!isExpired) {
            setDisableOnline(false)
          }
        }
        break
      default:
        break
    }
  }, [hasThuoc, statusOcs, isExpired])

  return (
    <div className='w-full px-[30px] py-5 flex flex-col gap-2.5 rounded-[10px] bg-white'>
      <div className='flex items-start md:gap-10 gap-2 xs:flex-row flex-col'>
        <span className='text-20 font-medium'>
          Phương thức thanh toán (<span className='text text-red-solid'>*</span>)
        </span>
        <div className='flex items-start'>
          <InputRadio
            className='!w-[16px] !h-[16px] mt-[5px] gap-0'
            type='radio'
            name='payment-method'
            checked={payMethod == 'cod'}
            value='cod'
            onChange={handleChangePaymentMethod}
          />
          <div className='flex flex-col pt-[3px]'>
            <span className='text-14'>Thanh toán khi nhận hàng</span>
            <span className='text-10 text-gray-40'>(Mặc định)</span>
          </div>
        </div>
        <div className='flex items-start gap-0'>
          <InputRadio
            className='!w-[16px] !h-[16px] mt-[5px]'
            type='radio'
            name='payment-method'
            checked={payMethod == 'neox_payment'}
            value='neox_payment'
            onChange={handleChangePaymentMethod}
            disabled={disableOnline}
          />
          <span className='text-14 pt-[3px]'>Thanh toán trực tuyến (Thanh toán ngay)</span>
        </div>
      </div>
      {payMethod == 'neox_payment' && (
        <div className='flex flex-col gap-[15px]'>
          <div className='flex flex-col gap-2.5'>
            <div className='flex items-start'>
              <div className='flex gap-2.5'>
                <div className='flex'>
                  <InputRadio
                    className='!w-[16px] !h-4 mt-1'
                    type='radio'
                    name='receive-payment-method'
                    checked={receivePayMethod == 'qr-code'}
                    value='qr-code'
                    onChange={handleChangePaymentMethod}
                  />
                  <span className='text-14'>Chuyển khoảng ngân hàng (QR code)</span>
                </div>
                <div className='mt-1 bg-gradient-to-r from-vermilion to-primary min-w-[79px] h-[19px] ziczack-border'>
                  <div className='flex items-center justify-center h-full'>
                    <div className='text-white text-12 font-medium'>Giảm 10%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
