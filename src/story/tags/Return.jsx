import React from 'react'
import DefaultNode from "./DefaultNode"

/*

TODO:
<return [force="B"]>
Return to the last section. This reverses the effect of the last <goto> called, returning to the previous section at the point at which it was left, with all variables intact. Note that the program can't handle two consecutive <return>s.

force – Whether the player must perform this action; defaults to true.

<items group="S" limit="N">
A hidden tag that limits how many items with a matching group attribute can be taken before their actions are disabled.

group – All items with the same group attribute in this section will be affected by the limit.

limit – The number of matching items that can be taken.

Rare & Exotic Tags

*/

export default function Return({ children, ...others }) {

  return (
    <DefaultNode {...others} nodeType='return'>{children}</DefaultNode>
  )
}