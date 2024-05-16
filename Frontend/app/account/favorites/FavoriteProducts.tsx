import axios from '@/app/api/axios'
import { IProductListProps } from '@/app/ui/TableProduct'
import { mappingProductData } from '@/app/ui/TableProduct'
import TableProduct from '@/app/ui/TableProduct'
import Pagination from '@/components/common/Pagination/Pagination'
import { SelectComponent } from '@/components/common/Select/SelectComponent'
import Spinner from '@/components/ui/spinner'
import { useEffect, useState } from 'react'

interface IPagination {
  from: number
  to: number
  totalPage: number
  total: number
}

export const FavoriteProducts = () => {
  const [products, setProducts] = useState<IProductListProps[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [perPage, setPerPage] = useState<number>(4)
  const [paginate, setPaginate] = useState<IPagination>({
    from: 0,
    to: 0,
    totalPage: 0,
    total: 0
  })

  const showItems = [
    { label: 4, value: 4 },
    { label: 8, value: 8 },
    { label: 12, value: 12 }
  ]
  const onChangeProducts = (newValue: any) => {
    setCurrentPage(1)
    setPerPage(parseInt(newValue.value))
    fetchProducts(1, parseInt(newValue.value))
  }

  const fetchProducts = async (page: number, perPage: number | 1) => {
    setIsLoading(true)
    if (!isLoading) {
      try {
        const response = await axios.post('/wp-json/wishlist/list', {
          limit: perPage,
          current_page: page
        })
        const data = response.data.data

        if (response.data.message === 'Successfully') {
          const products = data.data.map((product: any) => {
            return mappingProductData(product)
          })

          setProducts(products)
          setIsLoading(false)

          setPaginate({
            totalPage: data.last_page,
            total: data.total,
            to: data.to,
            from: data.from
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchProducts(currentPage, perPage)
  }, [])

  const handleOnPageChange = (page: number) => {
    if (!isLoading) {
      setCurrentPage(page)
      fetchProducts(page, perPage)
    }
  }

  const syncProductFavorite = (productId: any) => {
    setProducts(products.filter((item) => item.id !== productId))
  }

  return (
    <>
      {isLoading ? (
        <div className='flex bg-white pt-[100px] h-[445px] justify-center rounded-[10px]'>
          <Spinner />
        </div>
      ) : (
        <div className='w-full px-6 pt-[28px] pb-[43px] flex flex-col gap-[15px]'>
          <div className='w-full flex justify-end gap-4 items-center'>
            <span className='text-14'>
              {paginate.from}-{paginate.to}/{paginate.total} sản phẩm
            </span>
            <SelectComponent
              options={showItems}
              isSearchable={false}
              value={perPage}
              classNames={{
                control: 'h-10 w-[86px] flex items-center justify-center'
              }}
              handleOnChange={onChangeProducts}
            />
          </div>
          <TableProduct
            canActionSearch={false}
            canActionProduct={false}
            productLists={products}
            forCoupon={true}
            forFavoriteList={true}
            hiddenPagination={true}
            syncProductFavorite={syncProductFavorite}
            classTable='!min-h-[0] overflow-y-hidden'
          />
        </div>
      )}
      {products.length > 0 && (
        <div className='w-full bg-white px-6'>
          <div className={`${!isLoading && 'border-t'}`}>
            <Pagination
              pageCount={paginate.totalPage}
              className='pt-[24px] mt-[1px]'
              pageLinkClassName='!w-[33px] !h-[33px]'
              breakClassName='!w-[33px] !h-[33px]'
              disable={isLoading}
              handleOnPageChange={handleOnPageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      )}
    </>
  )
}
