import React, { FC } from 'react'

const InputSearch: FC<{ value?: string; onChange: (text: string) => void }> = ({
  value,
  onChange
}) => {
  return (
    <input
      onChange={(e: React.FormEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value)
      }}
      type="text"
      className="px-[8px] w-[485px] h-[42px] rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
      placeholder="search..."
      value={value || ''}
    />
  )
}

export default InputSearch
