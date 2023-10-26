import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import CustomerForm from './CustomerForm'
import useCustomerCRUDLogic from '../../hooks/useCustomerCRUDLogic'
import { ICustomerForm } from '../../../ultilities/types'
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography
} from '@material-tailwind/react'

const CustomerEditView: FC<{
  formRef: any
  open: boolean
  setOpen: (open: boolean) => void
  onSubmit: (data: ICustomerForm) => void
  defaultValues: ICustomerForm
}> = ({ open, setOpen, onSubmit, formRef, defaultValues }) => {
  return (
    <Dialog size="md" open={open} handler={setOpen}>
      <DialogHeader className="justify-between">
        <Typography variant="h5" color="blue-gray">
          Chỉnh sửa khách hàng
        </Typography>
      </DialogHeader>
      <DialogBody divider>
        <CustomerForm
          defaultValues={defaultValues}
          formRef={formRef}
          onSubmit={onSubmit}
        />
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={() => setOpen(false)}
          className="mr-1">
          <span>Huỷ</span>
        </Button>
        <Button
          type="submit"
          variant="gradient"
          color="green"
          onClick={() =>
            formRef?.current?.dispatchEvent(
              new Event('submit', { cancelable: true, bubbles: true })
            )
          }>
          <span>Cập nhật</span>
        </Button>
      </DialogFooter>
    </Dialog>
  )
}

export default CustomerEditView
