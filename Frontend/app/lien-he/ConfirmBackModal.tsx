import Modal from '@/components/common/Modal'
import { ZALO_URL } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'

interface IModalDelete {
  isOpenModal: boolean
  setOpenConfirmBackModal: (arg: boolean) => void
}

const ConfirmBackModal: React.FC<IModalDelete> = ({ isOpenModal, setOpenConfirmBackModal }) => {
  const handleOnClose = () => {
    setOpenConfirmBackModal(false)
  }

  const handleOnBack = () => {
    history.back()
  }

  return (
    <Modal
      isOpen={isOpenModal}
      onClose={handleOnClose}
      containerClass='rounded-2xl py-10 px-[35px] lg:min-w-[560px] !lg:min-h-[337px] mx-2 flex flex-col justify-center items-center'
    >
      <div className='flex flex-col gap-[30px] items-center'>
        <div className='flex flex-col items-center'>
          <Image src='/icons/attention-ico.svg' width={52} height={52} alt='red-alert' />
          <p className='text-[30px] leading-[35px] font-bold text-center my-[10px]'>
            Rời khỏi liên hệ
          </p>
          <p className='text-20 leading-[30px] text-normal text-center'>
            Nếu quay lại thì những thông tin bạn vừa điền sẽ mất...
          </p>
        </div>
        <div className='flex items-start gap-4'>
          <button
            className='w-[160px] lg:w-[215px] h-[60px] rounded-[20px] text-primary py-2.5 lg:px-[25px] border border-2 border-primary text-20 lg:text-[25px] font-bold flex items-center justify-center'
            onClick={handleOnClose}
          >
            Đóng
          </button>
          <button
            onClick={handleOnBack}
            className='w-[160px] lg:w-[215px] h-[60px] rounded-[20px] text-white py-2.5 lg:px-[30px] bg-primary text-20 lg:text-[25px] font-bold flex items-center justify-center'
          >
            Đồng ý
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmBackModal
