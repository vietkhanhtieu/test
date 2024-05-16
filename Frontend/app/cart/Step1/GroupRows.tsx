import CustomCheckbox from '@/components/ui/custom_checkbox/custom_checkbox'
import { TableCell, TableRow } from '@/components/ui/table'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { RowItem } from './RowItem'
import './style.css'

interface Props {
  index: number
  group: string
  groupedItems: any
  selectedItems: string[]
  handleSelectGroup: (agr0: string) => void
  handleUnSelectGroup: (agr0: string) => void
  handleSelectItem: (agr0: string) => void
  setOpenRemoveItemModal: (agr0: boolean) => void
  setItemsToRemove: (agr0: string[]) => void
}

export const GroupRows: React.FC<Props> = ({
  index,
  group,
  groupedItems,
  selectedItems,
  handleSelectGroup,
  handleUnSelectGroup,
  handleSelectItem,
  setOpenRemoveItemModal,
  setItemsToRemove
}) => {
  const [isSelectedGroup, setIsSelectedGroup] = useState<boolean>(false)

  useEffect(() => {
    let items = groupedItems
      .filter((i: { stock_status: string }) => i.stock_status === 'instock')
      .map((i: { key: string }) => i.key)
    let selected = selectedItems.filter((i) => items.includes(i))

    setIsSelectedGroup(selected.length === items.length && items.length > 0)
  }, [selectedItems, groupedItems])

  const handleOnSelect = () => {
    if (isSelectedGroup) {
      handleUnSelectGroup(group)
    } else {
      handleSelectGroup(group)
    }
  }

  return (
    <>
      <TableRow key={index} className='align-middle'>
        <TableCell role='checkbox' className='pe-0 py-[15px] ps-3 lg:ps-5'>
          <div className='w-[23px] h-[23px] flex items-center justify-center '>
            <CustomCheckbox
              id={group.split(' ').join('-')}
              checked={isSelectedGroup}
              handleOnChange={handleOnSelect}
            />
          </div>
        </TableCell>
        <TableCell colSpan={5} className='border-b border-gainsboro py-[15px] px-3 lg:px-[21px]'>
          <div className='w-full flex items-center cursor-pointer'>
            <Image src='/icons/house.svg' width={14} height={13} alt='supplier' />
            <div className='font-medium text-14 ms-1.5 me-[38px]'>{group}</div>
            <Image src='/icons/chevron-right-gray.svg' width={6} height={11} alt='supplier' />
          </div>
        </TableCell>
      </TableRow>
      {groupedItems.map((item: any, index: number) => {
        return (
          <RowItem
            groupName={group as string}
            item={item}
            index={index}
            key={index}
            selectedItems={selectedItems}
            handleSelectItem={handleSelectItem}
            setOpenRemoveItemModal={setOpenRemoveItemModal}
            setItemsToRemove={setItemsToRemove}
          />
        )
      })}
    </>
  )
}
