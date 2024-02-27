import React from 'react'
import DebugVerboseText from '../meta/DebugVerboseText'
import Wip from './Wip'

export default function DefaultNode({ children, nodeType, isAction, ...others }) {
  return (
    <span className={isAction ? 'action' : 'wip'}>
      <Wip>
        {children ?? `<${nodeType}>`}
      </Wip>
      <DebugVerboseText>[{nodeType} {JSON.stringify(others)}]</DebugVerboseText>
    </span>
  )
}
