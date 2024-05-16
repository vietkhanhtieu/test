import { getCouponProducts } from '../api/product'
import { TableProduct } from '../ui'

const ProductSection = async () => {
  const products = await getCouponProducts()

  return <TableProduct productLists={products} />
}

export default ProductSection
