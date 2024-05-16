import { formatVND } from '@/lib/utils'

interface Props {
  data: any
}

const TotalAmount = (props: Props) => {
  const { data } = props

  return (
    <div className='w-full p-[30px] flex justify-end p-[30px]'>
      <div className='flex flex-col gap-5 xs:w-[345px] w-[300px]'>
        <div className='pb-5 flex flex-col gap-2 text-14 border-b border-dashed'>
          <div className='flex justify-between items-start'>
            <span className='text-primary'>Tổng tiền ({data.total_product} sản phẩm)</span>
            <span>{formatVND(data.total_product_price)}</span>
          </div>
          <div className='flex justify-between items-start text-14'>
            <span>Phí vận chuyển:</span>
            <span>{formatVND(data.shipping_total)}</span>
          </div>
          <div className='flex justify-between items-start text-14'>
            <span>Giảm giá phí vận chuyển:</span>
            <span>
              {data.shipping_discount > 0 ? '-' : ''}
              {formatVND(data.shipping_discount)}
            </span>
          </div>
          <div className='flex justify-between items-start text-14'>
            <span>Giảm giá khuyến mãi:</span>
            <span className='text-dodger-blue'>
              {data.campaign_discount > 0 ? '-' : ''}
              {formatVND(data.campaign_discount)}
            </span>
          </div>
          <div className='flex justify-between items-start text-14'>
            <span>Áp dụng mã giảm giá:</span>
            <span className='text-dodger-blue'>
              {data.voucher_discount > 0 ? '-' : ''}
              {formatVND(data.voucher_discount)}
            </span>
          </div>
          <div className='flex justify-between items-start text-14'>
            <span>Chiết khấu thanh toán:</span>
            <span className='text-dodger-blue'>
              {data.total_discount > 0 ? '-' : ''}
              {formatVND(data.total_discount)}
            </span>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-14'>
            <span className='font-medium'>Tổng cộng </span>(Bao gồm VAT)
          </span>
          <span className='text-16 text-primary font-extrabold'>{formatVND(data.total_money)}</span>
        </div>
      </div>
    </div>
  )
}

export default TotalAmount
