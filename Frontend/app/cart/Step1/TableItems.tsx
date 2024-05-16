import CustomCheckbox from '@/components/ui/custom_checkbox/custom_checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { RootState } from '@/lib/redux/store'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GroupRows } from './GroupRows'

interface Props {
  selectedItems: string[]
  groups: any
  handleSelectAll: () => void
  handleSelectGroup: (agr0: string) => void
  handleUnSelectGroup: (agr0: string) => void
  handleSelectItem: (agr0: string) => void
  setOpenRemoveItemModal: (agr0: boolean) => void
  setItemsToRemove: (agr0: string[]) => void
}

export const TableItems: React.FC<Props> = ({
  selectedItems,
  groups,
  handleSelectAll,
  handleSelectGroup,
  handleUnSelectGroup,
  handleSelectItem,
  setOpenRemoveItemModal,
  setItemsToRemove
}) => {
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false)
  const [totalQty, setTotalQty] = useState<number>(0)

  const { cart } = useSelector((state: RootState) => state.userCart)
  const dispatch = useDispatch()

  useEffect(() => {
    setIsSelectedAll(
      selectedItems.length ===
        cart.filter((i: { stock_status: string }) => i.stock_status === 'instock').map((i) => i.key)
          .length
    )
  }, [selectedItems])

  const handleRemoveAllItems = async () => {
    if (!!selectedItems.length) {
      setOpenRemoveItemModal(true)
      setItemsToRemove(selectedItems)
    }
  }

  useEffect(() => {
    let instockItems = cart.filter((i: { stock_status: string }) => i.stock_status === 'instock')
    let total = 0
    instockItems.forEach((i) => (total = total + i.quantity))

    setTotalQty(total)
  }, [cart])

  return (
    <Table className='w-full shadow-lg overflow-auto'>
      <TableHeader className='text-abbey text-12 bg-white-smoke'>
        <TableRow>
          <TableHead className='pe-0 ps-[35px] rounded-tl-xl'></TableHead>
          <TableHead className='lg:max-w-[250px] pe-0 ps-3 lg:ps-[21px]'>
            TÊN THƯƠNG MẠI / NHÀ SẢN XUẤT
          </TableHead>
          <TableHead className='min-w-[100px] lg:w-[170px] pe-0 ps-3 lg:ps-5'>
            HOẠT CHẤT / HÀM LƯỢNG
          </TableHead>
          <TableHead className='text-center w-[70px] lg:w-[90px] pe-0 ps-3 lg:ps-5'>
            ĐƠN VỊ TÍNH
          </TableHead>
          <TableHead className='text-center w-[90px] pe-0 ps-3 lg:ps-5'>GIÁ BÁN</TableHead>
          <TableHead className='text-left min-w-[110px] px-5 rounded-tr-xl'>SỐ LƯỢNG</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='bg-white text-abbey shadow-2xl rounded-b-xl'>
        {isEmpty(groups) ? (
          <>
            <TableRow className='align-middle hover:bg-white rounded-b-xl'>
              <TableCell colSpan={6} className='pt-[15px] pb-[30px] px-8 rounded-b-xl'>
                Chưa có sản phẩm trong giỏ hàng
              </TableCell>
            </TableRow>
          </>
        ) : (
          <>
            <TableRow className='align-middle hover:bg-white'>
              <TableCell role='checkbox' className='pe-0 w-[23px] py-[15px] ps-3 lg:ps-5'>
                <div className='w-[23px] h-[23px] flex items-center justify-center '>
                  <CustomCheckbox
                    id='all-items-checkbox'
                    checked={isSelectedAll}
                    handleOnChange={handleSelectAll}
                  />
                </div>
              </TableCell>
              <TableCell
                colSpan={5}
                className='border-b border-gainsboro py-[15px] px-3 lg:px-[21px]'
              >
                <div className='w-full flex items-center justify-between'>
                  <div className='font-medium text-14'>{`Tất cả (${totalQty})`}</div>
                  <div
                    onClick={handleRemoveAllItems}
                    className='text-dodger-blue text-12 font-medium cursor-pointer'
                  >
                    Xoá tất cả
                  </div>
                </div>
              </TableCell>
            </TableRow>
            {Object.keys(groups).map((group: any, index: number) => {
              return (
                <GroupRows
                  key={index}
                  index={index}
                  group={group}
                  selectedItems={selectedItems}
                  groupedItems={groups[group]}
                  handleSelectGroup={handleSelectGroup}
                  handleUnSelectGroup={handleUnSelectGroup}
                  handleSelectItem={handleSelectItem}
                  setOpenRemoveItemModal={setOpenRemoveItemModal}
                  setItemsToRemove={setItemsToRemove}
                />
              )
            })}
          </>
        )}
      </TableBody>
    </Table>
  )
}
