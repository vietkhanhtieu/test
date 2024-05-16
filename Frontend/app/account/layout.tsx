import { ReactNode } from 'react'

import AccountBreadcrumb from './_ui/AccountBreadcrumb'
import Sidebar from './_ui/Sidebar'

interface Props {
  readonly children: ReactNode
}

const AccountLayout = ({ children }: Props) => {
  return (
    <div className='min-h-[60vh] mb-24'>
      <AccountBreadcrumb />

      <div className='container px-1 md:px-[1.25rem]'>
        <div className='py-4'>
          <div className='grid grid-cols-5 md:grid-cols-4 gap-1 md:gap-5'>
            <Sidebar />
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
