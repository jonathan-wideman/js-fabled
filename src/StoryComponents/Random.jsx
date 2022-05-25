import React from 'react'
import DefaultNode from "./DefaultNode"

/*
TODO:
<random [dice="N"] [flag="S"] [force="B"] [type=”S”] [var="S"]>
Simulate the roll of a number of dice. The result will be stored in a variable, and execution will continue from this point. This tag may contain a number of <adjust> tags, which modify the result.

dice – The number of dice to roll (defaults to 2). This determines the default text – either 'roll one die', 'roll two dice', or 'roll X dice' for numbers larger than two.

flag – The flag that must be set for this action to enable. When activated, this action doesn't clear the flag; this is usually done by a related <outcome> tag.

force – Whether the player must activate this action to continue; defaults to true.

type – If 'travel', a blessing of Safe Travel may be used to reroll.

var – The variable that the result will be stored in; if missing, the anonymous variable is used.

*/

export default function Random({ children, ...others }) {

    return (
        <DefaultNode {...others} nodeType='random'>{children}</DefaultNode>
    )
}