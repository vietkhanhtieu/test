import Modal from '@/components/common/Modal'
import { ZALO_URL } from '@/lib/constants'
import { formatVND } from '@/lib/utils'
import { CancelIcon } from '@/public/icons'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  isOpenModalSuccess: boolean
  setIsOpenModalSuccess: (arg: boolean) => void
  id: number
  total: number
}

export const ModalCancelSuccess: React.FC<Props> = ({
  isOpenModalSuccess,
  setIsOpenModalSuccess,
  id,
  total
}) => {
  return (
    <Modal
      isOpen={isOpenModalSuccess}
      onClose={() => setIsOpenModalSuccess(false)}
      containerClass='w-[532px] rounded-2xl flex justify-center items-center py-[47px] px-[69px] gap-[25px]'
    >
      <div className='flex flex-col items-center gap-[15px] w-full'>
        <div className='flex flex-col gap-4 items-center'>
          <Image alt='' height={55} width={54} src={CancelIcon} className='!h-[55px]' />
          <span className='text-[26px] font-bold'>Hủy đơn hàng thành công</span>
        </div>
        <span className='text-14'>
          Đơn hàng: <span className='font-medium'>{id}</span> với giá trị {formatVND(total)} Đã hủy.
        </span>
        <span className='text-14 text-center tracking-[-0.5px]'>
          Cảm ơn bạn đã tin tưởng đặt hàng tại Trung Tâm Dược Phẩm. Nếu có thắc mắc hãy liên hệ ngay
          đến bộ phận CSKH để được hỗ trợ.
        </span>
      </div>
      <div className='flex gap-[15px]'>
        <Link href={ZALO_URL} target='_blank'>
          <button className='h-9 w-[180px] border border-primary px-4 text-primary text-14 font-medium rounded-[50px]'>
            Liên hệ CSKH
          </button>
        </Link>
        <Link href='/'>
          <button className='h-9 w-[180px] bg-primary px-4 text-white text-14 font-medium rounded-[50px]'>
            Trang chủ
          </button>
        </Link>
      </div>
    </Modal>
  )
}
