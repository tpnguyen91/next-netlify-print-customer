import React from 'react'
import { AuthContextProvider } from '../../../ultilities/AuthContext'
import DefaultLayout from '../../components/Layout/DefaultLayout'
import CustomersView from '../../components/Customer/CustomersView'

export default function Customer() {
  return (
    <DefaultLayout>
      <CustomersView />
    </DefaultLayout>
  )
}
