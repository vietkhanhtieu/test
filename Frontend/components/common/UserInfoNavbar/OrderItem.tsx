import Spinner from '@/components/ui/spinner'
import { CartItem } from '@/lib/types/user'
import { formatVND } from '@/lib/utils'
import { HouseIcon, TrashBinIcon } from '@/public/icons'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { QuantityInput } from './QuantityInput'

interface ICartItem {
  item: CartItem
  setItemsToDelete: (arg: string[]) => void
  setOpenDeleteModal: (arg: boolean) => void
}

export const OrderItem: React.FC<ICartItem> = ({ item, setItemsToDelete, setOpenDeleteModal }) => {
  const [updating, setUpdating] = useState<boolean>(false)

  const handleConfirmToRemove = () => {
    setOpenDeleteModal(true)
    setItemsToDelete([item.key])
  }

  return (
    <div className='flex flex-col py-2.5 w-full items-start gap-[5px] border-t'>
      <div className='w-[254px]'>
        <span className='text-14 font-semibold'>{item.title}</span>
      </div>
      <div className='w-full flex'>
        <span className='text-12'>Nhà sản xuất:&nbsp;</span>
        <Link href='#' className='text-12 text-dodger-blue underline cursor-pointer'>
          {item.nhaSanXuat?.tenNhaSanXuat}
        </Link>
      </div>
      <div className='w-full flex flex-col gap-2.5'>
        <span className='text-12 w-[246px] truncate'>Hoạt chất: {item.active_element}</span>
      </div>
      <div className='flex justify-between items-start w-full'>
        <div className='flex flex-col'>
          <div className='flex items-center gap-[5px]'>
            <span className='font-bold text-primary'>
              {item.sale_price ? formatVND(item.sale_price) : formatVND(item.regular_price)}
            </span>
            {item.donViTinh && <span className='text-14 text-primary'>/ {item.donViTinh}</span>}
          </div>
          {item.regular_price !== 0 && item.sale_price !== 0 && (
            <span className='line-through text-12 text-gray-40'>
              {formatVND(item.regular_price)}
            </span>
          )}
        </div>
        <QuantityInput
          item={item}
          handleConfirmToRemove={handleConfirmToRemove}
          updating={updating}
          setUpdating={setUpdating}
        />
      </div>
      <div className='flex justify-between w-full pt-[5px] items-start'>
        <div className='w-full h-[18px] flex items-center gap-[5px]'>
          <Image src={HouseIcon} alt='Supplier' />
          <span className='text-10'>{item.supplier?.name}</span>
        </div>
        {updating ? (
          <Spinner size='xs' className={'fill-primary text-primary'} />
        ) : (
          <Image
            src={TrashBinIcon}
            height={18}
            width={18}
            alt='Remove cart'
            className='!w-[18px] !h-[18px]'
            onClick={handleConfirmToRemove}
          />
        )}
      </div>
    </div>
  )
}
