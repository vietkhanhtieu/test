// this is the custom Pagination that built base on 'react-paginate' lib: https://www.npmjs.com/package/react-paginate
import Image from 'next/image'
import ReactPaginate from 'react-paginate'

interface Props {
  pageCount: number
  className?: string
  pageLinkClassName?: string
  activeLinkClassName?: string
  breakClassName?: string
  breakLabel?: string
  currentPage?: number
  disable?: boolean
  previousLabelComponent?: React.ReactNode
  nextLabelComponent?: React.ReactNode
  handleOnPageChange: (arg: number) => void
}

const PreviousLabel = () => {
  return (
    <div className='w-[42px] h-[42px] flex items-center justify-center me-1'>
      <Image alt='previous-label' width={9} height={15} src='/icons/chevron-left.svg' />
    </div>
  )
}

const NextLabel = () => {
  return (
    <div className='w-[42px] h-[42px] flex items-center justify-center ms-1'>
      <Image alt='previous-label' width={9} height={15} src='/icons/chevron-right-light-gray.svg' />
    </div>
  )
}

const Pagination: React.FC<Props> = ({
  pageCount,
  className,
  pageLinkClassName,
  activeLinkClassName,
  breakClassName,
  breakLabel,
  currentPage,
  disable,
  nextLabelComponent,
  previousLabelComponent,
  handleOnPageChange
}) => {
  const forcePageValue = currentPage || 1
  const handlePageClick = (event: { selected: number }) => {
    if (!disable) {
      handleOnPageChange(event.selected + 1)
    }
  }

  return (
    <ReactPaginate
      className={`flex justify-center items-center text-12 leading-[14px] ${className}`}
      pageLinkClassName={`w-[32px] h-[32px] mx-1 rounded-full border border-color flex items-center justify-center cursor-pointer ${pageLinkClassName}`}
      activeLinkClassName={`border-alto bg-alto ${activeLinkClassName}`}
      breakClassName={`w-[32px] h-[32px] mx-1 rounded-full border border-color flex items-center justify-center ${breakClassName}`}
      breakLabel={breakLabel || '...'}
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      nextLabel={nextLabelComponent || <NextLabel />}
      previousLabel={previousLabelComponent || <PreviousLabel />}
      renderOnZeroPageCount={null}
      forcePage={forcePageValue - 1}
    />
  )
}

export default Pagination
