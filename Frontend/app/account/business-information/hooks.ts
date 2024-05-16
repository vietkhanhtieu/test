'use client'

import axios from '@/lib/axios'
import { setCurrentUser } from '@/lib/redux/slices/current_user'
import { RootState } from '@/lib/redux/store'
import { BusinessInfo } from '@/lib/types/user'
import { requestValidateKeyword } from '@/lib/utils'
import { validateEmailOptional, validateLengthString, validateRequired } from '@/lib/validation'
import { AxiosResponse } from 'axios'
import { useFormik } from 'formik'
import { cloneDeep, isEmpty, isEqual } from 'lodash'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

import { IAddressLine } from '../addresses/definitions'
import { ErrorSensitiveMap, IAddressDropdown, IBusinessType, ISpecialty } from './interface'

const initialValidationSchema = Yup.object().shape({
  business_info: Yup.object().shape({
    gonsa_data: Yup.object().shape({
      email_enterprise: validateEmailOptional(),
      name: validateRequired(),
      house_number: validateRequired(),
      business_license: validateLengthString(10),
      business_cert: validateRequired(), //Required only
      gdp_license: validateRequired(), //Required only
      gdp_license_date: validateRequired(),
      operation_license: validateRequired(),
      practicing_cert_license: validateRequired()
    })
  })
})

