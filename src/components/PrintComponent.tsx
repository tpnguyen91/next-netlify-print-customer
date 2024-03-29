import * as React from 'react'

const PrintComponent = React.forwardRef((props, ref) => {
  //@ts-ignore
  const { name, phone, address } = props
  return (
    <div className="border">
      <div
        className="w-[576px] max-h-[384px] h-[384px] flex flex-col justify-center items-center bg-white overflow-hidden"
        //@ts-ignore
        ref={ref}>
        <p className="text-7xl text-center font-bold">
          {(name || '').toUpperCase()}
        </p>
        <p className="text-5xl mt-[8px] text-center font-medium">
          {phone || ''}
        </p>
        <p className="text-2xl mt-[8px] text-center px-[24px]">
          {address || ''}
        </p>
        <p className="text-lg font-bold mt-[8px] text-center px-[24px]">
          ** HÀNG THỰC PHẨM, VUI LÒNG GIAO GẤP. CẢM ƠN **
        </p>
      </div>
    </div>
  )
})

PrintComponent.displayName = 'PrintComponent'

export default PrintComponent
