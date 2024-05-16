'use client'

import { Button } from '@/components/ui/button'
import Spinner from '@/components/ui/spinner'
import { RootState } from '@/lib/redux/store'
import { formatVND } from '@/lib/utils'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

interface Props {
  loading: boolean
  selectedItems: string[]
  handleOnClick: () => void
}

const CartAmount: React.FC<Props> = ({ loading, selectedItems, handleOnClick }) => {
  const dispatch = useDispatch()
  const { cart, listUpdating } = useSelector((state: RootState) => state.userCart)

  const calculateTotalAmount = () => {
    if (!!selectedItems.length) {
      const items = cart.filter(
        (i) =>
          selectedItems.includes(i.key) && (i.stock_status === 'instock' || i.stock_quantity > 0)
      )
      let total = 0
      items.forEach((i) => {
        let price = !!i.sale_price ? i.sale_price : i.regular_price
        total = total + i.quantity * price
      })
      return formatVND(total)
    } else {
      return formatVND(0)
    }
  }

  return (
    <div className='bg-white rounded-[10px] lg:min-w-[280px] font-normal'>
      <div className='pt-6 px-[23px] pb-[22px] font-semibold text-16 leading-[19px] border-b border-gainsboro'>
        Tổng thanh toán
      </div>
      <div className='flex items-center px-[23px] py-[15px] h-[47px]'>
        <div className='w-6/12 leading-4'>Tạm tính:</div>
        <div className='w-6/12 font-medium text-16 leading-[19px] text-end text-primary'>
          {calculateTotalAmount()}
        </div>
      </div>
      <div className='pt-[15px] px-5 pb-6 flex justify-center'>
        <Button
          className='bg-primary h-9 w-60 rounded-md text-14 text-white font-medium leading-[19px]'
          onClick={handleOnClick}
          disabled={loading || !selectedItems.length || listUpdating.length > 0}
        >
          {listUpdating.length > 0 || loading ? <Spinner size='md' /> : <span>Đặt hàng</span>}
        </Button>
      </div>
    </div>
  )
}

export default CartAmount
