import Spinner from '@/components/ui/spinner'
import { formatVND } from '@/lib/utils'
import { groupBy, isEmpty } from 'lodash'
import moment from 'moment'
import Image from 'next/image'

import { GroupProductDetails } from './GroupProductDetails'

interface IStep3Props {
  order: any
  pricingAndDiscountData: any
}

export const Step3: React.FC<IStep3Props> = ({ order, pricingAndDiscountData }) => {
  const groupedItems: any = isEmpty(order.product) ? [] : groupBy(order.product, 'supplier.id')

  const buildDiscounts = () => {
    const discountsItems = [
      {
        name: 'Giảm giá phí vận chuyển:',
        value: pricingAndDiscountData.shipping_discount
      },
      {
        name: 'Giảm giá khuyến mãi:',
        value: pricingAndDiscountData.campaign_discount
      },
      {
        name: 'Mã giảm giá:',
        value: pricingAndDiscountData.voucher_discount
      },
      {
        name: 'Chiết khấu thanh toán:',
        value: pricingAndDiscountData.total_discount
      }
    ]

    return discountsItems
  }

  const discounts = isEmpty(pricingAndDiscountData) ? [] : buildDiscounts()

  const getDiscountPriceAsVND = (value: number) => {
    return `${value > 0 ? '-' : ''} ${formatVND(value)}`
  }

  const lineBreakElement = () => {
    return <div className='h-[1px] bg-mourn-mountain-snow my-5'></div>
  }

  const discountInfoLineItem = (discountType: string, value: number) => {
    return (
      <div className='flex justify-between items-center text-14 leading-4 mb-2.5'>
        <p>{discountType}</p>
        <p className='text-blue-sparkle'>{getDiscountPriceAsVND(value)}</p>
      </div>
    )
  }

  return (
    <div className='bg-white rounded-[10px] font-normal py-[25px] px-[30px] p-2.5 mt-5 mr-0 md:mr-5'>
      {isEmpty(order) || isEmpty(pricingAndDiscountData) ? (
        <div className='flex justify-center items-center'>
          <Spinner />
        </div>
      ) : (
        <div className='order-details'>
          <div className='order-id leading-[19px]'>
            <span> Chi tiết đơn hàng - </span>
            <span className='font-medium'> {order.id} </span>
          </div>
          <div>
            {Object.keys(groupedItems).map((groupId: string, index: number) => {
              const purchasedProducts = groupedItems[groupId]
              const groupName = purchasedProducts[0].supplier.name
              return (
                <div key={index}>
                  <div className='h-[1px] bg-alto my-4'></div>
                  <GroupProductDetails
                    groupName={groupName}
                    key={index}
                    groupedItems={purchasedProducts}
                  />
                </div>
              )
            })}
          </div>
          <div className='order-note mt-5'>
            {order.note && (
              <div>
                <p className='font-medium text-14 leading-4 mb-2.5'>Ghi chú:</p>
                <div className='rounded-[5px] bg-athens-gray text-14 leading-4 py-[18px] px-[23px] mb-2.5'>
                  {order.note}
                </div>
              </div>
            )}
            {order.receiving_time && (
              <div className='flex justify-between text-14 leading-4 mb-2.5'>
                <p>Thời gian nhận hàng mong muốn:</p>
                <p className='font-medium text-right'>
                  {moment(order.receiving_time).format('DD/MM/YYYY')}
                </p>
              </div>
            )}
            <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center mb-2.5'>
              <div className='text-14 leading-4'>
                <span className='mr-2.5'>Hình thức vận chuyển:</span>
                <span className='text-primary'>{order.form_of_transportation}</span>
              </div>
              <div className='mt-2.5 lg:mt-0'>
                <span className='mr-[15px]'>
                  <Image
                    className='inline-block'
                    alt='truck-icon'
                    src='/icons/claim-c.svg'
                    width={27}
                    height={18}
                  />
                </span>
                <span className='mr-2.5 text-14 leading-4'>
                  Dịch vụ được cung cấp bởi:
                  <span className='font-bold ml-1'>GONSA</span>
                </span>
                <span>
                  <Image
                    className='inline-block rounded-[6px] border-[1px] border-primary'
                    alt='gonsa-icon'
                    src='/icons/gonsa-logo.svg'
                    width={24}
                    height={24}
                  />
                </span>
              </div>
            </div>
            <div className='hidden md:flex justify-between mb-2.5'>
              <div className='w-4/12'>
                <div className='text-14 leading-4 mb-2.5'>
                  <p>Phương thức thanh toán:</p>
                </div>
                <div className='text-14 leading-4'>
                  <p>Voucher được áp dụng:</p>
                </div>
              </div>
              <div className='w-8/12'>
                <div className='flex w-full justify-end items-baseline text-right'>
                  <div className='text-14 leading-4'>
                    <p className='mb-2.5'>{pricingAndDiscountData.payment_method}</p>
                    <p className='mb-1.5'> Voucher nhà bán </p>
                    <p> Voucher TTDP </p>
                  </div>
                  <div className='text-primary text-14 leading-4'>
                    <p className='ml-[50px] mb-2.5'> COD </p>
                    <p className='mb-1.5'>
                      {' '}
                      {getDiscountPriceAsVND(
                        pricingAndDiscountData.voucher_from_manufacturers
                      )}{' '}
                    </p>
                    <p>
                      {' '}
                      {getDiscountPriceAsVND(
                        pricingAndDiscountData.voucher_from_pharmacy_center
                      )}{' '}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='block md:hidden'>
              <div className='flex flex-col justify-between items-start'>
                <div className='text-14 leading-4 mb-2.5'>
                  <p>Phương thức thanh toán:</p>
                </div>
                <div className='flex justify-between w-full text-14 leading-4 text-right mb-2.5'>
                  <span>{pricingAndDiscountData.payment_method}</span>
                  <span className='text-primary ml-[50px]'>COD</span>
                </div>
              </div>
              <div className='flex flex-col justify-between'>
                <div className='text-14 leading-4 mb-2.5'>
                  <p>Voucher được áp dụng:</p>
                </div>
                <div className='text-14 leading-4 text-right'>
                  <p className='mb-1.5 flex w-full justify-between'>
                    <span>Voucher nhà bán</span>
                    <span className='col-2 text-primary ml-[22px]'>
                      {getDiscountPriceAsVND(pricingAndDiscountData.voucher_from_manufacturers)}
                    </span>
                  </p>
                  <p className='flex w-full justify-between'>
                    <span>Voucher TTDP</span>
                    <span className='text-primary ml-[30px]'>
                      {getDiscountPriceAsVND(pricingAndDiscountData.voucher_from_pharmacy_center)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {lineBreakElement()}
          <div className='order-summary'>
            <p className='font-medium text-14 leading-4 mb-2.5'>
              <span className='text-primary'>Số lượng: </span>
              <span>{pricingAndDiscountData.total_product}</span>
            </p>
            <div className='flex justify-between items-center font-bold text-14 leading-4 mb-2.5'>
              <p>Tổng tiền hàng:</p>
              <p>{formatVND(pricingAndDiscountData.total_product_price)}</p>
            </div>
            <div className='flex justify-between items-center text-14 leading-4 mb-2.5'>
              <p>Tổng tiền phí vận chuyển:</p>
              <p>{formatVND(pricingAndDiscountData.shipping_total)}</p>
            </div>
            {discounts.map((discount: any) => {
              return discountInfoLineItem(discount.name, discount.value)
            })}
          </div>
          {lineBreakElement()}
          <div className='flex justify-between items-center'>
            <div className='leading-[19px]'>
              <span className='font-medium'>Tổng cộng</span>
              <span className='ml-1'>(Bao gồm VAT)</span>
            </div>
            <div className='font-bold leading-[19px] text-right text-primary'>
              <p>{formatVND(pricingAndDiscountData.total_money)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
