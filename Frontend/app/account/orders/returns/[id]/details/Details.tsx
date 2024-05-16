'use client'

import { _fetch } from '@/app/actions'

import HeaderTable from '../../../Header'
import Footer from '../_ui/Footer'
import HeaderTab from '../_ui/HeaderTab'
import { TableRefundProduct } from '../_ui/TableRefundProduct'

interface Props {
  order: any
  id: string
}

const Details: React.FC<Props> = ({ order, id }) => {
  return (
    <>
      <div className='bg-white rounded-lg rounded-b-none'>
        <HeaderTab orderId={id} />
        <HeaderTable
          handleSearchOrders={() => {}}
          setCurrentTab={() => ({})}
          searchValue={''}
          setSearchValue={() => {}}
          hiddenMoreData={true}
          forMyOrder={true}
          hideSearch={true}
          title='Chi tiết yêu cầu'
        />
        <TableRefundProduct
          products={order.order_refund?.products || order.order_exchange?.products}
          viewOnly={true}
          handleSelectAll={() => {}}
          selectedItems={[]}
          setSelectedItems={() => {}}
        />
      </div>
      <div className='bg-white rounded-lg rounded-t-none mt-3'>
        <Footer
          selectedItems={[]}
          order={order}
          viewOnly={true}
          products={order.order_refund?.products || order.order_exchange?.products}
        />
      </div>
    </>
  )
}

export default Details
