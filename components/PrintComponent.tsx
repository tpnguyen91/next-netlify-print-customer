import * as React from 'react'

const PrintComponent = React.forwardRef((props, ref) => {
  //@ts-ignore
  const { name, phone, address } = props
  return (
    <div
      className="w-[576px] max-h-[384px] h-[384px] bg-white border p-3"
      //@ts-ignore
      ref={ref}>
      <p className="text-5xl text-center font-bold">{name || ''}</p>
      <p className="text-5xl text-center font-medium">{phone || ''}</p>
      <p className="text-5xl text-center">{address || ''}</p>
    </div>
  )
})

PrintComponent.displayName = 'PrintComponent'

export default PrintComponent
