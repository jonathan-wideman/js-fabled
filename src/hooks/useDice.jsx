import React, { useMemo, useState } from 'react'
import { useGameContext } from '../GameContext'
import { range } from '../helpers'

export function useDice(id, count, callback) {
  const { rng } = useGameContext()
  // const [dice, setDice] = useState([...Array(count)].map((e, id) => ({ id, rolling: false, value: 6 })))
  // const [values, setValues] = useState(range(count).map(i => 6))
  // const [rolling, setRolling] = useState(range(count).map(i => 6))
  const [dice, setDice] = useState(range(count).map((e, id) => ({ id, rolling: false, rollsLeft: 0, value: 6 })))

  // const setRolling = (d, rolling) => {
  //   const index = dice.indexOf(d)
  //   let newDice = [...dice]
  //   if (index >= 0) { newDice[index] = { ...dice[index], rolling } }
  //   return newDice
  // }

  // const setValue = (d, value) => {
  //   const index = dice.indexOf(d)
  //   let newDice = [...dice]
  //   if (index >= 0) { newDice[index] = { ...dice[index], value } }
  //   return newDice
  // }

  // const rollAll = () => {
  //   console.log('rolling all')
  //   for (let i = 0; i < count; i++) {
  //     // roll(dice[i])
  //     setTimeout(() => roll(dice[i]), i * 25)
  //   }
  // }

  // const roll = (d) => {
  //   console.log('rolling', d)
  //   const n = rng.integer(5, 15)
  //   setDice(setRolling(d, true))
  //   animateRoll(d, n, n)
  // }

  // const animateRoll = (d, n, max) => {
  //   setDice(setValue(d, rng.d6()))
  //   if (n <= 0) { setDice(setRolling(d, false)); return }
  //   setTimeout(() => animateRoll(d, n - 1, max), (max - n) * 15 + 30)
  // }




  // const rollAll = () => {
  //   console.log('rollAll')
  //   setDice(dice.map(d => ({ ...d, rolling: true, rollsLeft: rng.integer(5, 15) })))
  //   setTimeout(() => animateRolls(), 200)
  // }

  // const animateRolls = () => {
  //   console.log('animateRolls')
  //   console.log(dice)
  //   if (dice.every(d => !d.rolling)) { console.log('done rolling'); return }

  //   setDice(dice.map(d => {
  //     if (d.rolling) {
  //       const rollsLeft = d.rollsLeft - 1
  //       const rolling = rollsLeft > 0
  //       return { ...d, rolling, rollsLeft, value: rng.d6() }
  //     } else {
  //       return d
  //     }
  //   }))
  //   setTimeout(() => animateRolls(), 200)
  // }





  const rollAll = () => {
    const result = dice.map(d => ({ ...d, value: rng.d6() }))
    setDice(result)
    if (typeof callback === 'function') {
      callback(id, result)
    }
  }

  const total = useMemo(() => {
    return dice.reduce((sum, d) => sum + d.value, 0)
  }, [dice])




  return [dice, setDice, rollAll, total]
}