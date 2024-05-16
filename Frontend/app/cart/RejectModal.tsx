import Modal from '@/components/common/Modal'
import Spinner from '@/components/ui/spinner'
import { ZALO_URL } from '@/lib/constants'
import { removeItems } from '@/lib/redux/slices/user_cart'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

interface IModalDelete {
  isOpenModal: boolean
  setOpenRejectModal: (arg: boolean) => void
}

const RejectModal: React.FC<IModalDelete> = ({ isOpenModal, setOpenRejectModal }) => {
  const handleOnClose = () => {
    setOpenRejectModal(false)
  }

  return (
    <Modal
      isOpen={isOpenModal}
      onClose={handleOnClose}
      containerClass='rounded-2xl pt-[50px] pb-10 px-[46px] lg:min-w-[560px] !lg:min-h-[337px] mx-2 flex flex-col justify-center items-center'
    >
      <div className='flex flex-col gap-[30px] items-center'>
        <div className='flex flex-col items-center'>
          <Image src='/icons/red-attention.svg' width={72} height={72} alt='red-alert' />
          <p className='text-[30px] leading-[45px] font-bold text-center my-2'>Thông báo</p>
          <p className='text-20 leading-[30px] text-normal text-center'>
            Tài khoản của bạn chưa đủ điều kiện mua sản phẩm là Thuốc. Vui lòng liên hệ CSKH để được
            hỗ trợ.
          </p>
        </div>
        <Link href={ZALO_URL} target='_blank'>
          <button className='w-[200px] lg:w-[416px] lg:h-[60px] rounded-[50px] text-white py-2.5 px-10 bg-primary text-[25px] font-semibold flex items-center justify-center'>
            Hỗ trợ khách hàng
          </button>
        </Link>
      </div>
    </Modal>
  )
}

export default RejectModal
