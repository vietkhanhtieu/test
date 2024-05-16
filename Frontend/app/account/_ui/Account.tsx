'use client'

import { RootState } from '@/lib/redux/store'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import EditProfile from './EditProfile'
import ShowProfile from './ShowProfile'

const Profile = () => {
  const user = useSelector((state: RootState) => state.currentUser.user)

  const [editMode, setEditMode] = useState<boolean>(false)
  const [openCopyTooltip, setOpenCopyTooltip] = useState<boolean>(false)

  const copyReferralCodeToClipboard = () => {
    navigator.clipboard.writeText(user.referral_code).then(() => {
      setOpenCopyTooltip(true)

      setTimeout(() => {
        setOpenCopyTooltip(false)
      }, 2000)
    })
  }

  return (
    <div className='col-span-4 md:col-span-3 rounded-lg max-w-[880px] h-auto bg-white'>
      {editMode ? (
        <EditProfile
          setEditMode={setEditMode}
          openCopyTooltip={openCopyTooltip}
          setOpenCopyTooltip={setOpenCopyTooltip}
          copyReferralCodeToClipboard={copyReferralCodeToClipboard}
        />
      ) : (
        <ShowProfile
          setEditMode={setEditMode}
          openCopyTooltip={openCopyTooltip}
          setOpenCopyTooltip={setOpenCopyTooltip}
          copyReferralCodeToClipboard={copyReferralCodeToClipboard}
        />
      )}
    </div>
  )
}

export default Profile
