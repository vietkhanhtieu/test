import { Button } from '@/components/ui/button'
import Spinner from '@/components/ui/spinner'
import { formatVND } from '@/lib/utils'

import { ICalculatedData } from './CartInfo'

interface ITotalPriceProps {
  calculateData: ICalculatedData
  loading: boolean
  fetching: boolean
  handleOnClick: () => void
  disable: boolean
}

const TotalPrice: React.FC<ITotalPriceProps> = ({
  calculateData,
  handleOnClick,
  loading,
  fetching,
  disable
}) => {
  return (
    <div className='bg-white mt-2.5 rounded-b-[10px]'>
      <div className='flex flex-col gap-2.5 px-3 py-[18px] text-12'>
        <p>
          <span className='text-primary'>Số lượng: </span>
          {calculateData.totalProduct}
        </p>
        <div className='flex justify-between w-full'>
          <p>Tiền hàng (Tạm tính):</p>
          <p>{formatVND(calculateData.subtotal)}</p>
        </div>
        <div className='flex justify-between w-full'>
          <p>Tổng tiền phí vận chuyển:</p>
          <p>{formatVND(calculateData.shippingTotal)}</p>
        </div>
        {calculateData.campaignDiscount > 0 && (
          <div className='flex justify-between w-full'>
            <p>Giảm giá khuyến mãi:</p>
            <p className='text-dodger-blue'>-{formatVND(calculateData.campaignDiscount)}</p>
          </div>
        )}
        {calculateData.discountOrder > 0 && (
          <div className='flex justify-between w-full'>
            <p>Chiết khấu thanh toán:</p>
            <p className='text-dodger-blue'>-{formatVND(calculateData.discountOrder)}</p>
          </div>
        )}
        {calculateData.discountTotal > 0 && (
          <div className='flex justify-between w-full'>
            <p>Mã giảm giá:</p>
            <p className='text-dodger-blue'>-{formatVND(calculateData.discountTotal)}</p>
          </div>
        )}
        {calculateData.shippingDiscount > 0 && (
          <div className='flex justify-between w-full'>
            <p>Giảm giá phí vận chuyển:</p>
            <p className='text-dodger-blue'>-{formatVND(calculateData.shippingDiscount)}</p>
          </div>
        )}
      </div>
      <div className='py-3 px-[15px] text-14 flex justify-between items-center'>
        <p>Tổng thanh toán:</p>
        <p className='font-bold text-primary'>{formatVND(calculateData.amountTotal)}</p>
      </div>
      <div className='py-5 px-4 text-center'>
        <Button
          className='bg-primary disabled:bg-gray-10 h-9 xl:w-60 w-full rounded-md text-14 text-white font-medium leading-[19px]'
          onClick={handleOnClick}
          disabled={disable || loading || fetching}
        >
          {loading ? <Spinner size='xs' /> : 'Đặt hàng'}
        </Button>
      </div>
    </div>
  )
}

export default TotalPrice
