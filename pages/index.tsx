import React from 'react'
import LayoutPage from '../components/LayoutPage'
import { AuthContextProvider } from '../ultilities/AuthContext'

export default function Home() {
  return (
    <AuthContextProvider>
      <LayoutPage />
    </AuthContextProvider>
  )
}
