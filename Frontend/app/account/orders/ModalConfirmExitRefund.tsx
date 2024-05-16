import Modal from '@/components/common/Modal'
import { setInitState } from '@/lib/redux/slices/refund_order'
import Image from 'next/image'
import { useDispatch } from 'react-redux'

interface Props {
  isOpenModal: boolean
  setIsOpenModal: (arg: boolean) => void
  handleConfirmNavigation: (arg: boolean) => void
}

export const ModalConfirmExitRefund: React.FC<Props> = ({
  isOpenModal,
  setIsOpenModal,
  handleConfirmNavigation
}) => {
  const dispatch = useDispatch()

  const handleExit = () => {
    handleConfirmNavigation(true)
    dispatch(setInitState())
  }

  const handleContinue = () => {
    handleConfirmNavigation(false)
  }

  return (
    <>
      <Modal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        containerClass='flex flex-col w-[560px] max-w-[560px] h-[315px] px-[30px] py-10 gap-[30px] items-center'
      >
        <div className='flex flex-col w-[445px] gap-[30px] items-center'>
          <div className='flex flex-col gap-2.5 items-center'>
            <div className='flex flex-col gap-2.5 items-center'>
              <Image
                alt='crossIcon'
                src={'/icons/attention-ico.svg'}
                width={52}
                height={52}
                className='cursor-pointer m-1'
              />
              <span className='text-[30px] font-bold leading-[35px]'>
                Bạn có muốn tiếp tục không?
              </span>
            </div>
            <span className='text-[20px] leading-[30px]'>
              Nếu chọn Thoát thì những thông tin sẽ mất
            </span>
          </div>
          <div className='flex gap-[15px]'>
            <button
              className='h-[60px] w-[215px] border-2 border-primary px-4 py-3 text-primary text-[25px] font-bold rounded-[10px]'
              onClick={handleExit}
            >
              Thoát
            </button>
            <button
              className='h-[60px] w-[215px] bg-primary px-4 py-3 text-white text-[25px] font-medium rounded-[10px]'
              onClick={handleContinue}
            >
              Tiếp tục
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
