import Modal from '@/components/common/Modal'
import { setInvalidLicenses } from '@/lib/redux/slices/user_cart'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

interface IModalDelete {
  isOpenModal: boolean
  setOpenInvalidLicensesModal: (arg: boolean) => void
}

const InvalidLicensesModal: React.FC<IModalDelete> = ({
  isOpenModal,
  setOpenInvalidLicensesModal
}) => {
  const handleOnClose = () => {
    setOpenInvalidLicensesModal(false)
  }

  const dispatch = useDispatch()
  const router = useRouter()

  const handleOnUpdate = () => {
    dispatch(setInvalidLicenses({ invalidLicenses: true }))
    router.push('/account/business-information')
  }

  return (
    <Modal
      isOpen={isOpenModal}
      onClose={handleOnClose}
      containerClass='rounded-2xl px-[58px] py-10 min-w-[560px] !min-h-[337px] mx-2 flex flex-col justify-center items-center'
    >
      <div className='flex flex-col gap-[30px] items-center'>
        <div className='flex flex-col items-center'>
          <Image src='/icons/attention-ico.svg' width={49} height={49} alt='attention' />
          <p className='text-[30px] leading-[35px] font-bold text-center my-[10px]'>
            Thông báo cập nhật giấy phép
          </p>
          <p className='text-[20px] font-normal leading-[30px] text-center'>
            Rất tiếc! Giấy phép GDP/GPP đã hết hạn.
            <br />
            Vui lòng bổ sung thông tin để tiếp tục mua hàng.
          </p>
        </div>
        <div className='flex items-start gap-5'>
          <button
            className='w-[215px] h-[60px] rounded-[10px] text-primary py-2.5 px-[30px] border border-2 border-primary text-[25px] font-bold flex items-center justify-center'
            onClick={handleOnClose}
          >
            Đóng
          </button>
          <button
            className='w-[215px] h-[60px] rounded-[10px] text-white py-2.5 px-10 bg-primary text-[25px] font-bold flex items-center justify-center'
            onClick={handleOnUpdate}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default InvalidLicensesModal
