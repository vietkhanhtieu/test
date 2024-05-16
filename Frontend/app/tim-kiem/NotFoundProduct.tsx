import TableProduct from '@/app/ui/TableProduct'
import { Button } from '@/components/ui/button'
import { RootState } from '@/lib/redux/store'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'

export default function NotFoundProduct(props: any) {
  const { searchKey } = useSelector((state: RootState) => state.searchResults)
  const { productLists } = props

  return (
    <>
      <div className='container'>
        <div className='container-header bg-white rounded-[10px] mt-[50px]'>
          <div className='container-header-wrapper'>
            <div className='pt-[86px] pb-[96px] flex flex-col justify-center items-center'>
              <div className='image flex justify-center'>
                <Image alt='Logo viên thuốc' src='/oops.png' width={206} height={66} />
              </div>
              <span className='mt-[41px] text-16 text-center px-4 text-abbey'>
                Tiếc quá! <span className='text-primary '>Trung Tâm Dược Phẩm</span> không tìm thấy
                nội dung nào phù hợp với từ khóa &ldquo;{searchKey}&ldquo;
              </span>
            </div>
          </div>
          <div>
            <div className='container-footer-wrapper border-t-[3px] border-alabaster'>
              <div className='py-[46px] flex flex-col justify-center items-center'>
                <h1 className='mb-4 text-2xl font-medium text-center px-4 text-abbey'>
                  Mời bạn điền FORM đề xuất ngay.
                </h1>
                <Link href='#'>
                  <Button className='w-[192px] h-[36px] bg-primary rounded-full text-[16px]'>
                    Đề xuất
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <h1 className='mb-6 mt-14 text-2xl font-medium'>Sản phẩm được tìm kiếm nhiều nhất</h1>
      </div>
      <TableProduct canActionSearch={false} canActionProduct={false} productLists={productLists} />
    </>
  )
}
