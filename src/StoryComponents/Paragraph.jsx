import React from 'react'
import DebugVerboseText from '../DebugVerboseText'

/*
<p>
Groups each paragraph of text. When a section has only one paragraph, it isn't usually necessary.
*/

export default function Paragraph({ children, ...others }) {
  return (
    <p>{children}<DebugVerboseText>[p {JSON.stringify(others)}]</DebugVerboseText></p>
  )
}
