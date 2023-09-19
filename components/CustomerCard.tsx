import React, { FC } from 'react'

const CustomerCard: FC<{
  name: string
  phone: string
  address: string
  onSelect: () => void
}> = ({ name, phone, address, onSelect }) => {
  return (
    <div className="mb-3 flex justify-between space-x-6 items-center p-6 border border-gray-200 rounded hover:bg-indigo-300 active:bg-gray-100">
      <div className="flex items-center space-x-4">
        <img
          src="https://www.wealthiertoday.com/assets/static/author-placeholder.efd0ce2.364b97896b675a987870273d9f5c1e7f.png"
          className="rounded-full h-14 w-14"
          alt=""
        />
        <div className="flex flex-col space-y-2">
          <span>{name}</span>
          <span>{phone}</span>
          <span>{address}</span>
        </div>
      </div>
      <div>
        <button onClick={onSelect} className="border rounded-md px-4 py-2">
          Chọn
        </button>
      </div>
    </div>
  )
}

export default CustomerCard
