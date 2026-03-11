import supabase from '../../supabase'
import { ICustomerType } from '../../ultilities/types'
import { ENUM_TABLES } from '../../ultilities/enum'

const useCustomerCRUDLogic = () => {
  const getAllCustomers = async () => {
    const { data, error } = await supabase
      .from(ENUM_TABLES.CUSTOMERS)
      .select('id, name, phone, address, note')

    if (error) {
      throw error
    }

    return data || []
  }

  const addNewCustomer = async (customer: ICustomerType) => {
    const { data, error } = await supabase
      .from(ENUM_TABLES.CUSTOMERS)
      .insert({
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        note: customer.note || null
      })
      .select('id')
      .single()

    if (error) {
      throw error
    }

    return data
  }

  const updateCustomer = async (customer: ICustomerType, id: string) => {
    const { data, error } = await supabase
      .from(ENUM_TABLES.CUSTOMERS)
      .update({
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        note: customer.note || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select('id')
      .single()

    if (error) {
      throw error
    }

    return data
  }

  const deleteCustomer = async (id: string) => {
    const { error } = await supabase
      .from(ENUM_TABLES.CUSTOMERS)
      .delete()
      .eq('id', id)

    if (error) {
      throw error
    }

    return true
  }

  return {
    getAllCustomers,
    addNewCustomer,
    updateCustomer,
    deleteCustomer
  }
}

export default useCustomerCRUDLogic
