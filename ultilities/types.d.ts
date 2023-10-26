export interface ICustomerType {
  id?: string
  name: string
  phone: string
  address: string
  note?: string
}

export type ICustomerForm = {
  name: string
  phone: string
  note: string
  address: string
}
