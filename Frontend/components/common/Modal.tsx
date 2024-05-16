import React, { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void // Assuming onClose is a function with no arguments and doesn't return anything
  children: ReactNode
  containerClass?: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, containerClass }) => {
  if (!isOpen) return null
  const handleClickOutside = (event: { target: any; currentTarget: any }) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }
  return (
    <div
      className='fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50'
      onClick={handleClickOutside}
    >
      <div
        className={`relative m-auto flex max-h-[600px] min-h-[300px] min-w-[300px] max-w-[542px] flex-col items-center rounded-xl bg-white p-7 shadow ${containerClass}`}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
