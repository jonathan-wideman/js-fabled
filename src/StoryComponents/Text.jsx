import React from 'react'
import DefaultNode from "./DefaultNode"

/*

TODO:
<text>
<desc>
Used to define a description for an action or effect; between the start and end tags there may be text and style tags. <text> may be used by <group> to describe the whole action in the text. Both tags may be present within an <effect> tag - <text> will define what is shown in the section, and <desc> will define what is shown in the list of the item or curse's effects.

*/

export default function Text({ children, ...others }) {

  return (
    <DefaultNode {...others} nodeType='text'>{children}</DefaultNode>
  )
}