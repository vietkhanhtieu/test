import { InputRadio } from '@/app/ui/daisy/input-radio'
import { OtpPopup } from '@/components/common/OtpPopup/OtpPopup'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Spinner from '@/components/ui/spinner'
import axios from '@/lib/axios'
import { setCurrentUser } from '@/lib/redux/slices/current_user'
import { RootState } from '@/lib/redux/store'
import { validateRequired } from '@/lib/validation'
import { useFormik } from 'formik'
import parsePhoneNumber from 'libphonenumber-js'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import * as Yup from 'yup'

import { UpdateEmailModal } from './UpdateEmailModal'
import { UpdatePasswordModal } from './UpdatePasswordModal'

interface Props {
  setEditMode: Dispatch<SetStateAction<boolean>>
  openCopyTooltip: boolean
  setOpenCopyTooltip?: Dispatch<SetStateAction<boolean>>
  copyReferralCodeToClipboard: () => void
}

const validationSchema = Yup.object().shape({
  last_name: validateRequired(),
  first_name: validateRequired()
})

const EditProfile: React.FC<Props> = ({
  setEditMode,
  openCopyTooltip,
  copyReferralCodeToClipboard
}) => {
  const user = useSelector((state: RootState) => state.currentUser.user)
  const [isOtpPopupOpen, setIsOtpPopupOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [isUpdatePasswordModalOpen, setIsUpdatePasswordModalOpen] = useState<boolean>(false)
  const [isUpdateEmailModalOpen, setIsUpdateEmailModalOpen] = useState<boolean>(false)
  const [updatingField, setUpdatingField] = useState<string>('')
  const [previewImage, setPreviewImage] = useState<any>('')
  const [newImage, setNewImage] = useState<File | null>(null)

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      pronoun: user.pronoun
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      handleSubmit(values)
    }
  })

  const handleSubmit = async (values: any) => {
    // TODO implement integrate API
    console.log(values)
  }

  const avatarUrl = user.custom_avatar || '/icons/default-avatar.svg'
  const phoneNumber = parsePhoneNumber(user.phone, 'VN')

  const handleChangePassword = () => {
    setUpdatingField('password')
    requestSendOtp('reset')
  }

  const handleChangeEmail = () => {
    setUpdatingField('email')
    requestSendOtp('change_email')
  }

  const requestSendOtp = async (type: string) => {
    setLoading(true)
    const dataParams = {
      phone: user.phone,
      email: user.email,
      type: type
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/otp/send`,
      dataParams
    )
    const data = response.data
    setLoading(false)

    if (data['message'] === 'Successfully') {
      setIsOtpPopupOpen(true)
    }
  }

  const handleOnVerifiedOtp = () => {
    setIsOtpPopupOpen(false)
    if (updatingField === 'password') {
      setIsUpdatePasswordModalOpen(true)
    } else if (updatingField === 'email') {
      setIsUpdateEmailModalOpen(true)
    }
  }

  const handleSaveUserProfile = async () => {
    setLoading(true)
    setUpdatingField('profile')

    if (formik.dirty || newImage) {
      let form = new FormData()
      form.append('email', user.email)
      form.append('display_name', user.display_name)
      form.append('update_image', '1')
      form.append('pronoun', formik.values.pronoun)
      if (newImage) {
        form.append('avatar', newImage)
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/account/update-personal-info`,
        form
      )

      if (isEmpty(res.data.error)) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/account/get-personal-info`
        )
        dispatch(setCurrentUser({ user: response.data.data, isSignedIn: true }))
      }

      setLoading(false)
      setUpdatingField('')
      setEditMode(false)
    } else {
      setEditMode(false)
    }
  }

  const handleOnSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    const files = target.files
    if (files?.length) {
      const file = files[0]
      setNewImage(file)
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        setPreviewImage(fileReader.result)
      })
      fileReader.readAsDataURL(file)
    }
  }

  return (
    <>
      <div className='pt-6 px-2 lg:px-7 pb-4 flex items-end justify-between border-b border-alto text-abbey'>
        <div className='text-xl font-medium'>
          {user.first_name}&nbsp;{user.last_name}
        </div>
        <Button
          className='text-sm font-medium w-[120px] h-9 rounded-[10px] text-white'
          onClick={handleSaveUserProfile}
        >
          {loading && updatingField === 'profile' ? (
            <Spinner size='md' />
          ) : (
            <>
              <Image
                className='me-1'
                alt='edit Icon'
                src='/icons/save-ico-white.svg'
                width={17}
                height={16}
              />
              Lưu
            </>
          )}
        </Button>
      </div>
      <div className='pt-[50px] px-2 lg:px-[22px] pb-4 flex flex-col-reverse lg:flex-row overflow-auto text-abbey  leading-[19px]'>
        <div className='lg:w-8/12'>
          <div className='flex items-center'>
            <div className='w-4/12 font-medium'>Tên:</div>
            <div className='w-8/12'>
              <Input
                type='text'
                name='last_name'
                value={formik.values.last_name}
                onChange={formik.handleChange}
                className='h-[39px] !text-16'
              />
            </div>
          </div>
          <div className='flex flex-row-reverse mb-[34px]'>
            <div className='w-8/12'>
              <span className='text-xs text-red mt-1'>
                {typeof formik.errors.last_name === 'string' && formik.errors.last_name}
              </span>
            </div>
          </div>

          <div className='flex items-center'>
            <div className='w-4/12 font-medium'>Họ và Tên đệm:</div>
            <div className='w-8/12'>
              <Input
                type='text'
                name='first_name'
                value={formik.values.first_name}
                onChange={formik.handleChange}
                className='h-[39px] !text-16'
              />
            </div>
          </div>
          <div className='flex flex-row-reverse mb-[34px]'>
            <div className='w-8/12'>
              <span className='text-xs text-red mt-1'>
                {typeof formik.errors.first_name === 'string' && formik.errors.first_name}
              </span>
            </div>
          </div>

          <div className='flex items-center mb-[34px]'>
            <div className='w-4/12 font-medium'>Danh xưng:</div>
            <div className='w-8/12 flex items-enter'>
              <div className='flex items-center gap-7'>
                <InputRadio
                  value={'HE'}
                  label-text={'Anh'}
                  checked={formik.values.pronoun === 'HE'}
                  onChange={formik.handleChange}
                  radioText='Anh'
                />
                <InputRadio
                  name='pronoun'
                  value={'SHE'}
                  label-text={'Chị'}
                  checked={formik.values.pronoun === 'SHE'}
                  onChange={formik.handleChange}
                  radioText='Chị'
                />
              </div>
            </div>
          </div>

          <div className='flex items-center mb-[34px]'>
            <div className='w-4/12 font-medium'>Số điện thoại:</div>
            <div className='w-8/12 flex justify-between items-center'>
              {phoneNumber?.format('NATIONAL').replaceAll(' ', '.')}
              <Image
                src={'/icons/attention-ico.svg'}
                width={16}
                height={16}
                alt='attention'
                className='cursor-pointer'
                id='tooltip-phone'
                data-tooltip-content='Vui lòng liên hệ Admin để được hỗ trợ đổi SĐT'
              />
              <ReactTooltip
                anchorSelect='#tooltip-phone'
                place='left'
                clickable
                render={({ content }) => (
                  <div className='w-36 h-[30px] text-center flex items-center justify-center '>
                    {content}
                  </div>
                )}
                style={{
                  backgroundColor: '#4D4D4F',
                  fontSize: '12px',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                  lineHeight: '15px'
                }}
              />
            </div>
          </div>

          <div className='flex items-center mb-[34px]'>
            <div className='w-4/12 font-medium'>Địa chỉ email:</div>
            <div className='w-8/12'>
              <div className='w-full flex items-center border border-alto rounded'>
                <input
                  type='email'
                  name='email'
                  value={user.email}
                  disabled
                  className='flex h-[39px] w-full rounded-md bg-background px-3 py-2 pe-1 text-16 placeholder:text-muted-foreground outline-none border-none disabled:cursor-not-allowed'
                />
                <Button
                  disabled={loading}
                  onClick={handleChangeEmail}
                  className='btn-primary min-w-24 h-[35px] text-xs font-bold text-white me-0.5 rounded-sm'
                >
                  {loading && updatingField === 'email' ? <Spinner size='md' /> : <>Đổi email</>}
                </Button>
              </div>
            </div>
          </div>

          <div className='flex items-center mb-[34px]'>
            <div className='w-4/12 font-medium'>Mật khẩu:</div>
            <div className='w-8/12'>
              <div className='w-full flex items-center border border-alto rounded'>
                <input
                  type='text'
                  name='password'
                  value={'********'}
                  disabled
                  className='flex h-[39px] w-full rounded-md bg-background px-3 py-2 pe-1 text-16 placeholder:text-muted-foreground outline-none border-none disabled:cursor-not-allowed'
                />
                <Button
                  disabled={loading}
                  onClick={handleChangePassword}
                  className='btn-primary min-w-24 h-9 text-xs font-bold text-white me-0.5 rounded-sm'
                >
                  {loading && updatingField === 'password' ? (
                    <Spinner size='md' />
                  ) : (
                    <>Đổi mật khẩu</>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className='flex items-center'>
            <div className='w-4/12 font-medium'>Mã giới thiệu của bạn:</div>
            <div className='w-8/12 font-normal flex'>
              <span className='bg-gallery py-2.5 px-[15px] font-medium rounded text-alto leading-5'>
                {user.referral_code}
              </span>
              <Image
                src={'/icons/copy-ico.svg'}
                width={20}
                height={20}
                alt='copy-icon'
                className='ms-[19px] cursor-pointer'
                id='tooltip-referral-code'
                onClick={copyReferralCodeToClipboard}
              />
              <ReactTooltip
                anchorSelect='#tooltip-referral-code'
                place='top'
                clickable
                content='Copied!'
                openOnClick={true}
                offset={1}
                isOpen={openCopyTooltip}
                style={{
                  fontSize: '12px',
                  paddingLeft: '5px',
                  paddingRight: '5px',
                  paddingTop: '4px',
                  paddingBottom: '4px'
                }}
              />
            </div>
          </div>
        </div>
        <div className='lg:w-4/12 mb-4 lg:flex justify-end'>
          <div className='relative w-fit'>
            <Image
              src={previewImage || avatarUrl}
              width={152}
              height={152}
              alt='user-avatar'
              className='rounded-full relative'
              style={{ height: '152px', width: '152px', objectFit: 'cover' }}
            />
            <div className='absolute right-2.5 top-28'>
              <input
                type='file'
                className='hidden'
                id='file-input'
                onChange={handleOnSelectFile}
                accept='image/png, image/gif, image/jpeg, image/jpg'
              />
              <label htmlFor='file-input'>
                <div className='p-[9px] bg-white rounded-full cursor-pointer hover:shadow-lg'>
                  <Image
                    className=''
                    alt='edit Icon'
                    src='/icons/edit-ico-orange.svg'
                    width={13}
                    height={13}
                  />
                </div>
              </label>
            </div>
          </div>
        </div>
        <OtpPopup
          open={isOtpPopupOpen}
          phone={user.phone}
          email={user.email}
          type={updatingField === 'password' ? 'reset' : 'change_email'}
          onNext={handleOnVerifiedOtp}
        />
        <UpdatePasswordModal
          open={isUpdatePasswordModalOpen}
          setIsUpdatePasswordModalOpen={setIsUpdatePasswordModalOpen}
          phone={user.phone}
        />
        <UpdateEmailModal
          open={isUpdateEmailModalOpen}
          setIsUpdateEmailModalOpen={setIsUpdateEmailModalOpen}
          phone={user.phone}
        />
      </div>
    </>
  )
}

export default EditProfile
