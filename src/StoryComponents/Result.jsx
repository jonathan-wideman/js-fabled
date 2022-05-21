import React from 'react'
import DebugVerboseText from '../DebugVerboseText'
import Goto from './Goto'

/*
TODO:
<success [ability="S"] [section="S" [book=”S”]] [var="S"]>
<failure ... >
Handle the results of a <difficulty> or <rankcheck> action. This can either be used as part of a group of choices (within a <outcomes> or <choices> tag) or as an <if> node, containing a block of text and actions. Success is defined by the variable (by default, the anonymous one) containing a value greater than zero; a lower value indicates failure.

ability – The ability that was being tested, used in describing the default text. Usually unnecessary, since the previous <difficulty> action will define the ability being tested.

book – Used with the section attribute, as in a <goto> tag.

section – The section to which the player is directed; used when the tag is part of a group of outcomes.

var – The variable tested for success.
*/

export default function Result({ children, nodeType, book, section, ...others }) {
    return (
        <li>{children ?? (nodeType === success ? 'If you succeed' : 'If you fail')} <Goto book={book} section={section} /><DebugVerboseText>[{nodeType} {JSON.stringify({ ...others, book, section })}]</DebugVerboseText></li>
    )
}
