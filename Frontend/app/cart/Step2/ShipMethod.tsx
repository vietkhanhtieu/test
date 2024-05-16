import { Input } from '@/components/ui/input'
import Spinner from '@/components/ui/spinner'
import { formatVND } from '@/lib/utils'
import { ClaimC, GonsaLogo, HelpIcon } from '@/public/icons'
import axios from 'axios'
import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

import { IProductData } from '../page'

interface Props {
  products: IProductData[]
  province_id: string | undefined
  district_id: string | undefined
  ward_id: string | undefined
  setDeliveryMethod: (e: string) => void
  setDayShip: (e: string) => void
  setDeliveryPrice: (e: number | null) => void
  setSelectedShippingMethod: Dispatch<SetStateAction<IShippingMethodProps | null>>
  selectedShippingMethod: IShippingMethodProps | null
}

interface IShippingMethodProps {
  delivery_method_value: string
  delivery_method_label: string
  delivery_price: number
  dayShip: string
}

export const ShipMethod = (props: Props) => {
  const {
    province_id,
    district_id,
    ward_id,
    products,
    selectedShippingMethod,
    setSelectedShippingMethod
  } = props
  const [fetchingData, setFetchingData] = useState<boolean>(false)
  const [listShippingMethods, setListShippingMethods] = useState<IShippingMethodProps[]>([])

  useEffect(() => {
    const fetchCartData = async () => {
      setFetchingData(true)

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/cart/get-shipping-method`,
          {
            products: products,
            province_id: province_id,
            district_id: district_id,
            ward_id: ward_id
          }
        )

        if (response.data.message === 'Successfully') {
          const deliveryShippingMethods: IShippingMethodProps[] = response.data.data.map(
            (item: any) => ({
              delivery_method_value: Object.keys(item)[0],
              delivery_method_label: item[Object.keys(item)[0]],
              delivery_price: item.price,
              dayShip: item.dayShip
            })
          )

          setListShippingMethods(deliveryShippingMethods)
          setSelectedShippingMethod(deliveryShippingMethods[0])
        }
      } catch (error) {
        console.error(error)
      }
      setFetchingData(false)
    }

    fetchCartData()
  }, [province_id, district_id, ward_id])

  useEffect(() => {
    if (selectedShippingMethod) {
      props.setDeliveryMethod(selectedShippingMethod.delivery_method_value)
      props.setDayShip(selectedShippingMethod.dayShip)
      props.setDeliveryPrice(selectedShippingMethod.delivery_price)
    }
  }, [selectedShippingMethod])

  const handleChangeShippingMethod = (e: {
    target: { name: any; value: any; getAttribute: any }
  }) => {
    const value = e.target.value
    const selected_shpping = listShippingMethods.filter(
      (item) => item.delivery_method_value == value
    )[0]
    setSelectedShippingMethod(selected_shpping)
  }

  return (
    <>
      <div>
        {fetchingData ? (
          <div className='flex items-center justify-center my-8'>
            <Spinner size='md' />
          </div>
        ) : (
          <>
            <div className='w-full bg-white rounded-[10px] px-[30px] py-[15px] font-normal text-abbey'>
              <div className='flex justify-between mb-[30px]'>
                <div className='mb-2.5 gap-[55px] flex'>
                  <p className='text-20 font-medium'>Chọn hình thức vận chuyển</p>

                  {listShippingMethods.length > 0 &&
                    listShippingMethods.map((item, index) => (
                      <>
                        <label
                          className='flex items-center text-14 gap-2'
                          key={item.delivery_method_value}
                        >
                          <Input
                            className='w-5 h-5 px-2 accent-international-orange rounded-full'
                            type='radio'
                            name='shipping-method'
                            value={item.delivery_method_value}
                            checked={
                              selectedShippingMethod?.delivery_method_value ==
                              item.delivery_method_value
                            }
                            onChange={handleChangeShippingMethod}
                          />
                          {item.delivery_method_label}
                          {selectedShippingMethod &&
                          selectedShippingMethod.delivery_method_value ==
                            item.delivery_method_value ? (
                            <Image
                              alt={`Help ${item.delivery_method_label}`}
                              src={HelpIcon}
                              width={18}
                              height={18}
                              className={`ml-1 shipping-method-${index}`}
                            />
                          ) : null}
                        </label>
                        <ReactTooltip
                          anchorSelect={`.shipping-method-${index}`}
                          place='top'
                          content={item.dayShip}
                          border='1px solid #4D4D4F'
                          style={{
                            fontSize: '14px',
                            paddingLeft: '13px',
                            paddingRight: '17px',
                            paddingTop: '5px',
                            paddingBottom: '11px',
                            width: '140px',
                            height: '50px',
                            borderRadius: '6px',
                            backgroundColor: '#fff',
                            color: '#4D4D4F',
                            fontWeight: '400',
                            lineHeight: 'normal'
                          }}
                        />
                      </>
                    ))}
                </div>
                <div className='text-14 mb-2.5 flex items-center'>
                  {' '}
                  {selectedShippingMethod
                    ? `Phí: ${formatVND(selectedShippingMethod.delivery_price || 0)}`
                    : null}
                </div>
              </div>

              <div className='flex items-center'>
                <Image className='mr-[15px]' alt='Delivery' src={ClaimC} width={30} height={18} />
                <span className='text-14 mr-2.5'>
                  Dịch vụ được cung cấp bởi: <span className='font-bold'>GONSA</span>{' '}
                </span>
                <Image
                  className='border border-primary rounded-md'
                  alt='Logo'
                  src={GonsaLogo}
                  width={24}
                  height={24}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
