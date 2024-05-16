import DaisyLoading from '@/app/ui/daisy/Loading'

const Loading = () => {
  return (
    <div className='flex items-center justify-center h-[134px] rounded-[0_0_10px_10px] bg-white'>
      <DaisyLoading size='dy-loading-lg' />
    </div>
  )
}

export default Loading
