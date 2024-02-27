import React from 'react'

export default function Checkbox({ active }) {
  return (
    <span>{active ? '☑' : '☐'}</span>
  )
}
