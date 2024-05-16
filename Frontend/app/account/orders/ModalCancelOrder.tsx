import { InputRadio } from '@/app/ui/daisy/input-radio'
import Modal from '@/components/common/Modal'
import Spinner from '@/components/ui/spinner'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { ModalCancelSuccess } from './ModalCancelSuccess'

interface Props {
  isOpenModalCancel: boolean
  setIsOpenModalCancel: (arg: boolean) => void
  order: any
  listReasons: IReason[]
  syncOrder: (id: any) => void
  isLoadingFetch?: boolean
}

export interface IReason {
  code: string
  title: string
}

export const ModalCancelOrder: React.FC<Props> = ({
  isOpenModalCancel,
  setIsOpenModalCancel,
  order,
  listReasons,
  syncOrder,
  isLoadingFetch
}) => {
  const [isLoadingCancel, setIsLoadingCancel] = useState<boolean>(false)
  const [isOpenModalSuccess, setIsOpenModalSuccess] = useState<boolean>(false)
  const [selectedReason, setSelectedReason] = useState<IReason>({ code: '', title: '' })

  useEffect(() => {
    if (listReasons[0]) {
      setSelectedReason(listReasons[0])
    }
  }, [listReasons])

  const handleCloseModal = () => {
    setIsOpenModalCancel(false)
  }

  const handleOnchange = (reason: IReason) => {
    if (reason.code === 'REASON_16') {
      setSelectedReason({ code: reason.code, title: '' })
    } else {
      setSelectedReason(reason)
    }
  }

  const handleTypeReason = (value: string) => {
    setSelectedReason({
      ...selectedReason,
      title: value
    })
  }

  const handleCancelOrder = async () => {
    setIsLoadingCancel(true)
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/order-management/order_cancel`,
        {
          order_id: order?.order_id,
          message: selectedReason.title,
          code_reason: selectedReason.code
        }
      )
      const data = response.data

      if (data.message === 'Successfully') {
        setIsOpenModalCancel(false)
        setIsOpenModalSuccess(true)
        syncOrder(order?.order_id)
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoadingCancel(false)
  }

  return (
    <>
      <Modal
        isOpen={isOpenModalCancel}
        onClose={() => setIsOpenModalCancel(false)}
        containerClass='w-[438px] rounded-2xl !p-0 max-h-full'
      >
        <div className='absolute right-[16px] top-[15px]'>
          <Image
            alt='crossIcon'
            src={'/icons/cross.svg'}
            width={12}
            height={12}
            className='cursor-pointer'
            onClick={handleCloseModal}
          />
        </div>
        <div className='flex items-center justify-center h-[74px] w-full p-2.5 border-b'>
          <span className='text-[24px] leading-[27px] text-center font-bold'>Chọn lý do huỷ</span>
        </div>
        {isLoadingFetch ? (
          <div className='w-full h-full flex justify-center items-center pt-[30px]'>
            <Spinner />
          </div>
        ) : (
          <>
            {listReasons &&
              selectedReason &&
              listReasons.map((reason: IReason, index: number) => {
                return (
                  <div
                    key={index}
                    className={`w-full px-[35px] py-[17px] flex flex-col gap-1 ${reason.code === 'REASON_16' && selectedReason.code === 'REASON_16' ? '' : 'border-b'}`}
                  >
                    <div className='flex justify-start items-center cursor-pointer'>
                      <InputRadio
                        name='reason'
                        value={reason.code}
                        checked={selectedReason && selectedReason.code == reason.code}
                        onChange={() => handleOnchange(reason)}
                      />
                      <span
                        onClick={() => handleOnchange(reason)}
                        className={`text-14 leading-[21px] ${selectedReason.code == reason.code && 'text-primary'}`}
                      >
                        {reason.title}
                      </span>
                    </div>
                    <div className='w-full'>
                      {reason.code === 'REASON_16' && selectedReason.code === 'REASON_16' ? (
                        <textarea
                          placeholder='Mời bạn điền lý do tại đây...'
                          className='w-full rounded-[10px] text-gray-40 font-12px h-[79px] text-12 py-[18px] px-[19px] border border-alto focus:outline-none mb-[15px]'
                          onChange={(e) => handleTypeReason(e.target.value)}
                        ></textarea>
                      ) : null}
                    </div>
                  </div>
                )
              })}
            <button
              className={`w-[332px] h-9 bg-primary px-4 rounded-[50px] text-white font-medium text-14 mb-[47px] ${selectedReason && selectedReason.code !== 'REASON_16' && 'mt-[28px]'}`}
              onClick={handleCancelOrder}
            >
              {isLoadingCancel ? <Spinner /> : 'Xác nhận'}
            </button>
          </>
        )}
      </Modal>
      <ModalCancelSuccess
        isOpenModalSuccess={isOpenModalSuccess}
        setIsOpenModalSuccess={setIsOpenModalSuccess}
        id={order ? order.order_id : 0}
        total={order ? order.total : 0}
      />
    </>
  )
}
