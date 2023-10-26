import { Input, Textarea } from '@material-tailwind/react'
import React, { FC } from 'react'
import { ICustomerType } from '../../../ultilities/types'

const PrintForm: FC<{
  customer: ICustomerType
  onChange: (value: ICustomerType) => void
}> = ({ customer, onChange }) => {
  return (
    <div className="space-y-4 mt-4">
      <Input
        onChange={(e) => onChange({ ...customer, name: e.target.value })}
        value={customer?.name}
        color="blue"
        crossOrigin="anonymous"
        label="Tên khách hàng"
      />
      <Input
        onChange={(e) => onChange({ ...customer, phone: e.target.value })}
        value={customer?.phone}
        color="blue"
        crossOrigin="anonymous"
        label="Điện thoại"
      />
      <Textarea
        onChange={(e) => onChange({ ...customer, address: e.target.value })}
        value={customer?.address}
        color="blue"
        label="Địa chỉ"
      />
    </div>
  )
}

export default PrintForm
