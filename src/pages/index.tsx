import React from 'react'
import { AuthContextProvider } from '../../ultilities/AuthContext'
import { HomeView } from '../components/HomeView'

export default function Home() {
  return (
    <AuthContextProvider>
      <HomeView />
    </AuthContextProvider>
  )
}
