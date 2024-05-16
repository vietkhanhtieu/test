'use client'

import { InputRadio } from '@/app/ui/daisy/input-radio'
import Modal from '@/components/common/Modal'
import { Button } from '@/components/ui/button'
import CustomToggle from '@/components/ui/custom_toggle/custom_toggle'
import { Input } from '@/components/ui/input'
import Spinner from '@/components/ui/spinner'
import axios from '@/lib/axios'
import { RootState } from '@/lib/redux/store'
import { validateEmail } from '@/lib/validation'
import { useFormik } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'

export interface ITaxInfo {
  id: string | number
  customerId: string | number
  name: string
  email: string
  company: string
  taxCode: string
  address: string
  wardId: string | number
  wardName: string
  districtId: string | number
  districtName: string
  provinceId: string | number
  provinceName: string
  isDefault: boolean
}

interface ITaxInfomation {
  fromScreen?: string
  setInvoiceId?: (e: string) => void
}

const TaxInformation = (props: ITaxInfomation) => {
  const fromScreen = props.fromScreen || 'account'
  const { user } = useSelector((state: RootState) => state.currentUser)
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [defaultTaxInfo, setDefaultTaxInfo] = useState<ITaxInfo>()

  const validationSchema = Yup.object().shape({
    email: validateEmail()
  })

  const initialValues = {
    email: ''
  }

  const onSubmit = () => {
    handleSaveTaxInfo()
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit,
    validateOnChange: false
  })

  const handleSubmit = () => {
    formik.submitForm()
  }

  useEffect(() => {
    getTaxInformation()
  }, [])

  const toggleModal = () => {
    setModalOpen(!isModalOpen)
  }

  const getTaxInformation = async () => {
    setIsLoading(true)

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/account/list_user_taxes`
    )

    const data = response.data

    if (data['status'] === 200) {
      const defaultItem = data['data'].filter((item: any) => item.is_default)[0]
      if (props.setInvoiceId) {
        props.setInvoiceId(defaultItem.id)
      }
      if (defaultItem) {
        setDefaultTaxInfo({
          id: defaultItem.id,
          customerId: defaultItem.customer_id,
          name: defaultItem.name,
          email: defaultItem.email,
          company: defaultItem.company,
          taxCode: defaultItem.tax_code,
          address: defaultItem.address,
          wardId: defaultItem.ward.id,
          wardName: defaultItem.ward.name,
          districtId: defaultItem.district.id,
          districtName: defaultItem.district.name,
          provinceId: defaultItem.province.id,
          provinceName: defaultItem.province.name,
          isDefault: defaultItem.is_default
        })

        formik.setFieldValue('email', defaultItem.email)
      }
    }

    setIsLoading(false)
  }

  const fullAddress = (): string => {
    if (!defaultTaxInfo) {
      return ''
    }

    return [
      defaultTaxInfo.address,
      defaultTaxInfo.wardName,
      defaultTaxInfo.districtName,
      defaultTaxInfo.provinceName
    ].join(', ')
  }

  const handleSaveTaxInfo = async () => {
    setIsLoading(true)

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/account/update_user_tax`,
      {
        id: defaultTaxInfo?.id,
        customerId: defaultTaxInfo?.customerId,
        name: defaultTaxInfo?.name,
        email: formik.values.email,
        company: defaultTaxInfo?.company,
        tax_code: defaultTaxInfo?.taxCode,
        address: defaultTaxInfo?.address,
        province_id: defaultTaxInfo?.provinceId,
        district_id: defaultTaxInfo?.districtId,
        ward_id: defaultTaxInfo?.wardId,
        is_default: '1'
      }
    )

    const data = response.data

    if (data['status'] === 200) {
      let cloneDefaultTaxInfo = defaultTaxInfo

      if (cloneDefaultTaxInfo) {
        cloneDefaultTaxInfo.email = formik.values.email
      }

      setDefaultTaxInfo(cloneDefaultTaxInfo)

      toggleModal()
    }

    setIsLoading(false)
  }

  const renderTaxInformationFromAccount = () => {
    return (
      <>
        <div className='order-2 lg:order-1 text-16 leading-[1.172em] gap-[5px] flex flex-col'>
          <div className='text-16 lg:flex'>
            <div className='font-medium min-w-[178px]'>Tên người nhận hóa đơn:</div>
            <div className='lg:ml-[15px]'>{defaultTaxInfo?.name}</div>
          </div>

          <div className='text-16 lg:flex'>
            <div className='font-medium min-w-[178px]'>Tên doanh nghiệp:</div>
            <div className='lg:ml-[15px]'>{defaultTaxInfo?.company}</div>
          </div>

          <div className='text-16 lg:flex'>
            <div className='font-medium min-w-[178px]'>Địa chỉ:</div>
            <div className='lg:ml-[15px]'>{fullAddress()}</div>
          </div>

          <div className='text-16 lg:flex'>
            <div className='font-medium min-w-[178px]'>Mã số thuế:</div>
            <div className='lg:ml-[15px]'>{defaultTaxInfo?.taxCode}</div>
          </div>

          <div className='text-16 lg:flex'>
            <div className='font-medium min-w-[178px]'>Email nhận hóa đơn:</div>
            <div className='lg:ml-[15px]'>{defaultTaxInfo?.email}</div>
          </div>

          <div className='mt-[10px]'>
            <div className='dy-badge text-primary text-12 leading-[1.172em] py-[5px] px-[13px] bg-sazerac border-0 h-6'>
              Mặc định
            </div>
          </div>
        </div>

        <Button
          variant='link'
          onClick={toggleModal}
          className='p-0 h-full text-azure-radiance font-normal text-right order-1 lg:order-2 mt-5 lg:mt-0'
        >
          Chỉnh sửa
        </Button>
      </>
    )
  }

  const renderTaxInformationFromCart = () => {
    return (
      <>
        <div className='flex items-start'>
          <InputRadio className='!w-4 !h-4 mt-[4px]' type='radio' name='taxing' checked={true} />
          <div className='flex md:w-[450px] justify-between'>
            <div className='flex items-start self-stretch w-[278px] gap-2.5 md:flex-row flex-col'>
              <div>
                <span className='text-16 font-medium'>{defaultTaxInfo?.company}</span>
                <p className='text-14'>Mã số thuế: {defaultTaxInfo?.taxCode}</p>
                <p className='text-14'>Email: {defaultTaxInfo?.email}</p>
                <p className='text-14'>{fullAddress()}</p>
              </div>
              <span className='min-w-[67px] h-[19px] rounded-[9.5px] bg-autumn-bloom text-12 text-primary flex justify-center items-center py-0.5 px-[8px]'>
                Mặc định
              </span>
            </div>
            <span className='text-14 text-dodger-blue cursor-pointer' onClick={toggleModal}>
              Thay đổi
            </span>
          </div>
        </div>
      </>
    )
  }

  const handleToggleChange = () => {}

  return (
    <>
      {isLoading ? (
        <div className='flex items-center justify-center my-8'>
          <Spinner size='md' />
        </div>
      ) : (
        <>
          <div
            className={`${fromScreen == 'account' ? 'px-2 py-[25px] lg:px-[30px]' : ''}  flex flex-col-reverse lg:flex-row overflow-auto text-abbey justify-between`}
          >
            {fromScreen == 'cart'
              ? renderTaxInformationFromCart()
              : renderTaxInformationFromAccount()}

            <Modal
              isOpen={isModalOpen}
              onClose={toggleModal}
              containerClass='relative max-w-[562px] !pt-[40px_30px_30px] max-h-none'
            >
              <div className='absolute right-[25px] top-[25px]'>
                <Image
                  alt='crossIcon'
                  src={'/icons/cross.svg'}
                  width={15}
                  height={15}
                  className='cursor-pointer'
                  onClick={toggleModal}
                />
              </div>

              <h2 className='text-center text-24 font-bold leading-7 text-abbey'>
                Thông tin xuất hóa đơn
              </h2>

              <div className='text-left w-full mt-5'>
                <div className='mb-5'>
                  <label className='mb-1 text-16 font-medium leading-[19px]'>
                    Tên người nhận hóa đơn
                  </label>

                  <Input
                    disabled={true}
                    className={`h-14 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0`}
                    type='text'
                    placeholder='Tên người nhận hóa đơn'
                    name='tax_receiver_name'
                    value={defaultTaxInfo?.name ?? (user.display_name || user.user_display_name)}
                  />
                </div>

                <div className='mb-5'>
                  <label className='mb-1 text-16 font-medium leading-[19px]'>
                    Tên doanh nghiệp (<span className='text-red-solid'>*</span>)
                  </label>

                  <Input
                    disabled={true}
                    className={`h-14 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0`}
                    type='text'
                    placeholder='Tên doanh nghiệp'
                    name='tax_receiver_name'
                    value={defaultTaxInfo?.company}
                  />
                </div>

                <div className='mb-5'>
                  <label className='mb-1 text-16 font-medium leading-[19px]'>
                    Mã số thuế (<span className='text-red-solid'>*</span>)
                  </label>

                  <Input
                    disabled={true}
                    className={`h-14 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0`}
                    type='text'
                    placeholder='Mã số thuế'
                    name='tax_receiver_name'
                    value={defaultTaxInfo?.taxCode}
                  />
                </div>

                <div className='mb-5'>
                  <label className='mb-1 text-16 font-medium leading-[19px]'>
                    Địa chỉ công ty/doanh nghiệp (<span className='text-red-solid'>*</span>)
                  </label>

                  <Input
                    disabled={true}
                    className={`h-14 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0`}
                    type='text'
                    placeholder='Địa chỉ công ty/doanh nghiệp'
                    name='tax_receiver_name'
                    value={defaultTaxInfo?.company}
                  />
                </div>

                <div className='mb-5'>
                  <label className='mb-1 text-16 font-medium leading-[19px]'>
                    Email nhận hóa đơn (<span className='text-red-solid'>*</span>)
                  </label>

                  <div className='relative'>
                    <Input
                      className={`h-14 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0`}
                      type='text'
                      placeholder='Email nhận hóa đơn'
                      name='email'
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />

                    <Image
                      alt='Mail Icon'
                      src={'/icons/mail.svg'}
                      width={30}
                      height={20}
                      className='absolute right-[26px] top-[18px]'
                    />
                  </div>

                  {formik.errors.email ? (
                    <p className={'mt-1.5 text-14 leading-4 text-red-solid'}>
                      {formik.errors.email}
                    </p>
                  ) : (
                    ''
                  )}
                </div>

                <div className='flex justify-between'>
                  <span className='text-14 leading-[22px] text-abbey'>Thông tin mặc định</span>

                  <CustomToggle
                    checked={true}
                    handleOnChange={handleToggleChange}
                    className='cursor-not-allowed'
                  />
                </div>

                <div className='text-center mt-[25px]'>
                  <Button
                    id='loginButton'
                    className={`w-[268px] py-2.5 ${true ? 'bg-primary' : 'bg-gray-10'} rounded-[60px] text-[18px] leading-[21px] font-semibold text-white focus-visible:ring-0 focus-visible:ring-offset-0`}
                    type='submit'
                    disabled={isLoading || !!formik.errors.email}
                    onClick={handleSubmit}
                  >
                    {isLoading ? <Spinner /> : 'Lưu'}
                  </Button>
                  {isLoading && <div className='overlay'></div>}
                </div>

                <div className='w-full lg:w-[492px] mx-[5px] px-11 text-center mt-2.5 bg-peach-cream rounded-[10px]'>
                  <div className='max-w-[404px] py-2.5 text-14 leading-[21px] text-abbey'>
                    Bạn muốn thay đổi thông tin xuất hóa đơn? Vui lòng bấm vào{' '}
                    <Link
                      href='/account/business-information'
                      className='text-primary underline-offset-auto font-bold'
                    >
                      <u>Chỉnh sửa ngay</u>
                    </Link>
                    .
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </>
      )}
    </>
  )
}

export default TaxInformation
