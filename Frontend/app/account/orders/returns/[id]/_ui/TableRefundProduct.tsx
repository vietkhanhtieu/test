import CustomCheckbox from '@/components/ui/custom_checkbox/custom_checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import ChevronDown from '@/public/icons/svg_components/ChevronDown'
import ChevronUp from '@/public/icons/svg_components/ChevronUp'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import '../../../../../ui/styles/table_product.css'
import { RowItems } from './RowItems'

interface Props {
  products: any
  selectedItems: number[]
  showCheckbox?: boolean
  viewOnly?: boolean
  handleSelectAll: () => void
  setSelectedItems: (arg: number[]) => void
  handleChangeQuantity?: (arg1: number, arg2: number) => void
  handleChangeLot?: (arg1: number, arg2: string) => void
}

export const TableRefundProduct: React.FC<Props> = ({
  products,
  selectedItems,
  showCheckbox,
  viewOnly,
  handleSelectAll,
  setSelectedItems,
  handleChangeQuantity,
  handleChangeLot
}) => {
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false)
  const [isExpanded, setIsExpanded] = useState(true)
  const dispatch = useDispatch()
  const tableRef = useRef<HTMLDivElement>(null)
  const [isClickShowMore, setIsClickShow] = useState<boolean>(false)

  useEffect(() => {
    setIsSelectedAll(
      !!selectedItems.length &&
        selectedItems.length === products.map((i: { product_id: any }) => i.product_id).length
    )
  }, [selectedItems])

  const handleRemoveAllItems = () => {
    setIsSelectedAll(false)
    setSelectedItems([])
  }

  const handleToggle = (show: boolean) => {
    setIsExpanded(!isExpanded)
    setIsClickShow(show)
  }

  useEffect(() => {
    const element = tableRef.current
    if (element) {
      setIsExpanded(!(element.offsetHeight > 590))
    }
  }, [products])

  return (
    <div
      ref={tableRef}
      className={`relative rounded-[10px] border-t-[2px] border-primary ${isExpanded ? '' : 'overflow-y-hidden h-[600px]'}`}
    >
      <div
        className={`table-wrapper relative w-full overflow-x-auto scrollbar-none rounded-t-[10px]`}
      >
        <Table className='w-full'>
          <TableHeader className='text-abbey text-12 bg-white-smoke rounded-t-[10px]'>
            <TableRow>
              <TableHead className='w-[270px] pl-5'>TÊN THƯƠNG MẠI / NHÀ SẢN XUẤT</TableHead>
              <TableHead className='text-center min-w-[90px]'>ĐƠN VỊ TÍNH</TableHead>
              <TableHead className='text-center min-w-[90px]'>GIÁ BÁN</TableHead>
              <TableHead className='text-right min-w-[110px] pr-3 md:pr-[88px]'>GIỎ HÀNG</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='bg-white text-abbey shadow-2xl rounded-b-xl'>
            {showCheckbox && (
              <TableRow className='align-middle hover:bg-white'>
                <TableCell role='checkbox' className='pe-0 w-[23px] py-[15px] pl-[22px]'>
                  <div className='flex items-center gap-2.5'>
                    <CustomCheckbox
                      id='all-items-checkbox'
                      checked={isSelectedAll}
                      handleOnChange={handleSelectAll}
                    />
                    <div className='font-bold text-14'>{`Tất cả (${selectedItems.length})`}</div>
                  </div>
                </TableCell>
                <TableCell
                  colSpan={3}
                  className='border-b border-gainsboro py-[15px] px-3 md:px-[88px]'
                >
                  <div className='w-full flex items-center justify-end'>
                    <div onClick={handleRemoveAllItems} className='text-12 cursor-pointer'>
                      Xoá tất cả
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
            <RowItems
              products={products}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              handleChangeQuantity={handleChangeQuantity}
              handleChangeLot={handleChangeLot}
              showCheckbox={showCheckbox}
              viewOnly={viewOnly}
            />
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end pe-[45px] py-[15px] border-t border-alto'>
        <p className='text-16 leading-[19px]'>
          Tổng sản phẩm:{' '}
          <span>
            {'('}
            {products.length}
            {')'}
          </span>
        </p>
      </div>
      {!isExpanded && (
        <div
          className={`absolute bottom-0 left-0 w-full h-32 bg-gradient-to-br from-transparent to-white`}
        ></div>
      )}
      {!isExpanded && (
        <div
          onClick={() => handleToggle(true)}
          className='absolute text-dodger-blue h-[93px] left-0 right-0 bottom-0 z-100 font-normal flex justify-center items-end cursor-pointer py-3 text-14'
        >
          <div className='flex gap-2.5 items-center'>
            <span>Mở rộng</span>
            <ChevronDown stroke='#3D94FF' className='!w-2 !h-1 ' />
          </div>
        </div>
      )}
      {isExpanded && isClickShowMore && (
        <div
          onClick={() => handleToggle(false)}
          className='text-dodger-blue h-[33px] left-0 right-0 mx-auto z-100 font-normal flex justify-center items-end cursor-pointer text-14'
        >
          <div className='flex gap-2.5 items-center'>
            <span>Thu gọn</span>
            <ChevronUp stroke='#3D94FF' className='!w-2 !h-1 ' />
          </div>
        </div>
      )}
    </div>
  )
}
