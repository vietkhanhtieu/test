// https://daisyui.com/components/loading/
import { cn } from '@/lib/utils'

interface Props {
  size?: string
  color?: string
  className?: string
}

const Loading = (props: Props) => {
  const size = props.size || 'dy-loading-md'
  const color = props.color || 'text-primary'
  return (
    <span
      className={cn(
        'dy-loading dy-loading-spinner text-primary',
        size,
        color,
        props.className || ''
      )}
    />
  )
}

export default Loading
