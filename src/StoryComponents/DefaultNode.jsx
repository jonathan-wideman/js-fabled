import React from 'react'
import DebugVerboseText from '../DebugVerboseText'

export default function DefaultNode({ children, nodeType, isAction, ...others }) {
  return (
    <span className={isAction && 'action'}>{children ?? `<${nodeType}>`}<DebugVerboseText>[{nodeType} {JSON.stringify(others)}]</DebugVerboseText></span>
  )
}
