import moment from 'moment'

import { _fetch } from '../actions'

const mappingProductData = (product: any) => {
  return {
    id: product.id,
    name: product.tenThuongMai || `${product.title} (${product.packing})`,
    manufacturer: product.nhaSanXuat?.tenNhaSanXuat,
    manufacturerId: product.nhaSanXuat?.maNhaSanXuat,
    supplier: product.supplier ? product.supplier.name : 'Gonsa Thương Mại',
    dueDate: product.due_date ? moment(product.due_date, 'DDMMYYYY').format('DD/MM/YYYY') : null,
    treatmentGroup: product.nhomDieuTri?.tenNhomDieuTri,
    activeIngredientConcentration: product.hoatChatHamLuong || product.active_element,
    dosageForm: product.dangBaoChe?.tenDangBaoCheCap2,
    packagingSpecification: product.quyCachDongGoi,
    unit: product.donViTinh,
    price: product.regular_price,
    priceSale: product.sale_price || 0,
    inWishList: product.in_wishlist,
    coupon: product.coupon,
    publicDate: product.public_at,
    bestSell: product.total_sales,
    stockQuantity: product.stock_quantity || 0,
    stockStatus: product.stock_status
  }
}

const getCouponProducts = async () => {
  const productList = await _fetch('/wp-json/product/list', 'POST', {
    type_category: 'SKM',
    category: ['sieu-khuyen-mai']
  })

  const mappedProductList = productList.data.data.map((item: any) => {
    return mappingProductData(item)
  })

  return mappedProductList
}

export { getCouponProducts }
