import { BusinessInfo, GonsaData, UserData } from '@/lib/types/user'
import { createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

interface ICurrentUser {
  user: UserData
  isSignedIn: boolean
}

const initGonsaData: GonsaData = {
  name: '',
  province: '',
  district: '',
  ward: '',
  house_number: '',
  business_license: '',
  business_license_date: '',
  business_license_place: '',
  business_cert: '',
  business_cert_date: undefined,
  operation_license: '',
  operation_license_date: '',
  operation_license_place: '',
  gdp_license: '',
  gdp_license_date: '',
  email_enterprise: '',
  practicing_cert_license: '',
  gender: undefined,
  birthday: undefined
}

const initBusinessInfo: BusinessInfo = {
  gonsa_data: initGonsaData,
  file_gdp_license: '',
  file_gdp_license_1: '',
  file_gdp_license_2: '',
  practicing_cert: '',
  practicing_cert_1: '',
  practicing_cert_2: '',
  business_premises: '',
  business_premises_1: '',
  business_premises_2: '',
  pharmaceutical: '',
  pharmaceutical_1: '',
  pharmaceutical_2: '',
  medical: '',
  medical_1: '',
  medical_2: '',
  name_file_gdp_license: '',
  name_file_gdp_license_1: '',
  name_file_gdp_license_2: '',
  name_practicing_cert: '',
  name_practicing_cert_1: '',
  name_practicing_cert_2: '',
  name_business_premises: '',
  name_business_premises_1: '',
  name_business_premises_2: '',
  name_pharmaceutical: '',
  name_pharmaceutical_1: '',
  name_pharmaceutical_2: '',
  name_medical: '',
  name_medical_1: '',
  name_medical_2: '',
  remove_file: {}
}

interface IMedicalSpecialty {
  id?: number | string
  name?: string
  value?: number | string
}

const initMedicalSpecialty: IMedicalSpecialty | undefined = {
  id: '',
  name: '',
  value: ''
}

const initialState = {
  userid: 0,
  user: {
    display_name: '',
    user_display_name: '',
    phone: '',
    firstName: undefined,
    lastName: undefined,
    email: '',
    gender: '',
    birthday: '',
    gonsa_type: '',
    business_info: initBusinessInfo,
    custom_avatar: '',
    is_gpp: false,
    pronoun: '',
    medical_specialty: initMedicalSpecialty,
    referral_code: ''
  },
  isSignedIn: false
}

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      if (action.payload.userId) {
        state.userid = action.payload.userid
      }
      state.user = action.payload.user
      state.isSignedIn = action.payload.isSignedIn
      return state
    },
    logoutUser: (state) => {
      state = initialState
      return state
    }
  }
})

export const { setCurrentUser, logoutUser } = currentUserSlice.actions

export default currentUserSlice.reducer
