import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

const PasswordInput = ({ ...props }) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div style={{ position: 'relative' }}>
      <Input type={showPassword ? 'text' : 'password'} {...props} />
      <button
        onClick={togglePasswordVisibility}
        type='button'
        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
      >
        <Image
          alt=''
          src={showPassword ? '/icons/eye-open.svg' : '/icons/eye.svg'}
          width={22}
          height={20}
        />
      </button>
    </div>
  )
}
export default PasswordInput
