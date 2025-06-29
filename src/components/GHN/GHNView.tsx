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
import { Copy, Printer } from 'lucide-react'
import DrawerBottomView from '../Customer/DrawerBottomView'
import useGHNDelivery from '../../hooks/useGHNDelivery'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import { isMobile } from 'react-device-detect'
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
        <Table>
          <Thead>
            <Tr>
              {TABLE_HEAD.map((name, index) => (
                <Th
                  className={`${name === 'Ghi chú' ? 'text-left' : ''}`}
                  key={index}>
                  {name}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {listData.map(
              (
                { to_name, to_phone, to_address, content, order_code },
                index
              ) => (
                <Tr key={index} className="even:bg-blue-gray-50/50">
                  <Td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {order_code}
                    </Typography>
                  </Td>
                  <Td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {to_name}
                    </Typography>
                  </Td>
                  <Td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {to_phone}
                    </Typography>
                  </Td>
                  <Td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {to_address}
                    </Typography>
                  </Td>
                  <Td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {content}
                    </Typography>
                  </Td>
                  <td className="p-4">
                    <div className="flex gap-4">
                      <IconButton
                        color="green"
                        onClick={() => {
                          let content = `${to_name} \n ${order_code} \n ${to_address}`
                          navigator.clipboard.writeText(content)
                        }}
                        className="rounded-full  hover:shadow-[#1DA1F2]/20 focus:shadow-[#1DA1F2]/20 active:shadow-[#1DA1F2]/10">
                        <Copy color="white" size={16} />
                      </IconButton>
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
                </Tr>
              )
            )}
          </Tbody>
        </Table>
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
