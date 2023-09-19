import { ICustomerType } from './types'

export const dataValues: ICustomerType[] = [
  {
    name: 'Anh Nguyên',
    phone: '098.982.3777',
    address: 'Nha Trang'
  },
  {
    name: 'Anh Liêm',
    phone: '091.527.1349',
    address: 'Phú Yên'
  },
  {
    name: 'Anh Nhơn Bombo',
    phone: '093.483.3303',
    address: 'Bình Phước'
  },
  {
    name: 'Chị Vy',
    phone: '096.464.5056',
    address: 'Hà Nội'
  },
  {
    name: 'C Hường',
    phone: '034.973.3963',
    address: 'Di Linh 3 Đinh lạc, Tân Nghĩa, Di linh (Giao tận nơi)'
  },
  {
    name: 'C Hường',
    phone: '034.973.3963',
    address: 'Di Linh 3 Đinh lạc, Tân Nghĩa, Di linh (Giao tận nơi)'
  },
  {
    name: 'Chị Mỹ',
    phone: '097.839.7482',
    address: 'Cơm Kiều Trạm Y tế An Phước, mang thít, vĩnh long'
  },
  {
    name: 'C Phương',
    phone: '079.704.1190',
    address: 'Đà lạt'
  },
  {
    name: 'Anh Dỹ',
    phone: '090.3500.728',
    address: 'Đà nẵng'
  },
  {
    name: 'C Thắm',
    phone: '093.799.4123',
    address: 'Đà nẵng'
  },
  {
    name: 'C Hà',
    phone: '093.498.6378',
    address: '4b Trần Bình Trọng Đà nẵng'
  },
  {
    name: 'Anh Đạo',
    phone: '090.320.1004',
    address: 'Bến xe Lai Vung Đồng Tháp'
  },
  {
    name: 'Anh Lực',
    phone: '098.895.4566',
    address: 'bến xe đăk đoa Gia lai'
  },
  {
    name: 'Chị LÊ THỊ NGỌC CHÂU',
    phone: '078.287,4219',
    address: 'TRẦN PHÚ - ĐÀ NẴNG'
  },
  {
    name: 'Anh Photo Quang',
    phone: '097.433.2253',
    address: 'Kontum'
  },
  {
    name: 'Anh Lũy',
    phone: '084.710.7368',
    address: 'Cà mau'
  },
  {
    name: 'C Vân',
    phone: '033.876.3102',
    address: 'Ngã ba Gia Canh, Định Quán, Đồng Nai'
  },
  {
    name: 'C Thúy',
    phone: '090.238.8711',
    address: 'Chợ Cũ Long thành'
  },
  {
    name: 'Anh Dũng',
    phone: '096.657.9600',
    address: 'Ngã 3 Mỹ Xuân, Vũng Tàu'
  },
  {
    name: 'Anh Việt',
    phone: '0919.419.495',
    address: 'Thạnh Mỹ Đơn Dương, Lâm Đồng'
  },
  {
    name: 'Chị Trang',
    phone: '0343.712.844',
    address: 'Phước Bình'
  },
  {
    name: 'Chị Trang',
    phone: '0937.414.848',
    address: 'Bến Xe Liên Hương'
  }
]

export function removeAccents(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
}
