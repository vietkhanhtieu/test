export interface IBusinessType {
  label: string
  value: string | number
}

export interface ISpecialty {
  value: number
  name: string
  label: string
}

export interface IAddressLine {
  id: string
  name: string
}

export interface IAddressDropdown {
  province: IAddressLine
  district: IAddressLine
  ward: IAddressLine
}

export interface ErrorSensitiveMap {
  first_name?: string
  last_name?: string
  email?: string
}
