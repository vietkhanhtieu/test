import useAddress from '@/app/account/addresses/AddressState'
import ModalInfoReceiveOrder from '@/app/account/addresses/ModalInfoReceive'
import { IRecipientInfo } from '@/app/account/addresses/definitions'
import { InputRadio } from '@/app/ui/daisy/input-radio'
import Modal from '@/components/common/Modal'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Fragment } from 'react'

interface ISelectModalOrder {
  isModalOpen: boolean
  setIsModalOpen: (arg: boolean) => void
  selectedRecipient: IRecipientInfo
  setSelectedRecipient: (info: IRecipientInfo) => void
  listInfoReceive: IRecipientInfo[]
  syncRecipientUpdate: (info: IRecipientInfo) => void
}

const ModalSelectRecipientAddress: React.FC<ISelectModalOrder> = ({
  isModalOpen,
  setIsModalOpen,
  selectedRecipient,
  setSelectedRecipient,
  listInfoReceive,
  syncRecipientUpdate
}) => {
  const {
    handleOpenModalUpdateRecipient,
    method,
    openModalInfoReceive,
    setOpenModalInfoReceive,
    formRecipientInfo,
    handleSyncCreateRecipient,
    addressInfo
  } = useAddress(false)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [selectedRecipientInfo, setSelectedRecipientInfo] =
    useState<IRecipientInfo>(selectedRecipient)

  useEffect(() => {
    setIsOpenModal(isModalOpen)
  }, [isModalOpen])

  useEffect(() => {
    setSelectedRecipientInfo(selectedRecipient)
  }, [selectedRecipient])

  const handleOnClose = () => {
    setIsModalOpen(false)
  }

  const handleSelectedOrder = () => {
    setSelectedRecipient(selectedRecipientInfo)
    setIsModalOpen(false)
  }

  const handleOpenModal = (recipient: IRecipientInfo) => {
    handleOpenModalUpdateRecipient(recipient)
    setIsModalOpen(false)
  }

  return (
    <>
      <Modal
        isOpen={isOpenModal}
        onClose={handleOnClose}
        containerClass='xs:w-[438px] w-[350px] max-w-[350px] mx-2 flex flex-col items-start rounded-2xl !p-0 !min-h-0'
      >
        <div className='absolute right-[15px] top-[13px]'>
          <Image
            alt='crossIcon'
            src='/icons/cross.svg'
            width={12}
            height={12}
            className='cursor-pointer'
            onClick={handleOnClose}
          />
        </div>
        <div className='w-full flex flex-col gap-7 items-center'>
          <div className='flex flex-col w-full'>
            <div className='h-[76px] w-full p-2.5 flex justify-center items-center border-b'>
              <h2 className='text-24 font-semibold text-center'>Chọn thông tin nhận hàng</h2>
            </div>
            {listInfoReceive &&
              listInfoReceive.map((recipient: IRecipientInfo, index: number) => {
                return (
                  <Fragment key={index}>
                    <div className='w-full flex gap-5 px-[35px] py-[17px] items-center border-b'>
                      <div className='flex items-center gap-2 w-[323px] '>
                        <InputRadio
                          className='!w-4 !h-4'
                          type='radio'
                          name='recipient-list'
                          checked={selectedRecipientInfo.id === recipient.id}
                          onChange={() => setSelectedRecipientInfo(recipient)}
                        />
                        <div className='flex justify-between'>
                          <div className='flex md:items-start self-stretch gap-2.5 md:flex-row flex-col'>
                            <span className='text-16 font-bold'>
                              {recipient.name}
                              <span className='font-medium'>&nbsp; | &nbsp;</span>
                              <span className='font-normal'>{recipient.phone}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <span
                        className='text-14 text-dodger-blue cursor-pointer'
                        onClick={() => handleOpenModal(recipient)}
                      >
                        Sửa
                      </span>
                    </div>
                  </Fragment>
                )
              })}
          </div>
          <button
            className='w-[236px] h-9 px-4 items-center justify-center text-white bg-primary text-14 font-medium rounded-[50px] mb-[31px]'
            onClick={handleSelectedOrder}
          >
            Chọn
          </button>
        </div>
      </Modal>
      <ModalInfoReceiveOrder
        isOpenModal={openModalInfoReceive}
        setOpenModalInfoReceive={setOpenModalInfoReceive}
        formData={formRecipientInfo}
        method={method}
        handleSyncCreateRecipient={handleSyncCreateRecipient}
        handleSyncUpdateRecipient={syncRecipientUpdate}
        addressInfo={addressInfo}
      />
    </>
  )
}

export default ModalSelectRecipientAddress
