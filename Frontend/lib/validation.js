import * as Yup from 'yup'

export const validateEmail = () =>
  Yup.string()
    .matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, 'Email không đúng định dạng')
    .required('Email không được để trống')

export const validateMobilePhone = () =>
  Yup.string().matches(/^[0-9]+$/, 'Please enter a valid phone number')

export const validateRequired = () => Yup.string().required('Thông tin này không được bỏ trống')

export const validateDropdownRequired = () =>
  Yup.mixed().required('Thông tin này không được bỏ trống')

export const validateAlphanumericCharacters = () =>
  Yup.string().matches(/^[a-zA-Z0-9\s]*$/, 'Only accepts alphanumeric characters')

export const validateNumber = () => Yup.string().matches(/^[0-9]+$/, 'Please enter a valid number')

export const validateEmailOptional = () =>
  Yup.string()
    .nullable(true)
    .matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, 'Email không đúng định dạng')

export const validateLengthString = (minLength) =>
  Yup.string()
    .min(minLength, `Vui lòng nhập it nhất ${minLength} kí tự`)
    .required('Thông tin này không được bỏ trống')
