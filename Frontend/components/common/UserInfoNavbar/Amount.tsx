import { RootState } from '@/lib/redux/store'
import { formatVND } from '@/lib/utils'
import Link from 'next/link'
import { useSelector } from 'react-redux'

export const Amount = () => {
  const { total_quantity, cart } = useSelector((state: RootState) => state.userCart)

  const calculateTotalAmount = () => {
    const items = cart.filter((i) => i.stock_status === 'instock' || i.stock_quantity > 0)
    let total = 0
    items.forEach((i) => {
      let price = !!i.sale_price ? i.sale_price : i.regular_price
      total = total + i.quantity * price
    })
    return formatVND(total)
  }

  return (
    <div className='cart-amount w-full h-40 pt-[21px] pb-[22px] bg-white flex items-center justify-center rounded-b-xl'>
      <div className='h-[117px] gap-[23px] flex flex-col items-center'>
        <div className='w-[315px] flex flex-col gap-[9px]'>
          <div className='w-full flex justify-between'>
            <span className='text-12'>Số lượng:</span>
            <span className='text-12 font-medium'>{total_quantity}</span>
          </div>
          <div className='w-full flex justify-between'>
            <span className='font-semibold'>Tạm tính:</span>
            <span className='font-extrabold text-primary'>{calculateTotalAmount()}</span>
          </div>
        </div>
        <Link href='/cart'>
          <button className='h-[45px] w-[315px] flex items-center justify-center py-3 px-4 text-white bg-primary font-bold rounded-[10px]'>
            Đặt hàng
          </button>
        </Link>
      </div>
    </div>
  )
}
