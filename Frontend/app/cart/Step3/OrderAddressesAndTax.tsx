'use client'

import { Button } from '@/components/ui/button'
import Spinner from '@/components/ui/spinner'
import { formatAddress } from '@/lib/utils'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import Link from 'next/link'

interface OrderAddressesAndTaxProps {
  currentStep: number
  loading: boolean
  order: any
}
export const OrderAddressesAndTax: React.FC<OrderAddressesAndTaxProps> = ({
  currentStep,
  loading,
  order
}) => {
  const orderAddress = order.info_order
  const deliveryAddress = order.delivery_address
  const taxAddress = order.tax_address

  const AddressElement = (addressType: string, addressInfo: Record<string, any>) => {
    return (
      <div>
        <h5 className='text-primary font-bold text-14 leading-4 mb-1.5'>{addressType}</h5>
        <p className='text-14 leading-4'>
          <span className='font-medium'>{addressInfo.name}</span>
          <span className='mx-3'>|</span>
          <span>{addressInfo.phone}</span>
        </p>
        <p className='text-14 leading-4 mt-[5px]'>
          {formatAddress(
            [
              addressInfo.address,
              addressInfo.ward?.name,
              addressInfo.district?.name,
              addressInfo.province?.name
            ],
            ', '
          )}
        </p>
      </div>
    )
  }

  return (
    <div className='bg-white rounded-[10px] min-w-[200px] xl:min-w-[280px] font-normal py-5 px-[18px] md:mt-[68px]'>
      {!loading && currentStep === 3 && !isEmpty(order) ? (
        <div className='order-info-content'>
          <div className='order-info-header pb-2.5 font-semibold text-20 leading-6 border-b border-silver-sand'>
            Thông tin đơn hàng
          </div>
          <div className='mt-[15px]'>
            <div className='info'>
              <div className='mb-6'>{AddressElement('Thông tin đặt hàng', orderAddress)}</div>
              <div className='mb-6'>{AddressElement('Thông tin nhận hàng', deliveryAddress)}</div>
              <div className='mb-6'>
                <h5 className='text-primary font-bold text-14 leading-4 mb-1.5'>
                  Thông tin xuất hóa đơn
                </h5>
                <p className='text-14 leading-4'>
                  <span className='font-medium'>Công ty {taxAddress.company}</span>
                </p>
                <p className='text-14 leading-4 mt-[5px]'> Mã số thuế: {taxAddress.tax_code} </p>
                <p className='text-14 leading-4 mt-[5px]'> Email: {taxAddress.email} </p>
                <p className='text-14 leading-4 mt-[5px]'>
                  {formatAddress(
                    [
                      taxAddress.address,
                      taxAddress.ward?.name,
                      taxAddress.district?.name,
                      taxAddress.province?.name
                    ],
                    ', '
                  )}
                </p>
              </div>
              <div className='flex w-full bg-super-silver rounded-[5px] py-2 px-2.5'>
                <div className='pr-2.5 min-w-[34px] flex items-center'>
                  <Image
                    className='inline-block'
                    alt='issue-an-invoice-noti'
                    src={'/icons/attention-ico.svg'}
                    width={24}
                    height={24}
                  />
                </div>
                <div className='notify text-12 leading-[14px]'>
                  Hóa đơn sẽ được phát hành sau khi nhận hàng, vui lòng kiểm tra email để nhận hóa
                  đơn.
                </div>
              </div>
            </div>
            <div className='text-center mt-[26px]'>
              <Link href={'/'}>
                <Button
                  className='bg-white h-9 w-full border border-dusty-gray rounded-md text-14 font-medium leading-[19px] px-4'
                  onClick={() => {}}
                >
                  Tiếp tục đặt hàng
                </Button>
              </Link>
              <Link href={'#'}>
                <Button
                  className='mt-2.5 bg-primary h-9 w-full rounded-md text-14 text-white font-medium leading-[19px] px-4'
                  onClick={() => {}}
                >
                  Xem trạng thái đơn hàng
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center'>
          <Spinner />
        </div>
      )}
    </div>
  )
}
