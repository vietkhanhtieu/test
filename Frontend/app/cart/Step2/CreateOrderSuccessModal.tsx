import Modal from '@/components/common/Modal'
import { setCurrentStep } from '@/lib/redux/slices/user_cart'
import { IconSuccess } from '@/public/icons'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

interface ICreateOrderSuccessModal {
  isOpenModal: boolean
  setOpenCreateOrderSuccessModal: (arg: boolean) => void
}

const CreateOrderSuccessModal: React.FC<ICreateOrderSuccessModal> = ({
  isOpenModal,
  setOpenCreateOrderSuccessModal
}) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleOnOrderDetail = () => {
    dispatch(setCurrentStep({ current_step: 3 }))
    setOpenCreateOrderSuccessModal(false)
  }

  const handleOnFinish = () => {
    setOpenCreateOrderSuccessModal(false)
    router.push('/')
  }

  const handleOnClose = () => {
    setOpenCreateOrderSuccessModal(false)
  }

  return (
    <Modal
      isOpen={isOpenModal}
      onClose={handleOnClose}
      containerClass='rounded-2xl pt-[50px] pb-10 px-[46px] lg:min-w-[560px] !lg:min-h-[337px] mx-2 flex flex-col justify-center items-center'
    >
      <div className='flex flex-col gap-[30px] items-center'>
        <div className='flex flex-col items-center'>
          <Image src={IconSuccess} width={57} height={57} alt='order-success' />
          <p className='text-[30px] leading-[45px] font-bold text-center my-2'>
            Đặt hàng thành công
          </p>
          <p className='text-20 leading-[30px] text-normal text-center'>
            Đơn hàng của bạn sẽ được xác nhận và xử lý trong vòng 24h.
          </p>
        </div>

        <div className='flex justify-between gap-[15px]'>
          <button
            className='w-[200px] lg:w-[215px] lg:h-[60px] rounded-[10px] border border-primary text-primary py-4 px-3 text-[25px] font-semibold flex items-center justify-center'
            onClick={handleOnFinish}
          >
            <Link href='/'>
              <span>Hoàn thành</span>
            </Link>
          </button>

          <button
            className='w-[200px] lg:w-[215px] lg:h-[60px] rounded-[10px] text-white py-3 px-4 bg-primary text-[25px] font-semibold flex items-center justify-center'
            onClick={handleOnOrderDetail}
          >
            <Link href='#'>
              <span>Xem đơn hàng</span>
            </Link>
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default CreateOrderSuccessModal
