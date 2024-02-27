import React from 'react'
import DefaultNode from "./DefaultNode"

/*

TODO:
<fightdamage [type="add|replace"]>
Contains actions that will occur whenever the opponent hits the character. Usually this contains some action that will do damage of a different form to the player (poison, ability loss, etc).

type – whether the actions occurring here are in addition to, or replace, the regular damage.

*/

export default function FightDamage({ children, ...others }) {

  return (
    <DefaultNode {...others} nodeType='fightdamage'>{children}</DefaultNode>
  )
}