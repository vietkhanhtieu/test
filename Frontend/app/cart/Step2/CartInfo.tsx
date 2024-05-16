'use client'

import { ICoupon } from '@/app/api/definitions/voucher'
import OldCouponModal from '@/app/ui/vouchers/OldCouponModal'
import Spinner from '@/components/ui/spinner'
import axios from '@/lib/axios'
import { RootState } from '@/lib/redux/store'
import { groupBy } from 'lodash'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { IOrderData, IShippingMethodProps } from '../page'
import IndividualOrderGroup from './IndividualOrderGroup'
import TotalPrice from './TotalPrice'
import VoucherSelect from './VoucherSelect'

interface ICartInfoProps {
  listProducts: any[]
  selectedShippingMethod: IShippingMethodProps | null
  setOrderData: Dispatch<SetStateAction<IOrderData>>
  orderData: IOrderData
  handleOnClick: () => void
  loading: boolean
  exceedStock: number[]
}

interface ProductParam {
  product_id: number
  quantity: number
}

export interface ICalculatedData {
  subtotal: number
  shippingTotal: number
  shippingDiscount: number
  amountTotal: number
  totalProduct: number
  campaignDiscount: number
  discountTotal: number
  discountOrder: number
}

const CartInfo: React.FC<ICartInfoProps> = ({
  listProducts,
  selectedShippingMethod,
  setOrderData,
  orderData,
  handleOnClick,
  loading,
  exceedStock
}) => {
  const [sellers, setSellers] = useState<any>()
  const [disable, setDisable] = useState<boolean>(false)
  const [fetching, setFetching] = useState<boolean>(false)
  const [calculatedData, setCalculatedData] = useState<ICalculatedData>({
    subtotal: 0,
    shippingTotal: 0,
    shippingDiscount: 0,
    amountTotal: 0,
    totalProduct: 0,
    campaignDiscount: 0,
    discountTotal: 0,
    discountOrder: 0
  })
  const [pharmacyCenterVouchers, setPharmacyCenterVouchers] = useState<any>([])
  const [appliedPharmacyCoupons, setAppliedPharmacyCoupons] = useState<string[]>([])
  const [appliedSellerCoupons, setAppliedSellerCoupons] = useState<any>({})
  const [selectedCoupon, setSelectedCoupon] = useState<ICoupon>()

  const { selectedProducts, cart } = useSelector((state: RootState) => state.userCart)

  const products = listProducts || selectedProducts

  useEffect(() => {
    const fetchData = async (productParams: any, sellersCoupons: string[]) => {
      try {
        setFetching(true)
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/cart/calc`,
          {
            products: productParams,
            voucher_code: appliedPharmacyCoupons,
            voucher_seller: sellersCoupons,
            delivery_method: selectedShippingMethod?.delivery_method_value,
            delivery_price: selectedShippingMethod?.delivery_price,
            payment_method: orderData.paymentMethod
          }
        )
        const responseData = response?.data?.data
        if (responseData) {
          const totalProducts = responseData.sellers.map((item: any) => item.total_product)
          setCalculatedData({
            amountTotal: responseData.amount_total,
            shippingDiscount: responseData.shipping_discount,
            shippingTotal: responseData.shipping_total,
            campaignDiscount: responseData.campaign_discount,
            discountTotal: responseData.discount_total,
            discountOrder: responseData.discount_order,
            subtotal: responseData.subtotal,
            totalProduct: totalProducts.reduce(
              (accumulator: any, currentValue: any) => accumulator + currentValue,
              0
            )
          })
          setSellers(responseData.sellers)
          setPharmacyCenterVouchers(responseData.vouchers)
        }
      } catch (error) {
        console.error('Failed to Calculate Price:', error)
      } finally {
        setFetching(false)
      }
    }

    const groupProductBySupplierId = groupBy(products, 'supplier.id')
    const productParams: any = {}

    Object.keys(groupProductBySupplierId).forEach((key: string) => {
      productParams[key] = groupProductBySupplierId[key].map((product: ProductParam) => ({
        product_id: product.product_id,
        quantity: product.quantity
      }))
    })
    fetchData(productParams, appliedSellerCoupons)

    setOrderData({
      ...orderData,
      products: productParams
    })
  }, [
    products,
    appliedPharmacyCoupons,
    appliedSellerCoupons,
    selectedShippingMethod?.delivery_method_value,
    orderData.paymentMethod,
    orderData.deliveryPrice
  ])

  useEffect(() => {
    setOrderData({
      ...orderData,
      voucherSeller: appliedSellerCoupons
    })
  }, [appliedSellerCoupons])

  useEffect(() => {
    setOrderData({
      ...orderData,
      voucherCode: appliedPharmacyCoupons
    })
  }, [appliedPharmacyCoupons])

  useEffect(() => {
    if (!!exceedStock.length) {
      let outOfStock = cart.findIndex((i) => i.stock_status !== 'instock' || i.stock_quantity < 0)
      setDisable(outOfStock !== -1)
    } else {
      setDisable(false)
    }
  }, [exceedStock])

  if (!sellers) return <Spinner size='md' className='mt-[68px]' />

  return (
    <>
      <div className='bg-white rounded-t-[10px] xl:min-w-[280px] font-normal mt-[68px]'>
        <div className='pl-[15px] py-2.5 font-semibold text-16 leading-5 border-b border-gainsboro text-primary'>
          Thông tin giỏ hàng
        </div>
        {sellers.map((seller: any) => (
          <IndividualOrderGroup
            key={seller.id}
            groupName={seller.name}
            groupId={seller.id}
            cartItem={[...seller.seller_items, ...seller.outstock_items]}
            selectedShippingMethod={selectedShippingMethod}
            totalShipping={seller.shipping_total}
            amountTotal={seller.amount_total}
            vouchers={seller.vouchers}
            fetching={fetching}
            setAppliedSellerCoupons={setAppliedSellerCoupons}
            exceedStock={exceedStock}
            setSelectedCoupon={setSelectedCoupon}
          />
        ))}
        <VoucherSelect
          vouchers={pharmacyCenterVouchers}
          appliedCoupons={appliedPharmacyCoupons}
          setAppliedCoupons={setAppliedPharmacyCoupons}
          setSelectedCoupon={setSelectedCoupon}
        />
      </div>
      <TotalPrice
        calculateData={calculatedData}
        handleOnClick={handleOnClick}
        loading={loading}
        fetching={fetching}
        disable={disable}
      />
      <OldCouponModal coupon={selectedCoupon} />
    </>
  )
}

export default CartInfo
