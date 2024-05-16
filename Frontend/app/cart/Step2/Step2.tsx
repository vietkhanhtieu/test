import { IOrderInfo, IRecipientInfo } from '@/app/account/addresses/definitions'
import { RootState } from '@/lib/redux/store'
import axios from 'axios'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { IShippingMethodProps } from '../page'
import { IOrderData, IProductData } from '../page'
import { CartTaxInformation } from './CartTaxInformation'
import { DateTimeToReceive } from './DateTimeToReceive'
import { NoteComponent } from './NoteComponent'
import { OrderInfo } from './OrderInfo'
import { PayMethod } from './PayMethod'
import { RecipientInfo } from './RecipientInfo'
import { ShipMethod } from './ShipMethod'

interface Props {
  products: IProductData[]
  setOrderData: Dispatch<SetStateAction<IOrderData>>
  orderData: IOrderData
  setShippingMethod: Dispatch<SetStateAction<IShippingMethodProps | null>>
  selectedShippingMethod: IShippingMethodProps | null
  hasThuoc: boolean
}

const Step2 = (props: Props) => {
  const { products, setShippingMethod, selectedShippingMethod } = props
  const user = useSelector((state: RootState) => state.currentUser)
  const { selectedProducts } = useSelector((state: RootState) => state.userCart)

  const initAddressLine = {
    id: '',
    name: ''
  }
  const [selectedOrder, setSelectedOrder] = useState<IOrderInfo>({
    id: '',
    name: user.user.last_name ? user.user.last_name : '',
    phone: user.user.phone,
    isDefault: '0',
    typeAddress: 'ORDER_ADDRESS'
  })

  const [selectedRecipient, setSelectedRecipient] = useState<IRecipientInfo>({
    id: '',
    name: '',
    phone: '',
    isDefault: '0',
    type: [],
    address: '',
    ward: initAddressLine,
    district: initAddressLine,
    province: initAddressLine,
    note: '',
    typeAddress: 'RECEIVE_ADDRESS'
  })

  const [invoiceId, setInvoiceId] = useState<string>('')
  const [note, setNote] = useState<string>('')
  const [deliveryMethod, setDeliveryMethod] = useState<string>('')
  const [dayShip, setDayShip] = useState<string>('')
  const [receivingTime, setReceivingTime] = useState<string>('')
  const [deliveryPrice, setDeliveryPrice] = useState<number | null>(null)
  const [orderPaymentMethod, setOrderPaymentMethod] = useState<string>('')

  useEffect(() => {
    props.setOrderData({
      ...props.orderData,
      infoOrderId: selectedOrder.id,
      addressId: selectedRecipient.id,
      invoiceId: invoiceId,
      note: note,
      deliveryMethod: deliveryMethod,
      dayShip: dayShip,
      receivingTime: receivingTime,
      deliveryPrice: deliveryPrice,
      paymentMethod: orderPaymentMethod
    })
  }, [
    selectedOrder,
    note,
    selectedRecipient,
    invoiceId,
    deliveryMethod,
    dayShip,
    receivingTime,
    deliveryPrice,
    orderPaymentMethod
  ])

  return (
    <>
      <div className='flex flex-col gap-5 mt-5'>
        <OrderInfo selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
        <RecipientInfo
          selectedRecipient={selectedRecipient}
          setSelectedRecipient={setSelectedRecipient}
        />
        <CartTaxInformation setInvoiceId={setInvoiceId} />
        <NoteComponent setNote={setNote} />
        <ShipMethod
          province_id={selectedRecipient.province?.id}
          district_id={selectedRecipient.district?.id}
          ward_id={selectedRecipient.ward?.id}
          products={products || selectedProducts}
          setDeliveryMethod={setDeliveryMethod}
          setDayShip={setDayShip}
          setDeliveryPrice={setDeliveryPrice}
          selectedShippingMethod={selectedShippingMethod}
          setSelectedShippingMethod={setShippingMethod}
        />
        <DateTimeToReceive setReceivingTime={setReceivingTime} />
        <PayMethod hasThuoc={props.hasThuoc} setOrderPaymentMethod={setOrderPaymentMethod} />
      </div>
    </>
  )
}

export default Step2
