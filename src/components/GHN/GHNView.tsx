import React, { useEffect, useRef, useState } from 'react'
import useCustomerCRUDLogic from '../../hooks/useCustomerCRUDLogic'
import {
  ICustomerForm,
  ICustomerType,
  IGHNOrderType
} from '../../../ultilities/types'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Input,
  Typography
} from '@material-tailwind/react'
import { Printer } from 'lucide-react'
import DrawerBottomView from '../Customer/DrawerBottomView'
import useGHNDelivery from '../../hooks/useGHNDelivery'

const TABLE_HEAD = [
  'Mã GHN',
  'Tên Khách hàng',
  'SĐT',
  'Địa chỉ',
  'Nội dung',
  ''
]

function GHNView(props) {
  const [customer, setCustomer] = useState<IGHNOrderType>()
  const [listData, setListData] = useState<IGHNOrderType[]>([])
  const [openDrawer, setOpenDrawer] = useState(false)
  const { fetchListWaitingPickup } = useGHNDelivery()

  useEffect(() => {
    fetchListWaitingPickup().then((rs) => {
      setListData(rs.data)
    })
  }, [])

  return (
    <div>
      <Card className="h-full w-full overflow-hidden">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 mt-2 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                GIAO HÀNG NHANH ({listData.length})
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max"></div>
          </div>
        </CardHeader>
        <CardBody className="overflow-y-scroll px-0 max-h-[600px]">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {listData.map(
                (
                  { to_name, to_phone, to_address, content, order_code },
                  index
                ) => (
                  <tr key={index} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal">
                        {order_code}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal">
                        {to_name}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal">
                        {to_phone}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal">
                        {to_address}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal">
                        {content}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-4">
                        <IconButton
                          color="amber"
                          onClick={() => {
                            setCustomer({
                              to_name,
                              to_phone,
                              to_address,
                              content,
                              order_code
                            })
                            setTimeout(() => {
                              setOpenDrawer(true)
                            }, 500)
                          }}
                          className="rounded-full  hover:shadow-[#1DA1F2]/20 focus:shadow-[#1DA1F2]/20 active:shadow-[#1DA1F2]/10">
                          <Printer color="white" size={16} />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <DrawerBottomView
        typePrint="GHN"
        GHNItem={customer}
        open={openDrawer}
        setOpen={setOpenDrawer}
      />
    </div>
  )
}

export default GHNView
