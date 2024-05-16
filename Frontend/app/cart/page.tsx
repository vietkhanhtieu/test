'use client'

import { setInvalidLicenses, setShouldCheckStock, setUserCart } from '@/lib/redux/slices/user_cart'
import { setCurrentStep, setSelectedProducts } from '@/lib/redux/slices/user_cart'
import { RootState } from '@/lib/redux/store'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { cloneDeep, groupBy } from 'lodash'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CartApi } from '../api/cart'
import { Breadcrumb } from '../ui'
import revalidateRecentlyOrders from '../ui/home/authenticated/RecentlyOrders/action'
import CartAmount from './CartAmount'
import InvalidLicensesModal from './InvalidLicensesModal'
import MissedInformationModal from './MissedInformationModal'
import OutOfStockModal from './OutOfStockModal'
import RejectModal from './RejectModal'
import { Step1 } from './Step1/Step1'
import CartInfo from './Step2/CartInfo'
import CreateOrderSuccessModal from './Step2/CreateOrderSuccessModal'
import Step2 from './Step2/Step2'
import { OrderAddressesAndTax } from './Step3/OrderAddressesAndTax'
import { Step3 } from './Step3/Step3'
import { StepHeader } from './StepHeader'

export interface IShippingMethodProps {
  delivery_method_value: string
  delivery_method_label: string
  delivery_price: number
  dayShip: string
}

export interface IProductData {
  productId: number
  quantity: number
  stockQuantity?: number
  stockStatus?: string
  isThuoc?: boolean
}

interface IProductInCreateOrder {
  [key: string]: IProductData[]
}

export interface IOrderData {
  infoOrderId: string
  addressId: string
  invoiceId: string
  products: IProductInCreateOrder
  note: string
  voucherSeller?: any
  voucherCode?: string[]
  deliveryMethod: string
  paymentMethod: string
  receivingTime: string
  dayShip: string
  deliveryPrice?: number | null
}

