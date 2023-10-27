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

export type IGHNOrderType = {
  content?: string
  order_code: string
  to_address?: string
  to_name?: string
  to_phone?: string
}
