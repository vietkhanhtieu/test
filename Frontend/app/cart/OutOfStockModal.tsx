import Modal from '@/components/common/Modal'
import Spinner from '@/components/ui/spinner'
import { ZALO_URL } from '@/lib/constants'
import { setCurrentStep, setShouldCheckStock, setUserCart } from '@/lib/redux/slices/user_cart'
import { RootState } from '@/lib/redux/store'
import { CartItem } from '@/lib/types/user'
import axios from 'axios'
import { Dictionary, groupBy } from 'lodash'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface IModalDelete {
  isOpenModal: boolean
  setOpenOutOfStockModal: (arg: boolean) => void
  exceedStock: number[]
  selectedItems: string[]
  setGroupedItems: (agr0: Dictionary<CartItem[]>) => void
  setSelectedItems: (agr0: string[]) => void
}

const OutOfStockModal: React.FC<IModalDelete> = ({
  isOpenModal,
  exceedStock,
  selectedItems,
  setOpenOutOfStockModal,
  setGroupedItems,
  setSelectedItems
}) => {
  const dispatch = useDispatch()
  const { cart, current_step } = useSelector((state: RootState) => state.userCart)
  const [updating, setUpdating] = useState<boolean>(false)

  const handleOnClose = async () => {
    if (current_step === 1) {
      await handleOnClickUpdate()
    } else {
      dispatch(setShouldCheckStock({ shouldCheckStock: true, exceedStockItems: exceedStock }))
      setUpdating(false)
      setOpenOutOfStockModal(false)

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/cart/get`)
      if (response.data.message === 'Successfully') {
        const data = response.data.data
        setGroupedItems(groupBy(data.cart, 'supplier.name'))
        dispatch(setUserCart(data))
      }
    }
  }

  const handleOnClickUpdate = async () => {
    if (current_step === 1) {
      await handleUpdateCart()
      setOpenOutOfStockModal(false)
      setUpdating(false)
    } else {
      await handleUpdateCart()
      dispatch(setCurrentStep({ current_step: 1 }))
      setOpenOutOfStockModal(false)
      setUpdating(false)
    }
  }

  const handleUpdateCart = async () => {
    setUpdating(true)
    // update user-cart redux
    await handleUpdateCartBackground()
    // close modal
    dispatch(setShouldCheckStock({ shouldCheckStock: true, exceedStockItems: exceedStock }))
  }

  const handleUpdateCartBackground = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/cart/get`)
    if (response.data.message === 'Successfully') {
      const data = response.data.data
      setGroupedItems(groupBy(data.cart, 'supplier.name'))
      dispatch(setUserCart(data))

      let newSetSelectedItems = selectedItems.filter((k) => {
        let foundItem = data.cart.find((c: { key: string }) => c.key === k)
        return foundItem.stock_status === 'instock' || foundItem.stock_quantity > 0
      })
      setSelectedItems(newSetSelectedItems)
    }
  }

  return (
    <Modal
      isOpen={isOpenModal}
      onClose={handleOnClose}
      containerClass='rounded-2xl px-0 pb-[29px] pt-0 w-[457px] !min-h-[262px] mx-2 flex flex-col justify-center items-center'
    >
      <div className='w-full h-[42px] flex items-center justify-end px-[15px]'>
        <Image
          alt='crossIcon'
          src={'/icons/cross.svg'}
          width={15}
          height={15}
          className='cursor-pointer'
          onClick={handleOnClose}
        />
      </div>
      <div className='flex flex-col gap-[23px] items-center px-[35px]'>
        <div className='flex flex-col items-center'>
          <Image src='/icons/attention-ico.svg' width={49} height={49} alt='attention' />
          <p className='text-20 leading-[23px] font-bold text-center mt-5 mb-[10px]'>
            Kiểm tra lại sản phẩm tồn kho
          </p>
          <p className='text-14 font-normal leading-[16px] text-center'>
            Rất tiếc, một vài sản phẩm bạn chọn đang tạm hết hàng/vượt quá số lượng hàng tồn kho.
            Xin vui lòng cập nhật lại đơn hàng
          </p>
        </div>
        <div className='flex items-start gap-4'>
          <Link href={ZALO_URL} target='_blank'>
            <button className='w-[160px] lg:w-[180px] h-[36px] rounded-[50px] text-primary py-[10px] border border-1 border-primary text-14 font-medium flex items-center justify-center'>
              Liên hệ CSKH
            </button>
          </Link>
          <button
            className='w-[160px] lg:w-[180px] h-[36px] rounded-[50px] text-white py-[10px] bg-primary text-14 font-medium flex items-center justify-center'
            onClick={handleOnClickUpdate}
            disabled={updating}
          >
            {updating ? <Spinner size='md' /> : <span>Cập nhật ngay</span>}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default OutOfStockModal
