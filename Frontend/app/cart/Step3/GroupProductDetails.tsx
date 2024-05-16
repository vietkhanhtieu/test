import { formatVND } from '@/lib/utils'
import Image from 'next/image'

import { ProductDetails } from './ProductDetails'

interface GroupProductDetailsProps {
  groupedItems: any
  groupName: string
}
export const GroupProductDetails: React.FC<GroupProductDetailsProps> = ({
  groupedItems,
  groupName
}) => {
  const calculateTotalPrices = () => {
    const totalPrice = groupedItems.reduce((total: number, item: any) => {
      return total + item.total
    }, 0)

    return formatVND(totalPrice)
  }

  return (
    <div>
      <div className='details pb-[15px] mb-[13px] border-b border-mourn-mountain-snow'>
        <div className='group-name mb-[15px] text-12 leading-[14px]'>
          <span className='mr-[5px]'>Nhà bán:</span>
          <span className='text-dodger-blue'>{groupName}</span>
        </div>
        <div className='mb-[15px]'>
          {groupedItems.map((item: any, idx: number) => {
            const expireDate = item?.expired

            return (
              <div key={`${idx}-${item.product_id}`}>
                <ProductDetails
                  name={item.product_name}
                  unitType={item.dvt_co_so}
                  expireDate={expireDate}
                  salePrice={item.sale_price}
                  regularPrice={item.regular_price}
                  quantity={item.quantity}
                />
              </div>
            )
          })}
        </div>
        <div className='order-voucher text-12 leading-[14px]'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <span className='mr-[7px]'>
                <Image
                  className='inline-block'
                  alt='clock-icon'
                  src='/icons/clock.svg'
                  width={16}
                  height={16}
                />
              </span>
              <span>
                <span className='font-normal text-12 leading-[14px]'>
                  Nhận hàng ngày: 11-14/12/2023
                </span>
              </span>
            </div>
            <div>
              <span className='mr-[7px] text-12 leading-[14px] text-right text-stone-cairn line-through'>
                35.000đ
              </span>
              <span className='font-semibold text-14 leading-4 text-right'>30.000đ</span>
            </div>
          </div>
          <div className='mt-[5px] text-14 leading-4'>Voucher</div>
        </div>
      </div>
      <div className='sub-total-prices flex justify-between'>
        <div className='font-semibold text-14 leading-4'>
          <p>{`Tổng số tiền (${groupedItems.reduce(
            (accumulator: any, currentValue: any) => accumulator + currentValue.quantity,
            0
          )} sản phẩm):`}</p>
        </div>
        <div className='font-semibold text-16 leading-[19px] text-right text-primary'>
          <p>{calculateTotalPrices()}</p>
        </div>
      </div>
    </div>
  )
}
