import React from 'react'

export default function Wip({ children }) {
  return (
    <>
      <span className='debug-verbose debug-wip'> ⚠ </span>
      {children}
    </>
  )
}
