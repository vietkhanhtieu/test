export interface BaseResponse {
  success?: boolean
  message?: string
  meta?: string
}

export interface AddItemCartResponse extends BaseResponse {
  data: CartResponse
}

interface CartResponse {
  cart?: CartDetail[] | []
  total_amount: number
  total_quantity: number
}

interface CartDetail {
  key: string
  id: number
  sku: string
  title: string
  treatment_id: number
  producer_id: number | undefined
  supplier: {
    id: number
    name: string
    term_id: number
    icon: string
  }
  active_element: string
  dosage_form: string
  packing: string
  regular_price: number
  sale_price: number
  stock_quantity: number
  stock_status: string
  in_cart: boolean
  in_wishlist: boolean
  image: []
  quantity: number
}
