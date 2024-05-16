import CustomCheckbox from '@/components/ui/custom_checkbox/custom_checkbox'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatVND } from '@/lib/utils'
import { HouseIcon } from '@/public/icons'
import moment from 'moment'
import Image from 'next/image'

import { Quantity } from './Quantity'

interface Props {
  products: any
  selectedItems: number[]
  viewOnly?: boolean | undefined
  showCheckbox: boolean | undefined
  setSelectedItems: (arg: number[]) => void
  handleChangeQuantity?: (arg1: number, arg2: number) => void
  handleChangeLot?: (arg1: number, arg2: string) => void
}

export const RowItems: React.FC<Props> = ({
  products,
  selectedItems,
  showCheckbox,
  viewOnly,
  setSelectedItems,
  handleChangeQuantity,
  handleChangeLot
}) => {
  const handleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((i: number) => i !== id))
    } else {
      setSelectedItems(selectedItems.concat(id))
    }
  }

  return (
    <>
      {products &&
        products.map((product: any) => {
          return (
            <>
              <TableRow>
                <TableCell className='pl-5'>
                  <ItemDetail
                    product={product}
                    showCheckbox={showCheckbox}
                    checked={selectedItems.includes(product.product_id) || false}
                    handleSelectItem={handleSelectItem}
                  />
                </TableCell>
                <TableCell className='text-center min-w-[90px]'>
                  <span className='text-12'>{product.dvt_co_so}</span>
                </TableCell>
                <TableCell className='text-center min-w-[90px]'>
                  <div className='font-bold text-primary text-14'>
                    {product.sale_price > 0
                      ? formatVND(product.sale_price)
                      : formatVND(product.regular_price)}
                  </div>
                  {product.sale_price > 0 && (
                    <div className='text-[11px] line-through text-dusty-gray font-medium'>
                      {formatVND(product.regular_price)}
                    </div>
                  )}
                </TableCell>
                <TableCell className='pr-3 md:pr-[88px]'>
                  <Quantity
                    product={product}
                    viewOnly={viewOnly}
                    checked={viewOnly ? true : selectedItems.includes(product.product_id)}
                    handleChangeQuantity={handleChangeQuantity}
                    handleChangeLot={handleChangeLot}
                  />
                </TableCell>
              </TableRow>
            </>
          )
        })}
    </>
  )
}

const ItemDetail = (props: any) => {
  const productItem = props.product

  return (
    <div className='flex items-center gap-4'>
      {props.showCheckbox && (
        <div className={`w-[23px] h-[23px] flex items-center justify-center`}>
          <CustomCheckbox
            id={props.product.product_id}
            checked={props.checked}
            handleOnChange={() => props.handleSelectItem(props.product.product_id)}
          />
        </div>
      )}
      <div className='w-full gap-1.5'>
        <span className='font-bold text-14'>{productItem.product_name}</span>
        {productItem.expired && productItem.expired != 'null' && (
          <div className='text-12'>
            <span>Hạn sử dụng: {moment(productItem.expired, 'DDMMYYYY').format('DD/MM/YYYY')}</span>
          </div>
        )}
        <div className='w-full flex items-center gap-[5px]'>
          <Image src={HouseIcon} width={14} height={13} alt='supplier' />
          <span className='text-10'>{productItem.supplier?.name}</span>
        </div>
      </div>
    </div>
  )
}
