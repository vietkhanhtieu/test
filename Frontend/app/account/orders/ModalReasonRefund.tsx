import { InputRadio } from '@/app/ui/daisy/input-radio'
import Modal from '@/components/common/Modal'
import {
  setInitState,
  setMessage,
  setMessageDetail,
  setOrder,
  setStatus
} from '@/lib/redux/slices/refund_order'
import { RootState } from '@/lib/redux/store'
import { ChevronDownIcon } from '@/public/icons'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
  isOpenModal: boolean
  setIsOpenModal: (arg: boolean) => void
  order_id: string
}

export const ModalReasonRefund: React.FC<Props> = ({ isOpenModal, setIsOpenModal, order_id }) => {
  const refundOrder = useSelector((state: RootState) => state.refundOrders)
  const dispatch = useDispatch()

  const [showMore, setShowMore] = useState<boolean>(false)

  const listReasons = [
    'Sản phẩm bị hư hỏng/ bể vỡ',
    'Thiếu phụ kiện / quà tặng kèm',
    'Sản phẩm không giống hình ảnh / mô tả',
    'Giao sai sản phẩm',
    'Thiếu / Không nhận được sản phẩm',
    'Khác'
  ]

  const handleCloseModal = () => {
    setIsOpenModal(false)
    dispatch(setInitState())
  }

  const handleOnchange = (reason: string) => {
    dispatch(setMessage(reason))
    if (reason != 'Khác') {
      dispatch(setMessageDetail(''))
    }
  }

  const handleExchangeOrder = (tab: number) => {
    dispatch(setStatus(tab))
    setShowMore(true)
  }

  const handleTypeReason = (value: string) => {
    if (refundOrder.message == 'Khác') {
      dispatch(setMessageDetail(value))
    }
  }

  const toggleExpand = () => {
    if (checkEnable()) {
      setShowMore(!showMore)
    }
  }

  const checkEnable = () => {
    return refundOrder.status == 1 || refundOrder.status == 2
  }

  const handleConfirm = () => {
    dispatch(setOrder(order_id))
  }

  return (
    <Modal
      isOpen={isOpenModal}
      onClose={handleCloseModal}
      containerClass='flex flex-col justify-center items-center w-[561px] max-w-[561px] min-h-0 pt-2 pb-8 pl-x gap-[15px] max-h-full'
    >
      <div className='absolute right-[18px] top-[18px]'>
        <Image
          alt='crossIcon'
          src={'/icons/cross.svg'}
          width={11}
          height={11}
          className='cursor-pointer !h-[11px]'
          onClick={handleCloseModal}
        />
      </div>
      <div className='w-full h-[31px]'></div>
      <div className='flex flex-col items-center gap-[25px]'>
        {!checkEnable() && (
          <Image
            alt='crossIcon'
            src={'/icons/attention-ico.svg'}
            width={52}
            height={52}
            className='cursor-pointer '
          />
        )}
        <span className='text-24 font-bold'>Bạn muốn đổi hay trả hàng?</span>
        <div className='flex w-[343px] gap-[35px]'>
          <button
            className={`h-10 w-[154px] px-6 pt-2.5 pb-[9px] text-14 font-medium rounded-[10px] ${refundOrder.status == 1 ? 'bg-primary text-white' : 'border border-dusty-gray'}`}
            onClick={() => handleExchangeOrder(1)}
          >
            Đổi hàng
          </button>
          <button
            className={`h-10 w-[154px] px-6 pt-2.5 pb-[9px] text-14 font-medium rounded-[10px] ${refundOrder.status == 2 ? 'bg-primary text-white' : 'border border-dusty-gray'}`}
            onClick={() => handleExchangeOrder(2)}
          >
            Trả hàng
          </button>
        </div>
        <div
          className={`flex justify-center items-center gap-2.5 ${checkEnable() ? '' : 'opacity-40'}`}
          onClick={toggleExpand}
        >
          <span className='text-14'>{showMore ? 'Thu gọn' : 'Mở rộng'}</span>
          <Image
            alt='crossIcon'
            src={showMore ? '/icons/chevron-up-gray.svg' : ChevronDownIcon}
            width={8}
            height={4}
            className='cursor-pointer !h-1'
          />
        </div>
      </div>
      {showMore && checkEnable() && (
        <div className='w-full flex flex-col gap-[25px] mt-10 mx-[30px] mb-[31px]'>
          <span className='text-[24px] font-bold text-center'>Chọn lý do đổi hàng</span>
          <div className='flex flex-col w-full'>
            <div className='flex flex-col pl-[22px] gap-2.5'>
              {listReasons.map((reason: string, index: number) => {
                return (
                  <div className='flex justify-start items-center cursor-pointer gap-3' key={index}>
                    <InputRadio
                      name='reason'
                      value={reason}
                      checked={refundOrder.message == reason}
                      onChange={() => handleOnchange(reason)}
                    />
                    <span
                      onClick={() => handleOnchange(reason)}
                      className={`text-14 font-medium ${refundOrder.message == reason && 'text-primary'}`}
                    >
                      {reason}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className='w-full'>
              {refundOrder.message == 'Khác' ? (
                <textarea
                  placeholder='Mời bạn điền lý do tại đây...'
                  className='w-full rounded-lg font-12px h-[81px] text-14 py-[15px] px-5 focus:outline-none bg-athens-gray-solid mt-[5px]'
                  onChange={(e) => handleTypeReason(e.target.value)}
                ></textarea>
              ) : null}
            </div>
          </div>
          <div className='w-full flex justify-center'>
            <Link href={`/account/orders/returns/${order_id}`}>
              <button
                className='w-[330px] h-10 rounded-[10px] py-2.5 px-6 bg-primary text-white font-medium'
                onClick={handleConfirm}
              >
                Xác nhận
              </button>
            </Link>
          </div>
        </div>
      )}
    </Modal>
  )
}
