'use client'

import Pagination from '@/components/common/Pagination/Pagination'
import Spinner from '@/components/ui/spinner'
import axios from '@/lib/axios'
import { IOrder } from '@/lib/types/order'
import { trim } from 'lodash'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

import Header from './Header'
import { IReason } from './ModalCancelOrder'
import Order from './Order'
import './style.css'

const Orders = () => {
  const [currentTab, setCurrentTab] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [ordersList, setOrdersList] = useState<IOrder[]>([])
  const [moreData, setMoreData] = useState<any>({})
  const [listReasons, setListReasons] = useState<IReason[]>([])
  const [fetching, setFetching] = useState<boolean>(false)
  const [isEmptyList, setIsEmptyList] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [initSearchValue, setInitSearchValue] = useState<string>('')
  const [debouncedSearchValue] = useDebounce(searchValue, 1000)

  const fetchOrdersRequest = async (status: string[], searchValue?: string) => {
    setFetching(true)
    let params = {
      page: currentPage,
      limit: 6,
      status: status,
      keyword: ''
    }

    if (searchValue) {
      params['keyword'] = trim(searchValue)
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/order-management/list`,
      params
    )
    const data = response.data

    if (data.message === 'Successfully') {
      const resData = data.data
      setOrdersList(resData.data)
      setTotalPage(resData.last_page)
      setMoreData(data.moreData)
      setFetching(false)
      setIsEmptyList(false)
      if (resData.data.length) {
        setIsEmptyList(false)
      } else {
        setIsEmptyList(true)
      }
    } else {
      setIsEmptyList(true)
    }
  }

  const handleSearchOrders = async () => {
    let status = currentTab
    let numberOfItems = 0
    if (searchValue !== initSearchValue && !fetching) {
      if (status) {
        numberOfItems = moreData[status]
        if (numberOfItems) {
          status = `wc-order-${currentTab}`
          let statuses = [status]
          if (status === 'return') {
            statuses = statuses.concat('wc-order-exchange')
          }
          await fetchOrdersRequest(statuses, searchValue)
        } else {
          setIsEmptyList(true)
        }
      } else {
        await fetchOrdersRequest([status], searchValue)
      }
      setInitSearchValue(searchValue)
    }
  }

  const fetchOrders = async () => {
    let status = currentTab
    let numberOfItems = 0

    if (status) {
      numberOfItems = moreData[status]
      if (numberOfItems) {
        status = `wc-order-${currentTab}`
        let statuses = [status]
        if (status === 'return') {
          statuses = statuses.concat('wc-order-exchange')
        }
        await fetchOrdersRequest(statuses, debouncedSearchValue)
      } else {
        setIsEmptyList(true)
      }
    } else {
      await fetchOrdersRequest([status], debouncedSearchValue)
    }
    setInitSearchValue(debouncedSearchValue)
  }

  useEffect(() => {
    fetchOrders()
  }, [currentTab, currentPage, debouncedSearchValue])

  const handleOnPageChange = (page: number) => {
    if (!fetching) {
      setCurrentPage(page)
    }
  }

  useEffect(() => {
    const fetchReasonCancel = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/reason/list-order`
        )
        const data = response.data

        if (data.message === 'Successfully') {
          const resData = data.data.map((reason: any) => {
            return {
              code: reason.code,
              title: reason.title
            }
          })
          setListReasons(resData)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchReasonCancel()
  }, [])

  const syncOrder = (id: number) => {
    const listProducts = ordersList.filter((order) => order.order_id !== id)
    setOrdersList(listProducts)
  }

  return (
    <>
      <Header
        currentTab={currentTab}
        moreData={moreData}
        searchValue={searchValue}
        fetching={fetching}
        handleSearchOrders={handleSearchOrders}
        setSearchValue={setSearchValue}
        setCurrentTab={setCurrentTab}
        containerClassName='border-b'
      />
      <div>
        {!fetching &&
          !isEmptyList &&
          ordersList.map((order, index) => {
            return (
              <div key={index} className='bg-white rounded-[10px] mt-[10px] last:rounded-b-none'>
                <Order order={order} listReasons={listReasons} syncOrder={syncOrder} />
              </div>
            )
          })}
      </div>
      {fetching && (
        <div className='flex bg-white pt-[100px] h-[445px] justify-center rounded-[10px] mt-[10px]'>
          <Spinner />
        </div>
      )}
      {!fetching && isEmptyList && (
        <div className='w-full bg-white rounded-[10px] mt-[10px] h-[445px] flex flex-col items-center'>
          <Image
            alt='empty-orders'
            width={77}
            height={70}
            src='/icons/empty-orders.svg'
            className='mt-[129px]'
          />
          <div className='text-14 text-dusty-gray font-normal mt-5'>Không tìm thấy đơn hàng</div>
        </div>
      )}
      {!isEmptyList && (
        <div className='w-full bg-white rounded-b-[10px]'>
          <Pagination
            pageCount={totalPage}
            className='py-4 mt-[1px]'
            pageLinkClassName='!w-[33px] !h-[33px]'
            breakClassName='!w-[33px] !h-[33px]'
            disable={fetching}
            currentPage={currentPage - 1}
            handleOnPageChange={handleOnPageChange}
          />
        </div>
      )}
    </>
  )
}

export default Orders
