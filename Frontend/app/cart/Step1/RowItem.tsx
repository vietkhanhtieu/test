import CustomCheckbox from '@/components/ui/custom_checkbox/custom_checkbox'
import { TableCell, TableRow } from '@/components/ui/table'
import { RootState } from '@/lib/redux/store'
import { formatVND } from '@/lib/utils'
import { GiftIcon, HouseIcon, MinusItem, PlusItem, TrashBinIcon } from '@/public/icons'
import { last } from 'lodash'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { QuantityInput } from './QuantityInput'

interface Props {
  groupName: string
  item: any
  index: number
  selectedItems: string[]
  handleSelectItem: (agr0: string) => void
  setOpenRemoveItemModal: (agr0: boolean) => void
  setItemsToRemove: (agr0: string[]) => void
}

export const RowItem: React.FC<Props> = ({
  groupName,
  item,
  selectedItems,
  handleSelectItem,
  setOpenRemoveItemModal,
  setItemsToRemove
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const { shouldCheckStock, exceedStockItems } = useSelector((state: RootState) => state.userCart)

  useEffect(() => {
    setIsSelected(selectedItems.includes(item.key))
  }, [selectedItems])

  const calculateTotalPrice = (price: number, quantity: number): number => {
    return price * quantity
  }

  const handleOnSelect = () => {
    handleSelectItem(item.key)
  }

  const bgRed = () => {
    return (
      shouldCheckStock &&
      exceedStockItems.includes(item.id) &&
      selectedItems.includes(item.key) &&
      item.quantity === item.stock_quantity &&
      item.stock_status === 'instock'
    )
  }

  return (
    <TableRow className={`align-middle ${bgRed() && 'bg-sefid-white/80 hover:bg-sefid-white/80'}`}>
      <TableCell role='checkbox' className='pe-0 py-[15px] w-[23px] ps-3 lg:ps-5'>
        <div
          className={`w-[23px] h-[23px] flex items-center justify-center ${item.stock_status === 'outofstock' && 'mix-blend-luminosity opacity-60'}`}
        >
          <CustomCheckbox
            id={item.key}
            checked={isSelected}
            handleOnChange={handleOnSelect}
            disabled={item.stock_status === 'outofstock'}
          />
        </div>
      </TableCell>
      <TableCell className='max-w-[250px] pe-0 py-[15px] ps-3 lg:ps-[22px]'>
        <ItemDetails item={item} groupName={groupName} />
      </TableCell>
      <TableCell className='min-w-[100px] lg:w-[150px] pe-0 py-[15px] ps-3 lg:ps-5'>
        <div
          className={`min-w-[100px] lg:w-[150px] max-h-[30px] text-12 leading-[14px] ${item.stock_status === 'outofstock' && 'mix-blend-luminosity opacity-60'}`}
        >
          <span className='truncate-2lines'>{item.hoatChatHamLuong || item.active_element}</span>
        </div>
      </TableCell>
      <TableCell className='text-center w-[70px] lg:w-[90px] pe-0 py-[15px] ps-3 lg:ps-5'>
        <div
          className={`text-12 leading-[14px] ${item.stock_status === 'outofstock' && 'mix-blend-luminosity opacity-60'}`}
        >
          {item.donViTinh}
        </div>
      </TableCell>
      <TableCell
        className={`text-center w-[90px] pe-0 py-[15px] ps-3 lg:ps-5 ${item.stock_status === 'outofstock' && 'mix-blend-luminosity opacity-60'}`}
      >
        {item.sale_price ? (
          <>
            <div className='text-primary text-12 font-bold leading-[14px] mb-0.5'>
              {formatVND(parseInt(item.sale_price))}
            </div>
            <div className='text-10 text-normal leading-3 line-through'>
              {formatVND(parseInt(item.regular_price))}
            </div>
          </>
        ) : (
          <div className='text-primary text-12 font-bold leading-[14px]'>
            {formatVND(parseInt(item.regular_price))}
          </div>
        )}
      </TableCell>
      <TableCell className='text-left max-w-[125px] py-[15px] px-3 lg:px-5'>
        <QuantityInput
          item={item}
          qty={item.quantity}
          selectedItems={selectedItems}
          setOpenRemoveItemModal={setOpenRemoveItemModal}
          setItemsToRemove={setItemsToRemove}
        />
      </TableCell>
    </TableRow>
  )
}

const ItemDetails = (props: any) => {
  const { item, groupName } = props
  const discount_rules = item.discount_rules || []
  const currentDiscount: any = last(discount_rules)
  return (
    <>
      {item.stock_status === 'instock' ? (
        <>
          <Link href={`/products/${item.id}`} className='font-semibold text-16 leading-[19px] mb-1'>
            {item.title}
          </Link>
          {item.nhaSanXuat?.tenNhaSanXuat && (
            <div className='text-10 text-normal leading-[11px] mb-1'>
              <span>Nhà sản xuất: </span>
              <span className='text-dodger-blue underline'>{item?.nhaSanXuat?.tenNhaSanXuat}</span>
            </div>
          )}
          {item?.due_date && (
            <div className='text-10 text-normal leading-[11px]'>
              <span>Hạn sử dụng: </span>
              <span className='text-dodger-blue'>
                {moment(item?.due_date, 'DDMMYYYY').format('DD/MM/YYYY')}
              </span>
            </div>
          )}
          {currentDiscount && (
            <>
              {currentDiscount.discount_type == 'wdr_buy_x_get_y_advanced_discount' && (
                <div className='flex items-center mt-[4px]'>
                  <Image src={GiftIcon} width={15} height={15} alt='gift' />
                  <div className='text-10 leading-3 text-normal text-north-texas-green ms-[7px]'>
                    {currentDiscount.label}
                  </div>
                </div>
              )}
              {currentDiscount.discount_type == 'wdr_simple_discount' && (
                <div
                  className={`mt-1 bg-gradient-to-r from-vermilion to-primary ${currentDiscount.product_discount_type === 'percentage' ? 'min-w-[79px]' : 'min-w-[110px]'}  h-[19px] ziczack-border`}
                >
                  <div className='flex items-center justify-center h-full'>
                    <div className='text-white text-12 leading-[14px]'>
                      Giảm{' '}
                      {currentDiscount.product_discount_type === 'percentage'
                        ? `${currentDiscount.product_discount_value}%`
                        : formatVND(currentDiscount.product_discount_value)}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <div className='w-full flex items-center mt-[18px]'>
            <Image src={HouseIcon} width={14} height={13} alt='supplier' />
            <div className='text-10 text-normal leading-[11px] ms-[5px]'>{groupName}</div>
          </div>
        </>
      ) : (
        <div className='max-w-[250px] mix-blend-luminosity opacity-60'>
          <div className='font-semibold text-16 leading-[19px] mb-1'>{item.title}</div>
          {item.nhaSanXuat?.tenNhaSanXuat && (
            <div className='text-10 text-normal leading-[11px] mb-1'>
              <span>Nhà sản xuất: </span>
              <span className='text-dodger-blue underline'>{item?.nhaSanXuat?.tenNhaSanXuat}</span>
            </div>
          )}
          <div className='text-10 text-normal leading-[11px]'>
            <span>Hạn sử dụng: </span>
            <span className='text-dodger-blue'>{item?.due_date || '23/2/2025'}</span>
          </div>
          <div className='w-full flex items-center mt-[18px]'>
            <Image src={HouseIcon} width={14} height={13} alt='supplier' />
            <div className='text-10 text-normal leading-[11px] ms-[5px]'>{groupName}</div>
          </div>
        </div>
      )}
    </>
  )
}
