import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ICustomerForm } from '../../../ultilities/types'
import { Card, Input, Textarea } from '@material-tailwind/react'

const CustomerForm: FC<{
  formRef: any
  defaultValues?: ICustomerForm
  onSubmit: (data: ICustomerForm) => void
}> = ({ onSubmit, defaultValues = {}, formRef }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ICustomerForm>({
    defaultValues
  })

  const onSubmitForm: SubmitHandler<ICustomerForm> = (data) => {
    onSubmit(data)
  }

  return (
    <Card className="mx-auto w-full transparent shadow-none">
      <form ref={formRef} onSubmit={handleSubmit(onSubmitForm)}>
        <div className="grid gap-4 w-full mb-4 grid-cols-1 md:grid-cols-2">
          <div className="sm:col-span-2">
            <Input
              color="blue"
              crossOrigin="anonymous"
              label="Tên khách hàng"
              {...register('name', { required: true })}
              error={!!errors.name}
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              color="blue"
              crossOrigin="anonymous"
              label="Điện thoại"
              {...register('phone', { required: true })}
              error={!!errors.phone}
            />
          </div>
          <div className="sm:col-span-2">
            <Textarea
              color="blue"
              label="Địa chỉ"
              {...register('address', { required: true })}
              error={!!errors.address}
            />
          </div>
          <div className="sm:col-span-2">
            <Textarea
              color="blue"
              label="Ghi chú"
              {...register('note', { required: true })}
              error={!!errors.note}
            />
          </div>
        </div>
      </form>
    </Card>
  )
}

export default CustomerForm
