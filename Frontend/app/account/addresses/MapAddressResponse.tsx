import { IOrderInfo, IRecipientInfo } from './definitions'

const mapInfoOrder = (value: any): IOrderInfo => {
  return {
    id: value.id,
    name: value.name,
    phone: value.phone,
    isDefault: value.is_default,
    typeAddress: value.type_address
  }
}

const mapInfoReceive = (value: any): IRecipientInfo => {
  return {
    id: value.id,
    name: value.name,
    phone: value.phone,
    isDefault: value.is_default,
    type: value.type,
    address: value.address,
    ward: value.ward,
    district: value.district,
    province: value.province,
    note: value.note,
    typeAddress: value.type_address
  }
}

export { mapInfoOrder, mapInfoReceive }
