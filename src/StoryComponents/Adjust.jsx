import React from 'react'
import DefaultNode from "./DefaultNode"

/*

TODO:
<adjust [ability="S" [modifier="S"]] [amount="V"] [codeword="S"] [crew="S"] [god="S"] [greaterthan="V"] [item attributes] [lessthan="V"] [modifier="S"] [name="S"] [profession="S"] [ship="S"] [titleVal="S" [default="N"]] [value="V"]>
Modify a random result. One or more of these can be contained within an action that simulates rolling dice (<random>, <difficulty>, <lose>, <rankcheck>). If the tag 'matches', the value is added to the reuslt.

ability – One of the ability names. This can be used without value or amount being present, in which case the value of the ability will be added to the result.

amount – The amount to add to the result if the tag matches. Identical to value.

codeword – A codeword that must be possessed by the player.

crew – The type of crew on the current ship ('poor', 'average', 'good' or 'excellent').

default – The value to use if the character doesn't have the title given by titleVal.

god – The god that must be worshipped by the character.

greaterthan – If the value given by ability or name are greater than this value, the tag is matched. May be a number or a variable name.

item attributes – An item (or items) that must be possessed by the character for this tag to match.

lessthan – If the value given by ability or name are less than this value, the tag is matched. May be a number or a variable name.

modifier – A modifier to the ability used. This may be 'noweapon', 'noarmour', 'notool' or 'natural'; these exclude (respectively) the ability bonuses of a weapon, armour, a tool, or any of these things. The default is to include these bonuses. 'current', with ability=”stamina”, accesses the current Stamina value.

name – The name of a field or codeword whose value we want to compare against, or use directly.

profession – The profession that the character must belong to.

ship – The type of ship that must be at the current location.

titleVal – The name of the title whose 'value' we want to use (see <tick> for a discussion of title patterns).


*/

export default function Adjust({ children, ...others }) {

  return (
    <DefaultNode {...others} nodeType='adjust'>{children}</DefaultNode>
  )
}