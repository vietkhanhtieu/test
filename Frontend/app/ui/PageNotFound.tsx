const PageNotFound = () => {
  return (
    <div className='font-sans h-screen text-center flex flex-col items-center justify-center'>
      <div>
        <h1 className='next-error-h1 inline-block m-0 mr-5 pr-5 text-2xl font-medium align-top leading-[49px]'>
          404
        </h1>
        <div className='inline-block'>
          <h2 className='text-[14px] leading-[49px] m-0'>This page could not be found.</h2>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
