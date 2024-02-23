import React from 'react'
import DefaultNode from "./DefaultNode"

/*
TODO:
<set [cache="S"] [codeword="S"] [dock="S"] [force="B"] [item attributes] [modifier="S"] [value="S"] [var="S"]>
Assign a value to one of the variables held for this section. May also be used to dock a ship. If this action has no text, it will be hidden and automatically executed.

cache – The name of the cache that the indicated item is located in.

codeword – If value is missing, the value of this codeword will be assigned to the variable var.

dock – The name of the dock at which a ship, in the current location, will be moved to. The usual way to dock ships is via the dock attribute of the root section tag.

force – Whether the action must be executed by the player (if not hidden). Defaults to true.

item attributes – An item which will be referred to by the value attribute.

modifier - A modifier to any ability used in value. This may be 'noweapon', 'noarmour', 'notool' or 'natural'; these exclude (respectively) the ability bonuses of a weapon, armour, a tool, or any of these things. The default is to include these bonuses.

value – The value to be assigned to var. This can be an expression including the symbols '(', ')', '*', '/', '+', '-', integers, and variable names. Other identifiers may also be used:

armour – The Defence bonus of the armour indicated by the item attributes.

crew – The value of the crew in the 'current' ship (poor = 1, average = 2, good = 3, excellent = 4).

shards – The number of Shards held by the player, or in the

weapon – The Combat bonus of the weapon indicated by the item attributes.

an ability name – the six standard ones, as well as 'rank', 'defence', and 'stamina'. modifier affects all of these; if 'stamina' and modifier is absent, the default is to use the current stamina.

var – The variable to assign the result of value to; if missing, the result will be assigned to the anonymous variable.
*/

export default function SetSectionVariable({ children, ...others }) {

    return (
        <DefaultNode {...others} nodeType='set'>{children}</DefaultNode>
    )
}
