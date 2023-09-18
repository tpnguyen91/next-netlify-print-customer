import React, { useRef } from 'react'
import Head from 'next/head'
import ReactToPrint from 'react-to-print'
import PrintComponent from '../components/PrintComponent'

export default function Home() {
  let componentRef = useRef()
  return (
    <div className="container">
      <Head>
        <title>CMS 2359</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <PrintComponent ref={componentRef} />
    </div>
  )
}
