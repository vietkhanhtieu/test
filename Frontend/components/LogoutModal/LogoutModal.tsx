import Modal from '@/components/common/Modal'
import { USER_TOKEN_NAME } from '@/lib/constants'
import { logoutUser } from '@/lib/redux/slices/current_user'
import { deleteCookie } from 'cookies-next'
import { useDispatch } from 'react-redux'

interface ILogoutModalProps {
  isOpen: boolean
  toggleLogoutModal: (value: boolean) => void
}

const LogoutModal: React.FC<ILogoutModalProps> = ({ isOpen, toggleLogoutModal }) => {
  const dispatch = useDispatch()

  const handleLogout = async () => {
    // TODO wait API done
    // const res = await axios.post(
    //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/auth/logout`
    // )
    dispatch(logoutUser())
    //deleteCookie(USER_TOKEN_NAME)
    toggleLogoutModal(false)

    //window.location.replace('/')
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => toggleLogoutModal(false)}
      containerClass='min-w-[360px] md:min-h-[245px] md:min-w-[560px] justify-center'
    >
      <div className='flex min-w-[345px] flex-col items-center text-foreground md:min-w-[445px] font-roboto'>
        <h3 className='mb-2 text-[30px] font-semibold text-abbey'>Đăng xuất tài khoản</h3>
        <div className='mb-7 text-[24px] md:text-[20px] text-abbey'>Hẹn gặp lại bạn!</div>
        <div className='flex w-full items-center justify-between'>
          <button
            className='min-w-[165px] rounded-lg border-2 border-primary px-5 py-2 text-[16px] font-semibold text-primary md:min-w-[215px] md:text-[24px]'
            onClick={() => toggleLogoutModal(false)}
          >
            Huỷ
          </button>
          <button
            onClick={handleLogout}
            className='min-w-[165px] rounded-lg border-2 border-primary bg-primary px-5 py-2 text-[16px] font-semibold text-white md:min-w-[215px] md:text-[24px]'
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default LogoutModal
