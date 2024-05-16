import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface Props {
  product: any
  checked: boolean
  viewOnly?: boolean | undefined
  handleChangeQuantity?: (arg1: number, arg2: number) => void
  handleChangeLot?: (arg1: number, arg2: string) => void
}

export const Quantity: React.FC<Props> = ({
  product,
  checked,
  viewOnly,
  handleChangeQuantity,
  handleChangeLot
}) => {
  const [debouncedValue, setDebouncedValue] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(product.quantity)
  const [initQuantity, initSetQuantity] = useState<number>(product.quantity)
  const [lot, setLot] = useState<string>(product.lot)

  const callback = useDebouncedCallback((newQuantity: number) => {
    if (newQuantity !== debouncedValue) {
      setDebouncedValue(newQuantity)
    }
  }, 1000)

  const handleChangeInputQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    let newValue = parseInt(target.value)

    if (newValue === 0 || Number.isNaN(newValue)) {
      setQuantity(newValue)
    } else {
      if (newValue > product.quantity) {
        setQuantity(quantity)
        callback(quantity)
      } else {
        setQuantity(newValue)
        callback(newValue)
      }
    }
  }

  const handleOnBlurInput = () => {
    if (initQuantity !== quantity && quantity > 0) {
      setQuantity(quantity)
      if (handleChangeQuantity) handleChangeQuantity(product.product_id, quantity)
    } else if (quantity === 0 || Number.isNaN(quantity)) {
      setQuantity(initQuantity)
    }
  }

  const handleChangeInputLot = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const value = target.value
    setLot(value)
  }

  const handleOnBlurLot = () => {
    if (handleChangeLot) handleChangeLot(product.product_id, lot)
  }

  return (
    <div className='flex flex-col justify-end items-end gap-[11px]'>
      <div className='flex justify-center'>
        <div className='w-5 h-6 bg-neo-tokyo-grey rounded-s-[30px] flex items-center justify-center cursor-pointer opacity-30'>
          <Image
            alt='decrease'
            src='/icons/minus-ico.svg'
            width={6}
            height={9}
            className='cursor-pointer'
          />
        </div>
        <input
          type='number'
          value={quantity}
          disabled={viewOnly}
          onChange={handleChangeInputQuantity}
          onBlur={handleOnBlurInput}
          className={`w-[40px] h-6 lg:w-9 border-y border-neo-tokyo-grey/[.30] text-center font-medium text-12 focus:outline-none bg-white`}
        />
        <div className='w-5 h-6 bg-primary rounded-e-[30px] flex items-center justify-center cursor-pointer opacity-30'>
          <Image
            alt='increase'
            src='/icons/plus-ico.svg'
            width={6}
            height={9}
            className='cursor-pointer'
          />
        </div>
      </div>
      {(viewOnly || checked) && (
        <div className='flex md:flex-row flex-col items-center md:gap-4 gap-2'>
          <span className='text-10 text-dodger-blue'>Nhập Thông tin lô</span>
          <input
            type='text'
            disabled={viewOnly}
            className='h-6 w-[67px] border border-dashed border-black rounded-md text-center text-12'
            value={lot}
            onChange={handleChangeInputLot}
            onBlur={handleOnBlurLot}
          />
        </div>
      )}
    </div>
  )
}
