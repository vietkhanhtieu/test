'use client'

import Spinner from '@/components/ui/spinner'
import { formatAddress, formatPhoneNumber } from '@/lib/utils'
import { Bin, PlusCircle } from '@/public/icons'
import Image from 'next/image'
import { useState } from 'react'
import { Fragment } from 'react'

import useAddress from './AddressState'
import ModalDeleteOrder from './ModalDeleteOrder'
import ModalInfoOrder from './ModalInfoOrder'
import ModalInfoReceiveOrder from './ModalInfoReceive'
import { IOrderInfo, IRecipientInfo } from './definitions'

const AddressInfo = () => {
  const {
    listInfoOrder,
    setListInfoOrder,
    handleSyncOrderCreate,
    handleOpenModalUpdate,
    handleOpenModalCreate,
    handleSyncOrderUpdate,
    method,
    setMethod,
    isLoading,
    openModal,
    setOpenModal,
    formData,
    // Modal recipient
    listInfoReceive,
    setListInfoReceive,
    openModalInfoReceive,
    setOpenModalInfoReceive,
    handleOpenModalCreateRecipientInfo,
    handleOpenModalUpdateRecipient,
    handleSyncCreateRecipient,
    handleSyncUpdateRecipient,
    addressInfo,
    formRecipientInfo
  } = useAddress(true)

  const [openModalDeleteOrder, setOpenModalDeleteOrder] = useState<boolean>(false)
  const [orderSelectedId, setOrderSelectedId] = useState<string>('')

  const handleOpenModalDelete = (id: string, method: string) => {
    setOrderSelectedId(id)
    setOpenModalDeleteOrder(true)
    setMethod(method)
  }

  const handleSyncRemoveInfo = () => {
    const listUpdate = listInfoOrder.filter((item: IOrderInfo) => {
      return item.id != orderSelectedId
    })

    setListInfoOrder(listUpdate)
  }

  const handleSyncRemoveReceive = () => {
    const listUpdate = listInfoReceive.filter((item: IRecipientInfo) => {
      return item.id != orderSelectedId
    })

    setListInfoReceive(listUpdate)
  }

  return (
    <>
      <div className='h-[72px] flex flex-col justify-center items-start gap-5 px-[30px] border-alto border-b'>
        <span className='text-20 font-medium'>Sổ địa chỉ</span>
      </div>
      <div className='flex flex-col items-start gap-4 px-[30px] py-4'>
        <span className='font-bold text-16'>Thông tin đặt hàng</span>
      </div>
      {isLoading ? (
        <div className='px-[30px]'>
          <Spinner />
        </div>
      ) : (
        <div className='flex flex-col gap-4 w-full mb-[21px]'>
          {listInfoOrder &&
            listInfoOrder.map((info: IOrderInfo, index) => {
              return (
                <Fragment key={index}>
                  <div
                    className={`py-[15px] ml-[30px] mr-9 flex items-center justify-between ${index + 1 === listInfoOrder.length ? '' : 'border-alto border-b'}`}
                  >
                    <div className='flex flex-col gap-[9px]'>
                      <span className='font-bold'>
                        {info.name} |
                        <span className='font-normal'> {formatPhoneNumber(info.phone)}</span>
                      </span>
                      {info.isDefault === '1' && (
                        <span className='flex justify-center items-center w-[78px] h-[22px] text-12 gap-2 px-3.5 py-1 rounded-[50px] text-primary bg-sazerac'>
                          Mặc định
                        </span>
                      )}
                    </div>
                    <div className='flex flex-col items-end gap-[9px]'>
                      <span
                        className='text-14 text-dodger-blue cursor-pointer'
                        onClick={() => handleOpenModalUpdate(info)}
                      >
                        Chỉnh sửa
                      </span>
                      <Image
                        alt='Icon remove'
                        src={Bin}
                        height={15}
                        width={14}
                        className='cursor-pointer'
                        onClick={() => handleOpenModalDelete(info.id, 'remove-order')}
                      />
                    </div>
                  </div>
                </Fragment>
              )
            })}
          <div
            className='flex items-center justify-between w-[202px] h-9 rounded-[50px] border border-primary py-1.5 px-[13px] ml-[30px]'
            onClick={handleOpenModalCreate}
          >
            <span className='text-14 text-primary cursor-pointer'>Thêm địa chỉ đặt hàng</span>
            <Image
              alt='Icon Plus'
              src={PlusCircle}
              height={19}
              width={19}
              className='cursor-pointer'
            />
          </div>
        </div>
      )}
      <div className='flex flex-col items-start gap-4 px-[30px] py-4'>
        <span className='font-bold text-16'>Thông tin nhận hàng</span>
      </div>
      {isLoading ? (
        <div className='px-[30px]'>
          <Spinner />
        </div>
      ) : (
        <div className='flex flex-col gap-4 w-full mb-[21px]'>
          {listInfoReceive &&
            listInfoReceive.map((info: IRecipientInfo, index) => {
              return (
                <Fragment key={index}>
                  <div
                    className={`py-[15px] ml-[30px] mr-9 flex items-center justify-between ${index + 1 === listInfoReceive.length ? '' : 'border-alto border-b'}`}
                  >
                    <div className='flex flex-col gap-[9px]'>
                      <span className='font-bold'>
                        {info.name} |
                        <span className='font-normal'> {formatPhoneNumber(info.phone)}</span>
                      </span>
                      <span>
                        {formatAddress(
                          [info.address, info.ward?.name, info.district?.name, info.province?.name],
                          ', '
                        )}
                      </span>
                      {info.isDefault === '1' && (
                        <span className='flex justify-center items-center w-[78px] h-[22px] text-12 gap-2 px-3.5 py-1 rounded-[50px] text-primary bg-sazerac'>
                          Mặc định
                        </span>
                      )}
                    </div>
                    <div className='flex flex-col items-end gap-[9px]'>
                      <span
                        className='text-14 text-dodger-blue cursor-pointer'
                        onClick={() => handleOpenModalUpdateRecipient(info)}
                      >
                        Chỉnh sửa
                      </span>
                      <Image
                        alt='Icon remove'
                        src={Bin}
                        height={15}
                        width={14}
                        className='cursor-pointer'
                        onClick={() => handleOpenModalDelete(info.id, 'remove-Receive')}
                      />
                    </div>
                  </div>
                </Fragment>
              )
            })}
          <div
            className='flex items-center justify-between w-[202px] h-9 rounded-[50px] border border-primary py-1.5 px-[13px] ml-[30px]'
            onClick={handleOpenModalCreateRecipientInfo}
          >
            <span className='text-14 text-primary cursor-pointer'>Thêm địa chỉ nhận hàng</span>
            <Image
              alt='Icon Plus'
              src={PlusCircle}
              height={19}
              width={19}
              className='cursor-pointer'
            />
          </div>
        </div>
      )}
      <ModalInfoOrder
        method={method}
        isOpenModal={openModal}
        setOpenModal={setOpenModal}
        formData={formData}
        handleSyncOrderCreate={handleSyncOrderCreate}
        handleSyncOrderUpdate={handleSyncOrderUpdate}
      />
      <ModalDeleteOrder
        isOpenModal={openModalDeleteOrder}
        setOpenModalDeleteOrder={setOpenModalDeleteOrder}
        id={orderSelectedId}
        handleSyncRemoveInfo={handleSyncRemoveInfo}
        handleSyncRemoveReceive={handleSyncRemoveReceive}
        method={method}
      />
      <ModalInfoReceiveOrder
        isOpenModal={openModalInfoReceive}
        setOpenModalInfoReceive={setOpenModalInfoReceive}
        formData={formRecipientInfo}
        method={method}
        handleSyncCreateRecipient={handleSyncCreateRecipient}
        handleSyncUpdateRecipient={handleSyncUpdateRecipient}
        addressInfo={addressInfo}
      />
    </>
  )
}

export default AddressInfo
