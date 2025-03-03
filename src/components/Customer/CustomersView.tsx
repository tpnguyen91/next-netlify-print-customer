import React, { useEffect, useMemo, useRef, useState } from 'react'
import useCustomerCRUDLogic from '../../hooks/useCustomerCRUDLogic'
import { ICustomerForm, ICustomerType } from '../../../ultilities/types'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Typography
} from '@material-tailwind/react'
import { FileSignature, Printer, Trash2, UserPlusIcon } from 'lucide-react'
import CustomerForm from './CustomerForm'
import { PencilIcon } from '@heroicons/react/24/solid'
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { UseFormProps } from 'react-hook-form'
import { NotificationDialog } from '../AlertView/AlertView'
import CustomerCreateView from './CustomerCreateView'
import CustomerEditView from './CustomerEditView'
import { dataValues, removeAccents } from '../../../ultilities/contants'
import DrawerBottomView from './DrawerBottomView'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import { isMobile } from 'react-device-detect'

const TABLE_HEAD = ['Tên', 'SĐT', 'Địa chỉ', 'Ghi chú', '']

function CustomersView(props) {
  const [openShowConfirmDelete, setOpenShowConfirmDelete] = useState(false)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [customer, setCustomer] = useState<ICustomerType>()
  const [listData, setListData] = useState([])
  const [openDrawer, setOpenDrawer] = useState(false)
  const formRef = useRef<UseFormProps & any>()
  const [query, setQuery] = useState('')
  const { getAllCustomers, addNewCustomer, updateCustomer, deleteCustomer } =
    useCustomerCRUDLogic()

  useEffect(() => {
    onFetchListCustomer()
  }, [])

  const onFetchListCustomer = () => {
    getAllCustomers().then((rs) => {
      setListData(rs)
    })
  }

  const onDeleteCustomer = () => {
    deleteCustomer(customer.id).finally(() => {
      onFetchListCustomer()
      setCustomer(undefined)
      setOpenShowConfirmDelete(false)
    })
  }

  const onCreateNewCustomer = (data: ICustomerForm) => {
    addNewCustomer(data).finally(() => {
      onFetchListCustomer()
      setOpenCreateModal(false)
    })
  }

  const onEditCustomer = (data: ICustomerForm) => {
    updateCustomer(data, customer.id).finally(() => {
      onFetchListCustomer()
      setOpenEditModal(false)
    })
  }

  const listDataCustomer = useMemo(() => {
    return query === ''
      ? listData
      : listData.filter((cus) =>
          removeAccents(cus.name)
            .toLowerCase()
            .includes(removeAccents(query.toLowerCase()))
        )
  }, [query, listData])

  const onActionTrigger = (
    data: ICustomerType,
    type: 'Print' | 'Edit' | 'Delete'
  ) => {
    setCustomer(data)
    setTimeout(() => {
      if (type === 'Edit') {
        setOpenEditModal(true)
      }
    }, 500)
  }

  const importCustomer = async () => {
    dataValues.forEach((cus) => {
      let value = addNewCustomer({ ...cus, note: '' })
    })
  }

  return (
    <div>
      <Card className="h-full w-full overflow-hidden">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 mt-2 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                DANH SÁCH KHÁCH HÀNG ({listDataCustomer.length})
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  color="blue"
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                  crossOrigin=""
                  label="Tìm kiếm..."
                  size="lg"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
              <Button
                color="blue"
                onClick={() => setOpenCreateModal(true)}
                className="flex items-center gap-3"
                size="sm">
                Thêm mới
              </Button>
              {/* <Button
                color="blue"
                onClick={importCustomer}
                className="flex items-center gap-3"
                size="sm">
                Import DS Khách hàng
              </Button> */}
            </div>
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
            {listDataCustomer.map(({ name, phone, address, note, id }) => (
              <Tr key={id} className="even:bg-blue-gray-50/50">
                <Td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal">
                    {name}
                  </Typography>
                </Td>
                <Td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className={`font-normal ${!isMobile ? 'text-center' : ''}`}>
                    {phone}
                  </Typography>
                </Td>
                <Td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal">
                    {address}
                  </Typography>
                </Td>
                <Td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal">
                    {note}
                  </Typography>
                </Td>
                <Td className="p-4">
                  <div className="flex gap-4">
                    <IconButton
                      color="amber"
                      onClick={() => {
                        setCustomer({ name, phone, address, note, id })
                        setTimeout(() => {
                          setOpenDrawer(true)
                        }, 500)
                      }}
                      className="rounded-full  hover:shadow-[#1DA1F2]/20 focus:shadow-[#1DA1F2]/20 active:shadow-[#1DA1F2]/10">
                      <Printer color="white" size={16} />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setCustomer({ name, phone, address, note, id })
                        setTimeout(() => {
                          setOpenEditModal(true)
                        }, 500)
                      }}
                      className="rounded-full bg-[#1DA1F2] hover:shadow-[#1DA1F2]/20 focus:shadow-[#1DA1F2]/20 active:shadow-[#1DA1F2]/10">
                      <FileSignature color="white" size={16} />
                    </IconButton>
                    <IconButton
                      color="red"
                      onClick={() => {
                        setCustomer({ name, phone, address, note, id })
                        setTimeout(() => {
                          setOpenShowConfirmDelete(true)
                        }, 500)
                      }}
                      className="rounded-full hover:shadow-[#1DA1F2]/20 focus:shadow-[#1DA1F2]/20 active:shadow-[#1DA1F2]/10">
                      <Trash2 color="white" size={16} />
                    </IconButton>
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Card>
      <NotificationDialog
        onSubmit={onDeleteCustomer}
        open={openShowConfirmDelete}
        setOpen={setOpenShowConfirmDelete}
        title="Xoá"
        description="Bạn có muốn xoá Khách hàng này không?"
      />
      <CustomerCreateView
        formRef={formRef}
        open={openCreateModal}
        setOpen={setOpenCreateModal}
        onSubmit={onCreateNewCustomer}
      />
      <CustomerEditView
        formRef={formRef}
        open={openEditModal}
        setOpen={setOpenEditModal}
        onSubmit={onEditCustomer}
        defaultValues={customer as ICustomerForm}
      />
      <DrawerBottomView
        setCustomer={setCustomer}
        currentCustomer={customer}
        open={openDrawer}
        setOpen={setOpenDrawer}
      />
    </div>
  )
}

export default CustomersView
