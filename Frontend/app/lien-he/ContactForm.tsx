'use client'

import { SelectComponent } from '@/components/common/Select/SelectComponent'
import { Input } from '@/components/ui/input'
import Spinner from '@/components/ui/spinner'
import axios from '@/lib/axios'
import { validateEmailOptional, validateMobilePhone } from '@/lib/validation'
import ChevronDown from '@/public/icons/svg_components/ChevronDown'
import ChevronUp from '@/public/icons/svg_components/ChevronUp'
import { useFormik } from 'formik'
import Image from 'next/image'
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react'
import { DropdownIndicatorProps, GroupBase, components } from 'react-select'
import * as Yup from 'yup'

import { IAddressLine } from '../account/business-information/interface'
import AddressDropdown from '../ui/dropdowns/AddressDropdown'
import ConfirmBackModal from './ConfirmBackModal'
import SubmitSuccessModal from './SubmitSuccessModal'

interface IOption {
  readonly value: string | number
  readonly label: string | number
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}

interface IFormData {
  fullName: string
  pronoun: string | number | null
  companyName?: string
  email: string
  phoneNumber: string
  street?: string
  houseNumber?: string
  businessType?: string
  supportContent: string
  province: IAddressLine
  district: IAddressLine
  ward: IAddressLine
}

const initAddressItem: IAddressLine = {
  id: '',
  name: ''
}

const initValue: IFormData = {
  fullName: '',
  pronoun: '',
  companyName: '',
  email: '',
  phoneNumber: '',
  street: '',
  houseNumber: '',
  businessType: '',
  supportContent: '',
  province: initAddressItem,
  district: initAddressItem,
  ward: initAddressItem
}

