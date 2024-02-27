import React from 'react'
import DefaultNode from "./DefaultNode"

/*

TODO:
<resurrection [book="S" section="S"] [flag="S"] [god="S"] [shards="V"] [supplemental=”B”] [text="S"]>
Either allow the character to make or purchase resurrection arrangements, or trigger their existing resurrection. In the former case, both book and section must be present.

book – The book which the character will be sent to when the resurrection is triggered.

flag – The flag that must be set before this resurrection can be bought or triggered; when activated, this flag will be cleared.

god – The god granting this resurrection. If the character worships this god when the resurrection is bought, the resurrection will only remain while the character still worships the same god.

section – The section (in book) which the character will be sent to when the resurrection is triggered.

shards – The price to be paid for the resurrection arrangements.

supplemental – If true, this won't replace any previous arrangement.

text – A description of the resurrection location; the complete description of the resurrection, shown on the Adventure Sheet, includes this, the book title and section.

*/

export default function Resurrection({ children, ...others }) {

  return (
    <DefaultNode {...others} nodeType='resurrection'>{children}</DefaultNode>
  )
}