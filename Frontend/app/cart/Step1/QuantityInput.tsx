import Spinner from '@/components/ui/spinner'
import axios from '@/lib/axios'
import { ZALO_URL } from '@/lib/constants'
import {
  addStatusUpdating,
  removeStatusUpdating,
  updateQuantity
} from '@/lib/redux/slices/user_cart'
import { RootState } from '@/lib/redux/store'
import Image from 'next/image'
import Link from 'next/link'
import { ChangeEvent, KeyboardEventHandler, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'

import RemoveCartItemModal from './RemoveCartItemModal'

interface Props {
  qty: number
  item: any
  selectedItems: string[]
  setOpenRemoveItemModal: (agr0: boolean) => void
  setItemsToRemove: (agr0: string[]) => void
}

export const QuantityInput: React.FC<Props> = ({
  qty,
  item,
  selectedItems,
  setOpenRemoveItemModal,
  setItemsToRemove
}) => {
  const isInitialMount = useRef(true)
  const dispatch = useDispatch()
  const { shouldCheckStock, exceedStockItems } = useSelector((state: RootState) => state.userCart)

  const [quantity, setQuantity] = useState<number>(qty)
  const [initQuantity, setInitQuantity] = useState<number>(qty)
  const [debouncedValue, setDebouncedValue] = useState<number>(0)
  const [updating, setUpdating] = useState<boolean>(false)
  const [reachedLimit, setReachedLimit] = useState<boolean>(false)
  const [focusing, setFocusing] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [itemsToDelete, setItemsToDelete] = useState<string[]>([])

  useEffect(() => {
    const updateQuantityRequest = async () => {
      dispatch(addStatusUpdating(item.key))
      setUpdating(true)
      const dataParams = {
        key: item.key,
        quantity: debouncedValue
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/cart/update`,
        dataParams
      )

      const data = response.data.data

      if (response.data.message === 'Successfully') {
        dispatch(
          updateQuantity({
            ...dataParams,
            total_amount: data.total_amount,
            total_quantity: data.total_quantity
          })
        )
      }
      setInitQuantity(debouncedValue)
      dispatch(removeStatusUpdating(item.key))
      setUpdating(false)
    }

    // these conditions and implements are used to prevent calling update quantity request many time on mounting component
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      if (debouncedValue > 0 && debouncedValue === quantity && !focusing && !updating) {
        updateQuantityRequest()
      }
    }
  }, [debouncedValue])

  const checkReachedLimit = (q: number) => {
    if (q > item.stock_quantity) {
      setReachedLimit(true)
      return true
    } else if (q < item.stock_quantity && reachedLimit) {
      setReachedLimit(false)
      return false
    }
  }

  useEffect(() => {
    if (quantity === 0 && !focusing) {
      handleConfirmToRemove()
    }
  }, [quantity])

  useEffect(() => {
    if (quantity !== qty) {
      setQuantity(qty)
    }
  }, [qty])

  // useEffect(() => {
  //   checkReachedLimit(quantity)
  // }, [shouldCheckStock])

  const callback = useDebouncedCallback((newQuantity: number) => {
    if (newQuantity !== debouncedValue) {
      setDebouncedValue(newQuantity)
    }
  }, 1000)

  const handleIncrement = () => {
    let q = quantity || 0
    const isReachedLimit = checkReachedLimit(q + 1)

    if (updating || isReachedLimit) {
      return true
    }

    setQuantity(q + 1)
    callback(q + 1)
  }

  const handleDecrement = () => {
    let q = quantity || 0
    checkReachedLimit(q - 1)

    if (quantity === 0 || updating) {
      return true
    }
    setQuantity(q - 1)
    callback(q - 1)
  }

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    let newValue = parseInt(target.value)

    let newValueInStr = target.value

    if (newValueInStr.length > 1 && /^0/.test(newValueInStr)) {
      newValueInStr = newValueInStr.replace(/^0/, '')
      newValue = parseInt(newValueInStr)
      target.setAttribute('value', newValueInStr)

      console.log(newValueInStr)
      console.log(newValue)
      console.log(target.value)
    }

    if (newValue === 0 || Number.isNaN(newValue)) {
      // handle when change quantity to zero here
      setQuantity(newValue)
    } else {
      if (newValue < item.stock_quantity) {
        setQuantity(newValue)
        callback(newValue)
        setReachedLimit(false)
      } else {
        setQuantity(item.stock_quantity)
        callback(item.stock_quantity)
        setReachedLimit(true)
      }
    }
  }

  const handleRemoveItem = () => {
    setItemsToRemove([item.key])
    setOpenRemoveItemModal(true)
  }

  const handleConfirmToRemove = () => {
    setOpenDeleteModal(true)
    setItemsToDelete([item.key])
  }

  const updateQuantityRequest = async () => {
    dispatch(addStatusUpdating(item.key))
    setUpdating(true)
    const dataParams = {
      key: item.key,
      quantity: quantity
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/cart/update`,
      dataParams
    )

    const data = response.data.data

    if (response.data.message === 'Successfully') {
      dispatch(
        updateQuantity({
          ...dataParams,
          total_amount: data.total_amount,
          total_quantity: data.total_quantity
        })
      )
    }
    setInitQuantity(quantity)
    dispatch(removeStatusUpdating(item.key))
    setUpdating(false)
  }

  const handleOnBlurInput = () => {
    setFocusing(false)
    if (initQuantity !== quantity && quantity > 0) {
      updateQuantityRequest()
    } else if (quantity === 0 || Number.isNaN(quantity)) {
      handleConfirmToRemove()
    }
  }

  const handleRevertQty = () => {
    setQuantity(1)
    callback(1)
  }

  const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      setFocusing(false)
      if (initQuantity !== quantity && quantity > 0) {
        updateQuantityRequest()
      } else if (quantity === 0 || Number.isNaN(quantity)) {
        handleConfirmToRemove()
      }
    }
  }

  return (
    <>
      {!shouldCheckStock && reachedLimit && item.stock_status === 'instock' && (
        <p className='text-red text-12 leading-[14px] mb-1'>
          Đặt tối đa {item.stock_quantity} sản phẩm
        </p>
      )}
      {shouldCheckStock &&
        !exceedStockItems.includes(item.id) &&
        reachedLimit &&
        item.stock_status === 'instock' && (
          <p className='text-red text-12 leading-[14px] mb-1'>
            Đặt tối đa {item.stock_quantity} sản phẩm
          </p>
        )}
      {shouldCheckStock &&
        exceedStockItems.includes(item.id) &&
        selectedItems.includes(item.key) &&
        item.stock_status === 'instock' && (
          <p className='text-red text-[11px] leading-[14px] mb-1'>
            Còn {item.stock_quantity} sản phẩm
          </p>
        )}
      <div className='flex items-center'>
        {item.stock_status === 'instock' ? (
          <div className='flex flex-col'>
            {shouldCheckStock &&
              selectedItems.includes(item.key) &&
              !reachedLimit &&
              !exceedStockItems.includes(item.id) &&
              item.stock_status === 'instock' && (
                <p className='text-red text-[11px] leading-[14px] mb-1 text-center'>Còn hàng</p>
              )}
            <div className='flex justify-center'>
              <div
                className='w-5 h-6 bg-neo-tokyo-grey rounded-s-[30px] flex items-center justify-center cursor-pointer'
                onClick={handleDecrement}
              >
                <Image
                  alt='decrease'
                  src='/icons/minus-ico.svg'
                  width={9}
                  height={6}
                  className='cursor-pointer'
                />
              </div>
              <input
                type='number'
                value={quantity}
                max={parseInt(item.stock_quantity)}
                onChange={handleChangeQuantity}
                disabled={updating}
                onFocus={() => setFocusing(true)}
                onBlur={handleOnBlurInput}
                onKeyUp={(e) => handleKeyUp(e)}
                className={`w-6 h-6 lg:w-9 border-y border-neo-tokyo-grey text-center text-primary font-medium text-xs focus:outline-none ${reachedLimit ? 'bg-rose-tonic' : 'bg-white'}`}
              />
              <div
                className='w-5 h-6 bg-primary rounded-e-[30px] flex items-center justify-center cursor-pointer'
                onClick={handleIncrement}
              >
                <Image
                  alt='increase'
                  src='/icons/plus-ico.svg'
                  width={9}
                  height={6}
                  className='cursor-pointer'
                />
              </div>
            </div>
          </div>
        ) : (
          <div className='text-center'>
            <Link href={ZALO_URL} target='_blank'>
              <div className='text-12 font-semibold leading-[14px] text-dodger-blue cursor-pointer mb-[5px]'>
                Cần hỗ trợ
              </div>
            </Link>
            <div className='text-12 leading-[14px] text-primary'>Hết sản phẩm</div>
          </div>
        )}
        <div className='w-[17px] h-[17px] flex items-center ms-[18px] cursor-pointer'>
          {updating ? (
            <Spinner size='xs' className={'fill-primary text-primary'} />
          ) : (
            <Image
              alt='trash bin'
              src='/icons/trash-bin.svg'
              width={17}
              height={17}
              className='cursor-pointer h-[17px] max-w-none'
              onClick={handleRemoveItem}
            />
          )}
        </div>
      </div>
      <RemoveCartItemModal
        isOpenModal={openDeleteModal}
        itemsToRemove={itemsToDelete}
        selectedItems={selectedItems}
        revertQty={true}
        setItemsToRemove={setItemsToRemove}
        setOpenRemoveCartItemModal={setOpenDeleteModal}
        setSelectedItems={() => {}}
        setGroupedItems={() => {}}
        handleRevertQty={handleRevertQty}
      />
    </>
  )
}
