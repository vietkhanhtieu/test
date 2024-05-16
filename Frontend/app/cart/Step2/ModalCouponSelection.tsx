import { ICoupon, isHiddenCoupon } from '@/app/api/definitions/voucher'
import Coupon from '@/app/ui/Coupon'
import Modal from '@/components/common/Modal'
import { Button } from '@/components/ui/button'
import { toNonAccentVietnamese } from '@/lib/utils'
import moment from 'moment'
import Image from 'next/image'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface IModalCouponSelection {
  isModalOpen: boolean
  setIsModalOpen: (arg: boolean) => void
  applyCoupon: Dispatch<SetStateAction<string[]>>
  vouchers: any
  setSelectedCoupon: Dispatch<SetStateAction<ICoupon | undefined>>
}

const ModalCouponSelection: React.FC<IModalCouponSelection> = ({
  isModalOpen,
  setIsModalOpen,
  applyCoupon,
  vouchers,
  setSelectedCoupon
}) => {
  const [, setIsOpenModal] = useState<boolean>(false)
  const [selected, setSelected] = useState<string[]>([])
  const [filteredCoupons, setFilteredCoupons] = useState<ICoupon[]>([])
  const [listCoupons, setListCoupons] = useState<ICoupon[]>([])

  useEffect(() => {
    if (vouchers) {
      const listVouchers: ICoupon[] = []
      vouchers.forEach((voucher: any) => {
        listVouchers.push({
          canApply: voucher.can_apply,
          couponCode: voucher.coupon_code,
          endDate: voucher.end_date,
          isDisable: voucher.is_disable,
          numberOfUses: voucher.usage_count,
          percentUsage: voucher.percent_usage,
          postExcerpt: voucher.post_excerpt,
          postTitle: voucher.post_title,
          shortDescription: voucher.short_description,
          startDate: moment(voucher.start_date).format('DD/MM/YYYY'),
          usageLimit: voucher.usage_limit
        })
      })
      setListCoupons(listVouchers.filter((voucher) => !isHiddenCoupon(voucher)))
      setFilteredCoupons(listVouchers.filter((voucher) => !isHiddenCoupon(voucher)))
    }
  }, [vouchers])

  const handleOnClose = () => {
    setFilteredCoupons(listCoupons)
    setIsModalOpen(false)
  }

  const handleApply = () => {
    applyCoupon(selected)
    setIsModalOpen(false)
  }

  const handleSelectCoupon = (coupon: string) => {
    setSelected((prev: string[]) =>
      prev.includes(coupon) ? prev.filter((couponCode) => couponCode !== coupon) : [...prev, coupon]
    )
  }

  const handleOnchange = (event: any) => {
    setFilteredCoupons(
      listCoupons.filter((voucher) => {
        const customTerm = toNonAccentVietnamese(event.target.value)

        return (
          toNonAccentVietnamese(voucher.postTitle).includes(customTerm) ||
          toNonAccentVietnamese(voucher.couponCode).includes(customTerm)
        )
      })
    )
  }

  useEffect(() => {
    setIsOpenModal(isModalOpen)
  }, [isModalOpen])

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleOnClose}
      containerClass='lg:max-w-[840px] lg:w-[840px] sm:max-w-[615px] sm:w-615px max-h-[619px] px-7'
    >
      <div className='absolute right-[15px] top-[13px]'>
        <Image
          alt='crossIcon'
          src='/icons/cross.svg'
          width={12}
          height={12}
          className='cursor-pointer'
          onClick={handleOnClose}
        />
      </div>
      <div className='pt-1.5 pb-0.5'>
        <div className='flex flex-col gap-5 items-center'>
          <h1 className='text-24 font-medium leading-7'>Mã khuyến mãi</h1>
          <div className='px-[17px] py-[11px] flex gap-[15px] items-center rounded-[50px] border border-alto lg:w-[595px]'>
            <Image alt='Search Icon' src='/icons/search-ico-orange.svg' height={17} width={17} />
            <input
              className='outline-none bg-transparent text-14 leading-4'
              onChange={handleOnchange}
            />
          </div>
          <div
            className={`${filteredCoupons.length > 0 ? 'max-h-[340px] grid grid-cols-1 gap-5 lg:grid-cols-2' : 'h-[176px] flex justify-center items-center'}
            ${filteredCoupons.length >= 6 && 'lg:overflow-y-scroll'} mb-10
            ${filteredCoupons.length >= 3 && 'overflow-y-scroll'}`}
          >
            {filteredCoupons.length > 0 ? (
              filteredCoupons.map(
                (coupon: ICoupon, index: number) =>
                  !coupon.isDisable && (
                    <Coupon
                      coupon={coupon}
                      key={index}
                      type='for_order'
                      customStyle='w-[372px]'
                      selected={selected.includes(coupon.couponCode)}
                      setSelectedCouponOrder={handleSelectCoupon}
                      setSelectedCoupon={setSelectedCoupon}
                    />
                  )
              )
            ) : (
              <p className='text-14'>Rất tiếc, Chưa có voucher nào</p>
            )}
          </div>
          <div className='flex sm:justify-between w-full text-14 flex-col items-center lg:flex-row'>
            <p>Đã chọn {selected.length} ưu đãi</p>
            <Button
              className='bg-primary text-white rounded-[50px] px-[110px] max-h-9'
              onClick={handleApply}
            >
              <p className='text-14 leading-4'>Áp dụng</p>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalCouponSelection
