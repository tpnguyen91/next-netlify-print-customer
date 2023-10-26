import React from 'react'
import '../../styles/globals.css'
import { ThemeProvider } from '@material-tailwind/react'

function Application({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default Application
