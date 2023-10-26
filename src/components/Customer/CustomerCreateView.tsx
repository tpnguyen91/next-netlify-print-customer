import React, { FC } from 'react'
import CustomerForm from './CustomerForm'
import { ICustomerForm } from '../../../ultilities/types'
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography
} from '@material-tailwind/react'

const CustomerCreateView: FC<{
  formRef: any
  open: boolean
  setOpen: (open: boolean) => void
  onSubmit: (data: ICustomerForm) => void
}> = ({ open, setOpen, onSubmit, formRef }) => {
  return (
    <Dialog size="md" open={open} handler={setOpen}>
      <DialogHeader className="justify-between">
        <Typography variant="h5" color="blue-gray">
          Thêm mới khách hàng
        </Typography>
      </DialogHeader>
      <DialogBody divider>
        <CustomerForm formRef={formRef} onSubmit={onSubmit} />
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
          <span>Tạo mới</span>
        </Button>
      </DialogFooter>
    </Dialog>
  )
}

export default CustomerCreateView
