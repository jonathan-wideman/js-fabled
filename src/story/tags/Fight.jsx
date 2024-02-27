import React from 'react'
import DefaultNode from "./DefaultNode"

/*

TODO:
<fight combat="N" defence="N" name="N" stamina="N" [abilityDamaged=”S”] [attackDice=”N”] [fleeAt="N"] [group="S"] [playerDefence=”V”] [playerFirst="B"] [preDamage=”V”] [staminaLost=”S”] [useCache=”S”]>
Set up a fight for the character. This tag should be contained only by the <section> tag, not a <p> tag. The tags <fightround>, <fightdamage> and <flee> all relate to a <fight> tag in the same section.

abilityDamaged – If present, specifies an ability of the character that will be decreased by damage instead of Stamina.

attackDice – The number of dice which the player rolls to attack; the defaults is 2, obviously.

combat – The Combat score of the opponent.

defence – The Defence score of the opponent.

fleeAt – The Stamina score at which the opponent will end the fight.

group – The group to which this fight belongs. All fights in this section with the same group will be simultaneous – that is, the character attacks once, then defends against each attacker. Probably still buggy when combined with other unusual attributes.

name – The name or title of the opponent.

playerDefence – If present, replaces the normal Defence value of the character.

playerFirst – Whether the player has the first attack; defaults to true.

preDamage – An amount of damage that should be immediately inflicted on the opponent (which may kill them before the fight begins).

stamina – The Stamina score of the opponent.

staminaLost – If present, the total damage done to the opponent will be stored in the given codeword.

useCache – The name of a cache which the opponent can use against the character; specifcally, any weapons or armour in that cache. This is useful if the opponent has temporarily taken items from the character.

*/

export default function Fight({ children, ...others }) {

  return (
    <DefaultNode {...others} nodeType='fight'>{children}</DefaultNode>
  )
}