import useAddress from '@/app/account/addresses/AddressState'
import ModalInfoOrder from '@/app/account/addresses/ModalInfoOrder'
import { IOrderInfo } from '@/app/account/addresses/definitions'
import { InputRadio } from '@/app/ui/daisy/input-radio'
import Spinner from '@/components/ui/spinner'
import { PlusCircle2 } from '@/public/icons'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import ModalSelectOrderAddress from './ModalSelectOrderAddress'

interface IOrderInformation {
  selectedOrder: IOrderInfo
  setSelectedOrder: (info: IOrderInfo) => void
}

export const OrderInfo: React.FC<IOrderInformation> = ({ selectedOrder, setSelectedOrder }) => {
  const {
    handleSyncOrderCreate,
    listInfoOrder,
    handleOpenModalUpdate,
    handleOpenModalCreate,
    handleSyncOrderUpdate,
    method,
    isLoading,
    openModal,
    setOpenModal,
    formData
  } = useAddress(true)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    let defaultOrder: IOrderInfo[] = listInfoOrder.filter((item) => item.isDefault === '1')
    if (defaultOrder.length > 0) {
      setSelectedOrder(defaultOrder[0])
    } else if (listInfoOrder.length > 0) {
      setSelectedOrder(listInfoOrder[0])
    }
  }, [listInfoOrder])

  const handleOpenModalSelect = () => {
    setIsModalOpen(true)
  }

  const syncAndOpenModal = (infoOrder: IOrderInfo) => {
    handleSyncOrderUpdate(infoOrder)
    setIsModalOpen(true)
  }

  return (
    <div className='flex flex-col items-start gap-5 py-[15px] px-[30px] rounded-[10px] bg-white'>
      {isLoading ? (
        <div className='w-full flex items-center justify-center my-8'>
          <Spinner size='md' />
        </div>
      ) : (
        <div className='flex flex-col items-start gap-[15px] w-full'>
          <span className='text-20 font-medium'>
            Thông tin đặt hàng (<span className='text text-red-solid'>*</span>)
          </span>
          <div className='flex items-start w-full'>
            <InputRadio className='!w-4 !h-4 mt-1' type='radio' name='order-info' checked={true} />
            <div className='w-full'>
              <div className='flex md:w-[450px] w-full justify-between'>
                <div className='flex self-stretch min:w-[278px] gap-2.5 md:flex-row flex-col items-center'>
                  {listInfoOrder && (
                    <span className='text-16 font-bold'>
                      {selectedOrder.name}
                      <span className='font-medium'>&nbsp; | &nbsp;</span>
                      <span className='font-normal'>{selectedOrder.phone}</span>
                    </span>
                  )}
                  {selectedOrder?.isDefault === '1' && (
                    <span className='w-[67px] h-[19px] rounded-[9.5px] bg-autumn-bloom text-12 text-primary flex justify-center items-center py-0.5 px-2'>
                      Mặc định
                    </span>
                  )}
                </div>
                {selectedOrder && (
                  <span
                    className='text-14 text-dodger-blue cursor-pointer'
                    onClick={() => handleOpenModalUpdate(selectedOrder)}
                  >
                    Thay đổi
                  </span>
                )}
              </div>
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
          disabled={listInfoOrder.length < 2}
        >
          Chọn thông tin
        </button>
      </div>
      <ModalInfoOrder
        method={method}
        isOpenModal={openModal}
        setOpenModal={setOpenModal}
        formData={formData}
        handleSyncOrderCreate={handleSyncOrderCreate}
        handleSyncOrderUpdate={handleSyncOrderUpdate}
      />
      <ModalSelectOrderAddress
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        listInfoOrder={listInfoOrder}
        syncOrderUpdate={syncAndOpenModal}
      />
    </div>
  )
}
