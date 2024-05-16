import { ZALO_URL } from '@/lib/constants'
import { updateQuantity } from '@/lib/redux/slices/user_cart'
import { RootState } from '@/lib/redux/store'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'

interface Props {
  item: any
  handleConfirmToRemove: () => void
  updating: boolean
  setUpdating: (arg: boolean) => void
}

export const QuantityInput: React.FC<Props> = ({
  item,
  handleConfirmToRemove,
  updating,
  setUpdating
}) => {
  const isInitialMount = useRef(true)
  const dispatch = useDispatch()
  const { shouldCheckStock, exceedStockItems } = useSelector((state: RootState) => state.userCart)

  const [quantity, setQuantity] = useState<number>(item.quantity)
  const [initQuantity, setInitQuantity] = useState<number>(item.quantity)
  const [debouncedValue, setDebouncedValue] = useState<number>(0)
  const [reachedLimit, setReachedLimit] = useState<boolean>(false)
  const [focusing, setFocusing] = useState<boolean>(false)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      if (debouncedValue > 0 && debouncedValue === quantity && !focusing && !updating) {
        updateQuantityRequest()
      }
    }
  }, [debouncedValue])

  const callback = useDebouncedCallback((newQuantity: number) => {
    if (newQuantity !== debouncedValue) {
      setDebouncedValue(newQuantity)
    }
  }, 1000)

  const handleIncrement = () => {
    if (updating || reachedLimit) {
      return true
    }

    setQuantity(quantity + 1)
    callback(quantity + 1)
  }

  const handleDecrement = () => {
    if (quantity === 0 || updating) {
      return true
    }

    setQuantity(quantity - 1)
    callback(quantity - 1)
  }

  useEffect(() => {
    if (quantity === item.stock_quantity) {
      setReachedLimit(true)
    } else if (quantity < item.stock_quantity && reachedLimit) {
      setReachedLimit(false)
    }

    if (quantity === 0 && !focusing) {
      handleConfirmToRemove()
    }
  }, [quantity])

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    let newValue = parseInt(target.value)

    if (newValue === 0 || Number.isNaN(newValue)) {
      // handle when change quantity to zero here
      setQuantity(newValue)
    } else {
      if (newValue < item.stock_quantity) {
        if (newValue === 0) {
        } else {
          setQuantity(newValue)
          callback(newValue)
          setReachedLimit(false)
        }
      } else {
        setQuantity(item.stock_quantity)
        callback(item.stock_quantity)
        setReachedLimit(true)
      }
    }
  }

  const updateQuantityRequest = async () => {
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

  return (
    <div className='flex flex-col items-center'>
      {!shouldCheckStock && reachedLimit && item.stock_status === 'instock' && (
        <p className='text-red text-12 leading-[14px] mb-1'>Còn {item.stock_quantity} sản phẩm</p>
      )}
      {shouldCheckStock &&
        !exceedStockItems.includes(item.id) &&
        reachedLimit &&
        item.stock_status === 'instock' && (
          <p className='text-red text-12 leading-[14px] mb-1'>Còn {item.stock_quantity} sản phẩm</p>
        )}
      {shouldCheckStock &&
        exceedStockItems.includes(item.id) &&
        reachedLimit &&
        item.stock_status === 'instock' && (
          <p className='text-red text-[11px] leading-[14px] mb-1'>
            Còn {item.stock_quantity} sản phẩm
          </p>
        )}
      {!reachedLimit && item.stock_status === 'instock' && (
        <p className='text-red text-[11px] leading-[14px] mb-1'>Còn hàng</p>
      )}
      {item.stock_status === 'instock' ? (
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
            className={`w-10 h-6 border-y border-neo-tokyo-grey text-center font-medium text-xs focus:outline-none ${reachedLimit ? 'bg-rose-tonic text-red' : 'bg-white'}`}
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
    </div>
  )
}
