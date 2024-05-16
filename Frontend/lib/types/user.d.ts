export interface Root {
  status: number
  message: string
  data: Data
}

export interface UserData {
  display_name: string
  phone: string
  first_name: any
  last_name: any
  email: string
  gender: string
  birthday: string
  gonsa_type: string
  business_info: BusinessInfo
  custom_avatar: string
  is_gpp: boolean
  pronoun: string
  medical_specialty: any
}

export interface BusinessInfo {
  gonsa_data: GonsaData
  file_gdp_license: string
  file_gdp_license_1: string
  file_gdp_license_2: string
  practicing_cert: string
  practicing_cert_1: string
  practicing_cert_2: string
  business_premises: string
  business_premises_1: string
  business_premises_2: string
  pharmaceutical: string
  pharmaceutical_1: string
  pharmaceutical_2: string
  medical: string
  medical_1: string
  medical_2: string
  name_file_gdp_license: string
  name_file_gdp_license_1: string
  name_file_gdp_license_2: string
  name_practicing_cert: string
  name_practicing_cert_1: string
  name_practicing_cert_2: string
  name_business_premises: string
  name_business_premises_1: string
  name_business_premises_2: string
  name_pharmaceutical: string
  name_pharmaceutical_1: string
  name_pharmaceutical_2: string
  name_medical: string
  name_medical_1: string
  name_medical_2: string
  remove_file?: object
}

export interface GonsaData {
  name: string
  province: string
  district: string
  ward: string
  house_number: string
  business_license: string
  business_license_date: string
  business_license_place: string
  business_cert: string
  business_cert_date: any
  operation_license: string
  operation_license_date: string
  operation_license_place: string
  gdp_license: string
  gdp_license_date: string
  email_enterprise: string
  practicing_cert_license: string
  gender: any
  birthday: any
}

export interface UserCart {
  cart: CartItem[]
  total_quantity: number
  total_amount: number
  current_step: number
  shouldCheckStock: boolean
  invalidLicenses: boolean
  exceedStockItems: number[]
  loadingFetch: boolean
  listUpdating: string[]
  selectedProducts?: any[]
  isFromReOrder?: boolean
}

export interface CartItem {
  key: string
  id: number
  title: string
  treatment_id: number
  nhaSanXuat: any
  supplier: Supplier
  active_element: string
  dosage_form: string
  packing: string
  due_date: string
  regular_price: number
  sale_price: number
  is_discount: boolean
  discount_price: number
  discount_percent: number
  stock_quantity: number
  stock_status: string
  in_cart: boolean
  in_wishlist: boolean
  quantity: number
  is_thuoc: boolean
  sale_limit: number
  discount_rules: any[]
  is_product_discount: boolean
  donViTinh?: string
}

export interface Supplier {
  id: number
  name: string
  term_id: number
  icon: string
}
