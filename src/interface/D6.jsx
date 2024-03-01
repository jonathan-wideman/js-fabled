import React, { useState } from 'react'
import { useGameContext } from '../GameContext'

export default function D6({ rolling, value }) {
  // const { rng } = useGameContext()
  // const [result, setResult] = useState(6)
  // const [rolling, setRolling] = useState(false)

  // const roll = () => {
  //   const n = rng.integer(5, 15)
  //   setRolling(true)
  //   animateRoll(n, n)
  //   //setTimeout((n) => {},)
  //   //setInterval((n) => setResult(rng.d6), rng.integer(150, 250),)
  // }

  // const animateRoll = (n, max) => {
  //   setResult(rng.d6())
  //   if (n <= 0) { setRolling(false); return }
  //   setTimeout(() => animateRoll(n - 1, max), (max - n) * 15 + 30)
  // }

  return (
    // <div className={'d6' + (rolling ? ' rolling' : '')} onClick={roll}>{result}</div>
    <span className={'d6' + (rolling ? ' rolling' : '')}>{value}</span>
  )
}
