import { _fetch } from '@/app/actions'

import { mappingCouponData } from './definitions/voucher'

const getCouponLists = async () => {
  const couponTypes = ['pharmacy_center', 'salers']

  const responses = await Promise.all(
    couponTypes.map((type) => _fetch('/wp-json/voucher/list-coupons', 'POST', { type: type }))
  )

  return {
    pharmacyCoupons: mappingCouponData(responses[0].data.data),
    vendorCoupons: mappingCouponData(responses[1].data.data)
  }
}

const getPharmacyCouponList = async (limit?: number) => {
  const pharmacyCoupons = await _fetch('/wp-json/voucher/list-coupons', 'POST', {
    type: 'pharmacy_center'
  })

  return mappingCouponData(pharmacyCoupons.data.data).slice(0, limit || 10)
}

const getVendorCouponList = async (limit?: number) => {
  const vendorCoupons = await _fetch('/wp-json/voucher/list-coupons', 'POST', { type: 'salers' })

  return mappingCouponData(vendorCoupons.data.data).slice(0, limit || 10)
}

export { getCouponLists, getPharmacyCouponList, getVendorCouponList }
