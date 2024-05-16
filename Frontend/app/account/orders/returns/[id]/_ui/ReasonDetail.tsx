import { setMessageDetail } from '@/lib/redux/slices/refund_order'
import { RootState } from '@/lib/redux/store'
import { UploadImage } from '@/public/icons'
import { compact } from 'lodash'
import Image from 'next/image'
import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
  filesProduct: File[]
  handleSelectFile: (event: ChangeEvent<HTMLInputElement>) => void
  order?: any | undefined
  viewOnly?: boolean | undefined
}

const ReasonDetail: React.FC<Props> = ({ filesProduct, order, viewOnly, handleSelectFile }) => {
  const dispatch = useDispatch()
  const refundOrder = useSelector((state: RootState) => state.refundOrders)

  const refundData = order?.order_refund || order?.order_exchange // data from API fetch when access details page
  const message = viewOnly ? refundData?.comment_content : refundOrder.message
  const messageDetails = viewOnly ? refundData?.detail_comment : refundOrder.message_detail

  const files = compact([
    refundData?.file_1,
    refundData?.file_2,
    refundData?.file_3,
    refundData?.file_4,
    refundData?.file_5
  ])

  const handleTypeReason = (value: string) => {
    dispatch(setMessageDetail(value))
  }

  return (
    <div className='py-[66px] px-[30px] flex flex-col gap-[30px]'>
      <div className='flex flex-col gap-2.5'>
        <span className='font-bold leading-[19px]'>Lý do đổi hàng:</span>
        {message && (
          <ul className='text-primary list-disc pl-5 leading-[19px]'>
            <li>{message}</li>
          </ul>
        )}
      </div>
      <textarea
        value={messageDetails}
        disabled={viewOnly}
        className='w-full rounded-lg h-[81px] text-14 py-[15px] px-6 focus:outline-none bg-athens-gray-solid/[.70]'
        onChange={(e) => handleTypeReason(e.target.value)}
      />
      <div className='flex w-full gap-[15px] flex-wrap'>
        {!viewOnly &&
          filesProduct.length > 0 &&
          filesProduct.map((file, index) => {
            return (
              <div
                key={index}
                className='h-[90px] w-[90px] rounded-lg bg-silver-sand flex justify-center items-center'
              >
                <Image
                  src={URL.createObjectURL(file)}
                  height={78}
                  width={69}
                  alt=''
                  className='!h-[78px] !w-[69px] object-cover'
                />
              </div>
            )
          })}
        {!viewOnly && filesProduct.length < 5 && (
          <>
            <label
              htmlFor='image_refund'
              className='w-[246px] h-[90px] px-5 py-[11px] flex flex-col items-center justify-center rounded-lg border border-dashed border-abbey bg-white cursor-pointer'
            >
              <div className='text-14 flex items-center'>
                <Image alt='' src={UploadImage} width={27} height={23} />
                <span className='text-14 text-abbey ml-5'>
                  Thêm hình
                  <br />
                  (Tối đa 5 tối thiểu 3 hình)
                </span>
              </div>
            </label>
            <input
              id='image_refund'
              name='image_refund'
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleSelectFile}
              multiple
            />
          </>
        )}
        {viewOnly &&
          !!files.length &&
          files.map((file, index) => {
            return (
              <div
                key={index}
                className='h-[90px] w-[90px] rounded-lg bg-silver-sand flex justify-center items-center'
              >
                <Image
                  src={file}
                  height={78}
                  width={69}
                  alt=''
                  className='!h-[78px] !w-[69px] object-cover'
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default ReasonDetail
