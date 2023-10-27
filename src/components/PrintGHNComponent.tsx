import * as React from 'react'

const PrintGHNComponent = React.forwardRef((props, ref) => {
  //@ts-ignore
  const { code, name, address } = props
  const getLocation = () => {
    const locations = address.split(',')
    if (locations.length >= 3) {
      return [
        locations[locations.length - 2] || '',
        locations[locations.length - 1] || ''
      ]
        .filter((l) => l !== '')
        .join(', ')
    }
    return address
  }
  return (
    <div className="border">
      <div
        className="w-[576px] max-h-[384px] flex flex-col items-center bg-white overflow-hidden"
        //@ts-ignore
        ref={ref}>
        <p className="text-7xl text-center font-bold mt-10">{name || ''}</p>
        <p className="text-5xl mt-[8px] text-center font-medium">
          {code || ''}
        </p>
        <p className="text-xl mt-[8px] text-center px-[24px]">
          {getLocation()}
        </p>
      </div>
    </div>
  )
})

PrintGHNComponent.displayName = 'PrintGHNComponent'

export default PrintGHNComponent
