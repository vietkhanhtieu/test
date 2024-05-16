import axios, { InternalAxiosRequestConfig } from 'axios'
import { getCookie } from 'cookies-next'

import { USER_TOKEN_NAME } from './constants'

const setAuthHeaders = (config: InternalAxiosRequestConfig) => {
  const userToken = getCookie(USER_TOKEN_NAME)

  if (!!userToken) {
    config.headers['Authorization'] = 'Bearer ' + userToken
  }
}

// Config defaults
//----------------------------

// Request interceptor
axios.interceptors.request.use((config) => {
  setAuthHeaders(config)
  return config
})

// Public axios
//----------------------------
export default axios
