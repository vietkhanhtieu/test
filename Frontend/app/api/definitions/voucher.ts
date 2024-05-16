import moment from 'moment'

export interface ICoupon {
  canApply?: boolean
  couponCode: string
  endDate: string
  isDisable: boolean
  numberOfUses: number
  percentUsage: number
  postExcerpt: string
  postTitle: string
  shortDescription: string
  startDate: string | null
  supplierIcon?: string | null
  usageLimit: number
}

const mappingCouponData = (response: any): ICoupon[] => {
  return Object.values(response)
    .map((value: any) => ({
      couponCode: value.coupon_code,
      endDate: value.end_date,
      isDisable: value.is_disable,
      numberOfUses: value.number_of_uses,
      percentUsage: value.percent_usage,
      postExcerpt: value.post_excerpt,
      postTitle: value.post_title,
      shortDescription: value.short_description,
      startDate: moment(value.start_date).format('DD/MM/YYYY'),
      supplierIcon: value.supplier?.icon,
      usageLimit: value.usage_limit
    }))
    .filter((coupon) => !isHiddenCoupon(coupon))
}

const isHiddenCoupon = (coupon: ICoupon): boolean => {
  const usageLimit = coupon.usageLimit

  if (coupon.isDisable || (usageLimit > 0 && coupon.numberOfUses === usageLimit)) {
    return true
  }

  return false
}

export { mappingCouponData, isHiddenCoupon }
