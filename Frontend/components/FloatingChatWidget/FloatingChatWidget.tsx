'use client'

import crossIcon from '@/components/icons/crossIco.svg'
import floatingChatWidgetIcon from '@/components/icons/floatingChatWidget.svg'
import messenger from '@/components/icons/messenger.svg'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ZALO_URL } from '@/lib/constants'
import { setOpenChatWindow } from '@/lib/redux/slices/floating_chat_widget'
import { RootState } from '@/lib/redux/store'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'

const FloatingChatWidget: React.FC = () => {
  const dispatch = useDispatch()
  const openChatWindow = useSelector((state: RootState) => state.floatingChatWidget.openChatWindow)

  const handleOpenZalo = () => {
    window.open(ZALO_URL, '_blank')
  }

  const handleOpenFacebook = () => {
    window.open(ZALO_URL, '_blank')
  }

  return (
    <div className='fixed bottom-12 right-12 z-50'>
      <div className='relative'>
        <div onClick={() => dispatch(setOpenChatWindow(true))}>
          <Image
            alt='floatingChatWidget'
            src={floatingChatWidgetIcon}
            width={65}
            height={65}
            className='cursor-pointer rounded-full shadow-lg'
          />
        </div>
        {openChatWindow && (
          <div className="absolute -right-4 -top-60 h-[230px] w-[317px] bg-[url('/assets/chatwindowbackground.svg')]">
            <Card className='h-[210[px] relative m-auto mt-0.5 w-[310px] rounded-lg border-none bg-none shadow-none'>
              <CardHeader className='relative border-b py-3 text-center text-[18px] font-semibold text-primary'>
                Tư vấn với Hỗ trợ viên
                <div
                  className='absolute right-3 top-3 cursor-pointer'
                  onClick={() => dispatch(setOpenChatWindow(false))}
                >
                  <Image alt='crossIcon' src={crossIcon} width={13} height={13} />
                </div>
              </CardHeader>
              <CardContent className='flex flex-col items-center  bg-none py-3 px-6 text-foreground'>
                <div className='text-14 mb-3'>Vui lòng chọn hình thức tư vấn</div>
                <div
                  onClick={() => handleOpenZalo()}
                  className='mb-2.5 flex h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-blue-ribbon'
                >
                  <Image
                    alt='zaloLogo'
                    src='icons/zalo-logo.svg'
                    width={25}
                    height={25}
                    className='mr-2 rounded-full'
                  />
                  <div className='text-[11px] font-semibold text-white'>Chat qua Zalo</div>
                </div>
                <div
                  onClick={() => {
                    handleOpenFacebook()
                  }}
                  className='flex h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r from-[#FF646D] via-[#9E34FF] to-[#188AFF]'
                >
                  <Image
                    alt='messenger'
                    src={messenger}
                    width={25}
                    height={25}
                    className='mr-2 rounded-full'
                  />
                  <div className='text-[11px] font-semibold text-white'>Chat qua Messenger</div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default FloatingChatWidget
