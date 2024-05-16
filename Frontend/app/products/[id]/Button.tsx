import { useState } from 'react'

interface ButtonProps {
  key: number
  label: string
  value: string
}

const Button: React.FC<ButtonProps> = ({ key, label, value }) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <div className='w-full'>
      <button
        key={key}
        className='text-lg font-semibold py-3 w-full text-left'
        onClick={toggleExpanded}
      >
        {label}
      </button>
      {expanded && (
        <div className='w-full'>
          <div className='w-full' dangerouslySetInnerHTML={{ __html: value || '' }} />
        </div>
      )}
    </div>
  )
}

export default Button
