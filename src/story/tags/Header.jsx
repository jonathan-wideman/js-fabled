import React from 'react'
import DefaultNode from "./DefaultNode"

/*

TODO:
<header [type="S"] [header1="S" header2="S" ...]>
Display a row of column headers within a <market> tag. Either the type attribute or a sequence of headerN attributes must be present.

type – One of the predefined header types – one of "ship", "cargo", "armour", "weapon", "magic", "shipsale", or "other".

headerN – Defines a sequence of headers, starting with header1 and increasing the suffix for each subsequent header.

*/

export default function Header({ children, ...others }) {

  return (
    <DefaultNode {...others} nodeType='header'>{children}</DefaultNode>
  )
}