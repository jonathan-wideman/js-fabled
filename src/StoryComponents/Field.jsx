import React from 'react'
import DefaultNode from "./DefaultNode"

/*

TODO:
<field {label="S"|text=”S”} name="S">
Displays the value held in the codeword name (0 if the player doesn't yet have that codeword). This value may be affected elsewhere, in which case the value displayed will change. This is currently used to display the player's status in the Uttaku court, or the current bonus for some Difficulty rolls.

label – The displayed label for the field. The attribute text is equivalent.

name – The codeword to display.

*/

export default function Field({ children, ...others }) {

  return (
    <DefaultNode {...others} nodeType='field'>{children}</DefaultNode>
  )
}