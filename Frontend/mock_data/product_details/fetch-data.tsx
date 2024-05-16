import { IProductListProps } from '@/app/ui/TableProduct'
import moment from 'moment'

import data from './data.json'

export default function FetchData() {
  const response = data.data.list_product.data
  const productArr: IProductListProps[] = Object.values(response).map((value) => ({
    id: value.maSanPhamEc,
    name: value.tenThuongMai,
    manufacturer: value.nhaSanXuat.tenNhaSanXuat,
    manufacturerId: value.nhaSanXuat.maNhaSanXuat || 0,
    supplier: value.supplier.name,
    dueDate: value.due_date ? moment(value.due_date, 'DDMMYYYY').format('DD/MM/YYYY') : null,
    treatmentGroup: value.nhomDieuTri.tenNhomDieuTri,
    activeIngredientConcentration: value.hoatChatHamLuong,
    dosageForm: value.dangBaoChe.tenDangBaoCheCap3,
    packagingSpecification: value.quyCachDongGoi,
    unit: value.donViTinh,
    price: value.regular_price,
    priceSale: value.giaSale,
    inWishList: value.in_wishlist,
    coupon: value.coupon,
    publicDate: value.public_at,
    bestSell: value.total_sales,
    stockQuantity: value.stock_quantity,
    stockStatus: value.stock_status
  }))
  return productArr
}
