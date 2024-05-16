import { mapInfoOrder, mapInfoReceive } from '@/app/account/addresses/MapAddressResponse'
import {
  IAddressLine,
  IFormDataOrderInfo,
  IFormDataRecipientInfo,
  IOrderInfo,
  IRecipientInfo
} from '@/app/account/addresses/definitions'
import { RootState } from '@/lib/redux/store'
import { formatAddress } from '@/lib/utils'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const useAddress = (allowFetch: boolean) => {
  const user = useSelector((state: RootState) => state.currentUser)
  const [listInfoOrder, setListInfoOrder] = useState<IOrderInfo[]>([])
  const [listInfoReceive, setListInfoReceive] = useState<IRecipientInfo[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const initFormInfoOrder: IFormDataOrderInfo = {
    id: null,
    user_id: user.userId,
    name: '',
    phone: '',
    isDefault: '0',
    typeAddress: 'ORDER_ADDRESS'
  }
  const [method, setMethod] = useState<string>('create')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [formData, setFormData] = useState<IFormDataOrderInfo>(initFormInfoOrder)

  const initAddressItem: IAddressLine = {
    id: '',
    name: ''
  }

  // Modal recipient
  const initFormRecipient: IFormDataRecipientInfo = {
    id: null,
    user_id: user.userId,
    name: '',
    phone: '',
    isDefault: '0',
    addressNumber: '',
    type: ['van-phong'],
    typeAddress: 'RECEIVE_ADDRESS',
    province: initAddressItem,
    district: initAddressItem,
    ward: initAddressItem,
    note: ''
  }
  const [formRecipientInfo, setFormRecipientInfo] =
    useState<IFormDataRecipientInfo>(initFormRecipient)
  const [openModalInfoReceive, setOpenModalInfoReceive] = useState<boolean>(false)
  const [addressInfo, setAddressInfo] = useState<string>('')
  useEffect(() => {
    const fetchAddressData = async () => {
      setIsLoading(true)
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/address/list_address`
        )
        if (response.data.status === 200) {
          const data = response.data.data
          const resInfoOrder: IOrderInfo[] = []
          const resInfoReceive: IRecipientInfo[] = []
          data.map((item: any) => {
            if (item.type_address === 'ORDER_ADDRESS') {
              resInfoOrder.push(mapInfoOrder(item))
            } else {
              resInfoReceive.push(mapInfoReceive(item))
            }
          })

          setListInfoOrder(resInfoOrder)
          setListInfoReceive(resInfoReceive)
        }
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.error('Error fetching data:', error)
      }
    }
    if (allowFetch) {
      fetchAddressData()
    }
  }, [])

  // Modal order
  const handleSyncOrderCreate = (infoOrder: IOrderInfo) => {
    const listAfterCreate = listInfoOrder.map((item: IOrderInfo) => {
      if (infoOrder.isDefault === '1') {
        return {
          ...item,
          isDefault: '0'
        }
      }
      return item
    })
    setOpenModal(false)
    listAfterCreate.push(infoOrder)
    setListInfoOrder(listAfterCreate)
  }

  const handleSyncOrderUpdate = (infoOrder: IOrderInfo) => {
    const listUpdate = listInfoOrder.map((item: IOrderInfo) => {
      if (item.id === infoOrder.id) {
        return {
          ...item,
          phone: infoOrder.phone,
          name: infoOrder.name,
          isDefault: infoOrder.isDefault
        }
      } else {
        if (infoOrder.isDefault === '1') {
          return {
            ...item,
            isDefault: '0'
          }
        }
        return item
      }
    })

    setOpenModal(false)
    setListInfoOrder(listUpdate)
  }

  const handleOpenModalCreate = () => {
    setOpenModal(true)
    setMethod('create')
    setFormData(initFormInfoOrder)
  }

  const handleOpenModalUpdate = (info: IOrderInfo) => {
    setOpenModal(true)
    setMethod('update')
    setFormData({
      ...formData,
      id: info.id,
      name: info.name,
      phone: info.phone,
      isDefault: info.isDefault
    })
  }

  // Modal Recipient
  const handleOpenModalCreateRecipientInfo = () => {
    setOpenModalInfoReceive(true)
    setMethod('create')
    setFormRecipientInfo(initFormRecipient)
    setAddressInfo('')
  }

  const handleOpenModalUpdateRecipient = (info: IRecipientInfo) => {
    setOpenModalInfoReceive(true)
    setMethod('update')
    setFormRecipientInfo({
      ...formRecipientInfo,
      id: info.id,
      name: info.name,
      phone: info.phone,
      isDefault: info.isDefault,
      type: info.type,
      addressNumber: info.address ? info.address : '',
      province: info.province ? info.province : initAddressItem,
      district: info.district ? info.district : initAddressItem,
      ward: info.ward ? info.ward : initAddressItem,
      note: info.note ? info.note : ''
    })
    setAddressInfo(formatAddress([info.province?.name, info.district?.name, info.ward?.name], ', '))
  }

  const handleSyncCreateRecipient = (infoReceive: IRecipientInfo) => {
    const listAfterCreate = listInfoReceive.map((item: IRecipientInfo) => {
      if (infoReceive.isDefault === '1') {
        return {
          ...item,
          isDefault: '0'
        }
      }
      return item
    })

    listAfterCreate.push(infoReceive)
    setOpenModalInfoReceive(false)
    setListInfoReceive(listAfterCreate)
  }

  const handleSyncUpdateRecipient = (infoReceive: IRecipientInfo) => {
    const listAfterUpdate = listInfoReceive.map((item: IRecipientInfo) => {
      if (item.id === infoReceive.id) {
        return {
          ...item,
          phone: infoReceive.phone,
          name: infoReceive.name,
          district: infoReceive.district,
          province: infoReceive.province,
          ward: infoReceive.ward,
          note: infoReceive.note,
          typeAddress: infoReceive.typeAddress,
          address: infoReceive.address,
          isDefault: infoReceive.isDefault
        }
      } else {
        if (infoReceive.isDefault === '1') {
          return {
            ...item,
            isDefault: '0'
          }
        }
        return item
      }
    })

    setOpenModalInfoReceive(false)
    setListInfoReceive(listAfterUpdate)
  }

  return {
    listInfoOrder,
    isLoading,
    setListInfoOrder,
    handleSyncOrderCreate,
    handleOpenModalCreate,
    handleOpenModalUpdate,
    handleSyncOrderUpdate,
    method,
    setMethod,
    openModal,
    setOpenModal,
    formData,
    listInfoReceive,
    setListInfoReceive,
    openModalInfoReceive,
    setOpenModalInfoReceive,
    handleOpenModalCreateRecipientInfo,
    handleOpenModalUpdateRecipient,
    handleSyncCreateRecipient,
    handleSyncUpdateRecipient,
    addressInfo,
    formRecipientInfo
  }
}

export default useAddress
