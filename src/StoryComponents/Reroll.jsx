import React from 'react'
import DefaultNode from "./DefaultNode"

/*

TODO:
<reroll>
Undo the last dice roll that occurred. Equivalent to using a Luck blessing; it must be the very next action that occurs after the dice roll.

*/

export default function Reroll({ children, ...others }) {

  return (
    <DefaultNode {...others} nodeType='reroll'>{children}</DefaultNode>
  )
}