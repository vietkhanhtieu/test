import Link from 'next/link'
import React from 'react'

interface Link {
  title: string
  url: string
}

interface BreadcrumbProps {
  links: Link[]
}

export default function Breadcrumb(props: BreadcrumbProps) {
  const { links } = props

  return (
    <div className='py-[9px] bg-gray-10 text-nevada'>
      <div className='container text-sm'>
        {links.map((link, index) => (
          <React.Fragment key={index}>
            <Link href={link.url} className={index === links.length - 1 ? 'font-bold' : ''}>
              {link.title}
            </Link>
            {index !== links.length - 1 && <span> / </span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
