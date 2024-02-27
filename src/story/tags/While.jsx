import React from 'react'
import DefaultNode from "./DefaultNode"

/*

TODO:
<while var="S">
Repeatedly activate a block of text and actions, until a variable has been assigned a value. Currently only used in two sections, so it's somewhat under-tested.

var – A variable name. While no value has been assigned to this variable, the block will keep looping.

*/

export default function While({ children, ...others }) {

  return (
    <DefaultNode {...others} nodeType='while'>{children}</DefaultNode>
  )
}