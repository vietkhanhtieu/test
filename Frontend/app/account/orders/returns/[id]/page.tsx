'use client'

import { _fetch } from '@/app/actions'
import axios from '@/app/api/axios'
import Spinner from '@/components/ui/spinner'
import { setLinks } from '@/lib/redux/slices/breadcrumb'
import { useBeforeUnload } from '@/lib/useBeforeUnload'
import { toNonAccentVietnamese } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import HeaderTable from '../../Header'
import { ModalConfirmExitRefund } from '../../ModalConfirmExitRefund'
import Footer from './_ui/Footer'
import HeaderTab from './_ui/HeaderTab'
import { TableRefundProduct } from './_ui/TableRefundProduct'
import { usePathname } from 'next/navigation'


const Page = ({ params }: { params: { id: string } }) => {
  const [listProducts, setListProducts] = useState([])
  const [initListProducts, setInitListProducts] = useState([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [isFetching, setIsFetching] = useState<boolean>()
  const dispatch = useDispatch()
  const currentPage: string = usePathname()

  const id = params.id
  dispatch(
    setLinks([
      { title: 'Trang chủ', url: '/' },
      { title: 'Tài khoản', url: '/account' },
      { title: 'Quản lý đơn hàng', url: '/account/orders' },
      { title: `Đơn hàng ${id}`, url: currentPage }
    ])
  )
  const [showPopup, setShowPopup] = useState<boolean>(false)

  const handleConfirmNavigation = () => {}

  useBeforeUnload(true)

  useEffect(() => {
    const fetchProduct = async () => {
      setIsFetching(true)
      try {
        const response = await axios.post(`/wp-json/order-management/get`, {
          order_id: id
        })
        if (response.data.status == 200) {
          const productMap = response.data.data.product.map((item: any) => {
            return {
              ...item,
              lot: ''
            }
          })
          setListProducts(productMap)
          setInitListProducts(productMap)
        }
      } catch (error) {
        console.error('Failed to order:', error)
      }
      setIsFetching(false)
    }

    fetchProduct()
  }, [])

  const handleSearchOrders = () => {
    const value = toNonAccentVietnamese(searchValue)
    if (!!value) {
      let newListProducts = [...listProducts]
      newListProducts = initListProducts.filter((prod: any) =>
        toNonAccentVietnamese(prod.product_name).includes(value)
      )
      setListProducts(newListProducts)
    } else {
      setListProducts(initListProducts)
    }
  }

  const handleSelectAll = () => {
    const selectAll = selectedItems.length === listProducts.length
    if (selectAll) {
      setSelectedItems([])
    } else {
      setSelectedItems(listProducts.map((i: { product_id: number }) => i.product_id))
    }
  }

  const handleChangeQuantity = (id: number, quantity: number) => {
    const newList: any = listProducts.map((product: any) => {
      if (product.product_id == id) {
        return {
          ...product,
          quantity: quantity
        }
      }
      return product
    })
    setListProducts(newList)
    setInitListProducts(newList)
  }

  const handleChangeLot = (id: number, lot: string) => {
    const newList: any = listProducts.map((product: any) => {
      if (product.product_id == id) {
        return {
          ...product,
          lot: lot
        }
      }
      return product
    })
    setListProducts(newList)
    setInitListProducts(newList)
  }

  return (
    <div className='col-span-4 md:col-span-3 rounded-lg h-auto bg-white'>
      <HeaderTab orderId={params.id} showStatus={true} />
      {isFetching ? (
        <div className='flex w-full h-[50px] justify-center items-center'>
          <Spinner />
        </div>
      ) : (
        <>
          <HeaderTable
            handleSearchOrders={handleSearchOrders}
            setCurrentTab={() => ({})}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            hiddenMoreData={true}
            forMyOrder={true}
            title='Đơn hàng của tôi'
            containerClassName='pb-8'
          />
          <TableRefundProduct
            products={listProducts}
            handleSelectAll={handleSelectAll}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            showCheckbox={true}
            handleChangeQuantity={handleChangeQuantity}
            handleChangeLot={handleChangeLot}
          />
        </>
      )}
      <ModalConfirmExitRefund
        isOpenModal={showPopup}
        setIsOpenModal={setShowPopup}
        handleConfirmNavigation={handleConfirmNavigation}
      />
      <Footer selectedItems={selectedItems} products={listProducts} />
    </div>
  )
}

export default Page
