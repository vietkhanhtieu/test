import Modal from '@/components/common/Modal'
import { ZALO_URL } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'

interface IModalDelete {
  isOpenModal: boolean
  setOpenMissedInformationModal: (arg: boolean) => void
}

const MissedInformationModal: React.FC<IModalDelete> = ({
  isOpenModal,
  setOpenMissedInformationModal
}) => {
  const handleOnClose = () => {
    setOpenMissedInformationModal(false)
  }

  return (
    <Modal
      isOpen={isOpenModal}
      onClose={handleOnClose}
      containerClass='rounded-2xl px-[50px] py-10 lg:min-w-[560px] !lg:min-h-[337px] mx-2 flex flex-col justify-center items-center'
    >
      <div className='flex flex-col gap-[30px] items-center'>
        <div className='flex flex-col items-center'>
          <Image src='/icons/attention-ico.svg' width={49} height={49} alt='attention' />
          <p className='text-[30px] leading-[35px] font-bold text-center my-[10px]'>
            Vui lòng bổ sung thông tin
          </p>
          <p className='text-[20px] font-normal leading-[30px] text-center'>
            Đơn hàng của bạn có chứa sản phẩm liên quan đến Thuốc nên cần bổ sung chứng từ doanh
            nghiệp.
          </p>
        </div>
        <div className='flex items-start gap-5'>
          <Link href={'/account/business-information'}>
            <button
              className='w-[160px] lg:w-[215px] h-[60px] rounded-[10px] text-primary py-2.5 lg:px-[25px] border border-2 border-primary text-20 lg:text-[25px] font-bold flex items-center justify-center'
              onClick={handleOnClose}
            >
              Bổ sung ngay
            </button>
          </Link>
          <Link href={ZALO_URL} target='_blank'>
            <button className='w-[160px] lg:w-[215px] h-[60px] rounded-[10px] text-white py-2.5 lg:px-[30px] bg-primary text-20 lg:text-[25px] font-bold flex items-center justify-center'>
              Liên hệ hỗ trợ
            </button>
          </Link>
        </div>
      </div>
    </Modal>
  )
}

export default MissedInformationModal
