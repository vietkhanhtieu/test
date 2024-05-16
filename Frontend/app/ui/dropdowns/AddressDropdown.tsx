import { IFormDataRecipientInfo } from '@/app/account/addresses/definitions'
import { Input } from '@/components/ui/input'
import Spinner from '@/components/ui/spinner'
import { formatAddress } from '@/lib/utils'
import axios from 'axios'
import _ from 'lodash'
import Image from 'next/image'
import { Fragment } from 'react'
import { useEffect, useState } from 'react'

import './address_dropdown.css'

interface IAddressDropdown {
  handleSetSelectedProvince: (id: string, name: string) => void
  handleSetSelectedDistrict: (id: string, name: string) => void
  handleSetSelectedWard: (id: string, name: string) => void
  setValueAddress: (address: string) => void
  valueAddress: string
  formData: any
  classInput: string
  isSetNameById?: boolean
  handleSetAddressList?: (list: string[]) => void
}

export interface IProvinceData {
  id: string
  name: string
  items: IDistrictData
}
export interface IDistrictData {
  id: string
  name: string
  province_id: string
  items: IWardData
}
export interface IWardData {
  id: string
  name: string
  province_id: string
  district_id: string
}

const AddressDropdown: React.FC<IAddressDropdown> = ({
  handleSetSelectedProvince,
  handleSetSelectedDistrict,
  handleSetSelectedWard,
  setValueAddress,
  valueAddress,
  formData,
  classInput,
  isSetNameById,
  handleSetAddressList
}) => {
  const [provinceData, setProvinceData] = useState<IProvinceData[]>([])
  const [districtData, setDistrictData] = useState<IDistrictData[]>([])
  const [wardData, setWardData] = useState<IWardData[]>([])

  const [initProvinceData, setInitProvinceData] = useState<IProvinceData[]>([])
  const [initDistrictData, setInitDistrictData] = useState<IDistrictData[]>([])
  const [initWardData, setInitWardData] = useState<IWardData[]>([])

  const [selectedProvince, setSelectedProvince] = useState<string>(formData.province.id)
  const [selectedDistrict, setSelectedDistrict] = useState<string>(formData.district.id)
  const [selectedWard, setSelectedWard] = useState<string>(formData.ward.id)

  const [indexCurrentTab, setIndexCurrentTab] = useState<number>(1)
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [toggleChevron, setToggleChevron] = useState(false)

  useEffect(() => {
    setSelectedProvince(formData.province.id)
    setSelectedDistrict(formData.district.id)
    setSelectedWard(formData.ward.id)
  }, [formData])

  useEffect(() => {
    const fetchAddressData = async () => {
      setIsLoading(true)
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/address/all`
        )
        const responseData: IProvinceData = response.data.data
        const provinceArrs: IProvinceData[] = Object.values(responseData).map(
          (value: IProvinceData) => ({
            id: value.id,
            name: value.name,
            items: value.items
          })
        )
        setProvinceData(_.sortBy(provinceArrs, ['name']))
        setInitProvinceData(_.sortBy(provinceArrs, ['name']))

        const listAddress = ['', '', '']
        if (isSetNameById && selectedProvince) {
          const province = provinceArrs.filter((item) => item.id === selectedProvince)
          const provinceName = province[0] ? province[0].name : ''
          listAddress[0] = provinceName
        }

        if (selectedDistrict) {
          const districtArrs = getDistrictByProvince(provinceArrs)
          setDistrictData(districtArrs)
          setInitDistrictData(districtData)

          if (isSetNameById) {
            const district = districtArrs.filter((item) => item.id === selectedDistrict)
            const districtName = district[0] ? district[0].name : ''
            listAddress[1] = districtName
          }

          if (selectedWard) {
            const wardArrs = getWardByDistric(districtArrs)
            setWardData(wardArrs)
            setInitWardData(wardArrs)

            if (isSetNameById) {
              const ward = wardArrs.filter((item) => item.id === selectedWard)
              const wardName = ward[0] ? ward[0].name : ''
              listAddress[2] = wardName
            }
          }
        }

        if (isSetNameById && handleSetAddressList) {
          setValueAddress(formatAddress(listAddress, '; '))
          handleSetAddressList(listAddress)
        }
      } catch (error) {
        console.error('Failed to fetch address data:', error)
      }
      setIsLoading(false)
    }

    fetchAddressData()
  }, [])

  useEffect(() => {
    if (selectedProvince && provinceData.length > 0) {
      const districtArrs = getDistrictByProvince(provinceData)
      setDistrictData(_.sortBy(districtArrs, ['name']))
      setInitDistrictData(_.sortBy(districtArrs, ['name']))
      setSelectedDistrict('')
      setWardData([])
    }
  }, [selectedProvince])

  useEffect(() => {
    if (selectedDistrict) {
      const wardArrs = getWardByDistric(districtData)
      setWardData(wardArrs)
      setInitWardData(wardArrs)
    }
  }, [selectedDistrict])

  const getDistrictByProvince = (provinceArrs: IProvinceData[]) => {
    const provinceObj = provinceArrs.filter((item) => item.id === selectedProvince)[0]
    if (provinceObj) {
      const districtArrs: IDistrictData[] = Object.values(provinceObj.items).map(
        (value: IDistrictData) => ({
          id: value.id,
          name: value.name,
          items: value.items,
          province_id: value.province_id
        })
      )
      return _.sortBy(districtArrs, ['name'])
    }
    return []
  }

  const getWardByDistric = (districtArrs: IDistrictData[]) => {
    if (districtArrs.length > 0) {
      const districtObj = districtArrs.filter((item) => item.id === selectedDistrict)[0]
      if (districtObj) {
        const wardArrs: IWardData[] = Object.values(districtObj.items).map((value: IWardData) => ({
          id: value.id,
          name: value.name,
          district_id: value.district_id,
          province_id: value.province_id
        }))
        return _.sortBy(wardArrs, ['name'])
      }
      return []
    }
    return []
  }

  const handleSelectedProvince = (id: string, name: string) => {
    setSelectedProvince(id)
    handleSetSelectedProvince(id, name)
    setIndexCurrentTab(2)
  }

  const handleSelectedDistrict = (id: string, name: string) => {
    setSelectedDistrict(id)
    handleSetSelectedDistrict(id, name)
    setIndexCurrentTab(3)
  }

  const handleSelectedWard = (id: string, name: string) => {
    handleSetSelectedWard(id, name)
    setIsOpenDropdown(false)
    setToggleChevron(false)
    setValueAddress(formatAddress([formData.province.name, formData.district.name, name], '; '))
    setIndexCurrentTab(1)
  }

  const handleChangeValue = (e: { target: { value: string } }) => {
    if (isOpenDropdown) {
      let value = e.target.value
      setValueAddress(value)
      switch (indexCurrentTab) {
        case 1:
          if (value.trim().length > 0) {
            setProvinceData(
              initProvinceData.filter((province) =>
                province.name.toLowerCase().includes(value.toLowerCase())
              )
            )
          } else {
            setProvinceData(initProvinceData)
          }
          break
        case 2:
          if (value.trim().length > 0) {
            setDistrictData(
              initDistrictData.filter((district) =>
                district.name.toLowerCase().includes(value.toLowerCase())
              )
            )
          } else {
            setDistrictData(initDistrictData)
          }
          break
        case 3:
          if (value.trim().length > 0) {
            setWardData(
              initWardData.filter((ward) => ward.name.toLowerCase().includes(value.toLowerCase()))
            )
          } else {
            setWardData(initWardData)
          }
          break
        default:
          break
      }
    } else {
      setValueAddress(
        formatAddress([formData.province.name, formData.district.name, formData.ward.name], '; ')
      )
    }
  }

  const handleFocusDropdown = () => {
    setIsOpenDropdown(true)
    setToggleChevron(true)
    setValueAddress('')
  }

  const handleBlurDropdown = () => {
    setValueAddress(
      formatAddress([formData.province.name, formData.district.name, formData.ward.name], '; ')
    )
  }

  const hanleClickChevron = () => {
    setToggleChevron(!toggleChevron)
    setIsOpenDropdown(!toggleChevron)
  }

  return (
    <div className='w-full'>
      <div className='dy-dropdown w-full' onBlur={handleBlurDropdown}>
        <div tabIndex={0} role='button' className='w-full relative flex items-center'>
          <Input
            className={`h-14 md:w-[492px] w-full text-[16px] rounded-[10px] focus-visible:ring-0 focus-visible:ring-offset-0 py-[18px] pl-[19px] ${classInput ? classInput : ''}`}
            type='text'
            placeholder='Tỉnh/ Thành phố; Quận/ Huyện; Phường/ Xã'
            name='name'
            value={valueAddress}
            onFocus={handleFocusDropdown}
            onChange={handleChangeValue}
            onBlur={() => setToggleChevron(false)}
          />
          <Image
            src={toggleChevron ? '/icons/chevron-up.svg' : '/icons/chevron-down.svg'}
            height={7}
            width={12}
            alt=''
            className='absolute right-5 z-1'
            onClick={hanleClickChevron}
          />
        </div>
        {isOpenDropdown && (
          <ul
            tabIndex={0}
            className='dy-dropdown-content w-full z-[1] dy-menu shadow bg-base-100 rounded-xl flex justify-start items-center max-h-[486px] mt-2 overflow-y-auto border border-primary p-0'
          >
            <div role='tablist' className='dy-tabs w-full px-4 py-[27px]'>
              <input
                type='radio'
                name={`dy-my_tabs_1 ${formData.province.id != '' ? 'tab-fill' : ''}`}
                role='tab'
                className='dy-tab w-[155px] h-8 flex justify-center items-center gap-2.5 p-0 '
                aria-label='Tỉnh/Thành phố'
                checked={indexCurrentTab == 1}
                onClick={() => setIndexCurrentTab(1)}
              />
              <div role='tabpanel' className='dy-tab-content w-full max-h-[300px] overflow-y-auto'>
                {isLoading ? (
                  <div className='mt-2 w-full flex justify-center'>
                    <Spinner />
                  </div>
                ) : (
                  <div className=' w-full h-full'>
                    {provinceData.length > 0 &&
                      provinceData.map((item, index) => {
                        return (
                          <Fragment key={index}>
                            <span
                              className={`px-[15px] py-[18px] inline-block cursor-pointer ${formData.province.id === item.id ? 'text-primary' : 'text-abbey'}`}
                              onClick={() => handleSelectedProvince(item.id, item.name)}
                            >
                              <p>{item.name}</p>
                            </span>
                          </Fragment>
                        )
                      })}
                  </div>
                )}
              </div>
              <input
                type='radio'
                name={`dy-my_tabs_1 ${formData.district.id != '' ? 'tab-fill' : ''}`}
                role='tab'
                className='dy-tab p-0 w-[155px] h-8 flex justify-center items-center gap-2.5'
                aria-label='Quận/Huyện'
                checked={indexCurrentTab === 2}
                onClick={() => setIndexCurrentTab(2)}
              />
              <div role='tabpanel' className='dy-tab-content w-full max-h-[300px] overflow-y-auto'>
                <div className=' w-full h-full'>
                  {districtData &&
                    districtData.length > 0 &&
                    districtData.map((item, index) => {
                      return (
                        <Fragment key={index}>
                          <span
                            className={`px-[15px] py-[18px] inline-block cursor-pointer ${formData.district.id === item.id ? 'text-primary' : 'text-abbey'}`}
                            onClick={() => handleSelectedDistrict(item.id, item.name)}
                          >
                            <p>{item.name}</p>
                          </span>
                        </Fragment>
                      )
                    })}
                </div>
              </div>

              <input
                type='radio'
                name={`dy-my_tabs_1 ${formData.ward.id != '' ? 'tab-fill' : ''}`}
                role='tab'
                className='dy-tab p-0 w-[155px] h-8 flex justify-center items-center gap-2.5'
                aria-label='Phường/Xã'
                checked={indexCurrentTab === 3}
                onClick={() => setIndexCurrentTab(3)}
              />
              <div role='tabpanel' className='dy-tab-content w-full max-h-[300px] overflow-y-auto'>
                <div className=' w-full h-full'>
                  {wardData &&
                    wardData.length > 0 &&
                    wardData.map((item, index) => {
                      return (
                        <Fragment key={index}>
                          <span
                            className={`px-[15px] py-[18px] inline-block cursor-pointer ${formData.ward.id === item.id ? 'text-primary' : 'text-abbey'}`}
                            onClick={() => handleSelectedWard(item.id, item.name)}
                          >
                            <p>{item.name}</p>
                          </span>
                        </Fragment>
                      )
                    })}
                </div>
              </div>
            </div>
          </ul>
        )}
      </div>
    </div>
  )
}

export default AddressDropdown