const useBusinessInformationHooks = () => {
  const dispatch = useDispatch()
  const { user, userId } = useSelector((state: RootState) => state.currentUser)
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isGetData, setIsGetData] = useState<boolean>(true)
  const [specialty, setSpecialty] = useState<ISpecialty[]>([])
  const [businessTypes, setBusinessTypes] = useState<IBusinessType[]>([])
  const [valueAddress, setValueAddress] = useState<string>('')
  const [isShowSpecialty, setIsShowSpecialty] = useState<boolean>(false)
  const [isShowMedicalSpecialty, setIsShowMedicalSpecialty] = useState<boolean>(false)
  const [isUpdated, setIsUpdated] = useState<boolean>(false)
  const router = useRouter()
  const [disableSubmit, setDisableSubmit] = useState<boolean>(true)

  let initialValues = cloneDeep(user)

  if (initialValues.medical_specialty && typeof initialValues.medical_specialty === 'object') {
    initialValues['medical_specialty']['value'] = initialValues['medical_specialty']['id']
  } else initialValues['medical_specialty'] = { value: '' }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: () => initialValidationSchema,
    onSubmit: () => {
      handleSubmit()
    }
  })

  const initAddressItem: IAddressLine = {
    id: '',
    name: ''
  }

  let initForm: IAddressDropdown = {
    province: {
      id: formik.values.business_info?.gonsa_data?.province ?? '',
      name: ''
    },
    district: {
      id: formik.values.business_info?.gonsa_data?.district ?? '',
      name: ''
    },
    ward: {
      id: formik.values.business_info?.gonsa_data?.ward ?? '',
      name: ''
    }
  }

  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({})
  const [addressData, setAddressData] = useState<IAddressDropdown>(initForm)

  useEffect(() => {
    const fetchData = async () => {
      setIsGetData(true)

      try {
        // Fetch only if data hasn't been fetched yet
        if (!businessTypes.length || !specialty.length) {
          const [businessResponse, specialtyResponse] = await Promise.all([
            axios.post(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/business/get-business-type`
            ),
            axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/medical_specialty/list`)
          ])

          const businessData = businessResponse.data.data
          const specialtyData = specialtyResponse.data.data

          if (businessData) {
            setBusinessTypes(
              Object.values(businessData).map((item: any) => ({
                label: item.label,
                value: item.value
              }))
            )
          }

          if (specialtyData) {
            setSpecialty(
              Object.values(specialtyData).map((item: any) => ({
                value: item.id,
                name: item.name,
                label: item.label
              }))
            )
          }
        }
      } catch (error) {
        console.log('Error fetching data:', error)
      }

      setIsGetData(false)
    }

    fetchData()
  }, [businessTypes, specialty])

  useEffect(() => {
    if (
      formik.values.gonsa_type &&
      ['1', '3', '5', '7', '2', '9'].includes(formik.values.gonsa_type)
    ) {
      setIsShowSpecialty(true)
    } else {
      setIsShowSpecialty(false)
    }

    if (formik.values.gonsa_type && ['1', '3', '5', '7'].includes(formik.values.gonsa_type)) {
      setIsShowMedicalSpecialty(true)
    } else {
      setIsShowMedicalSpecialty(false)
    }
  }, [formik.values.gonsa_type])

  useEffect(() => {
    setDisableSubmit(isEqual(formik.values, initialValues))
  }, [formik.values])

  const updateGonsaDataErrors = (errors: any, isShowSpecialty: boolean) => {
    if (!isShowSpecialty && errors?.business_info?.gonsa_data) {
      const newErrors = cloneDeep(errors)

      delete newErrors.business_info?.gonsa_data?.operation_license
      delete newErrors.business_info?.gonsa_data?.practicing_cert_license

      if (isEmpty(newErrors.business_info?.gonsa_data)) {
        delete newErrors.business_info?.gonsa_data
      }

      if (isEmpty(newErrors.business_info)) {
        delete newErrors.business_info
      }

      return newErrors
    }

    return errors
  }

  useEffect(() => {
    const updatedErrors = updateGonsaDataErrors(formik.errors, isShowSpecialty)
    formik.setErrors(updatedErrors)
  }, [isShowSpecialty, formik.errors])

  const handleSubmit = async () => {
    //===* Every file field needs at least 1 uploaded file
    const requiredFileFields = ['business_premises', 'file_gdp_license', 'pharmaceutical']

    if (isShowSpecialty) {
      requiredFileFields.push('medical', 'practicing_cert')
    }

    const fileErrors = requiredFileFields.reduce((acc: any, field: string) => {
      if (formik.values.business_info[field as keyof BusinessInfo] === '#') {
        acc[field] = 'Cần tối thiểu 1 file.'
      }
      return acc
    }, {})

    if (Object.keys(fileErrors).length > 0) {
      const errors = cloneDeep(formik.errors)

      errors.business_info = {
        ...errors.business_info,
        ...fileErrors
      }

      formik.setErrors(errors)

      return
    }
    // End check file fields ===*

    setIsLoading(true)

    const appendIfNotNull = (form: FormData, fieldName: string, value: any) => {
      if (value !== null) {
        form.append(fieldName, value)
      }
    }

    if (formik.dirty && formik.values.business_info.gonsa_data !== null) {
      let form = new FormData()

      form.append('data[name]', formik.values.business_info.gonsa_data.name)
      form.append('data[province]', formik.values.business_info.gonsa_data.province)
      form.append('data[district]', formik.values.business_info.gonsa_data.district)
      form.append('data[ward]', formik.values.business_info.gonsa_data.ward)
      form.append('data[house_number]', formik.values.business_info.gonsa_data.house_number)
      form.append('data[email_enterprise]', formik.values.business_info.gonsa_data.email_enterprise)
      form.append('data[business_cert]', formik.values.business_info.gonsa_data.business_cert)
      form.append('data[business_license]', formik.values.business_info.gonsa_data.business_license)
      form.append('data[gdp_license]', formik.values.business_info.gonsa_data.gdp_license)
      form.append(
        'data[operation_license]',
        formik.values.business_info.gonsa_data.operation_license
      )
      form.append(
        'data[gdp_license_date]',
        moment(formik.values.business_info.gonsa_data.gdp_license_date).format('YYYY-MM-DD')
      )
      form.append(
        'data[practicing_cert_license]',
        formik.values.business_info.gonsa_data.practicing_cert_license
      )
      if (
        formik.values.business_info.remove_file &&
        Object.keys(formik.values.business_info.remove_file).length > 0
      ) {
        Object.entries(formik.values.business_info.remove_file).forEach(([key, value]) => {
          form.append(`remove_file[${key}]`, value)
        })
      }

      form.append('user_id', userId.toString())
      form.append('type', formik.values.gonsa_type)
      form.append('is_gpp', formik.values.is_gpp.toString())
      form.append('medical_specialty', formik.values.medical_specialty?.value as string)

      appendIfNotNull(form, 'file_gdp_license', formik.values.business_info.file_gdp_license)
      appendIfNotNull(form, 'file_gdp_license_1', formik.values.business_info.file_gdp_license_1)
      appendIfNotNull(form, 'file_gdp_license_2', formik.values.business_info.file_gdp_license_2)

      appendIfNotNull(form, 'business_premises', formik.values.business_info.business_premises)
      appendIfNotNull(form, 'business_premises_1', formik.values.business_info.business_premises_1)
      appendIfNotNull(form, 'business_premises_2', formik.values.business_info.business_premises_2)

      appendIfNotNull(form, 'pharmaceutical', formik.values.business_info.pharmaceutical)
      appendIfNotNull(form, 'pharmaceutical_1', formik.values.business_info.pharmaceutical_1)
      appendIfNotNull(form, 'pharmaceutical_2', formik.values.business_info.pharmaceutical_2)
      form.append('is_required', 'true')

      if (isShowSpecialty) {
        appendIfNotNull(form, 'practicing_cert', formik.values.business_info.practicing_cert)
        appendIfNotNull(form, 'practicing_cert_1', formik.values.business_info.practicing_cert_1)
        appendIfNotNull(form, 'practicing_cert_2', formik.values.business_info.practicing_cert_2)

        appendIfNotNull(form, 'medical', formik.values.business_info.medical)
        appendIfNotNull(form, 'medical_1', formik.values.business_info.medical_1)
        appendIfNotNull(form, 'medical_2', formik.values.business_info.medical_2)
      } else {
        appendIfNotNull(form, 'practicing_cert', '')
        appendIfNotNull(form, 'practicing_cert_1', '')
        appendIfNotNull(form, 'practicing_cert_2', '')

        appendIfNotNull(form, 'medical', '')
        appendIfNotNull(form, 'medical_1', '')
        appendIfNotNull(form, 'medical_2', '')
      }

      const validateKeywordParams = {
        paragraph: [
          formik.values.business_info.gonsa_data.name,
          formik.values.business_info.gonsa_data.email_enterprise
        ]
      }

      validateFields(validateKeywordParams)

      // Must validate all fields before update user profile
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/v1/update_customer`,
          form
        )

        if (response.data.status === 200) {
          const personalInfoResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/account/get-personal-info`
          )

          dispatch(setCurrentUser({ user: personalInfoResponse.data.data, isSignedIn: true }))
          setIsLoading(false)
          toggleModal(true)
          setTimeout(() => {
            setModalOpen(false)
            router.push('/account/business-information')
          }, 3000)
          setDisableSubmit(true)
        } else {
          setIsLoading(false)
          toggleModal(false)
          setTimeout(() => {
            setModalOpen(false)
          }, 3000)
        }
      } catch (error) {
        console.error('Error:', error)
      }
      setIsLoading(false)
    }
  }

  const toggleModal = (isSuccess: boolean) => {
    setModalOpen(!isModalOpen)
    setIsUpdated(isSuccess)
  }

  const handleSetSelectedProvince = (id: string, name: string) => {
    setAddressData({
      ...addressData,
      province: { id, name },
      district: initAddressItem,
      ward: initAddressItem
    })
    formik.setFieldValue('business_info.gonsa_data.province', id)
  }

  const handleSetSelectedDistrict = (id: string, name: string) => {
    setAddressData({
      ...addressData,
      district: { id, name },
      ward: initAddressItem
    })
    formik.setFieldValue('business_info.gonsa_data.district', id)
  }

  const handleSetSelectedWard = (id: string, name: string) => {
    setAddressData({
      ...addressData,
      ward: { id, name }
    })
    formik.setFieldValue('business_info.gonsa_data.ward', id)
  }

  const onChangeGonsaType = (newValue: any) => {
    formik.setFieldValue('gonsa_type', newValue.value)
  }

  const onChangeMedicalSpecialty = (newValue: any) => {
    formik.setFieldValue('medical_specialty', newValue)
  }

  const handleSetAddressList = (list: string[]) => {
    setAddressData({
      province: { id: addressData.province.id, name: list[0] },
      district: { id: addressData.district.id, name: list[1] },
      ward: { id: addressData.ward.id, name: list[2] }
    })
  }

  const validateFields = async (data: { paragraph: string[] }) => {
    const response = (await requestValidateKeyword(data)) as AxiosResponse<[]>

    let errorSensitive: ErrorSensitiveMap = {}
    response.data.forEach((data: { suggestedKeywords: any }, index: any) => {
      const suggestedKeywords = data.suggestedKeywords
      let key: keyof ErrorSensitiveMap | null = null
      if (suggestedKeywords.length > 0) {
        switch (index) {
          case 0:
            key = 'first_name'
            break
          case 1:
            key = 'email'
            break
          default:
            key = null
        }

        if (key) {
          let sensitiveMessage = `Từ khóa thuộc danh mục kiểm soát.`
          if (suggestedKeywords[0].replace_keyword) {
            sensitiveMessage += `. Vui lòng thay thế, Gợi ý:  ${suggestedKeywords[0].replace_keyword}`
          }
          errorSensitive[key] = sensitiveMessage
        }
      }
    })

    if (Object.keys(errorSensitive).length > 0) {
      setErrorMessage({ ...errorMessage, ...errorSensitive })
      return Promise.reject(response)
    }
    return errorSensitive
  }

  return {
    isGetData,
    businessTypes,
    formik,
    onChangeGonsaType,
    isShowSpecialty,
    isShowMedicalSpecialty,
    handleSetSelectedProvince,
    handleSetSelectedDistrict,
    handleSetSelectedWard,
    setValueAddress,
    valueAddress,
    addressData,
    handleSetAddressList,
    isUpdated,
    isModalOpen,
    toggleModal,
    handleSubmit,
    isLoading,
    specialty,
    onChangeMedicalSpecialty,
    errorMessage,
    disableSubmit
  }
}

export default useBusinessInformationHooks
