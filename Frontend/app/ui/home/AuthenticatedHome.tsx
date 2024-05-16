import Banner from './Banner'
import Partners from './Partners'
import ProductType from './authenticated/ProductType'
import QuickSearch from './authenticated/QuickSearch'
import RecentlyOrders from './authenticated/RecentlyOrders/RecentlyOrders'
import SuperDiscount from './authenticated/SupperDiscount'


const AuthenticatedHome = () => {
  return (
    <>
      <Banner />
      <QuickSearch />
      <ProductType />
      <SuperDiscount />
      <RecentlyOrders />
      <Partners />
    </>
  )
}

export default AuthenticatedHome
