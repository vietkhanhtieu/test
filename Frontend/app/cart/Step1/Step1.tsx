import Spinner from '@/components/ui/spinner'
import { CartItem } from '@/lib/types/user'
import { Dictionary } from 'lodash'
import { useEffect, useState } from 'react'

import RemoveCartItemModal from './RemoveCartItemModal'
import { TableItems } from './TableItems'

interface Props {
  fetchingData: boolean
  selectedItems: string[]
  groups: any
  handleSelectAll: () => void
  handleSelectGroup: (agr0: string) => void
  handleUnSelectGroup: (agr0: string) => void
  handleSelectItem: (agr0: string) => void
  setSelectedItems: (agr0: string[]) => void
  setGroupedItems: (agr0: Dictionary<CartItem[]>) => void
}

export const Step1: React.FC<Props> = ({
  fetchingData,
  selectedItems,
  groups,
  handleSelectAll,
  handleSelectGroup,
  handleUnSelectGroup,
  handleSelectItem,
  setSelectedItems,
  setGroupedItems
}) => {
  const [openRemoveItemModal, setOpenRemoveItemModal] = useState<boolean>(false)
  const [itemsToRemove, setItemsToRemove] = useState<string[]>([])

  return (
    <div>
      {fetchingData ? (
        <div className='flex items-center justify-center my-8'>
          <Spinner size='md' />
        </div>
      ) : (
        <div className='rounded-xl border-t-[3px] border-primary mt-5'>
          <div
            className={'table-wrapper relative w-full overflow-auto scrollbar-none rounded-b-xl'}
          >
            <TableItems
              selectedItems={selectedItems}
              groups={groups}
              handleSelectAll={handleSelectAll}
              handleSelectGroup={handleSelectGroup}
              handleUnSelectGroup={handleUnSelectGroup}
              handleSelectItem={handleSelectItem}
              setOpenRemoveItemModal={setOpenRemoveItemModal}
              setItemsToRemove={setItemsToRemove}
            />
          </div>
        </div>
      )}
      <RemoveCartItemModal
        isOpenModal={openRemoveItemModal}
        itemsToRemove={itemsToRemove}
        selectedItems={selectedItems}
        setItemsToRemove={setItemsToRemove}
        setOpenRemoveCartItemModal={setOpenRemoveItemModal}
        setSelectedItems={setSelectedItems}
        setGroupedItems={setGroupedItems}
        handleRevertQty={() => {}}
      />
    </div>
  )
}
