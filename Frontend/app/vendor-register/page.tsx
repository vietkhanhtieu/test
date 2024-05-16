'use client'

import { Input } from '@/components/ui/input'
import { RootState } from '@/lib/redux/store'
import { validateEmail, validateRequired } from '@/lib/validation'
import { useFormik } from 'formik'
import { capitalize } from 'lodash'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'

export default function VendorRegistration() {
  const router = useRouter()
  const isSignedIn = useSelector((state: RootState) => state.currentUser.isSignedIn)

  const validationSchema = Yup.object().shape({
    email: validateEmail(),
    address: validateRequired(),
    taxId: validateRequired(),
    issuanceDate: validateRequired(),
    issuancePlace: validateRequired(),
    password: validateRequired(),
    confirmPassword: validateRequired()
  })

  const handleSubmit = async (values: any) => {
    // TODO implement integrate API
    console.log(values)
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      address: '',
      taxId: '',
      issuanceDate: new Date(),
      issuancePlace: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      handleSubmit(values)
    }
  })

  interface IlabelMapping {
    email: string
    address: string
    taxId: string
    issuanceDate: string
    issuancePlace: string
    password: string
    confirmPassword: string
    [key: string]: string
  }

  const labelMapping: IlabelMapping = {
    email: 'Email',
    address: 'Địa chỉ hoạt động',
    taxId: 'Mã số thuế',
    issuanceDate: 'Ngày cấp',
    issuancePlace: 'Nơi Cấp',
    password: 'Password',
    confirmPassword: 'Confirm Password'
  }

  useEffect(() => {
    if (isSignedIn) {
      router.push('/')
    }
  }, [isSignedIn, router])

  return (
    <div className='vendor-registration mx-auto mt-8 max-w-[64.5rem] rounded-lg border bg-white'>
      <div className='p-6'>
        <div className='mb-3 text-2xl font-bold'>Đăng ký Kênh người bán1</div>
        <form onSubmit={formik.handleSubmit}>
          <div className='form-group mb-3 flex flex-[1_1_50%]'>
            <label className='w-4/12 font-semibold '>
              Email <span className='text-red'>*</span>
            </label>
            <div className='w-8/12'>
              <Input
                type='text'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <span className='text-red'>
                {typeof formik.errors.email === 'string' && formik.errors.email}
              </span>
            </div>
          </div>
          <div className='form-group mb-3 flex flex-[1_1_50%]'>
            <label className='w-4/12 font-semibold '>
              Địa chỉ hoạt động <span className='text-red'>*</span>
            </label>
            <div className='w-8/12'>
              <Input
                type='text'
                name='address'
                value={formik.values.address}
                onChange={formik.handleChange}
              />
              <span className='text-red'>
                {typeof formik.errors.address === 'string' && formik.errors.address}
              </span>
            </div>
          </div>
          <div className='form-group mb-3 flex flex-[1_1_50%]'>
            <label className='w-4/12 font-semibold'>
              Mã số thuế <span className='text-red'>*</span>
            </label>
            <div className='w-8/12'>
              <Input
                type='text'
                name='taxId'
                value={formik.values.taxId}
                onChange={formik.handleChange}
              />
              <span className='text-red'>
                {typeof formik.errors.taxId === 'string' && formik.errors.taxId}
              </span>
            </div>
          </div>
          <div className='form-group mb-3 flex flex-[1_1_50%]'>
            <label className='w-4/12 font-semibold'>
              Ngày cấp <span className='text-red'>*</span>
            </label>
            <div className='w-8/12'>
              <DatePicker
                selected={formik.values.issuanceDate}
                className='
                  h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm
                  ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1
                  disabled:cursor-not-allowed disabled:opacity-50
                '
                dateFormat='dd/MM/YYYY'
                maxDate={new Date()}
                onChange={(d: any) => {
                  formik.setFieldValue('issuanceDate', d)
                }}
              />
              <span className='text-red'>
                {typeof formik.errors.issuanceDate === 'string' && formik.errors.issuanceDate}
              </span>
            </div>
          </div>
          <div className='form-group mb-3 flex flex-[1_1_50%]'>
            <label className='w-4/12 font-semibold'>
              Nơi cấp <span className='text-red'>*</span>
            </label>
            <div className='w-8/12'>
              <Input
                type='text'
                name='issuancePlace'
                value={formik.values.issuancePlace}
                onChange={formik.handleChange}
              />
              <span className='text-red'>
                {typeof formik.errors.issuancePlace === 'string' && formik.errors.issuancePlace}
              </span>
            </div>
          </div>
          <div className='form-group mb-3 flex flex-[1_1_50%]'>
            <label className='w-4/12 font-semibold'>
              Password <span className='text-red'>*</span>
            </label>
            <div className='w-8/12'>
              <Input
                type='text'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <span className='text-red'>
                {typeof formik.errors.password === 'string' && formik.errors.password}
              </span>
            </div>
          </div>
          <div className='form-group mb-3 flex flex-[1_1_50%]'>
            <label className='w-4/12 font-semibold'>
              Confirm Password <span className='text-red'>*</span>
            </label>
            <div className='w-8/12'>
              <Input
                type='password'
                name='confirmPassword'
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
              <span className='text-red'>
                {typeof formik.errors.confirmPassword === 'string' && formik.errors.confirmPassword}
              </span>
            </div>
          </div>
          <div className='mt-4 flex w-full justify-end'>
            <button
              type='submit'
              className='
                inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-xl font-bold text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
              '
              onClick={() => formik.handleSubmit()}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
