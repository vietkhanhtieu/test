import { ICoupon } from '../api/definitions/voucher'
import { getPharmacyCouponList, getVendorCouponList } from '../api/voucher'
import Coupon from '../ui/vouchers/Coupon'

interface Props {
  couponType: 'pharmacy_center' | 'salers'
}

const CouponList = async (props: Props) => {
  let coupons: ICoupon[] = []

  switch (props.couponType) {
    case 'pharmacy_center':
      coupons = await getPharmacyCouponList(6)
      break
    case 'salers':
      coupons = await getVendorCouponList(6)
      break
  }

  return (
    <div className='grid lg:grid-cols-2 xl:grid-cols-3 gap-x-[14px] gap-y-5'>
      {coupons.map((value: ICoupon, index: number) => (
        <Coupon key={index} coupon={value} containerStyles='cursor-default' buttonText='Sao chép' />
      ))}
    </div>
  )
}

export default CouponList
