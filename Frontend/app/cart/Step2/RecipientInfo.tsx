import useAddress from '@/app/account/addresses/AddressState'
import ModalInfoReceiveOrder from '@/app/account/addresses/ModalInfoReceive'
import { IRecipientInfo } from '@/app/account/addresses/definitions'
import { InputRadio } from '@/app/ui/daisy/input-radio'
import Spinner from '@/components/ui/spinner'
import { formatAddress } from '@/lib/utils'
import { PlusCircle2 } from '@/public/icons'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import ModalSelectRecipientAddress from './ModalSelectRecipientAddress'

interface IRecipientInformation {
  selectedRecipient: IRecipientInfo
  setSelectedRecipient: (info: IRecipientInfo) => void
}

export const RecipientInfo: React.FC<IRecipientInformation> = ({
  selectedRecipient,
  setSelectedRecipient
}) => {
  const {
    listInfoReceive,
    handleOpenModalCreateRecipientInfo,
    handleOpenModalUpdateRecipient,
    method,
    isLoading,
    openModalInfoReceive,
    setOpenModalInfoReceive,
    formRecipientInfo,
    handleSyncCreateRecipient,
    handleSyncUpdateRecipient,
    addressInfo
  } = useAddress(true)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [addressLine, setAddressLine] = useState<string>('')

  useEffect(() => {
    let defaultOrder: IRecipientInfo[] = listInfoReceive.filter((item) => item.isDefault === '1')
    if (defaultOrder.length > 0) {
      setSelectedRecipient(defaultOrder[0])
    } else if (listInfoReceive.length > 0) {
      setSelectedRecipient(listInfoReceive[0])
    }
  }, [listInfoReceive])

  useEffect(() => {
    setAddressLine(
      formatAddress(
        [
          selectedRecipient.address,
          selectedRecipient.ward ? selectedRecipient.ward.name : '',
          selectedRecipient.district ? selectedRecipient.district.name : '',
          selectedRecipient.province ? selectedRecipient.province.name : ''
        ],
        ', '
      )
    )
  }, [selectedRecipient])

  const handleOpenModalSelect = () => {
    setIsModalOpen(true)
  }

  const handleOpenModalCreate = () => {
    handleOpenModalCreateRecipientInfo()
  }

  const syncRecipientUpdate = (infoRecipient: IRecipientInfo) => {
    handleSyncUpdateRecipient(infoRecipient)
    setIsModalOpen(true)
  }

  return (
    <div className='flex flex-col items-start gap-5 py-[15px] px-[30px] rounded-[10px] bg-sazerac'>
      {isLoading ? (
        <div className='w-full flex items-center justify-center my-8'>
          <Spinner size='md' />
        </div>
      ) : (
        <div className='flex flex-col items-start gap-[15px] w-full'>
          <span className='text-20 font-medium'>
            Thông tin nhận hàng (<span className='text text-red-solid'>*</span>)
          </span>
          <div className='flex items-start w-full'>
            <InputRadio
              className='!w-4 !h-4 mt-1'
              type='radio'
              name='recipient-info'
              checked={true}
            />
            <div className='flex flex-col gap-2.5 w-full'>
              <div className='flex md:w-[450px] justify-between'>
                <div className='flex items-center self-stretch min:w-[278px] gap-2.5 md:flex-row flex-col'>
                  {listInfoReceive && (
                    <span className='text-16 font-bold'>
                      {selectedRecipient.name}
                      <span className='font-medium'>&nbsp; | &nbsp;</span>
                      <span className='font-normal'>{selectedRecipient.phone}</span>
                    </span>
                  )}
                  {selectedRecipient?.isDefault === '1' && (
                    <span className='w-[67px] h-[19px] rounded-[9.5px] bg-autumn-bloom text-12 text-primary flex justify-center items-center py-0.5 px-2'>
                      Mặc định
                    </span>
                  )}
                </div>
                {selectedRecipient && (
                  <span
                    className='text-14 text-dodger-blue cursor-pointer'
                    onClick={() => handleOpenModalUpdateRecipient(selectedRecipient)}
                  >
                    Thay đổi
                  </span>
                )}
              </div>
              <span className='text-14'>{addressLine}</span>
            </div>
          </div>
        </div>
      )}
      <div className='flex items-center gap-[15px]'>
        <button
          className='flex items-center justify-center px-4 gap-0.5 w-[120px] h-9 bg-primary text-white  rounded-[10px] text-14 font-medium cursor-pointer'
          onClick={handleOpenModalCreate}
        >
          <Image alt='' height={16} width={16} src={PlusCircle2} />
          Thêm
        </button>
        <button
          className='flex items-center justify-center px-4 gap-0.5 h-9 border border-abbey rounded-[10px] text-14 font-medium opacity-50'
          onClick={handleOpenModalSelect}
          disabled={listInfoReceive.length < 2}
        >
          Chọn thông tin
        </button>
      </div>
      <ModalInfoReceiveOrder
        isOpenModal={openModalInfoReceive}
        setOpenModalInfoReceive={setOpenModalInfoReceive}
        formData={formRecipientInfo}
        method={method}
        handleSyncCreateRecipient={handleSyncCreateRecipient}
        handleSyncUpdateRecipient={handleSyncUpdateRecipient}
        addressInfo={addressInfo}
      />
      <ModalSelectRecipientAddress
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedRecipient={selectedRecipient}
        setSelectedRecipient={setSelectedRecipient}
        listInfoReceive={listInfoReceive}
        syncRecipientUpdate={syncRecipientUpdate}
      />
    </div>
  )
}
