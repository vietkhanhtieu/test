import Modal from '@/components/common/Modal'
import { Button } from '@/components/ui/button'
import Spinner from '@/components/ui/spinner'
import axios from '@/lib/axios'
import { setCurrentUser } from '@/lib/redux/slices/current_user'
import { RootState } from '@/lib/redux/store'
import { Field, Form, Formik } from 'formik'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

interface IUpdateEmailProps {
  open: boolean
  phone: string
  setIsUpdateEmailModalOpen: (arg: boolean) => void
}

export const UpdateEmailModal: React.FC<IUpdateEmailProps> = ({
  open,
  setIsUpdateEmailModalOpen
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [showSuccessScreen, setShowSuccessScreen] = useState<boolean>(false)

  const user = useSelector((state: RootState) => state.currentUser.user)
  const dispatch = useDispatch()

  const validationSchema = Yup.object().shape({
    email: Yup.string().matches(
      /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
      'Email không hợp lệ, vui lòng thử lại.'
    )
  })
  const handleSubmit = async (email: string) => {
    setLoading(true)
    const dataParams = {
      paragraph: [email]
    }

    const validateKeywordRes = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/validate/keyword`,
      dataParams
    )

    if (validateKeywordRes.data.message === 'Successfully') {
      const data = validateKeywordRes.data.data
      const suggestedKeywords = data[0].suggestedKeywords

      if (suggestedKeywords.length) {
        setErrorMessage('Từ khóa thuộc danh mục kiểm soát.')
      } else {
        let form = new FormData()
        form.append('email', email)
        form.append('display_name', user.display_name)
        form.append('pronoun', user.pronoun)
        form.append('custom_avatar', user.custom_avatar)
        form.append('update_image', '1')

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/account/update-personal-info`,
          form
        )

        if (isEmpty(res.data.error)) {
          setShowSuccessScreen(true)

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/account/get-personal-info`
          )
          dispatch(setCurrentUser({ user: response.data.data, isSignedIn: true }))
        } else {
          const errorMsg = Object.values(res.data.error)[0] as string
          setErrorMessage(errorMsg)
        }

        setLoading(false)
      }
    }
  }

  const handleOnClose = () => {
    setIsUpdateEmailModalOpen(false)
    setErrorMessage('')
    setShowSuccessScreen(false)
    setLoading(false)
  }

  return (
    <Modal
      isOpen={open}
      onClose={handleOnClose}
      containerClass='rounded-lg px-4 py-0 md:min-w-[562px] !min-h-[260px] !h-[260px]'
    >
      <div className='flex min-w-[345px] flex-col items-center text-foreground md:min-w-[532px]'>
        <div className='w-full flex items-center justify-end h-10'>
          <Image
            alt='crossIcon'
            src={'/icons/cross.svg'}
            width={12}
            height={12}
            className='cursor-pointer'
            onClick={handleOnClose}
          />
        </div>
        <div className='w-full px-4'>
          {showSuccessScreen ? (
            <>
              <div className='text-center'>
                <Image
                  className='mx-auto'
                  alt='Success Icon'
                  src='/assets/icon-success.svg'
                  width={56}
                  height={56}
                />

                <p className='mt-4 text-xl font-semibold'>
                  Chúc mừng bạn đã thay đổi email thành công.
                </p>

                <Button
                  className='btn-primary w-[255px] rounded-3xl mt-6 disabled:bg-gray-10'
                  onClick={handleOnClose}
                >
                  Đóng
                </Button>
              </div>
            </>
          ) : (
            <Formik
              initialValues={{
                email: ''
              }}
              validationSchema={validationSchema}
              validateOnChange={true}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  handleSubmit(values.email)
                  actions.setSubmitting(false)
                }, 1000)
              }}
            >
              {({ errors, touched, values }) => {
                const validateEmail = values.email && typeof errors.email === 'undefined' && touched
                return (
                  <Form>
                    <div className='flex flex-col items-center'>
                      <div className='mb-2 text-24 text-center font-semibold'>Thay đổi email</div>
                      <div className='mt-1 w-full'>
                        <label className='my-2 block text-16 font-semibold'>Email</label>
                        <div className='relative flex w-full items-center'>
                          <Image
                            alt=''
                            src='/icons/email-ico.svg'
                            width={22}
                            height={20}
                            className='absolute left-3 top-7 -translate-y-1/2 transform'
                          />
                          <Field
                            name='email'
                            type='email'
                            placeholder='Email'
                            required
                            className={`h-14 rounded-lg border-[1px] w-full px-12 ${errors.email && touched.email ? 'border-red-solid' : 'border-alto'} focus-visible:ring-0 focus-visible:ring-offset-0`}
                          />
                          {values.email !== '' && !errors.email && (
                            <Image
                              alt=''
                              src='/icons/yes.svg'
                              width={22}
                              height={20}
                              className='absolute right-3 top-7 -translate-y-1/2 transform focus:outline-none'
                            />
                          )}
                        </div>
                        {errorMessage ||
                          (errors.email && touched.email && (
                            <p className='text-12 text-red-solid ms-1'>
                              {errorMessage || errors.email}
                            </p>
                          ))}
                      </div>
                      <Button
                        disabled={loading || !validateEmail}
                        className='btn-primary w-[255px] rounded-3xl my-7 disabled:bg-gray-10'
                        type='submit'
                      >
                        {loading ? <Spinner size='md' /> : 'Lưu'}
                      </Button>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          )}
        </div>
      </div>
    </Modal>
  )
}
