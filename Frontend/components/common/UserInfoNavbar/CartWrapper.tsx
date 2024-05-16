import { RootState } from '@/lib/redux/store'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'

import { OrderItem } from './OrderItem'

interface Props {
  setItemsToDelete: (arg: string[]) => void
  setOpenDeleteModal: (arg: boolean) => void
}

const CartWrapper: React.FC<Props> = ({ setItemsToDelete, setOpenDeleteModal }) => {
  const { cart } = useSelector((state: RootState) => state.userCart)
  return (
    cart && (
      <div className='w-ful px-[35px] flex flex-col gap-2.5'>
        <span className='text-14 font-medium'>Giỏ hàng của tôi</span>
        <div
          className={`flex flex-col gap-2.5 ${cart.length > 3 ? 'h-[530px] overflow-auto' : ''}`}
        >
          {cart &&
            cart.map((item, key) => {
              return (
                <Fragment key={key}>
                  <OrderItem
                    item={item}
                    setItemsToDelete={setItemsToDelete}
                    setOpenDeleteModal={setOpenDeleteModal}
                  />
                </Fragment>
              )
            })}
        </div>
      </div>
    )
  )
}

export default CartWrapper
