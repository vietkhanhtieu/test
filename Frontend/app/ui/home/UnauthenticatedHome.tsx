import Banner from './Banner'
import Partners from './Partners'
import Actions from './unauthenticated/Actions'
import Commitment from './unauthenticated/Commitment'
import CouponList from './unauthenticated/CouponList'
import Feedbacks from './unauthenticated/Feedback'
import Introduction from './unauthenticated/Introduction'

const UnauthenticatedHome = () => {
  return (
    <>
      <Banner />
      <Introduction />
      <Commitment />
      <CouponList />
      <Actions />
      <Feedbacks />
      <Partners />
    </>
  )
}

export default UnauthenticatedHome
