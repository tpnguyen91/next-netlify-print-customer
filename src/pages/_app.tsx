import React from 'react'
import '../../styles/globals.css'
import '../../styles/superResponsiveTableStyle.css'
import { ThemeProvider } from '@material-tailwind/react'
import { AuthContextProvider } from '../../ultilities/AuthContext'

function Application({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </ThemeProvider>
  )
}

export default Application
