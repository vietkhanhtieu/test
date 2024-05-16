export interface IOrderInfo {
  id: string
  name: string
  phone: string
  isDefault: string
  typeAddress: string
}

export interface IRecipientInfo {
  id: string
  name: string
  phone: string
  isDefault: string
  type: string[]
  address: string | null
  ward: null | {
    id: string
    name: string
  }
  district: null | {
    id: string
    name: string
  }
  province: null | {
    id: string
    name: string
  }
  note: string | null
  typeAddress: string
}

export interface IFormDataOrderInfo {
  id: string | null
  user_id: number
  name: string
  phone: string
  isDefault: string
  typeAddress: string
}

export interface IAddressLine {
  id: string
  name: string
}

export interface IFormDataRecipientInfo {
  id: string | null
  user_id: number
  name: string
  phone: string
  isDefault: string
  addressNumber: string
  type: string[]
  typeAddress: string
  province: IAddressLine
  district: IAddressLine
  ward: IAddressLine
  note: string
}
