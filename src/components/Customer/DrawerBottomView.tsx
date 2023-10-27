import {
  Button,
  Drawer,
  IconButton,
  Typography
} from '@material-tailwind/react'
import React, { FC, useRef } from 'react'
import ReactToPrint from 'react-to-print'
import PrintComponent from '../PrintComponent'
import { ICustomerType, IGHNOrderType } from '../../../ultilities/types'
import PrintForm from './PrintForm'
import PrintGHNComponent from '../PrintGHNComponent'

const DrawerBottomView: FC<{
  typePrint?: 'customer' | 'GHN'
  open: boolean
  setOpen: (open: boolean) => void
  setCustomer?: (cus: ICustomerType) => void
  currentCustomer?: ICustomerType
  GHNItem?: IGHNOrderType
}> = ({
  open,
  setOpen,
  currentCustomer,
  setCustomer,
  typePrint = 'customer',
  GHNItem
}) => {
  const closeDrawerBottom = () => setOpen(false)
  let componentRef = useRef()
  return (
    <Drawer
      size={620}
      placement="right"
      open={open}
      onClose={closeDrawerBottom}
      className="p-4">
      <div className="mb-6 flex items-center justify-between">
        <Typography variant="h5" color="blue-gray">
          In thông tin khách hàng
        </Typography>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={closeDrawerBottom}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>
      {typePrint === 'customer' ? (
        <>
          <PrintComponent
            //@ts-ignore
            name={currentCustomer?.name || ''}
            phone={currentCustomer?.phone || ''}
            address={currentCustomer?.address || ''}
            ref={componentRef}
          />
          <PrintForm onChange={setCustomer} customer={currentCustomer} />
        </>
      ) : (
        <PrintGHNComponent
          //@ts-ignore
          name={GHNItem?.to_name || ''}
          code={GHNItem?.order_code || ''}
          address={GHNItem?.to_address || ''}
          ref={componentRef}
        />
      )}

      <div className="flex gap-2 mt-2">
        <Button onClick={closeDrawerBottom} size="sm" variant="outlined">
          Huỷ
        </Button>
        <ReactToPrint
          trigger={() => <Button size="sm">In đơn</Button>}
          content={() => componentRef.current}
        />
      </div>
    </Drawer>
  )
}

export default DrawerBottomView
