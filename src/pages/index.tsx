import React from 'react'
import { AuthContextProvider } from '../../ultilities/AuthContext'
import { HomeView } from '../components/HomeView'
import { isMobile } from 'react-device-detect'

export default function Home() {
  return (
    <AuthContextProvider>
      <HomeView />
    </AuthContextProvider>
  )
}
