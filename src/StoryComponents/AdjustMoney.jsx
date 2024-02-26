import React from 'react'
import DefaultNode from "./DefaultNode"

/*

TODO:
<adjustmoney [force="B"] [multiply="F"] [name="S"]>
Adjust the money held by the character or in a cache.

force – Whether this action must be activated; defaults to true.

multiply – The amount by which the money should be multiplied, rounding down. This is a floating point number (a positive number, possibly having a decimal point).

name – The name of the cache being affected. If absent, affects the character's Shards. The attribute cache can also be used for the same purpose.

*/

export default function AdjustMoney({ children, ...others }) {

  return (
    <DefaultNode {...others} nodeType='adjustmoney'>{children}</DefaultNode>
  )
}