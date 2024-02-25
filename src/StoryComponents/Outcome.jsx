import React from 'react'
import DebugVerboseText from '../DebugVerboseText'
import Goto from './Goto'

/*
TODO:
<outcome [blessing="S"] [codeword="S"] [flag="S"] [range="S" [var="S"]] >
Usually one of a set after a dice roll has occurred, with one being enabled. It can also be used to group a block of text and actions, as if it were an if tag. All attributes used by goto can be present here.

blessing – A blessing that must be possessed for this option to enable.

codeword – One or more codewords that must be possessed for this option to enable. Multiple codewords may be combined with '|' or '&', to indicate a logical OR or AND respectively. The default text will be the list of codewords, separated by commas and the appropriate 'or'/'and' before the last codeword.

flag – The flag that must be set for this option to enable. Used in combination with other constraints (range or codewords) for a set of outcomes that can be repeatedly triggered.

range – A dice result range, specified as a single number, a range (X-Y) or two numbers (X,Y). The dice result is gotten from the anonymous variable, unless var is specified.

var – The variable holding the dice result with which range is compared.

Codewords are kept as a set of strings mapping to integers. A codeword is 'present' if it is in the set and maps to any integer other than 0. Tick counts are also kept with the codewords, with a codeword in the form 'book/section' mapping to the number of ticks. An arbitrary 'count' is also kept with the codewords (eg. your status at the Uttaku court).

*/

export default function Outcome({ children, book, section, ...others }) {
  return (
    <li>{children} <Goto book={book} section={section} /><DebugVerboseText>[outcome {JSON.stringify({ ...others, book, section })}]</DebugVerboseText></li>
  )
}
