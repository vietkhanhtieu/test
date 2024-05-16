import axios from './axios'

export const endpoints = {
  cart: '/wp-json/cart'
}

export const ApiCallMethod = {
  get: async (path: string) => {
    return axios
      .get(path)
      .then((res) => res.data)
      .catch((err) => err)
  },
  post: async (path: string, data?: object) => {
    return axios
      .post(path, data)
      .then((res) => res.data)
      .catch((err) => err)
  }
}
