import Modal from '@/components/common/Modal'
import Spinner from '@/components/ui/spinner'
import { removeItems } from '@/lib/redux/slices/user_cart'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

interface IModalDelete {
  isOpenModal: boolean
  itemsToRemove: string[]
  setOpenDeleteModal: (arg: boolean) => void
}

const RemoveCartModal: React.FC<IModalDelete> = ({
  isOpenModal,
  itemsToRemove,
  setOpenDeleteModal
}) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleOnClose = () => {
    setOpenDeleteModal(false)
  }

  const handleRemoveCartItems = async () => {
    setIsLoading(true)

    const dataParams = {
      key: [...itemsToRemove]
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/cart/delete`,
      dataParams
    )

    if (response.data.message === 'Successfully') {
      const data = response.data.data
      dispatch(
        removeItems({
          itemsToRemove: itemsToRemove,
          total_amount: data.total_amount,
          total_quantity: data.total_quantity
        })
      )

      setOpenDeleteModal(false)
    }

    setIsLoading(false)
  }

  return (
    <Modal
      isOpen={isOpenModal}
      onClose={handleOnClose}
      containerClass='rounded-2xl px-10 py-9 min-w-[347px] !h-[158px] !min-h-[158px] mx-2 flex flex-col justify-center items-center !z-[100]'
    >
      <div className='flex flex-col gap-[30px] items-center'>
        <span className='text-[18px] leading-[27px] text-center text-abbey'>
          Bạn muốn xoá sản phẩm này?
        </span>
        <div className='flex items-start gap-5'>
          <button
            className='w-[118px] h-[43px] rounded-[10px] text-primary py-2.5 px-[30px] border border-primary text-20 font-medium flex items-center justify-center'
            onClick={handleOnClose}
          >
            Không
          </button>
          <button
            className='w-[115px] h-[43px] rounded-[10px] text-white py-2.5 px-10 bg-primary text-20 font-semibold flex items-center justify-center'
            onClick={handleRemoveCartItems}
          >
            {isLoading ? <Spinner size='md' /> : 'Xoá'}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default RemoveCartModal
