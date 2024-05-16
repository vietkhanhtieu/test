import Script from 'next/script'

const MarketingApi = () => {
  return (
    <>
      <div
        style={{ position: 'relative', bottom: 0, left: 0 }}
        id='juicier-container'
        data-account-id='IDXH5MO4iVPdlQjwusyjqMciyTC3'
      >
        <a
          style={{ fontSize: 8, color: '#19191f36', textDecoration: 'none' }}
          href='https://prooffactor.com'
          target='_blank'
        >
          Powered by ProofFactor - Social Proof Notifications
        </a>
      </div>
      <Script src='https://cdn.one.store/javascript/dist/1.0/jcr-widget.js?account_id=IDXH5MO4iVPdlQjwusyjqMciyTC3' />
    </>
  )
}

export default MarketingApi
