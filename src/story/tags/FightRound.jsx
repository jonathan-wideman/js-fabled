import React from 'react'
import DefaultNode from "./DefaultNode"

/*

TODO:
<fightround [pre="B"]>
Contains actions that will occur between each round of the fight. After each attack and defence, all text and actions contained by this tag will be activated in sequence.

pre – whether this tag should be activated before the first round, or only after; defaults to false.

*/

export default function FightRound({ children, ...others }) {

  return (
    <DefaultNode {...others} nodeType='fightround'>{children}</DefaultNode>
  )
}