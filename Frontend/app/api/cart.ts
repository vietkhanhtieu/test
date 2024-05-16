import { AddItemCartResponse } from '../shared/interface'
import { ApiCallMethod, endpoints } from './ApiCallMethod'

export const CartApi = {
  getCart: async () => await ApiCallMethod.post(`${endpoints.cart}/get`),
  addItemToCart: async (data: object): Promise<AddItemCartResponse> =>
    await ApiCallMethod.post(`${endpoints.cart}/add`, data)
}
