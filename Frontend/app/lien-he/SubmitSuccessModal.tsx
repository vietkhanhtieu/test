import Modal from '@/components/common/Modal'
import Image from 'next/image'
import Link from 'next/link'

interface IModalDelete {
  isOpenModal: boolean
  setOpenSubmitSuccessModal: (arg: boolean) => void
}

const SubmitSuccessModal: React.FC<IModalDelete> = ({ isOpenModal, setOpenSubmitSuccessModal }) => {
  const handleOnClose = () => {
    setOpenSubmitSuccessModal(false)
  }

  const handleOnBack = () => {
    history.back()
  }

  return (
    <Modal
      isOpen={isOpenModal}
      onClose={handleOnClose}
      containerClass='rounded-2xl py-10 px-[58px] lg:min-w-[560px] !lg:min-h-[337px] mx-2 flex flex-col justify-center items-center'
    >
      <div className='flex flex-col gap-[30px] items-center'>
        <div className='flex flex-col items-center'>
          <Image src='/assets/icon-success.svg' width={60} height={60} alt='icon-success' />
          <p className='text-[30px] leading-[35px] font-bold text-center my-[10px]'>
            Gửi liên hệ thành công
          </p>
          <p className='text-20 leading-[30px] text-normal text-center'>
            Chúng tôi sẽ hỗ trợ bạn nhanh nhất có thể!
          </p>
        </div>
        <div className='flex items-start gap-4'>
          <button
            className='w-[160px] lg:w-[215px] h-[60px] rounded-[20px] text-primary py-2.5 lg:px-[25px] border border-2 border-primary text-20 lg:text-[25px] font-bold flex items-center justify-center'
            onClick={handleOnClose}
          >
            Gửi thêm
          </button>
          <Link href='/'>
            <button className='w-[160px] lg:w-[215px] h-[60px] rounded-[20px] text-white py-2.5 lg:px-[30px] bg-primary text-20 lg:text-[25px] font-bold flex items-center justify-center'>
              Về trang chủ
            </button>
          </Link>
        </div>
      </div>
    </Modal>
  )
}

export default SubmitSuccessModal
