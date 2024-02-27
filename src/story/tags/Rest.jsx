import React from 'react'
import DefaultNode from "./DefaultNode"

/*
TODO:
<rest [once="B"] [shards="N"] [stamina="V"]>
Restore some amount of the character's current Stamina. This can be as a one-time Stamina restoration, or at inns and taverns where each paid day of rest will restore some amount of Stamina.

once – whether the action can be triggered once only, or multiple times. Defaults to true if shards is absent, false otherwise.

shards – the amount of Shards to be paid for each 'unit' of Stamina restoration.

stamina – the amount of Stamina to restore. If absent, restores Stamina to its full amount. This may be an integer, a variable name, or a dice expression.
*/

export default function Rest({ children, ...others }) {

  return (
    <DefaultNode {...others} nodeType='rest'>{children}</DefaultNode>
  )
}