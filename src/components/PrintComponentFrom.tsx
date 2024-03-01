import * as React from 'react'

const PrintComponentFrom = React.forwardRef((props, ref) => {
  //@ts-ignore
  const { name, phone, address } = props
  return (
    <div className="border">
      <div
        className="w-[576px] max-h-[384px] h-[384px] bg-white overflow-hidden px-4 py-4"
        //@ts-ignore
        ref={ref}>
        <div className="grid grid-cols-[110px_1fr] w-full border-dashed border-blue-gray-700	border-2 px-1 py-1 rounded">
          <div className="w-[100px] underline">Người gửi:</div>
          <div className="flex flex-row items-center">
            <p className="font-bold text-[40px]">C Thuỷ</p>
            <p className="font-medium text-[20px] ml-4"> 0909721166</p>
          </div>
        </div>
        <div className="grid grid-cols-[110px_1fr] w-full border-dashed border-blue-gray-700	border-2 px-1 py-1 rounded mt-2">
          <div className="w-[100px] underline">Người nhận:</div>
          <div className="">
            <div>
              <p className="font-bold text-4xl">{name.toUpperCase()}</p>
              <p className="font-medium text-5xl">{phone}</p>
            </div>
            <div className="font-medium text-2xl">{address}</div>
          </div>
        </div>
        <p className="text-lg font-bold mt-[8px] text-center px-[24px]">
          ** HÀNG THỰC PHẨM, VUI LÒNG GIAO GẤP. CẢM ƠN **
        </p>
      </div>
    </div>
  )
})

PrintComponentFrom.displayName = 'PrintComponentFrom'

export default PrintComponentFrom
