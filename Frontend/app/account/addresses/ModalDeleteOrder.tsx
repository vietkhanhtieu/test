import Modal from '@/components/common/Modal'
import Spinner from '@/components/ui/spinner'
import axios from 'axios'
import { useEffect, useState } from 'react'

interface IModalDelete {
  id: string
  isOpenModal: boolean
  setOpenModalDeleteOrder: (arg: boolean) => void
  handleSyncRemoveInfo: () => void
  handleSyncRemoveReceive: () => void
  method: string
}

const ModalDeleteOrder: React.FC<IModalDelete> = ({
  id,
  isOpenModal,
  setOpenModalDeleteOrder,
  handleSyncRemoveInfo,
  handleSyncRemoveReceive,
  method
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpenModal)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsModalOpen(isOpenModal)
  }, [isOpenModal])

  const handleOnClose = () => {
    setOpenModalDeleteOrder(false)
  }

  const handleRemoveInfoOrder = async () => {
    try {
      setIsLoading(true)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/address/delete_address`,
        {
          id: id
        }
      )

      if (response.data.status === 200) {
        method === 'remove-order' ? handleSyncRemoveInfo() : handleSyncRemoveReceive()
        setOpenModalDeleteOrder(false)
      }
    } catch (error) {
      console.error('Error delete address:', error)
      return []
    }
    setIsLoading(false)
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleOnClose}
      containerClass='rounded-2xl px-10 py-9 pt-[30px] min-w-[347px] !min-h-[172px] mx-2 flex flex-col justify-center items-center'
    >
      <div className='flex flex-col gap-[30px] items-center'>
        <span className='text-[18px] leading-[27px] text-center text-abbey'>
          Bạn có muốn xoá thông tin này?
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
            onClick={handleRemoveInfoOrder}
          >
            {isLoading ? <Spinner size='md' /> : 'Xoá'}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalDeleteOrder
