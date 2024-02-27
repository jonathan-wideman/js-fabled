import React from 'react'
import DebugVerboseText from '../meta/DebugVerboseText'
import { useGameContext } from '../../GameContext'
import { sectionCodeword } from '../../helpers'

/*
TODO:
<lose [ability="S" amount="V" [fatal="B"]] [blessing="S" [permanent=”B”]] [cache="S"] [cargo="S"] [codeword="S"] [crew="N"] [curse attributes] [flag="S"] [force="B"] [itemAt=”V”] [price="S"] [resurrection="B"] [shards="V"] [ship="B"] [stamina="S"] [staminato="V"] [item attributes [chance="S"] [multiple="V"]] [title=”S”]>
'Remove' something from the character. Note that multiple actions can be included here, and all will be executed (eg. item="*" shards="*" will remove all shards and items). If the action would do nothing, it remains disabled and execution continues.

ability – The ability to deduct amount from. This may be one of the six abilities, 'stamina', or 'rank'. A '?' lets the player choose which of the six abilities will be affected; a '*' means it affects all six abilities.

amount – The amount to deduct from ability. This may be a number, a variable name, or a dice expression. If an adjustment would reduce the ability to 0 or less this will kill the character (depending on the fatal attribute).

blessing – The blessing(s) to remove from the character. This can be one of the standard types, '?' or '*'.

cache – The name of the money or item cache to remove money and items from.

cargo – The cargo type to remove from the ship. If it's one of the known types, removes all cargo of that type from the current ship. It can also be '?', to remove a single cargo unit of the player's choice, or '*' to remove all cargo.

chance – This is only relevant if item="*" is present; it gives the probability (given as a fraction 'X/Y', between 0 and 1) for each item's removal.

codeword – A codeword to remove from the character. The default text if this is present is 'erase the codeword CODEWORD'. If the codeword is found in the action text, it will be automatically italicised.

crew – An integer 'step' to deduct from the current ship's crew. For example, a value of 1 will downgrade the crew from excellent to good, good to average, or average to poor. A negative value can also be used here to upgrade the crew, which complements the <gain crew="S"> action nicely.

curse attributes – The curse, poison or disease to remove from the character. The name of the curse will be used for the default text, if present.

fatal – Determines whether an adjustment made by ability and amount can kill the character. If true, and an ability would be reduced to 0, current stamina is reduced to 0 instead. Either way, the ability will only be reduced to 1.

flag – The name of the flag that must be set before this action can be activated. Activating the action will clear the flag.

force – Whether this action needs to be activated before execution can continue. Defaults to true.

item attributes – An item (or items) to remove from the character, or an item cache if cache is present. See also the chance and multiple attributes. If present, the default text will be the item description.

itemAt – Removes the item at the given position (from a cache or the character's possession). A '1' indicates the first item, a '2' the second, and so on. Currency will be skipped in this count; items with the 'keep' tag will remain.

multiple – The number of items removed from the character, or an item cache. Generally used with item="?" (or another item type).

permanent – If true, a blessing can be removed even if permanent.

price – The name of the flag that must be clear for this action to be enabled. Activating the action will set the flag (and disable the action).

resurrection – If true, clears the character's resurrection arrangements.

shards – The number of shards to remove from the character, or a cache if cache is present. This may be a number, a variable name, or '*' to indicate all available shards. If cache is present, the shards will be removed from the cache instead. The default text if this is present is 'X Shards'.

ship – If true, removes the 'current' ship (which the character is on, or is at the same location).

stamina – The amount to deduct from current stamina. This may be a number, a variable name, or in the form 'Xd + Y', where X is the number of dice to be rolled and Y is added to the result. The default text if this is present is 'lose X Stamina point(s)'.

staminato – The value to set the current stamina to. This may be a number or a variable name. This may actually restore stamina, if it is currently lower than the value given.

title – The name of a title that the character will lose. This will provide the default text if present.
*/
export default function Lose({ children, ...others }) {

  return (
    <span className='action'>{children}<DebugVerboseText>[lose {JSON.stringify(others)}]</DebugVerboseText></span>
  )
}
