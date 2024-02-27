import React from 'react'
import D6 from './D6'
import { range } from '../helpers'
import { useDice } from '../hooks/useDice'

export default function Dice({ count }) {

  const [dice, setDice, rollAll, total] = useDice(count)

  return (
    // <div className='dice' onClick={() => rollAll}>{range(count).map((e, i) => <D6 key={i} />)}</div>
    <div className='dice' onClick={() => rollAll()}>{dice.map((d) => <D6 key={d.id} rolling={d.rolling} value={d.value} />)} = {total}</div>
  )
}
