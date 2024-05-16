'use client'

import { Button } from '@/components/ui/button'
import { RootState } from '@/lib/redux/store'
import { cn, formatVND } from '@/lib/utils'
import Link from 'next/link'
import { useSelector } from 'react-redux'

export default function CartHeader({ bgClass = 'bg-cart-header' }) {
  const cart = useSelector((state: RootState) => state.userCart)

  return (
    <div className='container'>
      <div className='flex flex-col lg:flex-row gap-2.5 my-8 h-[109px]'>
        <div
          className={cn(
            bgClass,
            'w-full h-28 lg:h-auto rounded-[10px] bg-no-repeat bg-[length:200%_100%] md:bg-full-size'
          )}
        ></div>
        <div className='cart-info py-3 px-[19px] bg-white rounded-[10px] min-w-[280px] text-sm font-normal'>
          <div className='flex justify-between'>
            <span className='text-14'>Số lượng:</span>
            <span className='text-primary font-medium text-16'>{cart?.total_quantity || 0}</span>
          </div>
          <div className='flex justify-between my-2'>
            <span className='text-14'>Tổng thành tiền:</span>
            <span className='text-primary font-medium text-16'>
              {formatVND(cart?.total_amount || 0)}
            </span>
          </div>
          <Link href='#'>
            <Button className='bg-primary h-8 w-full rounded-full'>
              <span className='font-medium text-16'>Kiểm tra giỏ hàng</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
