import React from 'react'
import DefaultNode from "./DefaultNode"

/*

TODO:
<flee>
Contains text and actions that can be used in turn if the player chooses to flee an ongoing fight. If one of these tags is present, it will be activated and ready to use when a <fight> commences; after the fight it will be disabled. If there is a <goto> or <choice> tag in the same section with the flee attribute, it will only be activated once all actions within the <flee> tag have been performed.

*/

export default function Flee({ children, ...others }) {

  return (
    <DefaultNode {...others} nodeType='flee'>{children}</DefaultNode>
  )
}