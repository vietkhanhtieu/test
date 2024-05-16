import axios from '@/lib/axios'
import { useEffect, useState } from 'react'

import { IProductListProps, mappingProductData } from '../ui/TableProduct'
import { IProducerDetail } from './[id]/page'
import { IProducerData } from './page'

export const mappingProducersData = (response: any): IProducerData[] => {
  return Object.values(response).map((value: any) => ({
    tenNhaSanXuat: value.tenNhaSanXuat,
    maNhaSanXuat: value.maNhaSanXuat,
    maTermEc: value.maTermEc,
    urlNSX: value.urlNSX,
    bound: value.bound
  }))
}

export const useGetListProducers = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [activeTab, setActiveTab] = useState<number>(1)

  const [term, setTerm] = useState<string>('')

  const [producersList, setProducersList] = useState<IProducerData[]>()
  const [nationalProducersList, setNationalProducersList] = useState<IProducerData[]>()

  const producers = activeTab === 1 ? producersList : nationalProducersList
  const filteredProducers = producers?.filter((producer) =>
    producer.tenNhaSanXuat.toLowerCase().includes(term.toLowerCase())
  )

  const fetchData = async () => {
    try {
      const listProducerEndpoint = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/get/producer-new`,
        { limit: 1000 }
      )
      const [producersResponse, nationalProducersResponse] = [
        listProducerEndpoint.data.data.filter((item: IProducerData) =>
          item.bound.includes('inland')
        ),
        listProducerEndpoint.data.data.filter((item: IProducerData) =>
          item.bound.includes('foreign')
        )
      ]
      setProducersList(mappingProducersData(producersResponse))
      setNationalProducersList(mappingProducersData(nationalProducersResponse))
      setIsLoading(false)
    } catch (error) {
      console.error(`Failed to fetch producers lists: ${error}`)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    activeTab,
    setActiveTab,
    isLoading,
    setTerm,
    filteredProducers
  }
}

export const useGetProducerDetail = (producerId: number) => {
  const [activeTab, setActiveTab] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [producerProducts, setProducerProducts] = useState<IProductListProps[]>([])
  const [isNotFound, setIsNotFound] = useState<boolean>(false)
  const [producerDetail, setProducerDetail] = useState<IProducerDetail>({
    id: '',
    name: '',
    icon: '',
    title: '',
    description: '',
    link: '',
    totalProduct: 0
  })
  const [hasInfo, setHasInfo] = useState<boolean>(false)
  const fetchData = async () => {
    try {
      const getListProducersResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/get/producer-new`,
        { limit: 1000 }
      )
      const currentProducer = getListProducersResponse.data.data?.filter(
        (item: IProducerData) => item.maTermEc === producerId
      )[0]
      if (currentProducer) {
        const producerProducts = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/product/list`,
          {
            producer_id: producerId,
            limit: 1000
          }
        )
        const productLists: IProductListProps[] = producerProducts.data.data.data.map(
          (item: any) => {
            return mappingProductData(item)
          }
        )
        setProducerProducts(productLists)
        const producerResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/categories/nsx/get/${producerId}`
        )
        let producer: IProducerDetail = {
          id: '',
          name: currentProducer.tenNhaSanXuat,
          icon: currentProducer.urlNSX,
          title: '',
          description: '',
          link: '',
          totalProduct: productLists.length
        }
        if (producerResponse.data.status === 200) {
          const data = producerResponse.data.data
          if (producerResponse.data.message === 'Successfully') {
            setHasInfo(true)
            producer = {
              ...producer,
              id: data.id,
              title: data.title,
              description: data.description,
              link: data.link,
              totalProduct: data.total_product
            }
            if (data.icon) {
              producer.icon = data.icon
            }
            if (data.name) {
              producer.name = data.name
            }
          } else {
            setHasInfo(false)
          }
        }
        setProducerDetail(producer)
      } else {
        setIsNotFound(true)
      }
    } catch (error) {
      console.error(`Failed to fetch data: ${error}`)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return {
    activeTab,
    setActiveTab,
    isLoading,
    producerProducts,
    producerDetail,
    hasInfo,
    isNotFound
  }
}
