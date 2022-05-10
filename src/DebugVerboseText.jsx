import React from 'react'
import { useGameContext } from './GameContext'

export default function DebugVerboseText({ children }) {
    const { debugVerbose } = useGameContext()

    return (
        debugVerbose ? <span className='debug-verbose'> {children} </span> : undefined
    )
}
