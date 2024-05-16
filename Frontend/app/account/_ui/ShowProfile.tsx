import { Button } from '@/components/ui/button'
import { RootState } from '@/lib/redux/store'
import parsePhoneNumber from 'libphonenumber-js'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { useSelector } from 'react-redux'
import { Tooltip as ReactTooltip } from 'react-tooltip'

interface Props {
  setEditMode: Dispatch<SetStateAction<boolean>>
  openCopyTooltip: boolean
  setOpenCopyTooltip?: Dispatch<SetStateAction<boolean>>
  copyReferralCodeToClipboard: () => void
}

interface IPronoun {
  [key: string]: string
}

const pronounMapping: IPronoun = {
  he: 'Anh',
  she: 'Chị'
}

const ShowProfile: React.FC<Props> = ({
  setEditMode,
  openCopyTooltip,
  copyReferralCodeToClipboard
}) => {
  const user = useSelector((state: RootState) => state.currentUser.user)

  const pronounConvert = () => {
    const pronoun = user.pronoun?.toLocaleLowerCase()
    return pronounMapping[pronoun]
  }

  const avatarUrl = user.custom_avatar || '/icons/default-avatar.svg'
  const phoneNumber = parsePhoneNumber(user.phone, 'VN')

  return (
    <>
      <div className='pt-6 px-2 lg:px-7 pb-5 flex items-end justify-between border-b border-alto text-abbey'>
        <div className='text-xl font-medium'>
          {user.first_name}&nbsp;{user.last_name}
        </div>
        <Button
          className='text-sm font-medium w-[7.5rem] h-9 rounded-[10px] text-white'
          onClick={() => {
            setEditMode(true)
          }}
        >
          <Image
            className='me-1'
            alt='edit Icon'
            src='/icons/edit-ico-white.svg'
            width={16}
            height={16}
          />
          Chỉnh sửa
        </Button>
      </div>
      <div className='pt-16 px-2 lg:px-[22px] pb-4 flex flex-col-reverse lg:flex-row overflow-auto text-abbey'>
        <div className='lg:w-6/12 leading-[19px]'>
          <div className='lg:flex mb-[34px]'>
            <div className='lg:w-5/12 mb-[34px] lg:mb-0'>
              <div className='font-medium'>
                Tên: <span className='ms-2 lg:ms-4 font-normal'>{user.first_name}</span>
              </div>
            </div>
            <div className='lg:w-7/12'>
              <div className='font-medium'>
                Họ và tên đệm: <span className='ms-2 lg:ms-4 font-normal'>{user.last_name}</span>
              </div>
            </div>
          </div>

          <div className='flex mb-[34px]'>
            <div className='w-5/12 font-medium'>Danh xưng:</div>
            <div className='w-7/12 font-normal'>{pronounConvert()}</div>
          </div>

          <div className='flex mb-[34px]'>
            <div className='w-5/12 font-medium'>Số điện thoại:</div>
            <div className='w-7/12 font-normal'>
              {phoneNumber?.format('NATIONAL').replaceAll(' ', '.')}
            </div>
          </div>

          <div className='flex mb-[34px]'>
            <div className='w-5/12 font-medium'>Địa chỉ email:</div>
            <div className='w-7/12 font-normal'>{user.email}</div>
          </div>

          <div className='flex mb-[34px]'>
            <div className='w-5/12 font-medium'>Mật khẩu:</div>
            <div className='w-7/12 font-normal'>********</div>
          </div>

          <div className='flex items-center'>
            <div className='w-5/12 font-medium'>Mã giới thiệu của bạn:</div>
            <div className='w-7/12 font-normal flex'>
              <span className='bg-gallery py-2.5 px-[15px] font-medium rounded text-primary leading-[19px]'>
                {user.referral_code}
              </span>
              <Image
                src={'/icons/copy-ico.svg'}
                width={20}
                height={20}
                alt='copy-icon'
                className='ms-[19px] cursor-pointer'
                id='tooltip-copy-code'
                onClick={copyReferralCodeToClipboard}
              />
              <ReactTooltip
                anchorSelect='#tooltip-copy-code'
                place='top'
                clickable
                content='Copied!'
                openOnClick={true}
                offset={1}
                isOpen={openCopyTooltip}
                style={{
                  fontSize: '12px',
                  paddingLeft: '5px',
                  paddingRight: '5px',
                  paddingTop: '4px',
                  paddingBottom: '4px'
                }}
              />
            </div>
          </div>
        </div>
        <div className='lg:w-6/12 mb-4 lg:flex justify-end'>
          <div className='relative w-fit'>
            <Image
              src={avatarUrl}
              width={152}
              height={152}
              alt='user-avatar'
              className='rounded-full relative'
              style={{ height: '152px', width: '152px', objectFit: 'cover' }}
            />
            <div className='absolute right-2.5 top-28 p-[9px] bg-white rounded-full'>
              <Image
                className=''
                alt='edit Icon'
                src='/icons/edit-ico-orange.svg'
                width={13}
                height={13}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShowProfile
