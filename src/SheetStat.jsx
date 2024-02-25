import React from 'react'
import DebugVerboseText from './DebugVerboseText'
import { useGameContext } from './GameContext'
import { calculateStat, formatModifier } from './helpers'
import StatLabel from './StatLabel'

export default function SheetStat({ statName }) {
  const { character } = useGameContext()
  const calculatedStat = calculateStat(character, statName)
  return (
    <div><StatLabel>{statName.toUpperCase()}</StatLabel>{calculatedStat.value}<DebugVerboseText>{calculatedStat.details.map(detail => `${detail.label} ${formatModifier(detail.value)} `).join(', ')}</DebugVerboseText></div >
  )
}
