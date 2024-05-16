import LayoutSignup from '@/components/signup/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import Image from 'next/image'
import { FormEvent, MouseEventHandler, useEffect, useState } from 'react'

import { ISignupStepProps } from '.'
import './signup_form_style.css'

interface IBusinessTypeOption {
  value: string
  label: string
  description: string
}
interface IMedicalSpecialList {
  id: string
  label: string
}
const SignupFeatureStep2: React.FC<ISignupStepProps> = ({
  onNext,
  currentStep,
  formData,
  setFormData
}) => {
  const [optionBusinessTypes, setOptionBusinessTypes] = useState<IBusinessTypeOption[]>([])
  const [medicalSpecialList, setMedicalSpecialList] = useState<IMedicalSpecialList[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedBusinessType, setSelectedBusinessType] = useState<string | null>(null)
  const [renderForm, setRenderForm] = useState<string>('selectBusinessType')
  const [selectedMedicalSpecial, setSelectedMedicalSpecial] = useState<string | null>(null)

  const [disableSubmitBusinessTypeForm, setDisableSubmitBusinessTypeForm] = useState(true)

  useEffect(() => {
    setDisableSubmitBusinessTypeForm(formData.businessType.trim().length === 0)
  }, [formData])

  useEffect(() => {
    const fetchBusinessTypes = async () => {
      setLoading(true)
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/business/get-business-type`
        )
        setOptionBusinessTypes(response.data.data)
      } catch (error) {
        console.error('Failed to fetch business types:', error)
        setError('Failed to load business types.')
      } finally {
        setLoading(false)
      }
    }

    fetchBusinessTypes()

    if (formData.businessType.length > 0) {
      setSelectedBusinessType(formData.businessType)
    }
  }, [])

  useEffect(() => {
    const fetchMedicalSpecialty = async () => {
      setLoading(true)
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/medical_specialty/list`
        )
        setMedicalSpecialList(response.data.data)
      } catch (error) {
        console.error('Failed to fetch MedicalSpecialty:', error)
        setError('Failed to load MedicalSpecialty.')
      } finally {
        setLoading(false)
      }
    }

    fetchMedicalSpecialty()
  }, [selectedBusinessType])

  const handleSubmitBusinessType = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (selectedBusinessType) {
      if (selectedBusinessType && [1, 5, 3, 7].includes(parseInt(selectedBusinessType))) {
        setRenderForm('selectMedicalSpecial')
        setError(null)
      } else {
        setFormData({
          ...formData,
          medialSpecialLabel: '',
          medialSpecial: null
        })
        setSelectedMedicalSpecial(null)
        onNext()
      }
    } else {
      setError('Vui lòng chọn loại tài khoản')
    }
  }

  const handleChangeBusinessType = (e: {
    target: { name: any; value: any; getAttribute: any }
  }) => {
    const value = e.target.value
    setSelectedBusinessType(value)
    setFormData({
      ...formData,
      businessType: value,
      businessTypeLabel: e.target.getAttribute('label-text')
    })
  }
  const handleChangeMedicalSpecial = (e: {
    target: { name: any; value: any; getAttribute: any }
  }) => {
    const value = e.target.value
    setSelectedMedicalSpecial(value)
    setFormData({
      ...formData,
      medialSpecialLabel: e.target.getAttribute('label-text'),
      medialSpecial: value
    })
  }
  const handleSubmitmedicalSpecialy = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (selectedMedicalSpecial == null) {
      setSelectedMedicalSpecial(Object.values(medicalSpecialList)[0].id)
      setFormData({
        ...formData,
        medialSpecial: Object.values(medicalSpecialList)[0].id
      })
    }
    onNext()
  }
  const handleClickBack: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault()
    setRenderForm('selectBusinessType')
  }

  const renderSelectBusinessType = () => {
    return (
      <div className='md:w-[603px] mx-auto mt-[5px]'>
        <div className='mb-5 flex flex-col items-center'>
          <h1 className='mb-[50px] text-3xl font-bold text-primary'> Phân loại tài khoản</h1>
          <div className='text-lg'>
            <p className='text-14 font-medium'>
              Chào mừng bạn đến với chúng tôi. Hãy đăng ký và trở thành một trong những khách hàng
              tiềm năng với nhiều ưu đãi từ trung tâm dược phẩm.
            </p>
          </div>
        </div>
        <hr />
        <div>
          <p className='mt-5 text-xl text-primary text-18 font-medium'>
            {' '}
            Lựa chọn tài khoản đăng ký.
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmitBusinessType}>
            <div className='mt-3 grid grid-cols-2 gap-4 md:grid-cols-2'>
              {Object.keys(optionBusinessTypes).map((k: any) => (
                <label
                  key={optionBusinessTypes[k].value}
                  className='flex items-center gap-3 text-sm'
                >
                  <Input
                    className='radio-business-type h-[26px] w-[26px]'
                    type='radio'
                    name='businessType'
                    value={optionBusinessTypes[k].value}
                    label-text={optionBusinessTypes[k].label}
                    checked={optionBusinessTypes[k].value == formData.businessType}
                    onChange={handleChangeBusinessType}
                  />
                  {optionBusinessTypes[k].label}
                </label>
              ))}
            </div>
            {error && <p className='text-error-message mt-3 text-red '>{error}</p>}
            <div className='mt-3 grid grid-cols-1 text-orange-600 md:grid-cols-1'>
              <p className='text-14'>
                {selectedBusinessType && Object.values(optionBusinessTypes).length > 0
                  ? Object.values(optionBusinessTypes).filter(
                      (item) => item.value === selectedBusinessType
                    )[0].description
                  : null}
              </p>
            </div>
            <div className='mt-3 grid grid-cols-1 md:grid-cols-1'>
              <div className='flex items-center justify-between'>
                <div></div>
                <div>
                  <Button
                    type='submit'
                    className={`rounded-[50px] border-0 px-[34px] py-[18px] w-[249px] h-[64px] text-2xl font-black ${disableSubmitBusinessTypeForm ? 'bg-gray-200' : 'bg-primary'}`}
                    disabled={disableSubmitBusinessTypeForm}
                  >
                    <span>Tiếp theo </span>
                    <span className='ml-[55px]'>
                      {' '}
                      <Image
                        className='inline-block'
                        alt=''
                        src='/assets/icon_next_button.svg'
                        width={30}
                        height={30}
                      />{' '}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
  const renderMedicalSpecialty = () => {
    return (
      <div className='md:w-[626px] mx-auto mt-[5px]'>
        <div className='mb-10 flex flex-col items-center'>
          <div>
            <h1 className='text-2xl font-bold text-orange-500'> Chọn chuyên khoa </h1>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmitmedicalSpecialy}>
            <div className='mt-3 grid grid-cols-3 gap-4 md:grid-cols-3'>
              {Object.keys(medicalSpecialList).map((k: any, i: number) => (
                <label
                  key={medicalSpecialList[k].id}
                  className='flex items-center gap-3 text-sm font-medium'
                >
                  <Input
                    className='radio-business-type max-h-[20px] min-h-[20px] min-w-[20px] max-w-[20px]'
                    type='radio'
                    name='medicalSpecial'
                    value={medicalSpecialList[k].id}
                    label-text={medicalSpecialList[k].label}
                    checked={
                      formData.medialSpecial == null
                        ? i == 0
                        : medicalSpecialList[k].id == formData.medialSpecial
                    }
                    onChange={handleChangeMedicalSpecial}
                  />
                  {medicalSpecialList[k].label}
                </label>
              ))}
            </div>
            {error && <p className='text-error-message text-red '>{error}</p>}
            <div className='mt-5 grid grid-cols-1 md:grid-cols-1'>
              <div className='flex items-center justify-between'>
                <div>
                  <Button
                    type='button'
                    onClick={handleClickBack}
                    className='rounded-[50px] bg-gray-300 px-[34px] py-[18px] md:w-[249px] h-[64px] text-2xl font-black'
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
                    className='rounded-[50px] border-0 bg-primary px-[34px] py-[18px] md:w-[249px] h-[64px] text-2xl font-black'
                  >
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
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
  return (
    <>
      <LayoutSignup currentStep={currentStep}>
        {renderForm == 'selectMedicalSpecial'
          ? renderMedicalSpecialty()
          : renderSelectBusinessType()}
      </LayoutSignup>
    </>
  )
}

export default SignupFeatureStep2
