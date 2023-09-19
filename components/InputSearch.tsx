import React from 'react'

function InputSearch(props) {
  return (
    <input
      type="text"
      className="px-[8px] w-[485px] h-[42px] rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
      placeholder="search..."
      value=""
    />
  )
}

export default InputSearch
