import { USER_TOKEN_NAME } from '@/lib/constants'
import _axios from 'axios'
import { getCookie } from 'cookies-next'

const axios = _axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

axios.interceptors.request.use((config) => {
  const userToken = getCookie(USER_TOKEN_NAME)

  if (userToken) {
    config.headers['Authorization'] = `Bearer ${userToken}`
  }

  return config
})

export default axios
