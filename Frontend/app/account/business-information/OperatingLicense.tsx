'use client'

import { DateTimePicker } from '@/components/common/DateTimePicker'
import UploadFileComponent from '@/components/ui/UploadFileComponent'
import { Input } from '@/components/ui/input'
import { setInvalidLicenses } from '@/lib/redux/slices/user_cart'
import { RootState } from '@/lib/redux/store'
import { cn } from '@/lib/utils'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface OperatingLicenseProps {
  formik: any
  isShowSpecialty: boolean
  errorMessage: Record<string, string>
}

const OperatingLicense: React.FC<OperatingLicenseProps> = ({
  formik,
  isShowSpecialty,
  errorMessage
}) => {
  const [filesBusinessCert, setFilesBusinessCert] = useState<File[]>([])
  const [filesBusinessLicense, setFilesBusinessLicense] = useState<File[]>([])
  const [filesGdpLicense, setFilesGdpLicense] = useState<File[]>([])
  const [filesPracticingCertLicense, setFilesPracticingCertLicense] = useState<File[]>([])
  const [filesMedical, setFilesMedical] = useState<File[]>([])

  const [invalidGdpLicenseDate, setInvalidGdpLicenseDate] = useState<boolean>(false)

  const { invalidLicenses } = useSelector((state: RootState) => state.userCart)
  const { user } = useSelector((state: RootState) => state.currentUser)

  const [currentFilesBusinessCert, setCurrentFilesBusinessCert] = useState<any>([])
  const [currentFilesBusinessLicense, setCurrentFilesBusinessLicense] = useState<any>([])
  const [currentFilesGdpLicense, setCurrentFilesGdpLicense] = useState<any>([])
  const [currentFilesPracticingCertLicense, setCurrentFilesPracticingCertLicense] = useState<any>(
    []
  )
  const [currentFilesMedical, setCurrentFilesMedical] = useState<any>([])

  const collectFiles = (businessInfo: any, baseProperty: any) => {
    const files = []

    for (let i = 0; i <= 2; i++) {
      const pathProperty = `${baseProperty}${i === 0 ? '' : `_${i}`}`
      const nameProperty = `name_${pathProperty}`

      if (businessInfo[pathProperty] !== '#') {
        files.push({
          path: businessInfo[pathProperty],
          name: businessInfo[nameProperty],
          keyFile: pathProperty
        })
      }
    }

    return files
  }
  useEffect(() => {
    if (!user.business_info) return

    const { business_info: businessInfo } = user

    const filesBusinessLicense = collectFiles(businessInfo, 'business_premises')
    const filesGdpLicense = collectFiles(businessInfo, 'file_gdp_license')
    const practicing_certs = collectFiles(businessInfo, 'practicing_cert')
    const pharmaceuticals = collectFiles(businessInfo, 'pharmaceutical')
    const medicals = collectFiles(businessInfo, 'medical')

    setCurrentFilesBusinessLicense(filesBusinessLicense)
    setCurrentFilesGdpLicense(filesGdpLicense)
    setCurrentFilesBusinessCert(pharmaceuticals)
    setCurrentFilesPracticingCertLicense(practicing_certs)
    setCurrentFilesMedical(medicals)
  }, [])

  const dispatch = useDispatch()

  const renderErrorText = (errorMessage: string | undefined) =>
    errorMessage && <p className='text-error-message text-red'>{errorMessage}</p>

  const isErrorField = (isError: boolean) =>
    isError ? 'text-error-message text-red border-red bg-unbur-pink' : ''

  useEffect(() => {
    if (invalidLicenses) {
      const element = document.getElementById('gdp-licenses')
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' })

      setInvalidGdpLicenseDate(true)

      dispatch(setInvalidLicenses({ invalidLicenses: false }))
    }
  }, [invalidLicenses])

  useEffect(() => {
    const handleFileUpdates = (fileArray: File[], fileType: string) => {
      fileArray.forEach((file, index) => {
        const formKey = index > 0 ? `${fileType}_${index}` : fileType
        formik.setFieldValue(formKey, file)
      })
    }
    handleFileUpdates(filesGdpLicense, 'business_info.file_gdp_license')
    handleFileUpdates(filesPracticingCertLicense, 'business_info.practicing_cert')
    handleFileUpdates(filesBusinessLicense, 'business_info.business_premises')
    handleFileUpdates(filesBusinessCert, 'business_info.pharmaceutical')
    handleFileUpdates(filesMedical, 'business_info.medical')
  }, [
    filesBusinessCert,
    filesBusinessLicense,
    filesGdpLicense,
    filesPracticingCertLicense,
    filesMedical
  ])

  const handleFileBusinessCertChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFiles: File[] = Array.from(event.target.files || [])

    // Calculate the maximum number of new files allowed
    const maxNewFiles = Math.max(
      0,
      3 - (filesBusinessCert.length + currentFilesBusinessCert.length)
    )

    // Restrict newFiles to the allowed maximum
    const allowedFiles = newFiles.slice(0, maxNewFiles)

    setFilesBusinessCert([...filesBusinessCert, ...allowedFiles])
  }

  const handleFileBusinessLicenseChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFiles: File[] = Array.from(event.target.files || [])

    // Calculate the maximum number of new files allowed
    const maxNewFiles = Math.max(
      0,
      3 - (filesBusinessLicense.length + currentFilesBusinessLicense.length)
    )

    // Restrict newFiles to the allowed maximum
    const allowedFiles = newFiles.slice(0, maxNewFiles)

    setFilesBusinessLicense([...filesBusinessLicense, ...allowedFiles])
  }

  const handleFileGdpLicenseChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFiles: File[] = Array.from(event.target.files || [])

    const maxNewFiles = Math.max(0, 3 - (filesGdpLicense.length + currentFilesGdpLicense.length))

    const allowedFiles = newFiles.slice(0, maxNewFiles)

    setFilesGdpLicense([...filesGdpLicense, ...allowedFiles])
  }

  const handleFilePracticingCertLicenseChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFiles: File[] = Array.from(event.target.files || [])

    // Calculate the maximum number of new files allowed
    const maxNewFiles = Math.max(
      0,
      3 - (filesPracticingCertLicense.length + currentFilesPracticingCertLicense.length)
    )

    // Restrict newFiles to the allowed maximum
    const allowedFiles = newFiles.slice(0, maxNewFiles)

    setFilesPracticingCertLicense([...filesPracticingCertLicense, ...allowedFiles])
  }

  const handleFilesMedicalChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFiles: File[] = Array.from(event.target.files || [])

    // Calculate the maximum number of new files allowed
    const maxNewFiles = Math.max(0, 3 - (filesMedical.length + currentFilesMedical.length))

    // Restrict newFiles to the allowed maximum
    const allowedFiles = newFiles.slice(0, maxNewFiles)

    setFilesMedical([...filesMedical, ...allowedFiles])
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const handleChangeGdpLicense = (e: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('business_info.gonsa_data.gdp_license', e.target.value)
  }

  const handleDelete = (index: number, file: any, type: string) => {
    let valueFileState = filesBusinessLicense
    let setFileValueState = setFilesBusinessLicense
    let currentFileState = currentFilesBusinessLicense
    let setCurrentFileState = setCurrentFilesBusinessLicense

    switch (type) {
      case 'businessLicense':
        valueFileState = filesBusinessLicense
        setFileValueState = setFilesBusinessLicense
        currentFileState = currentFilesBusinessLicense
        setCurrentFileState = setCurrentFilesBusinessLicense
        break
      case 'medical':
        valueFileState = filesMedical
        setFileValueState = setFilesMedical
        currentFileState = currentFilesMedical
        setCurrentFileState = setCurrentFilesMedical
        break
      case 'businessCert':
        valueFileState = filesBusinessCert
        setFileValueState = setFilesBusinessCert
        currentFileState = currentFilesBusinessCert
        setCurrentFileState = setCurrentFilesBusinessCert
        break
      case 'gdpLicense':
        valueFileState = filesGdpLicense
        setFileValueState = setFilesGdpLicense
        currentFileState = currentFilesGdpLicense
        setCurrentFileState = setCurrentFilesGdpLicense
        break
      case 'practicingCertLicense':
        valueFileState = filesPracticingCertLicense
        setFileValueState = setFilesPracticingCertLicense
        currentFileState = currentFilesPracticingCertLicense
        setCurrentFileState = setCurrentFilesPracticingCertLicense
        break
    }

    if (file?.keyFile) {
      let currentFiles = currentFileState.filter((item: any) => item.keyFile !== file.keyFile)
      setCurrentFileState(currentFiles)
      formik.setFieldValue(`business_info.remove_file[${file.keyFile}]`, file.path)
      console.log('formik', formik)
    } else {
      const newFiles = [...valueFileState]
      newFiles.splice(index, 1)
      setFileValueState(newFiles)
    }
  }

  return (
    <div>
      <h3 className='mt-5 mb-1 text-18 font-bold'>
        Mã số thuế / Số giấy phép kinh doanh (<span className='text-red-solid'>*</span>)
      </h3>

      <div className='border border-black-haze p-[25px] rounded-xl h-auto'>
        <div className='mb-[15px]'>
          <Input
            className={cn(
              'h-14 rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0',
              isErrorField(
                errorMessage.business_license ||
                  formik.errors.business_info?.gonsa_data?.business_license
                  ? true
                  : false
              )
            )}
            type='number'
            placeholder='Mã số thuế / Số giấy phép kinh doanh'
            name='business_info.gonsa_data.business_license'
            value={formik.values.business_info?.gonsa_data?.business_license || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {renderErrorText(
            errorMessage.business_license ||
              formik?.errors?.business_info?.gonsa_data?.business_license
          )}
        </div>
        <UploadFileComponent
          handleDelete={handleDelete}
          handleFileChange={handleFileBusinessLicenseChange}
          files={filesBusinessLicense}
          text='Chụp/ Scan xác thực giấy phép kinh doanh.'
          type='businessLicense'
          currentFiles={currentFilesBusinessLicense}
        />
        {renderErrorText(formik?.errors?.business_info?.business_premises)}
      </div>

      {isShowSpecialty ? (
        <>
          <h3 className='mt-5 mb-1 text-18 font-bold'>
            Giấy phép hoạt động khám chữa bệnh (<span className='text-red-solid'>*</span>)
          </h3>

          <div className='border border-black-haze p-[25px] rounded-xl h-auto'>
            <div className='mb-[15px]'>
              <Input
                className={cn(
                  'h-14 rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0',
                  isErrorField(
                    errorMessage.operation_license ||
                      formik.errors.business_info?.gonsa_data?.operation_license
                      ? true
                      : false
                  )
                )}
                type='number'
                placeholder='Số giấy phép'
                name='business_info.gonsa_data.operation_license'
                value={formik.values.business_info?.gonsa_data?.operation_license || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {renderErrorText(
                errorMessage.operation_license ||
                  formik?.errors?.business_info?.gonsa_data?.operation_license
              )}
            </div>
            <UploadFileComponent
              handleDelete={handleDelete}
              handleFileChange={handleFilesMedicalChange}
              files={filesMedical}
              text='Chụp / Scan xác thực giấy phép hoạt động khám chữa bệnh.'
              type='medical'
              currentFiles={currentFilesMedical}
            />
            {renderErrorText(formik?.errors?.business_info?.medical)}
          </div>
        </>
      ) : (
        ''
      )}
      <h3 className='mt-5 mb-1 text-18 font-bold'>
        Giấy chứng nhận đủ điều kiện kinh doanh dược (<span className='text-red-solid'>*</span>)
      </h3>

      <div className='border border-black-haze p-[25px] rounded-xl h-auto'>
        <div className='mb-[15px]'>
          <Input
            className={cn(
              'h-14 rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0',
              isErrorField(
                errorMessage.business_cert || formik.errors.business_info?.gonsa_data?.business_cert
                  ? true
                  : false
              )
            )}
            type='number'
            placeholder='Số giấy chứng nhận đủ điều kiện kinh doanh dược'
            name='business_info.gonsa_data.business_cert'
            value={formik.values.business_info?.gonsa_data?.business_cert}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {renderErrorText(
            errorMessage.business_cert || formik?.errors?.business_info?.gonsa_data?.business_cert
          )}
        </div>
        <UploadFileComponent
          handleDelete={handleDelete}
          handleFileChange={handleFileBusinessCertChange}
          files={filesBusinessCert}
          text='Chụp / Scan xác thực giấy chứng nhận đủ điều kiện kinh doanh dược.'
          type='businessCert'
          currentFiles={currentFilesBusinessCert}
        />
        {renderErrorText(formik?.errors?.business_info?.pharmaceutical)}
      </div>

      <h3 className='mt-5 mb-1 text-18 font-bold'>
        Hồ sơ GPP/GDP (<span className='text-red-solid'>*</span>)
      </h3>

      <div className='border border-black-haze p-[25px] rounded-xl h-auto'>
        <div className='mb-[15px]'>
          <div className='h-4 mb-[5px] text-14 font-normal leading-4'>
            <label>Chọn giấy phép bổ sung thông tin</label>
          </div>
          <div className='w-8/12 flex items-enter mt-[15px] mb-2.5'>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input
                className='w-5 h-5 px-2 accent-international-orange rounded-full cursor-pointer'
                type='radio'
                name='is_gpp'
                checked={formik.values.is_gpp == true}
                onChange={() => formik.setFieldValue('is_gpp', true)}
              />
              GPP
            </label>
            <label className='flex items-center gap-2 ms-6 cursor-pointer'>
              <input
                className='w-5 h-5 px-2 accent-international-orange rounded-full cursor-pointer'
                type='radio'
                name='is_gpp'
                checked={formik.values.is_gpp == false}
                onChange={() => formik.setFieldValue('is_gpp', false)}
              />
              GDP
            </label>
          </div>
          <div
            id='gdp-licenses'
            className='flex items-enter gap-[15px] flex-col justify-center md:flex-row'
          >
            <Input
              className={cn(
                'h-14 rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0',
                isErrorField(
                  errorMessage.gdp_license || formik.errors.business_info?.gonsa_data?.gdp_license
                    ? true
                    : false
                )
              )}
              type='text'
              placeholder='Số giấy phép'
              name='business_info.gonsa_data.gdp_license'
              value={formik.values.business_info?.gonsa_data?.gdp_license}
              onChange={(e) => handleChangeGdpLicense(e)}
            />
            <div
              className={`relative w-full h-14 rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 border ${invalidGdpLicenseDate ? 'bg-unbur-pink border-red-solid text-red-solid' : 'border-alto'}`}
            >
              <div className='business-information absolute inset-y-0 left-0 flex items-center w-full'>
                <DateTimePicker
                  dateSelected={(n: any) => {
                    formik.setFieldValue('business_info.gonsa_data.gdp_license_date', n)
                    setInvalidGdpLicenseDate(false)
                  }}
                  selectTime={false}
                  minDate={tomorrow}
                  defaultDate={formik.values.business_info?.gonsa_data?.gdp_license_date}
                  inputClassName={invalidGdpLicenseDate ? 'text-red-solid' : ''}
                />
              </div>
            </div>
          </div>
          <div>
            {renderErrorText(
              errorMessage.gdp_license || formik?.errors?.business_info?.gonsa_data?.gdp_license
            )}
          </div>
          {invalidGdpLicenseDate && (
            <span className='text-red text-14 leading-4 font-normal'>Vui lòng bổ sung</span>
          )}
        </div>
        <UploadFileComponent
          handleDelete={handleDelete}
          handleFileChange={handleFileGdpLicenseChange}
          files={filesGdpLicense}
          text='Chụp/ Scan xác thực giấy phép GPP/ GDP.'
          type='gdpLicense'
          currentFiles={currentFilesGdpLicense}
        />
        {renderErrorText(formik?.errors?.business_info?.file_gdp_license)}
      </div>

      {isShowSpecialty ? (
        <>
          <h3 className='mt-5 mb-1 text-18 font-bold'>
            Chứng chỉ hành nghề (<span className='text-red-solid'>*</span>)
          </h3>

          <div className='border border-black-haze p-[25px] rounded-xl h-auto'>
            <div className='mb-[15px]'>
              <Input
                className={cn(
                  'h-14 rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0',
                  isErrorField(
                    errorMessage.practicing_cert_license ||
                      formik.errors.business_info?.gonsa_data?.practicing_cert_license
                      ? true
                      : false
                  )
                )}
                type='number'
                placeholder='Số giấy phép'
                name='business_info.gonsa_data.practicing_cert_license'
                value={formik.values.business_info?.gonsa_data?.practicing_cert_license}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {renderErrorText(
                errorMessage.practicing_cert_license ||
                  formik?.errors?.business_info?.gonsa_data?.practicing_cert_license
              )}
            </div>
            <UploadFileComponent
              handleDelete={handleDelete}
              handleFileChange={handleFilePracticingCertLicenseChange}
              files={filesPracticingCertLicense}
              text='Chụp/ Scan xác thực chứng chỉ hành nghề.'
              type='practicingCertLicense'
              currentFiles={currentFilesPracticingCertLicense}
            />
            {renderErrorText(formik?.errors?.business_info?.practicing_cert)}
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  )
}

export default OperatingLicense
