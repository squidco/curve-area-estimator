import React from 'react'

export default function Card({title, children}) {
  return (
    <div className='p-1 m-1'>
        <h2>{title}</h2>
        <p>{children}</p>
    </div>
  )
}
