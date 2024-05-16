export interface IOrder {
  orderid: number
  status: string
  progress: string
  is_approved: any
  orderDetailResponseDto: Product[]
  quantity: number
  total: number
  supplier: Supplier
  parent_id: any
  children_id: any[]
  neo_pay: string
  is_evaluate: boolean
  is_receipt_exported: boolean
  is_pinned: boolean
  dayShip: string
}

export interface Product {
  productid: number
  productName: string
  quantity: number
  total: number
  expired: any
  regular_price: number
  price: number
  dosage_form: string
  dvt_de_ban: string
  so_luong_quy_doi: string
  dvt_co_so: string
  activeElementTerm: ActiveElementTerm
}

export interface ActiveElementTerm {
  term_id: number
  name: string
  slug: string
  term_group: number
  term_taxonomy_id: number
  taxonomy: string
  description: string
  parent: number
  count: number
  filter: string
}

export interface Supplier {
  id: number
  name: string
  icon: string
}

export interface OrderRefund {
  order_id: string
  message: string
  message_detail: string
  status: number
  product_info: OrderDetail[]
}

interface OrderDetail {
  product_id: number
  product_name: string
  quantity: number
  subtotal: number
  total_discount: number
  total: number
  expired: any
  dosage_form: string
  dvt_de_ban: string
  so_luong_quy_doi: string
  dvt_co_so: string
  regular_price: number
  sale_price: number
  supplier: Supplier
}
