import { IProductListProps } from '@/app/ui/TableProduct'
import moment from 'moment'

import { ICompany } from './CompanyInfo'
import { IProductDetail } from './Detail'
import { IProductData } from './ProductInfo'

const mapProductLists = (response: any): IProductListProps[] => {
  if (!response || typeof response !== 'object') {
    return []
  }
  return Object.values(response).map((value: any) => ({
    id: value.id,
    name: value.title,
    manufacturer: value.nhaSanXuat?.tenNhaSanXuat || '',
    manufacturerId: value.nhaSanXuat?.maNhaSanXuat,
    supplier: value.supplier?.name || '',
    dueDate: value.due_date ? moment(value.due_date, 'DDMMYYYY').format('DD/MM/YYYY') : null,
    treatmentGroup: value.nhomDieuTri?.tenNhomDieuTri || '',
    activeIngredientConcentration: value.hoatChatHamLuong || '',
    dosageForm: value.dosage_form || '',
    packagingSpecification: value.quyCachDongGoi || '',
    unit: value.packing || '',
    price: value.regular_price || 0,
    priceSale: value.sale_price || 0,
    inWishList: value.in_wishlist || false,
    coupon: value.coupon || '',
    publicDate: value.public_at || '',
    bestSell: value.total_sales || 0,
    stockQuantity: value.stock_quantity || 0,
    stockStatus: value.stock_status
  }))
}

const mapProduct = (value: any): IProductData => {
  return {
    name: value.name || '',
    hoatChat: value.hoat_chat || '',
    description: value.description || '',
    congDung: value.cong_dung || '',
    lieuDung: value.lieu_dung || '',
    tuongTacThuoc: value.tuong_tac_thuoc || '',
    baoQuan: value.bao_quan || '',
    tacDungPhu: value.tac_dung_phu || ''
  }
}

const mapSupplier = (value: any): ICompany => {
  return {
    id: value.id || '',
    name: value.name || '',
    term_id: value.term_id || 0,
    icon: value.icon || '',
    isWishlistSupplier: value.is_wishlist_supplier || false,
    star: value.star || '',
    total_product: value.total_product || 0
  }
}

const mapProductDetail = (value: any): IProductDetail => {
  return {
    id: value.id,
    productName: value.name,
    status: value.status,
    soldProduct: value.sold_product,
    rating: value.average_rating,
    sale: value.sale,
    unitSell: value.unit_sell,
    price: value.price,
    originPrice: value.origin_price,
    code: value.code,
    declarationPrice: value.declaration_price,
    baseUnit: value.base_unit,
    expired: value.expired ? moment(value.expired, 'DDMMYYYY').format('DD-MM-YYYY') : null,
    packing: value.packing,
    ingredient: value.hoat_chat,
    treatmentGroup: value.category,
    dosageForm: value.dang_bao_che,
    producerName: value.producer && value.producer[0].name,
    national: value.national,
    percentageReduction: value.percentage_reduction,
    imageList: value.list_image_product || ['/assets/default-not-found-image.jpeg'],
    licenseLink: value.license_link,
    inWishList: value.is_wishlist,
    quantity: value.quantity
  }
}

export { mapProductLists, mapProduct, mapSupplier, mapProductDetail }
