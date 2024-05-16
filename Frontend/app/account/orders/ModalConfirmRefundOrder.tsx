import Modal from '@/components/common/Modal'
import { ZALO_URL } from '@/lib/constants'
import { setInitState } from '@/lib/redux/slices/refund_order'
import Link from 'next/link'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { ModalReasonRefund } from './ModalReasonRefund'

interface Props {
  isOpenModal: boolean
  setIsOpenModal: (arg: boolean) => void
  order_id: string
}

export const ModalConfirmRefundOrder: React.FC<Props> = ({
  isOpenModal,
  setIsOpenModal,
  order_id
}) => {
  const dispatch = useDispatch()
  const [isOpenModalReason, setIsOpenModalReason] = useState<boolean>(false)

  const openModalReason = () => {
    setIsOpenModal(false)
    setIsOpenModalReason(true)
    dispatch(setInitState())
  }

  return (
    <>
      <Modal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        containerClass='flex flex-col w-[560px] max-w-[560px] h-[400px] px-[30px] py-10 gap-[30px]'
      >
        <div className='flex flex-col gap-2.5 items-center'>
          <span className='text-[30px] text-center font-bold leading-[35px] tracking-[-0.006em]'>
            Điều kiện đổi/trả hàng của Trung Tâm Dược Phẩm
          </span>
          <span className='text-20 leading-[30px] mx-[17px] text-center'>
            Khách hàng có nhu cầu đổi/trả hàng (Thuộc quy trình giải quyết khiếu nại), chúng tôi gửi
            bạn tham khảo&nbsp;
            <Link href='/terms-and-conditions' className='underline text-dodger-blue'>
              Quy trình đổi/trả và hoàn tiền
            </Link>
            &nbsp;để tiếp tục quy trình xin nhấn “Tôi đồng ý” hoặc liên hệ bộ phận CSKH để được hỗ
            trợ.
          </span>
        </div>
        <div className='flex gap-[15px]'>
          <Link href={ZALO_URL} target='_blank'>
            <button className='h-[60px] w-[215px] border-2 border-primary px-4 py-3 text-primary text-[25px] font-bold rounded-[10px]'>
              Liên hệ CSKH
            </button>
          </Link>
          <button
            className='h-[60px] w-[215px] bg-primary px-4 py-3 text-white text-[25px] font-medium rounded-[10px]'
            onClick={openModalReason}
          >
            Tôi đồng ý
          </button>
        </div>
      </Modal>
      <ModalReasonRefund
        isOpenModal={isOpenModalReason}
        setIsOpenModal={setIsOpenModalReason}
        order_id={order_id}
      />
    </>
  )
}
