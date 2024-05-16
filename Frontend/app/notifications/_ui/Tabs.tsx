'use client'

import { NotificationType } from '@/app/api/definitions/notification'
import { cn } from '@/lib/utils'
import { useState } from 'react'

import TabContent from './TabContent'
import TabContentAll from './TabContentAll'

enum TabLabel {
  all = 'Tất cả',
  customer_care = 'Chăm sóc khách hàng',
  order_update = 'Đơn hàng',
  policy_update = 'Chính sách',
  promotion = 'Khuyến mãi',
  system_update = 'Hệ thống'
}

// Do not re-order key-value pair
const tabTypes = {
  all: null,
  promotion: NotificationType.promotion,
  policy_update: NotificationType.policy_update,
  order_update: NotificationType.order_update,
  system_update: NotificationType.system_update,
  customer_care: NotificationType.customer_care
}

const Tabs = () => {
  const [activeTab, setActiveTab] = useState<NotificationType | null>(null)

  return (
    <>
      <div
        role='tablist'
        className='dy-tabs dy-tabs-bordered flex border-b border-gallery rounded-[10px_10px_0_0] bg-white text-14 font-medium'
      >
        {Object.entries(tabTypes).map(([key, value]) => (
          <a
            key={key}
            role='tab'
            className={cn('dy-tab', activeTab === value && 'dy-tab-active')}
            onClick={() => setActiveTab(value)}
          >
            {TabLabel[key as keyof typeof TabLabel]}
          </a>
        ))}
      </div>
      {activeTab === null ? <TabContentAll /> : <TabContent activeTab={activeTab} />}
    </>
  )
}

export default Tabs