const ContactForm = () => {
  const [valueAddress, setValueAddress] = useState<string>('')
  const [isDirty, setIsDirty] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<IFormData>(initValue)
  const [openConfirmBackModal, setOpenConfirmBackModal] = useState<boolean>(false)
  const [openSubmitSuccessModal, setOpenSubmitSuccessModal] = useState<boolean>(false)

  const validationSchema = Yup.object().shape({
    email: validateEmailOptional(),
    phoneNumber: validateMobilePhone()
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      phoneNumber: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {}
  })

  useEffect(() => {
    if (
      formData.fullName ||
      formData.email ||
      formData.phoneNumber ||
      formData.province.id ||
      formData.district.id ||
      formData.ward.id ||
      formData.supportContent ||
      formData.companyName ||
      formData.pronoun ||
      formData.houseNumber ||
      formData.businessType ||
      formData.street
    ) {
      if (!isDirty) {
        setIsDirty(true)
      }
    } else {
      setIsDirty(false)
    }
  }, [formData])

  const pronounOptions = [
    { label: 'Anh', value: 'HE' },
    { label: 'Chị', value: 'SHE' }
  ]

  const CustomDropdownIndicator = (
    props: DropdownIndicatorProps<IOption, false, GroupBase<IOption>>
  ) => {
    return (
      <>
        <components.DropdownIndicator {...props}>
          <div
            className='select__indicator select__dropdown-indicator pe-[12px]'
            aria-hidden='true'
          >
            {props.selectProps.menuIsOpen ? (
              <ChevronUp className='!w-[18px] h-[12px]' stroke='#A7A9AC' />
            ) : (
              <ChevronDown className='!w-[18px] h-[12px]' stroke='#A7A9AC' />
            )}
          </div>
        </components.DropdownIndicator>
      </>
    )
  }

  const handleChangeInput: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const target = e.target as HTMLInputElement
    let newFormData = { ...formData } as any
    newFormData[target.name] = target.value

    if (['email', 'phoneNumber'].includes(target.name)) {
      formik.setFieldValue(target.name, target.value)
    }

    setFormData(newFormData)
  }

  const handleSetSelectedProvince = (id: string, name: string) => {
    setFormData({
      ...formData,
      province: {
        id,
        name
      },
      district: initAddressItem,
      ward: initAddressItem
    })
  }

  const handleSetSelectedDistrict = (id: string, name: string) => {
    setFormData({
      ...formData,
      district: {
        id,
        name
      },
      ward: initAddressItem
    })
  }

  const handleSetSelectedWard = (id: string, name: string) => {
    setFormData({
      ...formData,
      ward: {
        id,
        name
      }
    })
  }

  const handleBack = () => {
    if (loading) return
    if (isDirty) {
      setOpenConfirmBackModal(true)
    } else {
      history.back()
    }
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const params = new FormData()
    params.append('ho-va-ten', formData.fullName)
    params.append('email', formData.email)
    params.append('phone-number', formData.phoneNumber)
    params.append('noi-dung-ho-tro', formData.supportContent)
    params.append('company-name', formData.companyName || '')
    params.append('province-id', formData.province.id)
    params.append('district-id', formData.district.id)
    params.append('ward-id', formData.ward.id)
    params.append('house-number', formData.houseNumber || '')
    params.append('street', formData.street || '')
    params.append('business-type', formData.businessType || '')
    setLoading(true)
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/contact/submit-form-data`,
      params
    )
    if (res.data.data) {
      setOpenSubmitSuccessModal(true)
    }
    setLoading(false)
  }

  const handleOnChangePronoun = (newValue: any) => {
    setFormData({
      ...formData,
      pronoun: newValue.value
    })
  }

  const formDisabled =
    !formData.fullName ||
    !formData.email ||
    !formData.phoneNumber ||
    !formData.province.id ||
    !formData.district.id ||
    !formData.ward.id ||
    !formData.supportContent

  return (
    <>
      <div className='mt-[50px] w-full lg:px-[79px] px-0'>
        <form onSubmit={handleSubmit}>
          <div className='flex items-center mb-5'>
            <div className='w-full me-[14px]'>
              <label className='text-16 font-bold leading-[19px] mb-2 block'>
                {`Họ và Tên (`}
                <span className='text-red'>*</span>
                {`)`}
              </label>
              <Input
                className={`h-14 w-full rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 px-4 !text-16`}
                placeholder='Họ và Tên'
                value={formData.fullName}
                onChange={handleChangeInput}
                type='text'
                name='fullName'
              />
            </div>
            <div>
              <label className='text-16 font-bold leading-[19px] mb-2 block'>Danh xưng</label>
              <SelectComponent
                options={pronounOptions}
                isSearchable={false}
                value={formData.pronoun}
                placeholder='Danh xưng (Tuỳ chọn)'
                classNames={{
                  control: 'md:w-[230px] w-[100px] h-14 flex items-center !rounded-xl !border-alto',
                  menuList: '!py-1 !text-left',
                  valueContainer: '!text-left !ps-4 !text-16 ',
                  singleValue: '!text-16 !me-0'
                }}
                handleOnChange={handleOnChangePronoun}
                CustomDropdownIndicator={CustomDropdownIndicator}
              />
            </div>
          </div>
          <div className='w-full mb-5'>
            <label className='text-16 font-bold leading-[19px] mb-2 block'>
              Tên công ty / Nhà thuốc / Quầy thuốc
            </label>
            <Input
              className={`h-14 w-full rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 px-4 !text-16`}
              placeholder='Tên công ty / Nhà thuốc / Quầy thuốc (Tùy chọn)'
              type='text'
              name='companyName'
              value={formData.companyName}
              onChange={handleChangeInput}
            />
          </div>
          <div className='w-full mb-2'>
            <label className='text-16 font-bold leading-[19px] mb-2 block'>
              {`Email (`}
              <span className='text-red'>*</span>
              {`)`}
            </label>
            <Input
              className={`h-14 w-full rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 px-4 !text-16`}
              placeholder='Email'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChangeInput}
            />
            <div className='text-red text-10 leading-[12px] h-[12px]'>
              {typeof formik.errors.email === 'string' && formik.errors.email}
            </div>
          </div>
          <div className='w-full mb-2'>
            <label className='text-16 font-bold leading-[19px] mb-2 block'>
              {`Số điện thoại (`}
              <span className='text-red'>*</span>
              {`)`}
            </label>
            <Input
              className={`h-14 w-full rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 px-4 !text-16`}
              placeholder='Số điện thoại'
              type='tel'
              name='phoneNumber'
              maxLength={10}
              value={formData.phoneNumber}
              onChange={handleChangeInput}
            />
            <div className='text-red text-10 leading-[12px] h-[12px]'>
              {typeof formik.errors.phoneNumber === 'string' && formik.errors.phoneNumber}
            </div>
          </div>
          <div className='w-full mb-5'>
            <label className='!text-16 font-bold leading-[19px] mb-2 block'>
              {`Tỉnh/Thành phố; Quận/Huyện; Phường/Xã (`}
              <span className='text-red'>*</span>
              {`)`}
            </label>
            <AddressDropdown
              handleSetSelectedProvince={handleSetSelectedProvince}
              handleSetSelectedDistrict={handleSetSelectedDistrict}
              handleSetSelectedWard={handleSetSelectedWard}
              setValueAddress={setValueAddress}
              valueAddress={valueAddress}
              formData={formData}
              classInput='!w-full'
            />
          </div>
          <div className='w-full mb-5'>
            <label className='text-16 font-bold leading-[19px] mb-2 block'>Số nhà</label>
            <Input
              className={`h-14 w-full rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 px-4 !text-16`}
              placeholder='Số nhà / Tầng (Tùy chọn)'
              type='text'
              name='houseNumber'
            />
          </div>
          <div className='w-full mb-5'>
            <label className='text-16 font-bold leading-[19px] mb-2 block'>Tên đường</label>
            <Input
              className={`h-14 w-full rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 px-4 !text-16`}
              placeholder='Tên đường/ Tòa nhà/ Thôn/ Ấp (Tùy chọn)'
              type='text'
              name='street'
            />
          </div>
          <div className='w-full mb-5'>
            <label className='text-16 font-bold leading-[19px] mb-2 block'>
              Loại hình kinh doanh
            </label>
            <Input
              className={`h-14 w-full rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 px-4 !text-16`}
              placeholder='Loại hình kinh doanh (Tùy chọn)'
              type='text'
              name='businessType'
            />
          </div>
          <div className='w-full'>
            <textarea
              placeholder='Bạn cần hỗ trợ gì? (Bắt buộc)'
              className='w-full min-h-[153px] rounded-xl border border-alto text-16 px-4 py-[18px] font-normal focus:outline-none'
              onChange={handleChangeInput}
              name='supportContent'
              value={formData.supportContent}
            ></textarea>
          </div>
          <div className='flex items-center justify-center mt-[50px]'>
            <div
              onClick={handleBack}
              className='md:w-[250px] w-[150px] md:h-[65px] h-[48px] md:py-[18px] py-[16px] md:px-[53px] px-[23px] md:rounded-[32px] rounded-[20px] bg-gray-40 flex items-center justify-center hover:opacity-85 md:me-[80px] me-[20px] cursor-pointer'
            >
              <Image
                alt='arrow-back'
                src={'/assets/icon_back_button.svg'}
                width={23}
                height={18}
                className='md:me-[33px] me-[10px]'
              />
              <span className='text-white md:text-[24px] text-14 font-bold md:leading-[29px] leading-[14px]'>
                Quay lại
              </span>
            </div>
            <button
              type='submit'
              disabled={formDisabled || loading}
              className='md:w-[250px] w-[150px] md:h-[65px] h-[48px] md:py-[18px] py-[16px] md:px-[53px] px-[23px] md:rounded-[32px] rounded-[20px] bg-primary disabled:bg-gray-10 disabled:hover:opacity-100 flex items-center justify-center hover:opacity-85'
            >
              {loading ? (
                <Spinner size='md' />
              ) : (
                <span className='text-white md:text-[24px] text-14 font-bold md:leading-[29px] leading-[14px]'>
                  Gửi
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
      <ConfirmBackModal
        isOpenModal={openConfirmBackModal}
        setOpenConfirmBackModal={setOpenConfirmBackModal}
      />
      <SubmitSuccessModal
        isOpenModal={openSubmitSuccessModal}
        setOpenSubmitSuccessModal={setOpenSubmitSuccessModal}
      />
    </>
  )
}

export default ContactForm
