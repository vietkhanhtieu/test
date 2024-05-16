'use client'

import Spinner from '@/components/ui/spinner'
import { RootState } from '@/lib/redux/store'
import { cn, formatVND } from '@/lib/utils'
import { VatIcon } from '@/public/icons'
import moment from 'moment'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { boolean } from 'yup'

interface IIndividualOrderItemProps {
  item: any
  fetching: boolean
  isExceedStock: boolean
}

const IndividualOrderItem: React.FC<IIndividualOrderItemProps> = ({
  item,
  fetching,
  isExceedStock
}) => {
  const [isOutOfStock, setIsOutOfStock] = useState<boolean>(false)
  const { cart } = useSelector((state: RootState) => state.userCart)

  useEffect(() => {
    if (isExceedStock) {
      let foundProduct = cart.find((i) => i.id === item.product_id)
      setIsOutOfStock(foundProduct?.stock_status !== 'instock' || foundProduct.quantity === 0)
    }
  }, [isExceedStock])

  return (
    <div
      className={cn(
        'my-3 rounded-[7px] px-[7px] py-[3px]',
        isExceedStock && !isOutOfStock && 'bg-sefid-white',
        isOutOfStock && 'mix-blend-luminosity opacity-60'
      )}
    >
      <div className='flex w-100 justify-between'>
        <div className='text-14 font-semibold'>
          <span className='truncate-2lines'>{item.product_name}</span>
        </div>
        <div className='flex flex-col ml-[13px]'>
          {item.sale_price > 0 ? (
            <>
              <p className='text-14 font-semibold'>{formatVND(item.sale_price)}</p>
              <p className='w-100 text-end text-12 text-stone-cairn line-through'>
                {formatVND(item.price)}
              </p>
            </>
          ) : (
            <p className='text-14 font-semibold'>{formatVND(item.price)}</p>
          )}
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <div className='text-stone-cairn text-12'>
          {item.base_unit}
          {item.expiry_date
            ? ` | ${moment(item.expiry_date, 'DDMMYYYY').format('DD/MM/YYYY')}`
            : ''}
        </div>
        {fetching ? (
          <Spinner size='xxs' />
        ) : (
          <p
            className={`w-100 text-end text-12 ${isExceedStock ? 'text-red-solid' : 'text-stone-cairn'}`}
          >
            x {item.quantity}
          </p>
        )}
      </div>
      <div className='text-10 flex flex-row items-center'>
        <Image src={VatIcon} width='19' height='12' alt='vat' />
        <p className='ml-0.5'>
          {' '}
          Đã bao gồm phí <span className='font-semibold'>VAT</span> ({item.vat}%){' '}
        </p>
      </div>
    </div>
  )
}

export default IndividualOrderItem
