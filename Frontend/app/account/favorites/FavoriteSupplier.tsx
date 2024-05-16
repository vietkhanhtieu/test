import axios from '@/app/api/axios'
import revalidateProduct from '@/app/products/[id]/action'
import Pagination from '@/components/common/Pagination/Pagination'
import Spinner from '@/components/ui/spinner'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ISupplier {
  id: number
  name: string
  totalProduct: number
  newProduct: number
  star: string
  liked: boolean
  like: number
  icon: string
}

interface Props {}

export const FavoriteSupplier: React.FC<Props> = ({}) => {
  const [suppliers, setSuppliers] = useState<ISupplier[]>([])
  const [isEmptyList, setIsEmptyList] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingRemove, setIsLoadingRemove] = useState<boolean>(false)

  const fetchSuppliers = async (page: number) => {
    setIsLoading(true)
    if (!isLoading) {
      try {
        const response = await axios.post('/wp-json/wishlist/listSupplier', {
          limit: 4,
          current_page: page
        })
        const data = response.data

        if (data.message === 'Successfully') {
          const listData = data.data.data.map((supplier: any) => {
            return {
              id: supplier.id,
              name: supplier.name,
              totalProduct: supplier.total_product,
              newProduct: supplier.new_product,
              star: supplier.star,
              liked: supplier.liked,
              like: supplier.like,
              icon: supplier.icon
            }
          })
          setSuppliers(listData)
          setTotalPage(data.data.last_page)
          setIsLoading(false)
          if (listData.length) {
            setIsEmptyList(false)
          } else {
            setIsEmptyList(true)
          }
        } else {
          setIsEmptyList(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    fetchSuppliers(currentPage)
  }, [])

  const handleOnPageChange = (page: number) => {
    if (!isLoading) {
      setCurrentPage(page)
      fetchSuppliers(page)
    }
  }

  const handleRemoveList = async (id: number) => {
    setIsLoadingRemove(true)
    try {
      const response = await axios.post('/wp-json/wishlist/remove', {
        supplier_id: id
      })
      const data = response.data

      if (data.message === 'Successfully') {
        setSuppliers(suppliers.filter((item) => item.id !== id))
        revalidateProduct()
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoadingRemove(false)
  }

  return (
    <>
      {isLoading ? (
        <div className='flex bg-white pt-[100px] h-[445px] justify-center rounded-[10px]'>
          <Spinner />
        </div>
      ) : (
        <>
          {suppliers &&
            suppliers.map((supplier, index) => {
              return (
                <div
                  className='flex justify-between px-[29px] py-[19px] border-b w-full'
                  key={index}
                >
                  <div className='flex items-center justify-between w-full grid lg:grid-cols-[422px_1fr] sm:grid-cols-2 grid-cols-1 gap-5 lg:gap-0 sm:gap-0'>
                    <div className='flex items-center gap-5'>
                      {supplier.icon && (
                        <Image
                          alt=''
                          height={42}
                          width={42}
                          src={supplier.icon}
                          className='object-cover !h-[42px]'
                        />
                      )}
                      <div className='flex flex-col gap-[3px]'>
                        <span className='font-bold'>{supplier.name}</span>
                        <div className='flex items-center gap-[2.4px]'>
                          {supplier &&
                            [...Array(5)].map((_, index) => (
                              <Image
                                key={index}
                                src={
                                  index < Math.floor(parseFloat(supplier.star))
                                    ? '/icons/star.svg'
                                    : '/icons/star-black.svg'
                                }
                                alt='Star'
                                width={17}
                                height={17}
                                className='!h-[17px]'
                              />
                            ))}
                        </div>
                        <span className='text-12'>
                          Người yêu thích: <span className='font-medium'>{supplier.like}</span>
                        </span>
                        <span className='text-12'>
                          Tổng số sản phẩm:{' '}
                          <span className='font-medium'>{supplier.totalProduct}</span>
                        </span>
                      </div>
                    </div>
                    <div className='flex justify-between lg:gap-[191px] gap-1'>
                      <div className='flex items-center gap-1.5 md:flex-row flex-col'>
                        <div className='px-3 py-1.5 bg-primary rounded-[20px] flex items-center justify-center h-[26px]'>
                          <span className='text-white font-extrabold tracking-[0.6px] text-12'>
                            NEW
                          </span>
                        </div>
                        <span className='text-14 text-primary text-center'>
                          {supplier.newProduct}+ sản phẩm mới
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveList(supplier.id)}
                        disabled={isLoadingRemove}
                      >
                        <Image
                          alt='Nút yêu thích'
                          src='/icons/heart-circle.svg'
                          width={36}
                          height={36}
                          className='cursor-pointer'
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
        </>
      )}
      {!isEmptyList && (
        <div className='w-full bg-white'>
          <Pagination
            pageCount={totalPage}
            className='py-[31px] mt-[1px]'
            pageLinkClassName='!w-[33px] !h-[33px]'
            breakClassName='!w-[33px] !h-[33px]'
            disable={isLoading}
            currentPage={currentPage - 1}
            handleOnPageChange={handleOnPageChange}
          />
        </div>
      )}
    </>
  )
}
