import { AttentionIcon, CheckIcon } from '@/public/orders'
import Image from 'next/image'

interface Props {
  data: any
}

const DetailsLeftCol = (props: Props) => {
  const { delivery_address, is_receipt_exported, info_order, tax_address } = props.data

  let fullAddress: string = ''
  if (delivery_address.address) fullAddress += `${delivery_address.address}, `
  if (delivery_address.ward?.name) fullAddress += `${delivery_address.ward.name}, `
  if (delivery_address.district?.name) fullAddress += `${delivery_address.district.name}, `
  if (delivery_address.district?.name) fullAddress += delivery_address.province.name

  return (
    <div className='flex-[1_1_300px] pt-[30px] pb-[37px] border-r border-alto'>
      <div className='pl-[30px] pr-5 pb-8 border-b border-alto mb-8'>
        <h6 className='mb-2.5 font-bold leading-[19px]'>Thông tin đặt hàng</h6>
        <p className='mb-11 text-14 leading-4'>
          <span className='font-medium'>{info_order.name}</span>
          <span className='mx-5'>|</span>
          <span>{info_order.phone}</span>
        </p>

        <h6 className='mb-2.5 font-bold leading-[19px]'>Địa chỉ nhận hàng</h6>
        <p className='mb-2.5 text-14 leading-4'>
          <span className='font-medium'>{delivery_address.name}</span>
          <span className='mx-5'>|</span>
          <span>{delivery_address.phone}</span>
        </p>
        <p className='text-14'>{fullAddress}</p>
      </div>

      <div className='pl-[30px] pr-5'>
        <h6 className='mb-5 font-bold leading-[19px]'>Thông tin xuất hóa đơn</h6>

        <ul className='flex flex-col gap-[5px] mb-[5px] text-14 leading-4'>
          <li className='font-medium'>{tax_address.name}</li>
          <li>
            MST: <span>{tax_address.tax_code}</span>
          </li>
          <li>
            Email: <span>{tax_address.email}</span>
          </li>
          <li>{`${tax_address.address}, ${tax_address.ward.name}, ${tax_address.district.name}, ${tax_address.province.name}`}</li>
        </ul>

        <p className='flex gap-2.5 items-center py-2 px-2.5 rounded-[5px] mb-[5px] text-12 bg-super-silver'>
          <Image src={AttentionIcon} alt='Chú ý' className='h-6' />
          Hóa đơn sẽ được phát hành sau khi nhận hàng, vui lòng kiểm tra email để nhận hóa đơn.
        </p>
        {is_receipt_exported && (
          <span className='inline-flex gap-[5px] items-center text-primary text-12 leading-[14px]'>
            <Image src={CheckIcon} alt='Check' width={18} className='h-3' />
            Đã xuất hóa đơn
          </span>
        )}
      </div>
    </div>
  )
}

export default DetailsLeftCol
