import React, { useRef, useState } from 'react'
import ReactToPrint from 'react-to-print'
import PrintComponent from './PrintComponent'
import CustomerCard from './CustomerCard'
import InputSearch from './InputSearch'
import { dataValues, removeAccents } from '../ultilities/contants'
import { ICustomerType } from '../ultilities/types'

function LayoutPage(props) {
  let componentRef = useRef()
  const [currentUser, setCurrent] = useState<ICustomerType>()
  const [query, setQuery] = useState('')
  return (
    <div className="min-h-screen h-screen flex flex-col">
      <div className="flex row items-center border-b border-indigo-500 p-2">
        <div className="flex flex-1">
          <InputSearch value={query} onChange={(str) => setQuery(str)} />
        </div>
        <div className="flex flex-1 justify-end">
          <ReactToPrint
            trigger={() => (
              <button
                type="button"
                className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">
                In đơn
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-row overflow-y-hidden">
        <div className="flex-1 flex items-center justify-center border-l border-r border-indigo-500 text-xs p-2 overflow-y-auto">
          <PrintComponent
            //@ts-ignore
            name={currentUser?.name || ''}
            phone={currentUser?.phone || ''}
            address={currentUser?.address || ''}
            ref={componentRef}
          />
        </div>
        <nav className="order-first w-[500px] p-2 overflow-y-auto">
          {(query === ''
            ? dataValues
            : dataValues.filter((cus) =>
                removeAccents(cus.name)
                  .toLowerCase()
                  .includes(removeAccents(query.toLowerCase()))
              )
          ).map((cus, index) => (
            <CustomerCard
              onSelect={() => setCurrent(cus)}
              key={index}
              name={cus.name}
              phone={cus.phone}
              address={cus.address}
            />
          ))}
        </nav>
      </div>
    </div>
  )
}

export default LayoutPage
