import React from 'react'
import DebugVerboseText from '../meta/DebugVerboseText'

/*
TODO:
<choices>, <outcomes>, <table>
Groups a set of choices or outcomes. Generally the elements within the table can be mixed, as long as the number of columns matches up.

var – Used only in the <outcomes> element, for a set of outcomes that use the same var and may be repeatedly enabled. See 6.731 for the only (buggy) example.
*/

export default function Outcomes({ children, ...others }) {
  return (
    <><ul>{children}</ul><DebugVerboseText>[outcomes {JSON.stringify(others)}]</DebugVerboseText></>
  )
}
