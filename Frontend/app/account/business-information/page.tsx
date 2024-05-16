'use client'

import AddressDropdown from '@/app/ui/dropdowns/AddressDropdown'
import Modal from '@/components/common/Modal'
import { SelectComponent } from '@/components/common/Select/SelectComponent'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Spinner from '@/components/ui/spinner'
import { IconSuccess, XMarkIcon } from '@/public/icons/index'
import _cloneDeep from 'lodash/cloneDeep'
import Image from 'next/image'
import router from 'next/router'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import OperatingLicense from './OperatingLicense'
import useBusinessInformationHooks from './hooks'

const BusinessInformation = () => {
  const {
    isGetData,
    businessTypes,
    formik,
    onChangeGonsaType,
    isShowSpecialty,
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
    disableSubmit,
    isShowMedicalSpecialty
  } = useBusinessInformationHooks()

  const [isBackBtn, setIsBackBtn] = useState<boolean>(false)
  const renderErrorText = (errorMessage: string | undefined) =>
    errorMessage && <p className='text-error-message text-red '>{JSON.stringify(errorMessage)}</p>

  const isErrorField = (isError: boolean) =>
    isError && 'text-error-message text-red border-red  bg-unbur-pink'
  return (
    <div className='col-span-4 md:col-span-3 rounded-lg max-w-[880px] h-auto bg-white'>
      <div className='relative'>
        {isGetData && (
          <div className='flex justify-center w-full h-[100.53%] absolute -top-[22px] left-0 z-40'>
            <div className='flex justify-center blur-overlay w-full rounded-lg h-[100.53%]'></div>
            <Spinner className='z-50 top-[50%] left-1/2 fixed' />
          </div>
        )}

        <div className='w-full mx-auto my-[22px]'>
          <div className='m-auto lg:max-w-[674px] text-center bg-peach-cream rounded-[10px] px-6 py-4'>
            <div className='text-14 leading-[21px] text-abbe flex'>
              <Image
                alt='Information Icon'
                src={'/icons/information.svg'}
                width={20}
                height={20}
                className='mr-2.5'
              />

              <span>
                Tài khoản của quý khách chỉ được kích hoạt khi cung cấp đầy đủ các thông tin.
              </span>
            </div>
          </div>
        </div>

        <div className='px-2 lg:px-[30px] py-[25px] text-abbey'>
          <h2 className='text-20 font-medium text-abbey pb-[25px]'>Thông tin doanh nghiệp</h2>

          <div className='border border-black-haze p-[25px] rounded-xl h-auto '>
            <div className='mb-[15px]'>
              <div className='h-4 mb-[5px] text-14 font-normal leading-4'>
                <label>Phân loại tài khoản</label>
              </div>

              <SelectComponent
                classNames={{
                  control: 'w-full flex items-center px-3.5 h-14 !rounded-xl border !border-alto',
                  menuList:
                    '!py-1 !text-left border border-primary rounded-xl !px-[3px] !h-[473px]',
                  valueContainer: '!text-left !text-16',
                  singleValue: '!me-0 !hover:text-primary',
                  option: '!py-2.5 !text-16'
                }}
                options={businessTypes ? businessTypes : []}
                isSearchable={false}
                value={formik.values.gonsa_type ? formik.values.gonsa_type : ''}
                handleOnChange={onChangeGonsaType}
              />
            </div>

            {isShowMedicalSpecialty ? (
              <div className='mb-[15px] h-[77px]'>
                <div className='h-[16px] mb-[5px] text-14 font-normal leading-[16px]'>
                  <label>Chuyên khoa</label>
                </div>

                <SelectComponent
                  classNames={{
                    control:
                      'w-full flex items-center px-[14px] h-[56px] !rounded-xl border !border-alto',
                    menuList:
                      '!py-1 !text-left border border-primary rounded-xl !px-[3px] !h-[473px]',
                    valueContainer: '!text-left !text-16',
                    singleValue: '!me-0 !hover:text-primary',
                    option: '!py-[10px] !text-16'
                  }}
                  options={specialty ? specialty : []}
                  isSearchable={false}
                  value={formik.values.medical_specialty?.value || ''}
                  handleOnChange={onChangeMedicalSpecialty}
                />
              </div>
            ) : (
              ''
            )}
            <div className='mb-[15px] h-[77px]'>
              <div className='h-4 mb-[5px] text-14 font-normal leading-4'>
                <label>Email</label>
              </div>

              <Input
                className={twMerge(
                  'h-14 rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0',
                  isErrorField(
                    errorMessage.email || formik.errors.business_info?.gonsa_data?.email_enterprise
                      ? true
                      : false
                  )
                )}
                type='text'
                placeholder='Email doanh nghiệp'
                name='business_info.gonsa_data.email_enterprise'
                value={formik.values.business_info?.gonsa_data?.email_enterprise || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {renderErrorText(
                errorMessage.email || formik.errors.business_info?.gonsa_data?.email_enterprise
              )}
            </div>
          </div>

          <h3 className='mt-5 mb-1 text-[18px] font-semibold text-abbey'>
            Thông tin doanh nghiệp (<span className='text-red-solid'>*</span>)
          </h3>

          <div className='border border-black-haze p-[25px] rounded-xl h-auto'>
            <div className='mb-[15px]'>
              <div className='h-full md:h-4 mb-[5px] text-14 font-normal leading-4'>
                <label>Tên ngắn gọn của phòng khám (Tối đa 20 ký tự)</label>
              </div>
              <Input
                className={twMerge(
                  'h-14 rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0',
                  isErrorField(
                    errorMessage.name || formik?.errors?.business_info?.gonsa_data?.name
                      ? true
                      : false
                  )
                )}
                type='text'
                maxLength={20}
                placeholder='Tên ngắn gọn của phòng khám (Tối đa 20 ký tự)'
                name='business_info.gonsa_data.name'
                value={formik.values.business_info?.gonsa_data?.name || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {renderErrorText(
                errorMessage.name || formik?.errors?.business_info?.gonsa_data?.name
              )}{' '}
              {/* Re-use for other input fields */}
            </div>

            <div className='mb-[15px]'>
              <div className='h-full md:h-4 mb-[5px] text-14 font-normal leading-4'>
                <label>Tỉnh/Thành phố; Quận/Huyện; Phường/Xã</label>
              </div>

              <AddressDropdown
                handleSetSelectedProvince={handleSetSelectedProvince}
                handleSetSelectedDistrict={handleSetSelectedDistrict}
                handleSetSelectedWard={handleSetSelectedWard}
                setValueAddress={setValueAddress}
                valueAddress={valueAddress}
                formData={addressData}
                classInput='md:w-full'
                isSetNameById={true}
                handleSetAddressList={handleSetAddressList}
              />
            </div>

            <div className='mb-[15px]'>
              <div className='h-full md:h-4 mb-[5px] text-14 font-normal leading-4'>
                <label>Số nhà và Tên đường</label>
              </div>

              <Input
                className={twMerge(
                  'h-14 rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0',
                  isErrorField(
                    errorMessage.house_number ||
                      formik.errors.business_info?.gonsa_data?.house_number
                      ? true
                      : false
                  )
                )}
                type='text'
                placeholder='Số nhà và Tên đường'
                name='business_info.gonsa_data.house_number'
                value={formik.values.business_info?.gonsa_data?.house_number || ''}
                onChange={formik.handleChange}
              />
              {renderErrorText(
                errorMessage.house_number || formik?.errors?.business_info?.gonsa_data?.house_number
              )}
            </div>
          </div>

          <div className='my-4 border-b border-gray-10 border-dashed'></div>

          <OperatingLicense
            formik={formik}
            isShowSpecialty={isShowSpecialty}
            errorMessage={errorMessage}
          />
          {isUpdated ? (
            <Modal
              isOpen={isModalOpen}
              onClose={() => toggleModal(false)}
              containerClass='relative w-[347px] !pt-[40px_30px_30px] !min-h-[136px]'
            >
              <>
                <Image src={IconSuccess} width={37} height={37} alt='update-success' />

                <h2 className='text-center text-18 leading-[30px] w-[412px] mx-[46px] mt-3'>
                  Bạn đã lưu thông tin thành công
                </h2>
              </>
            </Modal>
          ) : (
            <Modal
              isOpen={isModalOpen}
              onClose={() => toggleModal(false)}
              containerClass='relative w-[347px] !pt-[40px_30px_30px] !min-h-[136px]'
            >
              <>
                <Image src={XMarkIcon} width={37} height={37} alt='update-success' />

                <h2 className='text-center text-18 leading-[30px] w-[412px] mx-[46px] mt-3'>
                  Có lỗi xảy ra, vui lòng thử lại sau
                </h2>
              </>
            </Modal>
          )}

          {isBackBtn ? (
            <Modal
              isOpen={true}
              onClose={() => setIsBackBtn(false)}
              containerClass='relative w-[560px] !pt-[40px_30px_30px] !min-h-[285px]'
            >
              <>
                <h2 className='text-center text-[30px] font-bold leading-[28px] mt-3 mb-[30px]'>
                  Quay lại tài khoản
                </h2>

                <h2 className='text-center text-20 leading-[30px] w-[412px] mx-[46px]'>
                  Nếu quay lại bây giờ thì những thông tin bạn vừa chỉnh sẽ mất
                </h2>

                <div className='mt-[30px] flex justify-center gap-[15px] mx-5'>
                  <Button
                    className='h-[60px] rounded-[10px] bg-white text-primary border-2 border-primary text-[24px] w-[230px] hover:bg-white'
                    onClick={() => setIsBackBtn(false)}
                  >
                    Hủy
                  </Button>

                  <Button
                    className='h-[60px] rounded-[10px] bg-primary text-[24px] w-[230px]'
                    onClick={() => router.push('/')}
                  >
                    Đồng ý
                  </Button>
                </div>
              </>
            </Modal>
          ) : (
            ''
          )}

          <div className='mt-[25px] mb-[35px] flex flex-col justify-center gap-5 lg:gap-20 md:flex-row mx-5 md:mx-0'>
            <Button
              className='disabled:bg-gray-10 disabled:opacity-100 h-16 rounded-[32px] px-[35px] w-full bg-gray-40 !text-24 md:w-[250px]'
              onClick={() => setIsBackBtn(true)}
            >
              <Image
                className='mr-8'
                alt='Button Icon'
                src='/icons/double-expland-icon.svg'
                width={23}
                height={18}
              />
              Quay lại
            </Button>
            <Button
              className='disabled:bg-gray-10 disabled:opacity-100 h-16 rounded-[32px] px-[35px] w-full order-1 !text-24 md:order-2 md:w-[250px]'
              onClick={handleSubmit}
              disabled={disableSubmit || Object.keys(formik.errors).length !== 0}
            >
              {isLoading ? <Spinner /> : 'Lưu thay đổi'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessInformation
