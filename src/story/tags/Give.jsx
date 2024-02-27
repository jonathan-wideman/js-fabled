import React from 'react'
import DebugVerboseText from '../meta/DebugVerboseText'
import { useGameContext } from '../../GameContext'
import { sectionCodeword } from '../../helpers'

/*
<tick [ability="S" [effect=”S”]] [addbonus="V"] [addtag="S"] [amount="V"] [blessing="S" [permanent=”B”]] [bonus="V"] [cache="S"] [cargo="S"] [codeword="S"] [crew="S"] [flag="S"] [force="B"] [god="S"] [hidden="B"] [item tags] [name="S"] [price="S"] [profession=”S”] [removetag="S"] [shards="V"] [special="S"] [ticks="N"] [title="S" [titlePattern="S" titleValue="N" titleAdjust="N"]]>
<gain ...>
TODO: 'Add' something to the character. There are many possible actions here, so bear with me. Generally this action is enabled, but the player is free to skip it. Note that only a 'single' action can be performed – such as adding an item, or a codeword, or a title – rather than many actions. If you need to perform multiple actions with one click, use the <group> element.

TODO: ability – The ability to add to (permanently). The amount is given in the amount attribute.

TODO: addbonus – An upgrade to the indicated item's main bonus.

TODO: addtag – A tag to add to an item.

TODO: amount – The value to add to an ability; this may be in the form of a 'dice' expression, id+j, where i and j are both integers.

TODO: blessing – A blessing to add the character's list of blessings. The name of the blessing will provide default content for this element.

TODO: bonus – Modifies either the blessing or the special attribute.

TODO: cache – The name of the cache to add the item/money to.

TODO: cargo – The Cargo Unit to add (to a present ship).

TODO: codeword – The codeword to add to the character's list. If the element has no content, the default text will be 'tick the codeword C'. Note that if the codeword name is found in the action text, it will be automatically italicised.

TODO: crew – A quality of crew to set for a present ship (one of 'poor', 'average', 'good' or 'excellent'). To change the crew quality by one or more steps (in either direction), use the <lose> element.

TODO: effect – Used with ability to add to or remove an effect from one of the character's abilities (a '-' prefix will remove the effect). The current effects are “fix”, which locks that attribute at a value of 1; and “curse”, which makes any ability rolls against that ability automatically fail (and treats the ability in other ways as if it were 0). Note that the Charisma ability includes a special case: a mask, while possessed (and presumably worn), will cancel these effects.

TODO: flag – The name of the flag that must be set before this action can be activated. Activating the action will clear the flag.

TODO: force – Whether this action needs to be activated before execution can continue. Defaults to true.

TODO: god – The name of the god that the character will switch to. May be empty, if the character is renouncing their existing god.

TODO: hidden – If true, the action is hidden and is automatically activated when it is reached.

TODO: item tags – One of the character's possessions to be modified. Note that this does not add an item; use the <item>, <weapon>, etc. tags for this purpose. See the addbonus, addtag and removetag attributes.

TODO: name – The name of the codeword to add ticks to. The amount attribute can also be used instead of ticks.

TODO: permanent – If true, indicates the blessing may be used repeatedly without being lost.

TODO: price – The name of the flag that must be clear for this action to be enabled. Activating the action will set the flag (and disable the action).

TODO: profession – A new profession for the player (only the regular six are recognised); more than one profession may be chosen from by using a '|'-separated list.

TODO: removetag – A tag to remove from an item.

TODO: shards – The number of Shards that can be gained. This provides the default text 'X Shards'.

TODO: special – An unusual, 'game' action: one of {attack, defence, armourlock, weaponlock, lock, unlock, difficultycurse, difficultyrestore, godless}.

  TODO: 'attack' gives a bonus to the character's rolls in the next fight; 'defence' gives a bonus to the character's Defence score during the next fight. Both of these actions use the bonus attribute, although the defence bonus defaults to 3.

  TODO: 'lock' (or 'freeze') and 'unlock' (or 'thaw') work on a cache, indicated by the cache attribute; the cache will temporarily ignore user access, or restore access.

  TODO: 'armourlock' stops the character from changing the worn armour, for the duration of the section; 'weaponlock', similarly, locks in the currently wielded weapon.

  TODO: 'difficultycurse' changes all difficulty rolls to be made with one die, while 'difficultyrestore' restores them to the usual two dice.

  TODO: 'godless' removes the character's ability to worship a god (clearing the currently worshipped god in the process).

TODO: ticks – The number of ticks to add to the checkboxes displayed with this section. If no attributes are present, this defaults to 1, with default text of 'put a tick there now'. Also used by the name attribute.

TODO: title – The name of the title to grant to the character. This can provide the default text.

TODO: titlePattern, titleValue, titleAdjust – Occasionally a title can be added that contains a value which may rise or fall (eg. Circle 1 Bokh master). In this case the form of the title is given by titlePattern, with '{0}' in the pattern being replaced by the current value. titleValue is the initial value displayed, if the character doesn't already have this title. titleAdjust is the amount to modify the value by, if the character does already have the title.
*/
export default function Give({ children, ...others }) {

  const { giveCharacter, tickNextSectionBox } = useGameContext()
  const shards = parseInt(others?.shards) || undefined

  if (shards) {
    return (
      <span className='action' onClick={() => giveCharacter('money', shards)}>{children ?? `${shards} shards`}<DebugVerboseText>[give {JSON.stringify(others)}]</DebugVerboseText></span >
    )
  }

  // default to putting a tick in the (TODO: *first empty* ) box of the current section
  return (
    <span className='action' onClick={() => tickNextSectionBox()}>{children ?? `<give>`}<DebugVerboseText>[gain/tick {JSON.stringify(others)}]</DebugVerboseText></span>
  )
}
