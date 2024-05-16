import Modal from '@/components/common/Modal'
import CustomToggle from '@/components/ui/custom_toggle/custom_toggle'
import { Input } from '@/components/ui/input'
import Spinner from '@/components/ui/spinner'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import AddressDropdown from '../../ui/dropdowns/AddressDropdown'
import { IAddressLine, IFormDataRecipientInfo, IRecipientInfo } from './definitions'

interface IModalInfoReceive {
  method: string
  isOpenModal: boolean
  setOpenModalInfoReceive: (arg: boolean) => void
  formData: IFormDataRecipientInfo
  addressInfo: string
  handleSyncCreateRecipient: (infoReceive: IRecipientInfo) => void
  handleSyncUpdateRecipient: (infoOrder: IRecipientInfo) => void
}

const ModalInfoReceiveOrder: React.FC<IModalInfoReceive> = ({
  method,
  isOpenModal,
  setOpenModalInfoReceive,
  formData,
  addressInfo,
  handleSyncCreateRecipient,
  handleSyncUpdateRecipient
}) => {
  const [valueAddress, setValueAddress] = useState<string>(addressInfo)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpenModal)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [form, setForm] = useState<IFormDataRecipientInfo>(formData)
  const disable = method === 'create'
  const [isDisabled, setIsDisabled] = useState<boolean>(disable)

  const initAddressItem: IAddressLine = {
    id: '',
    name: ''
  }

  useEffect(() => {
    setIsModalOpen(isOpenModal)
    setForm(formData)
    setValueAddress(addressInfo)
  }, [isOpenModal])

  useEffect(() => {
    checkDisable()
  }, [form])

  const handleOnClose = () => {
    handleRemoveData()
    setOpenModalInfoReceive(false)
  }

  useEffect(() => {
    setForm(form)
  }, [form])

  const checkDisable = () => {
    if (
      form.name.trim().length === 0 ||
      form.phone.trim().length != 10 ||
      form.phone.trim()[0] != '0' ||
      form.addressNumber.trim().length === 0 ||
      valueAddress.trim().length === 0
    ) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }

  const handleChecked = (value: string) => {
    setForm({
      ...form,
      isDefault: value
    })
  }

  const handleSetSelectedProvince = (id: string, name: string) => {
    setForm({
      ...form,
      province: {
        id,
        name
      },
      district: initAddressItem,
      ward: initAddressItem
    })
  }

  const handleSetSelectedDistrict = (id: string, name: string) => {
    setForm({
      ...form,
      district: {
        id,
        name
      },
      ward: initAddressItem
    })
  }

  const handleSetSelectedWard = (id: string, name: string) => {
    setForm({
      ...form,
      ward: {
        id,
        name
      }
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

  const handlSelectType = (type: string) => {
    setForm({
      ...form,
      type: [type]
    })
  }

  const handleRemoveData = () => {
    setForm({
      ...formData,
      name: '',
      phone: '',
      isDefault: '0',
      addressNumber: '',
      type: ['van-phong'],
      province: initAddressItem,
      district: initAddressItem,
      ward: initAddressItem,
      note: ''
    })

    setValueAddress('')
  }

  const handleSubmitCreate = async () => {
    try {
      setIsLoading(true)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/address/create_address`,
        {
          ...form,
          is_default: form.isDefault,
          type_address: form.typeAddress,
          ward_id: form.ward.id,
          district_id: form.district.id,
          province_id: form.province.id,
          'address-number': form.addressNumber
        }
      )

      if (response.data.status === 200) {
        handleSyncCreateRecipient({
          id: response.data.data.id,
          name: form.name,
          phone: form.phone,
          isDefault: form.isDefault,
          type: form.type,
          address: form.addressNumber,
          ward: form.ward,
          district: form.district,
          province: form.province,
          note: form.note,
          typeAddress: 'RECEIVE_ADDRESS'
        })
        setIsModalOpen(false)
      }
    } catch (error) {
      console.error('Error create address:', error)
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
          type_address: form.typeAddress,
          ward_id: form.ward.id,
          district_id: form.district.id,
          province_id: form.province.id,
          'address-number': form.addressNumber
        }
      )

      if (response.data.status === 200) {
        handleSyncUpdateRecipient({
          id: form.id || '',
          name: form.name,
          phone: form.phone,
          isDefault: form.isDefault,
          type: form.type,
          address: form.addressNumber,
          ward: form.ward,
          district: form.district,
          province: form.province,
          note: form.note,
          typeAddress: 'RECEIVE_ADDRESS'
        })
        setIsModalOpen(false)
        setOpenModalInfoReceive(false)
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
      containerClass='rounded-[10px] xs:px-[35px] px-4 pb-[30px] pt-10 xs:max-w-[562px] max-w-300px xs:max-h-[800px] mx-2 flex flex-col items-start overflow-y-auto'
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
          {method === 'create' ? 'Thêm địa chỉ nhận hàng' : 'Sửa địa chỉ nhận hàng'}
        </h2>
        <div className='flex flex-col gap-5 text-abbey'>
          <div>
            <label className='mb-1 text-16 font-medium leading-[19px]'>
              Tên người nhận hàng (<span className='text-red-solid'>*</span>)
            </label>
            <Input
              className={`h-14 md:w-[492px] w-full text-[16px] rounded-[10px] focus-visible:ring-0 focus-visible:ring-offset-0 py-[18px] pl-[19px]`}
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
              className={`h-14 md:w-[492px] w-full text-[16px] rounded-[10px] focus-visible:ring-0 focus-visible:ring-offset-0 py-[18px] pl-[19px]`}
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
          <div className='w-full mb-[-20px]'>
            <label className='mb-1 text-16 font-medium leading-[19px]'>
              Tỉnh/ Thành phố; Quận/ Huyện; Phường/ Xã (<span className='text-red-solid'>*</span>)
            </label>
          </div>
          <AddressDropdown
            handleSetSelectedProvince={handleSetSelectedProvince}
            handleSetSelectedDistrict={handleSetSelectedDistrict}
            handleSetSelectedWard={handleSetSelectedWard}
            setValueAddress={setValueAddress}
            valueAddress={valueAddress}
            formData={form}
            classInput=''
          />
          <div>
            <label className='mb-1 text-16 font-medium leading-[19px]'>
              Số nhà và Tên đường (<span className='text-red-solid'>*</span>)
            </label>
            <Input
              className={`h-14 md:w-[492px] w-full text-[16px] rounded-[10px] focus-visible:ring-0 focus-visible:ring-offset-0 py-[18px] pl-[19px]`}
              type='text'
              placeholder='Số nhà và tên đường'
              name='addressNumber'
              value={form.addressNumber}
              onChange={handleOnchange}
            />
          </div>
          <div>
            <label className='mb-1 text-16 font-medium leading-[19px]'>
              Ghi chú <span className='font-normal'>(Tuỳ chọn)</span>
            </label>
            <Input
              className={`h-14 md:w-[492px] w-full text-[16px] rounded-[10px] focus-visible:ring-0 focus-visible:ring-offset-0 py-[18px] pl-[19px]`}
              type='text'
              placeholder='Số nhà và tên đường'
              name='note'
              value={form.note}
              onChange={handleOnchange}
            />
          </div>

          <div className='flex justify-between'>
            <span className='text-14 leading-[22px] text-abbey'>Loại địa chỉ</span>
            <div className='flex gap-[17px]'>
              {form.type[0] === 'nha-rieng' ? (
                <span className='w-[70px] h-[30px] text-14 pl-[20px] rounded-3xl border border-primary text-primary flex items-center relative'>
                  <span className=''>Nhà</span>
                  <Image
                    alt=''
                    src={'/icons/background-primary.svg'}
                    width={25}
                    height={25}
                    className='absolute right-[-1px] top-[-1px] z-1'
                  />
                  <Image
                    alt=''
                    src={'/icons/check-white.svg'}
                    width={8}
                    height={6}
                    className='absolute right-[3px] top-2 z-2'
                  />
                </span>
              ) : (
                <span
                  className='w-[70px] h-[30px] text-14 rounded-3xl border border-abbey flex items-center justify-center'
                  onClick={() => handlSelectType('nha-rieng')}
                >
                  Nhà
                </span>
              )}
              {form.type[0] === 'van-phong' ? (
                <span className='w-[94px] h-[30px] text-14 pl-[9px] rounded-3xl border text-primary border-primary flex items-center relative'>
                  <Image
                    alt=''
                    src={'/icons/background-primary.svg'}
                    width={25}
                    height={25}
                    className='absolute right-[-1px] top-[-1px] z-1'
                  />
                  <Image
                    alt=''
                    src={'/icons/check-white.svg'}
                    width={8}
                    height={6}
                    className='absolute right-[3px] top-2 z-2'
                  />
                  <span className='max-w-[67px]'>Văn phòng</span>
                </span>
              ) : (
                <span
                  className='w-[86px] h-[30px] text-14 rounded-3xl border border-abbey flex items-center justify-center'
                  onClick={() => handlSelectType('van-phong')}
                >
                  Văn phòng
                </span>
              )}
            </div>
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
              className={`w-[268px] h-9 px-4 ${isDisabled ? 'bg-gray-10' : 'bg-primary'} rounded-[50px] text-14 leading-[21px] font-medium text-white focus-visible:ring-0 focus-visible:ring-offset-0`}
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

export default ModalInfoReceiveOrder
