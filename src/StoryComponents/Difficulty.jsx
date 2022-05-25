import React from 'react'
import DefaultNode from "./DefaultNode"

/*
TODO:
<difficulty ability="S" level="N" [flag="S"] [force="B"] [modifier="S"] [var="S"]>
Handle an ability roll. This rolls two dice, adds the player's ability score, and subtracts the Difficulty of the roll from this. The result is stored in a variable, with a value greater than 0 being a success, and a non-positive result being a failure. The default text is 'make a A roll at Difficulty L', where A is the ability name and L is the Difficulty level. This tag may contain a number of <adjust> tags, which modify the result.

ability – The ability being tested. This can be one or more ability names separated by a '|' character, or '?' to indicate a choice from all six abilities. If only one ability is given, it will be stored in a special variable so that the corresponding <success> and <failure> tags can use it automatically.

flag – The flag that must be set for this action to be enabled. When the action is activated, the flag is cleared.

force – Whether the player must activate this action to continue; defaults to true.

level – The Difficulty level of the roll.

modifier – A modifier to the ability used. This may be 'noweapon', 'noarmour', 'notool', or 'natural'; these exclude (respectively) the ability bonuses of a weapon, armour, a tool, or any of these things. The default is to include these bonuses. A final value, 'current', can be used with ability=”stamina” to make a roll against the current Stamina value.

var – The variable that the result will be stored in; if missing, the anonymous variable is used.

*/

export default function Difficulty({ children, ...others }) {

    return (
        <DefaultNode {...others} nodeType='difficulty'>{children}</DefaultNode>
    )
}