const Cart = () => {
  const router = useRouter()
  const { selectedProducts, isFromReOrder } = useSelector((state: RootState) => state.userCart)
  const [fetchingData, setFetchingData] = useState<boolean>(false)
  const { cart, current_step, shouldCheckStock } = useSelector((state: RootState) => state.userCart)

  const [groupedItems, setGroupedItems] = useState<any>([])
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<IShippingMethodProps | null>(
    null
  )
  const [listProductItems, setListProductItems] = useState<IProductData[]>([])
  const [statusOcs, setStatusOcs] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [openInvalidLicensesModal, setOpenInvalidLicensesModal] = useState<boolean>(false)
  const [openMissedInformationModal, setOpenMissedInformationModal] = useState<boolean>(false)
  const [openOutOfStockModal, setOpenOutOfStockModal] = useState<boolean>(false)
  const [openRejectModal, setOpenRejectModal] = useState<boolean>(false)
  const [openCreateOrderSuccessModal, setOpenCreateOrderSuccessModal] = useState<boolean>(false)

  const [isPassedOcs, setIsPassedOcs] = useState<boolean>(false)
  const [isPassedStock, setIsPassedStock] = useState<boolean>(true)
  const [expiredGpp, setExpiredGpp] = useState<boolean>(false)
  const [exceedStock, setExceedStock] = useState<number[]>([])
  const [hasThuoc, setHasThuoc] = useState<boolean>(false)
  const [orderId, setOrderID] = useState<number | null>(null)

  const [orderData, setOrderData] = useState<IOrderData>({
    infoOrderId: '',
    addressId: '',
    invoiceId: '',
    products: {},
    note: '',
    voucherSeller: {},
    voucherCode: [],
    deliveryMethod: '',
    paymentMethod: 'cod',
    receivingTime: '',
    dayShip: '',
    deliveryPrice: null
  })

  const dispatch = useDispatch()

  let stepClasses

  switch (current_step) {
    case 1:
      stepClasses = 'me-10'
      break
    case 2:
      stepClasses = 'me-4'
      break
    default:
      stepClasses = ''
      break
  }

  // For Step 3
  const [order, setOrder] = useState<Record<string, any>>({})
  const [pricingAndDiscountData, setPricingAndDiscountData] = useState<Record<string, any>>({})

  useEffect(() => {
    if (current_step === 3) {
      fetchOrder()
    }
  }, [orderId, current_step])

  const fetchOrder = async () => {
    setLoading(true)
    const dataParams = {
      order_id: orderId
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/order-management/get`,
      dataParams
    )
    const data = response.data
    setLoading(false)

    if (data['message'] === 'Successfully') {
      setOrder(data.data)
      setPricingAndDiscountData(data.moreData)
    } else {
      console.error('Error fetching order data')
    }
  }

  useEffect(() => {
    if (statusOcs) {
      switch (statusOcs) {
        case 1:
          setIsPassedOcs(false)
          setOpenMissedInformationModal(true)
          return
        case 3:
          if (expiredGpp) {
            setIsPassedOcs(false)
            setOpenInvalidLicensesModal(true)
          }
          return
        case 4:
          setIsPassedOcs(false)
          setOpenRejectModal(true)
          return
        default:
          setIsPassedOcs(true)
          return
      }
    } else {
      setOpenInvalidLicensesModal(false)
      setOpenMissedInformationModal(false)
      setOpenRejectModal(false)
      setIsPassedOcs(false)
    }
  }, [statusOcs])

  useEffect(() => {
    // REFACTOR THIS TO IMPROVE PERFORMANCE PLEASE
    // YOU CAN GET THE LATEST CART DATA FROM REDUX STORE INSTEAD
    const fetchCartData = async () => {
      setFetchingData(true)
      try {
        const response = await CartApi.getCart()
        dispatch(setUserCart(response.data))
        if (selectedProducts && selectedProducts.length > 0) {
          const selectedProductIds = selectedProducts.map((i) => i.product_id)
          const itemKeys = response.data.cart
            .filter(
              (i: { stock_status: string; id: number }) =>
                i.stock_status === 'instock' && selectedProductIds.includes(i.id)
            )
            .map((i: { key: any }) => i.key)
          setSelectedItems(itemKeys)
        } else {
          const itemKeys = response.data.cart
            .filter((i: { stock_status: string }) => i.stock_status === 'instock')
            .map((i: { key: any }) => i.key)
          setSelectedItems(itemKeys)
        }
      } catch (error) {
        console.error(error)
      }
      setFetchingData(false)
    }

    dispatch(setShouldCheckStock({ shouldCheckStock: false, exceedStockItems: [] }))
    if (current_step === 1 && !isFromReOrder)
      dispatch(setSelectedProducts({ selectedProducts: [] }))
    dispatch(setInvalidLicenses({ invalidLicenses: false }))

    // always fetch new cart data to ensure the data is up-to-date
    fetchCartData()
  }, [])

  const updateCartCallback = () => {
    const listProducts: IProductData[] = cart
      .filter((item) => selectedItems.includes(item.key))
      .map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        sale_price: item.sale_price,
        regular_price: item.regular_price,
        supplier: item.supplier,
        title: item.title,
        packing: item.packing,
        productId: item.id,
        stockStatus: item.stock_status,
        stockQuantity: item.stock_quantity,
        isThuoc: item.is_thuoc
      }))
    setListProductItems(listProducts)
    if (listProducts.findIndex((i) => i.isThuoc) !== -1) {
      setHasThuoc(true)
    } else {
      setHasThuoc(false)
    }
  }

  useEffect(() => {
    if (current_step === 1) {
      // should refresh selectedProducts in the redux store each time go to step 1
      dispatch(setSelectedProducts({ selectedProducts: [] }))

      if (!shouldCheckStock) {
        const itemKeys = cart
          .filter((i: { stock_status: string }) => i.stock_status === 'instock')
          .map((i: { key: any }) => i.key)
        setSelectedItems(itemKeys)
      }
    }
  }, [current_step])

  useEffect(() => {
    setGroupedItems(groupBy(cart, 'supplier.name'))
    updateCartCallback()
  }, [JSON.stringify(cart)])

  useEffect(() => {
    if (selectedItems.length > 0) {
      updateCartCallback()
    }
  }, [selectedItems])

  const handleSelectAll = () => {
    const selectedAll =
      selectedItems.length ===
      cart.filter((i: { stock_status: string }) => i.stock_status === 'instock').map((i) => i.key)
        .length
    if (selectedAll) {
      setSelectedItems([])
    } else {
      setSelectedItems(cart.filter((i) => i.stock_status === 'instock').map((i) => i.key))
    }
  }

  const handleSelectGroup = (groupName: string) => {
    const group = groupedItems[groupName]

    let newSelectedItems = [...selectedItems]

    newSelectedItems = newSelectedItems.concat(
      group
        .filter((i: { stock_status: string }) => i.stock_status === 'instock')
        .map((i: { key: string }) => i.key)
    )
    setSelectedItems(newSelectedItems)
  }

  const handleUnSelectGroup = (groupName: string) => {
    const keys = groupedItems[groupName].map((i: { key: string }) => i.key)

    let newSelectedItems = selectedItems.filter((k: string) => !keys.includes(k))

    setSelectedItems(newSelectedItems)
  }

  const handleSelectItem = (itemKey: string) => {
    if (selectedItems.includes(itemKey)) {
      setSelectedItems(selectedItems.filter((i: string) => i !== itemKey))
    } else {
      setSelectedItems(selectedItems.concat(itemKey))
    }
  }

  const handleOnClick = async () => {
    if (listProductItems.length == 0) {
      return
    }
    setStatusOcs(null)
    setOpenInvalidLicensesModal(false)
    setOpenMissedInformationModal(false)
    setOpenRejectModal(false)
    setIsPassedOcs(false)
    setIsPassedStock(true)
    try {
      setLoading(true)
      switch (current_step) {
        case 1:
          if (hasThuoc) {
            const res = await checkApprovedRequest()
            if (res) {
              const resp = await checkStockQuantity()
              if (resp) {
                dispatch(setCurrentStep({ current_step: 2 }))
              }
            }
            break
          } else {
            setIsPassedOcs(true)
            const resp = await checkStockQuantity()
            if (resp) {
              dispatch(setCurrentStep({ current_step: 2 }))
            }
            break
          }
        case 2:
          const res = await checkStockQuantity()
          if (res) {
            const resp = await handleCreatePayment()
            if (resp) {
              const data = resp.data.data
              setOrderID(data.order_id)

              if ('payment_link' in data) {
                router.push(data.payment_link)
              } else {
                setOpenCreateOrderSuccessModal(true)
              }
            }
          }
          // Create payment
          break
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log('An unexpected error occurred:', error)
    }
  }

  const handleCreatePayment = async () => {
    const data = {
      info_order_id: orderData.infoOrderId,
      address_id: orderData.addressId,
      invoice_id: orderData.invoiceId,
      products: orderData.products,
      note: orderData.note,
      voucher_seller: orderData.voucherSeller,
      delivery_method: orderData.deliveryMethod,
      payment_method: orderData.paymentMethod,
      voucher_code: orderData.voucherCode,
      delivery_price: orderData.deliveryPrice,
      receiving_time: orderData.receivingTime,
      dayShip: orderData.dayShip
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/cart/create-order`,
      data
    )
    if (response.data.message === 'Successfully') {
      revalidateRecentlyOrders()
      return Promise.resolve(response)
    } else {
      return Promise.reject(false)
    }
  }

  const checkApprovedRequest = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/v1/check_approved`
    )

    if (response.data.message === 'Successfully') {
      const data = response.data.data
      setExpiredGpp(data.expired_gpp)
      setStatusOcs(data.status_ocs)
      switch (data.status_ocs) {
        case 1:
          setIsPassedOcs(false)
          setOpenMissedInformationModal(true)
          return false
        case 3:
          if (data.expired_gpp) {
            setIsPassedOcs(false)
            setOpenInvalidLicensesModal(true)
          }
          return true
        case 4:
          setIsPassedOcs(false)
          setOpenRejectModal(true)
          return false
        default:
          if (data.expired_gpp) {
            setIsPassedOcs(true)
            setOpenInvalidLicensesModal(true)
          }
          return true
      }
    } else {
      return false
    }
  }

  const checkStockQuantity = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/cart/get`)
    if (response.data.message === 'Successfully') {
      const data = response.data.data
      let newListProductItems = cloneDeep(listProductItems)
      let newExceedStock: number[] = []

      newListProductItems.forEach((p) => {
        const foundProduct = data.cart.find((e: { id: number }) => e.id === p.productId)

        if (foundProduct) {
          p.stockQuantity = foundProduct.stock_quantity
          p.stockStatus = foundProduct.stock_status
          if (
            foundProduct.stock_status === 'outofstock' ||
            (foundProduct.stock_quantity !== null && foundProduct.stock_quantity < p.quantity)
          ) {
            newExceedStock = newExceedStock.concat(foundProduct.id)
          }
        }
      })
      dispatch(setSelectedProducts({ selectedProducts: newListProductItems }))
      setExceedStock(newExceedStock)
      if (newExceedStock.length) {
        setOpenOutOfStockModal(true)
      }
      setListProductItems(newListProductItems)
      // up-to-date user-cart redux
      dispatch(setUserCart(data))

      return !newExceedStock.length
    } else {
      return false
    }
  }

  return (
    <div className='min-h-[60vh] mb-24'>
      <Breadcrumb
        links={[
          { title: 'Trang chủ', url: '/' },
          { title: 'Giỏ hàng', url: '/cart' }
        ]}
      />

      <div className='container px-1 md:px-5'>
        <div className='py-10 flex flex-col-reverse md:flex-row'>
          <div className={cn(stepClasses, 'w-full md:w-9/12')}>
            <StepHeader currentStep={current_step} />
            {current_step === 1 && (
              <Step1
                groups={groupedItems}
                selectedItems={selectedItems}
                fetchingData={fetchingData}
                handleSelectAll={handleSelectAll}
                handleSelectGroup={handleSelectGroup}
                handleUnSelectGroup={handleUnSelectGroup}
                handleSelectItem={handleSelectItem}
                setGroupedItems={setGroupedItems}
                setSelectedItems={setSelectedItems}
              />
            )}
            {current_step === 2 && (
              <Step2
                products={listProductItems}
                setShippingMethod={setSelectedShippingMethod}
                selectedShippingMethod={selectedShippingMethod}
                setOrderData={setOrderData}
                orderData={orderData}
                hasThuoc={hasThuoc}
              />
            )}
            {current_step === 3 && (
              <Step3 order={order} pricingAndDiscountData={pricingAndDiscountData} />
            )}
          </div>
          <div className='w-full md:w-3/12 mb-6'>
            {current_step === 1 && (
              <CartAmount
                loading={loading}
                handleOnClick={handleOnClick}
                selectedItems={selectedItems}
              />
            )}
            {current_step === 2 && (
              <CartInfo
                listProducts={listProductItems}
                selectedShippingMethod={selectedShippingMethod}
                setOrderData={setOrderData}
                orderData={orderData}
                handleOnClick={handleOnClick}
                loading={loading}
                exceedStock={exceedStock}
              />
            )}
            {current_step === 3 && (
              <OrderAddressesAndTax currentStep={current_step} loading={loading} order={order} />
            )}
          </div>
        </div>
      </div>
      <InvalidLicensesModal
        isOpenModal={openInvalidLicensesModal}
        setOpenInvalidLicensesModal={setOpenInvalidLicensesModal}
      />
      <MissedInformationModal
        isOpenModal={openMissedInformationModal}
        setOpenMissedInformationModal={setOpenMissedInformationModal}
      />
      <RejectModal isOpenModal={openRejectModal} setOpenRejectModal={setOpenRejectModal} />
      <CreateOrderSuccessModal
        isOpenModal={openCreateOrderSuccessModal}
        setOpenCreateOrderSuccessModal={setOpenCreateOrderSuccessModal}
      />
      <OutOfStockModal
        isOpenModal={openOutOfStockModal}
        setOpenOutOfStockModal={setOpenOutOfStockModal}
        exceedStock={exceedStock}
        setGroupedItems={setGroupedItems}
        setSelectedItems={setSelectedItems}
        selectedItems={selectedItems}
      />
    </div>
  )
}

export default Cart
