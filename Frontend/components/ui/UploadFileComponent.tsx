'use client'

import { CrossPrimary, UploadImage } from '@/public/icons/index'
import Image from 'next/image'
import React, { ChangeEvent, useState } from 'react'

interface IUploadFile {
  text: string
  type: string
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleDelete: (index: number, file: any, type: string) => void
  files: File[]
  currentFiles: any
}

const UploadFileComponent: React.FC<IUploadFile> = ({
  text,
  type,
  handleFileChange,
  handleDelete,
  files,
  currentFiles = []
}) => {
  const allFiles = [...files, ...currentFiles]

  return (
    <>
      {allFiles.length > 0 && (
        <div>
          {allFiles.map((file: any, index: number) => (
            <label
              key={index}
              className='w-full mb-[5px] h-[58px] flex flex-col items-center justify-center rounded-[10px] border border-dashed border-primary bg-white'
            >
              <p className='text-sm mr-1 text-gray-500 dark:text-gray-400 flex items-center justify-center h-full px-2'>
                <span className='text-16 w-auto mr-3 lg:mr-[26px] truncate max-w-[180px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[570px] xl:max-w-[640px]'>
                  {file.name}
                </span>
                <Image
                  alt=''
                  src={CrossPrimary}
                  width={19}
                  height={18}
                  className='text-primary cursor-pointer'
                  onClick={() => handleDelete(index, file, type)}
                />
              </p>
            </label>
          ))}
        </div>
      )}
      <div className='flex flex-col items-center justify-center w-full'>
        {allFiles.length < 3 && (
          <>
            <label
              htmlFor={type}
              className='w-full h-[58px] flex flex-col items-center justify-center rounded-[10px] border border-dashed border-primary bg-white cursor-pointer'
            >
              <p className='text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center h-full px-2'>
                <Image alt='' src={UploadImage} width={27} height={23} />
                <span className='text-16 text-abbey ml-5'>
                  File PNG, JPEG, PDF - tối đa 3 files
                </span>
              </p>
            </label>
            <input
              id={type}
              name={type}
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleFileChange}
              multiple
            />
          </>
        )}
      </div>
      <div className='h-4 mt-[5px] text-14 text-abbey font-normal leading-4'>
        <label>{text}</label>
      </div>
    </>
  )
}

export default UploadFileComponent
