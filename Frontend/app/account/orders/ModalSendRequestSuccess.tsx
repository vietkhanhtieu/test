import Modal from '@/components/common/Modal'
import Spinner from '@/components/ui/spinner'
import { ZALO_URL } from '@/lib/constants'
import { useBeforeUnload } from '@/lib/useBeforeUnload'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
  isOpenModalSuccess: boolean
  setIsOpenModalSuccess: (arg: boolean) => void
}

export const ModalSendRequestSuccess: React.FC<Props> = ({
  isOpenModalSuccess,
  setIsOpenModalSuccess
}) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const openZaloLink = () => {
    useBeforeUnload.forceRoute(() => {
      window.open(ZALO_URL, '_blank')
    })
  }

  const directToHomePage = () => {
    setLoading(true)
    useBeforeUnload.forceRoute(() => {
      router.push('/')
    })
  }

  return (
    <Modal
      isOpen={isOpenModalSuccess}
      onClose={() => setIsOpenModalSuccess(false)}
      containerClass='w-[560px] !max-w-[560px] h-[335px] rounded-2xl flex justify-center items-center gap-[25px] py-10 px-[30px] '
    >
      <div className='flex flex-col items-center gap-[15px] w-[445px] h-[255px] gap-[30px]'>
        <div className='flex flex-col gap-2.5 items-center'>
          <span className='text-[30px] font-bold leading-[35px]'>Đã gửi yêu cầu đến Nhà bán</span>
          <span className='text-[20px] text-center leading-[30px]'>
            Tiến trình xử lý yêu cầu đổi/trả hàng sẽ được cập nhật qua mục Thông báo và Quản lý đơn
            hàng. Nếu có thắc mắc, vui lòng liên hệ ngay đến CSKH để được hỗ trợ.
          </span>
        </div>

        <div className='flex gap-[15px]'>
          <button
            disabled={loading}
            onClick={openZaloLink}
            className='h-[60px] w-[215px] border-2 border-primary px-4 py-3 text-primary text-[25px] font-bold rounded-[10px]'
          >
            Liên hệ CSKH
          </button>
          <button
            disabled={loading}
            onClick={directToHomePage}
            className='h-[60px] w-[215px] bg-primary px-4 py-3 text-white text-[25px] font-bold rounded-[10px]'
          >
            {loading ? <Spinner /> : <span>Trang chủ</span>}
          </button>
        </div>
      </div>
    </Modal>
  )
}
