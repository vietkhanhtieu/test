import { SelectComponent } from '@/components/common/Select/SelectComponent'
import LayoutSignup from '@/components/signup/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import CustomCheckbox from '@/components/ui/custom_checkbox/custom_checkbox'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItemNoChevron,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import Spinner from '@/components/ui/spinner'
import axios from 'axios'
import _ from 'lodash'
import Image from 'next/image'
import { FormEvent, MouseEventHandler, useEffect, useState } from 'react'

import { ISignupStepProps } from '.'
import ModalSignupSuccessed from './modal_signup_successed'
import './signup_form_style.css'

interface IProvinceData {
  value: string
  label: string
  items: IDistrictData
}
interface IDistrictData {
  value: string
  label: string
  province_id: string
  items: IWardData
}
interface IWardData {
  value: string
  label: string
  province_id: string
  district_id: string
}

interface IFormError {
  province?: string
  district?: string
  ward?: string
  businessName?: string
  houseNumber?: string
  acceptUpdateInformation?: string
}

interface RequestData {
  data: {
    name: string
    province: string
    district: string
    ward: string
    house_number: string
    referral_code: string | null
  }
  user_id: number | null
  type: string
  check_register: boolean
  medical_specialty?: string
}
const SignupFeatureStep3: React.FC<ISignupStepProps> = ({
  onNext,
  currentStep,
  formData,
  setFormData,
  onBack
}) => {
  const [provinceData, setProvinceData] = useState<IProvinceData[]>([])
  const [districtData, setDistrictData] = useState<IDistrictData[]>([])
  const [wardData, setWardData] = useState<IWardData[]>([])

  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)
  const [selectedDistrict, setSelectedDstrict] = useState<string | null>(null)
  const [selectedWard, setSelectedWard] = useState<string | null>(null)

  const [checkedAcceptUpdateInformation, setCheckedAcceptUpdateInformation] =
    useState<boolean>(false)

  const [isModalSignupSuccessedOpen, setIsModalSignupSuccessedOpen] = useState<boolean>(false)
  const [countdownModalSuccessed, setCountdownModalSuccessed] = useState<number | null>(null)
  const [disableSubmitForm, setDisableSubmitForm] = useState(true)

  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({
    province: '',
    district: '',
    ward: '',
    businessName: '',
    houseNumber: '',
    acceptUpdateInformation: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/address/all`
        )
        const responseData: IProvinceData = response.data.data
        const provinceArrs: IProvinceData[] = Object.values(responseData).map((value) => ({
          value: value.id,
          label: value.name,
          items: value.items
        }))

        setProvinceData(_.sortBy(provinceArrs, ['name']))
      } catch (error) {
        console.error('Failed to fetch address data:', error)
      }
    }

    fetchAddressData()
  }, [])

  useEffect(() => {
    if (selectedProvince) {
      setSelectedDstrict('')
      setDistrictData([])
      const provinceObj = provinceData.filter((item) => item.value === selectedProvince)[0]
      const districtArrs: IDistrictData[] = Object.values(provinceObj.items).map((value) => ({
        value: value.id,
        label: value.name,
        items: value.items,
        province_id: value.province_id
      }))
      setDistrictData(_.sortBy(districtArrs, ['name']))
    }
  }, [selectedProvince])

  useEffect(() => {
    if (selectedDistrict) {
      const districtObj = districtData.filter((item) => item.value === selectedDistrict)[0]
      const wardArrs: IWardData[] = Object.values(districtObj.items).map((value) => ({
        value: value.id,
        label: value.name,
        district_id: value.district_id,
        province_id: value.province_id
      }))
      setWardData(_.sortBy(wardArrs, ['name']))
    }
  }, [selectedDistrict])

  useEffect(() => {
    setDisableSubmitForm(checkDisable())
  }, [formData])

  const onProvinceChange = (value: any) => {
    setSelectedProvince(value.value)
    setSelectedDstrict('')
    setSelectedWard('')
    setDistrictData([])
    setWardData([])
    setErrorMessage((errorMessage) => ({
      ...errorMessage,
      province: ''
    }))
    setFormData({
      ...formData,
      province: value.value,
      district: '',
      ward: ''
    })
  }
  const onDistrictChange = (value: any) => {
    setSelectedDstrict(value.value)
    setSelectedWard(null)
    setWardData([])
    setErrorMessage((errorMessage) => ({
      ...errorMessage,
      district: ''
    }))
    setFormData({
      ...formData,
      district: value.value,
      ward: ''
    })
  }
  const onWardChange = (value: any) => {
    setSelectedWard(value.value)
    setErrorMessage((errorMessage) => ({
      ...errorMessage,
      ward: ''
    }))
    setFormData({
      ...formData,
      ward: value.value
    })
  }
  const checkDisable = () => {
    const { province, district, ward, businessName, houseNumber } = formData

    return (
      province.trim().length === 0 ||
      district.trim().length === 0 ||
      ward.trim().length === 0 ||
      businessName.trim().length === 0 ||
      houseNumber.trim().length === 0 ||
      !checkedAcceptUpdateInformation
    )
  }
  const handleClickBack: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault()
    setFormData({
      ...formData,
      businessName: '',
      province: '',
      district: '',
      ward: '',
      houseNumber: '',
      referralCode: ''
    })
    setErrorMessage({
      ...errorMessage,
      businessName: '',
      province: '',
      district: '',
      ward: '',
      houseNumber: '',
      referralCode: ''
    })
    onBack()
  }

  const handleChange = (e: { target: { name: any; value: any; checked: any } }) => {
    const name = e.target.name
    let value = e.target.value
    if (name == 'acceptUpdateInformation') {
      setCheckedAcceptUpdateInformation(e.target.checked)
      value = e.target.checked
    }
    setErrorMessage((errorMessage) => ({
      ...errorMessage,
      [name]: ''
    }))

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    let formErrors: IFormError = {}
    if (!checkedAcceptUpdateInformation) {
      formErrors.acceptUpdateInformation = 'Vui lòng chấp nhận điều khoản'
    }

    if (formData.province.trim().length === 0) {
      formErrors.province = 'Vui Lòng chọn Tỉnh/Thành Phố'
    }

    if (formData.district.trim().length === 0) {
      formErrors.district = 'Vui lòng chọn Quận/Huyện'
    }

    if (formData.ward.trim().length === 0) {
      formErrors.ward = 'Vui lòng chọn Phường/Xã'
    }

    if (formData.businessName.trim().length === 0) {
      formErrors.businessName = `Vui lòng nhập Tên ngắn gọn của ${formData.businessTypeLabel}`
    }
    if (formData.businessName.trim().length > 20) {
      formErrors.businessName = `Tên của ${formData.businessTypeLabel} không vượt quá 20 ký tự`
    }
    if (formData.houseNumber.trim().length === 0) {
      formErrors.houseNumber = 'Vui lòng nhập Số nhà/ Tên Đường'
    }
    setErrorMessage(formErrors as Record<string, string>)
    try {
      const areAllErrorsEmpty = Object.values(formErrors).every((value) => value === '')
      if (!areAllErrorsEmpty) {
        return
      }
      updateUser()
    } catch (error) {
      console.log('An unexpected error occurred:', error)
    }
  }

  const updateUser = async () => {
    try {
      setIsLoading(true)
      const validateKeywordParams = {
        paragraph: [formData.businessName, formData.houseNumber]
      }
      const keywordValidationResponse = await requestValidateKeyword(validateKeywordParams)
      const updateCustomerResponse = await updateCustomer()
      setCountdownModalSuccessed(5)
      setIsModalSignupSuccessedOpen(true)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      return
    }
  }
  const updateCustomer = async () => {
    let requestData: RequestData = {
      data: {
        name: formData.businessName,
        province: formData.province,
        district: formData.district,
        ward: formData.ward,
        house_number: formData.houseNumber,
        referral_code: formData.referralCode
      },
      user_id: formData.userId,
      type: formData.businessType,
      check_register: true
    }
    if (formData.medialSpecial) {
      requestData = { ...requestData, medical_specialty: formData.medialSpecial }
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/v1/update_customer`,
      requestData
    )
    if (response.data.status != 200) {
      return Promise.reject(response)
    }
    console.log('update customner', response)
    return Promise.resolve(response)
  }
  const requestValidateKeyword = async (data: { paragraph: string[] }): Promise<void> => {
    const checkValidKeywordResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/validate/keyword`,
      data
    )
    const response = checkValidKeywordResponse.data
    interface ErrorSensitiveMap {
      businessName?: string
      houseNumber?: string
    }
    let errorSensitive: ErrorSensitiveMap = {}
    response.data.forEach((data: { suggestedKeywords: any }, index: any) => {
      const suggestedKeywords = data.suggestedKeywords
      let key: keyof ErrorSensitiveMap | null = null
      if (suggestedKeywords.length > 0) {
        switch (index) {
          case 0:
            key = 'businessName'
            break
          case 1:
            key = 'houseNumber'
            break
          default:
            key = null
        }

        if (key) {
          let sensitiveMessage = `Từ khóa thuộc danh mục kiểm soát.`
          if (suggestedKeywords[0].replace_keyword) {
            sensitiveMessage += ` Vui lòng thay thế, Gợi ý: ${suggestedKeywords[0].replace_keyword}`
          }
          errorSensitive[key] = sensitiveMessage
        }
      }
    })
    if (Object.keys(errorSensitive).length > 0) {
      setErrorMessage({ ...errorMessage, ...errorSensitive })
      return Promise.reject(response)
    }
    return Promise.resolve(response)
  }
  return (
    <>
      <LayoutSignup currentStep={currentStep}>
        <div className='flex justify-center'>
          <form onSubmit={handleSubmit} className='w-[700px]'>
            <div className='mb-10 flex flex-col items-center'>
              <div>
                <h1 className='text-3xl font-bold text-orange-500'> Bổ sung thông tin</h1>
              </div>
            </div>
            <div className='mb-3'>
              <p className='font-semibold'>
                Thông Tin
                <span className='text-red'> (*)</span>
              </p>
              <Card className='mt-3 border-lighthouse shadow-none rounded-xl'>
                <CardContent className='p-[13px]'>
                  <label className='text-base'>
                    Tên ngắn gọn của {formData.businessTypeLabel} (Tối đa 20 ký tự){' '}
                  </label>
                  <Input
                    onChange={handleChange}
                    type='text'
                    name='businessName'
                    placeholder={`Tên ngắn gọn của ${formData.businessTypeLabel} (Tối đa 20 ký tự)`}
                  />
                  {errorMessage.businessName && (
                    <p className='text-error-message text-red '>{errorMessage.businessName}</p>
                  )}
                </CardContent>
              </Card>
            </div>
            <div className='mb-3'>
              <p className='font-semibold'>
                Địa chỉ
                <span className='text-red'> (*)</span>
              </p>
              <Card className='mt-3 border-lighthouse shadow-none rounded-xl'>
                <CardContent className='p-[13px]'>
                  <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
                    <div>
                      <label className='text-base'>Tỉnh/Thành Phố </label>
                      <SelectComponent
                        options={provinceData}
                        isSearchable={true}
                        value={selectedProvince}
                        handleOnChange={onProvinceChange}
                        placeholder={'Tỉnh/Thành Phố '}
                        classNames={{ control: '!rounded-xl', valueContainer: 'h-[54px]' }}
                      />
                      {errorMessage.province && (
                        <p className='text-error-message text-red '>{errorMessage.province}</p>
                      )}
                    </div>
                    <div>
                      <label className='text-base'>Quận/Huyện</label>
                      <SelectComponent
                        options={districtData}
                        isSearchable={true}
                        value={selectedDistrict}
                        handleOnChange={onDistrictChange}
                        placeholder={'Quận/Huyện'}
                        classNames={{ control: '!rounded-xl', valueContainer: 'h-[56px]' }}
                      />
                      {errorMessage.district && (
                        <p className='text-error-message text-red '>{errorMessage.district}</p>
                      )}
                    </div>
                    <div>
                      <label className='text-base'>Phường/Xã</label>
                      <SelectComponent
                        options={wardData}
                        isSearchable={true}
                        value={selectedWard}
                        handleOnChange={onWardChange}
                        placeholder={'Phường/Xã'}
                        classNames={{ control: '!rounded-xl', valueContainer: 'h-[56px]' }}
                      />
                      {errorMessage.ward && (
                        <p className='text-error-message text-red '>{errorMessage.ward}</p>
                      )}
                    </div>
                  </div>
                  <div className='mt-3 grid grid-cols-1 gap-3 md:grid-cols-1'>
                    <label className='text-base'>
                      Số nhà/ Tên Đường <span className='text-red'>(*)</span>{' '}
                    </label>
                    <Input
                      onChange={handleChange}
                      type='text'
                      name='houseNumber'
                      placeholder='Số nhà và Tên Đường'
                    />
                    {errorMessage.houseNumber && (
                      <p className='text-error-message text-red '>{errorMessage.houseNumber}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className='mb-3'>
              <p className='font-semibold'>Bạn có mã giới thiệu?</p>
              <Card className='mt-3 border-lighthouse shadow-none rounded-xl'>
                <CardContent className='p-[13px]'>
                  <label className='text-base'>Nhập mã giới thiệu bên dưới </label>
                  <Input
                    onChange={handleChange}
                    type='text'
                    name='referralCode'
                    placeholder='Ví dụ: 2201'
                  />
                </CardContent>
              </Card>
            </div>

            <div className='mt-3 grid grid-cols-1 md:grid-cols-1'>
              <label className='flex items-center justify-center'>
                <CustomCheckbox
                  name='acceptUpdateInformation'
                  label='Tôi cam kết sẽ bổ sung thông tin theo yêu cầu khi mua các sản phẩm là thuốc'
                  checked={checkedAcceptUpdateInformation}
                  handleOnChange={handleChange}
                />
              </label>
              {errorMessage.acceptUpdateInformation && (
                <p className='text-error-message text-red '>
                  {errorMessage.acceptUpdateInformation}
                </p>
              )}
            </div>
            <div className='mt-[54px] grid grid-cols-1 md:grid-cols-1'>
              <div className='flex items-center justify-between'>
                <div>
                  <Button
                    type='button'
                    onClick={handleClickBack}
                    className='rounded-[50px] border-0 bg-gray-300 md:w-[249px] h-[64px] px-[34px] py-[18px] text-2xl font-black'
                    disabled={isLoading}
                  >
                    <span className='mr-3 md:mr-[55px]'>
                      {' '}
                      <Image
                        className='inline-block'
                        alt=''
                        src='/assets/icon_back_button.svg'
                        width={30}
                        height={30}
                      />{' '}
                    </span>
                    <span>Quay lại</span>
                  </Button>
                </div>
                <div>
                  <Button
                    type='submit'
                    className={`rounded-[50px] border-0 md:w-[249px] h-[64px] px-[34px] py-[18px] text-2xl font-black ${disableSubmitForm ? 'bg-gray-200' : 'bg-primary'}`}
                    disabled={disableSubmitForm || isLoading}
                  >
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <>
                        <span>Tiếp theo </span>
                        <span className='ml-3 md:ml-[55px]'>
                          {' '}
                          <Image
                            className='inline-block'
                            alt=''
                            src='/assets/icon_next_button.svg'
                            width={30}
                            height={30}
                          />{' '}
                        </span>
                      </>
                    )}
                  </Button>
                  {isLoading && <div className='overlay'></div>}
                </div>
              </div>
            </div>
          </form>
          <ModalSignupSuccessed
            isModalSignupSuccessedOpen={isModalSignupSuccessedOpen}
            setIsModalSignupSuccessedOpen={setIsModalSignupSuccessedOpen}
            setCountdownModalSuccessed={setCountdownModalSuccessed}
            countdownModalSuccessed={countdownModalSuccessed}
          />
        </div>
      </LayoutSignup>

      {isModalSignupSuccessedOpen ? (
        <div className='pointer-events-none absolute top-0 h-full w-full bg-confetti-signup bg-cover bg-no-repeat'></div>
      ) : null}
    </>
  )
}

export default SignupFeatureStep3
