import Modal from '@/components/common/Modal'
import CustomToggle from '@/components/ui/custom_toggle/custom_toggle'
import { Input } from '@/components/ui/input'
import Spinner from '@/components/ui/spinner'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { IFormDataOrderInfo, IOrderInfo } from './definitions'

interface IModalInfo {
  method: string
  isOpenModal: boolean
  setOpenModal: (arg: boolean) => void
  formData: IFormDataOrderInfo
  handleSyncOrderCreate: (infoOrder: IOrderInfo) => void
  handleSyncOrderUpdate: (infoOrder: IOrderInfo) => void
}

const ModalInfoOrder: React.FC<IModalInfo> = ({
  isOpenModal,
  setOpenModal,
  formData,
  method,
  handleSyncOrderCreate,
  handleSyncOrderUpdate
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpenModal)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [form, setForm] = useState<IFormDataOrderInfo>(formData)
  const disable = method === 'create'
  const [isDisabled, setIsDisabled] = useState<boolean>(disable)

  useEffect(() => {
    setIsModalOpen(isOpenModal)
    setForm(formData)
    setIsDisabled(method === 'create')
  }, [isOpenModal])

  useEffect(() => {
    checkDisable()
  }, [form])

  const handleOnClose = () => {
    setOpenModal(false)
  }

  const handleChecked = (value: string) => {
    setForm({
      ...form,
      isDefault: value
    })
  }

  const handleOnchange = (e: { target: { name: any; value: any } }) => {
    const name = e.target.name
    let value = e.target.value
    setForm({
      ...form,
      [name]: value
    })
  }

  const checkDisable = () => {
    if (
      form.name.trim().length === 0 ||
      form.phone.trim().length != 10 ||
      form.phone.trim()[0] != '0'
    ) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }

  const handleRemoveData = () => {
    setForm({
      ...form,
      phone: '',
      name: '',
      isDefault: '0'
    })
  }

  const handleSubmitCreate = async () => {
    try {
      setIsLoading(true)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/address/create_address`,
        {
          ...form,
          is_default: form.isDefault,
          type_address: form.typeAddress
        }
      )

      if (response.data.status === 200) {
        handleSyncOrderCreate({
          id: response.data.data.id,
          name: form.name,
          phone: form.phone,
          isDefault: form.isDefault,
          typeAddress: 'ORDER_ADDRESS'
        })
        setOpenModal(false)
      }
    } catch (error) {
      console.error('Error creare address:', error)
      return []
    }
    setIsLoading(false)
  }

  const handleSubmitUpdate = async () => {
    try {
      setIsLoading(true)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/address/update_address`,
        {
          ...form,
          is_default: form.isDefault,
          type_address: form.typeAddress
        }
      )

      if (response.data.status === 200) {
        handleSyncOrderUpdate({
          id: form.id || '',
          name: form.name,
          phone: form.phone,
          isDefault: form.isDefault,
          typeAddress: 'ORDER_ADDRESS'
        })
        setOpenModal(false)
      }
    } catch (error) {
      console.error('Error update address:', error)
      return []
    }
    setIsLoading(false)
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleOnClose}
      containerClass='rounded-2xl px-[35px] pb-[30px] pt-10 xs:max-w-[572px] max-w-[300px] mx-2 flex flex-col items-start'
    >
      <div className='absolute right-[23px] top-[23px]'>
        <Image
          alt='crossIcon'
          src={'/icons/cross.svg'}
          width={15}
          height={15}
          className='cursor-pointer'
          onClick={handleOnClose}
        />
      </div>
      <div className='flex flex-col gap-[30px] w-full'>
        <h2 className='text-center text-[24px] font-semibold text-abbey'>
          {method === 'create' ? 'Thêm thông tin đặt hàng' : 'Sửa thông tin đặt hàng'}
        </h2>
        <div className='flex flex-col gap-5'>
          <div>
            <label className='mb-1 text-16 font-medium leading-[19px]'>
              Tên người nhận hàng (<span className='text-red-solid'>*</span>)
            </label>
            <Input
              className={`h-14 md:w-[502px] w-full text-[16px] rounded-[10px] focus-visible:ring-0 focus-visible:ring-offset-0 py-[18px] pl-[19px]`}
              type='text'
              placeholder='Tên người nhận hàng'
              name='name'
              value={form.name}
              onChange={handleOnchange}
            />
          </div>
          <div>
            <label className='mb-1 text-16 font-medium leading-[19px]'>
              Số điện thoại (<span className='text-red-solid'>*</span>)
            </label>
            <Input
              className={`h-14 md:w-[502px] w-full text-[16px] rounded-[10px] focus-visible:ring-0 focus-visible:ring-offset-0 py-[18px] pl-[19px]`}
              type='number'
              placeholder='Số điện thoại'
              name='phone'
              value={form.phone}
              onChange={handleOnchange}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && (e.key === 'a' || e.key === 'c' || e.key === 'v')) {
                  return
                }
                if (e.key === 'Tab') {
                  return
                }
                if (!/[0-9]/.test(e.key) && e.key !== 'Backspace') {
                  e.preventDefault()
                }
              }}
            />
          </div>
          <div className='flex justify-between'>
            <span className='text-14 leading-[22px] text-abbey'>
              Đặt làm thông tin nhận hàng mặc định
            </span>
            <CustomToggle
              checked={form.isDefault === '1'}
              handleOnChange={() => handleChecked(form.isDefault === '1' ? '0' : '1')}
              className='cursor-not-allowed'
            />
          </div>
        </div>
        {method === 'create' ? (
          <div className='text-center'>
            <button
              className={`w-[255px] h-9 px-4 ${isDisabled ? 'bg-gray-10' : 'bg-primary'} rounded-[50px] text-14 leading-[21px] font-medium text-white focus-visible:ring-0 focus-visible:ring-offset-0`}
              type='submit'
              disabled={isDisabled}
              onClick={handleSubmitCreate}
            >
              {isLoading ? <Spinner size='md' /> : 'Thêm mới'}
            </button>
          </div>
        ) : (
          <div className='text-center'>
            <div className='flex justify-center gap-4'>
              <button
                className={`w-[180px] h-9 px-4 flex justify-center items-center rounded-[50px] text-14 leading-[21px] font-medium text-primary border border-primary focus-visible:ring-0 focus-visible:ring-offset-0`}
                type='submit'
                onClick={handleRemoveData}
              >
                Xóa thông tin
              </button>
              <button
                className={`w-[180px] h-9 px-4 flex justify-center items-center ${isDisabled ? 'bg-gray-10' : 'bg-primary'} rounded-[50px] text-14 leading-[21px] font-medium text-white focus-visible:ring-0 focus-visible:ring-offset-0`}
                type='submit'
                disabled={isDisabled}
                onClick={handleSubmitUpdate}
              >
                {isLoading ? <Spinner size='md' /> : 'Lưu'}
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default ModalInfoOrder
