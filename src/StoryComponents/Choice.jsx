import React from 'react'
import DebugVerboseText from '../DebugVerboseText'
import Goto from './Goto'

/*
TODO:
<choice [box="S"] [god="S"] [item tags] [pay=”B”] [profession="S"] [shards="V" [currency="S"]]>
One of a set of available choices, arranged in a table. Each choice consists of an automatic goto and a description (enclosed by the start and end tag). All attributes used by goto can be present here.

box – The codeword that must be present for this option to be enabled. Changes to the codeword made within the section will immediately affect this option. To show a checkbox as part of the choice description, include the text '{box}'; this will match the codeword state.

currency – The currency of the money indicated by shards. Defaults to 'Shards'.

flee – If true, this option will be enabled when a fight within the section commences, and disabled afterwards.

god – The god that the character must worship to select this option.

item tags – The item that the character must possess to select this option.

pay – Whether the money/item will be removed if the character takes this choice. If shards is present, defaults to true; if an item is present, defaults to false.

profession – The profession that the character must belong to to select this option.

shards – The amount of money the character must have to select this option.

Blessings are specified by the blessing attribute (containing the name of the blessing). As usual, an '*' matches all blessings, and a '?' matches a single one. The possible values:

defence – Defence through Faith. The bonus attribute optionally specifies the Defence bonus (defaults to 3).

disease/poison – Immunity to Disease/Poison.

injury – Immunity to Injury.

luck – Luck.

storm – Safety from Storms.
*/

export default function Choice({ children, book, section, ...others }) {
    return (
        <li>{children} <Goto book={book} section={section} /><DebugVerboseText>[choice {JSON.stringify({ ...others, section })}]</DebugVerboseText></li>
    )
}
