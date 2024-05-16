import { _fetch } from '@/app/actions'

const getListDashboard = async () => {
  const listDashboard = await _fetch('/wp-json/category/list-dashboard', 'POST', {
    category: 'loai-san-pham'
  })

  return listDashboard.data
}

export { getListDashboard }
