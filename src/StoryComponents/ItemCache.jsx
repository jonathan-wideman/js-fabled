import React from 'react'
import DefaultNode from "./DefaultNode"

/*

TODO:
<itemcache name="S" text="S" [itemlimit="N"] [max="N"] [multiples="N"] [withdrawCharge="F"]>
<moneycache ... >
Define a cache in which the player can leave items and/or money. A <moneycache> can only contain money, while an <itemcache> may contain both. The name of the cache is used as a unique identifier – it may be reused in another section to display the same cache. See also the <tick> tag and its special actions, 'lock' and 'unlock'; also see <exclude> and <include>, affecting which items can be left in the cache.

name – The unique identifier of the cache. For example, 'MerchantBank' is used to refer to the character's money deposited with the merchant's guild.

text – The description of the cache, shown on-screen.

itemlimit – For item caches, the maximum number of items that can be left there.

max – The maximum amount of money that can be left in a cache. Use '0' to bar money from this cache.

multiples – Money can only be deposited in multiples of this amount; for example, a merchant guild's investment uses a value of 100.

withdrawCharge – When withdrawing money, this proportion of the withdrawal will be removed. This is a floating point number (containing a decimal point, between 0 and 1).

<transfer [item attributes] [excluded item attributes] [force="B"] [from="S"] [hidden="B"] [limit="V"] [price="S"] [shards="V"] [to="S"]>
Transfer items or money between caches and the player. The caches referred to in from and to do not have to exist elsewhere.

item attributes – The item(s) to include in the transfer.

excluded item attributes – The item(s) to exclude from the transfer. The attributes used here are the same as for regular item attributes, but with a leading 'x'. For example, xweapon="*katana" xbonus="1+" would exclude any katana with a bonus of 1 or greater from the transfer. If one or more items are excluded, and no item attributes are present, all items not excluded will be transferred.

force – Whether this action has to be clicked before execution continues. Default is true.

from – The name of the cache from which items should be taken. If absent, items will be taken from the character's possession.

hidden – Whether this action is hidden, and hence automatically activated.

limit – The maximum number of items that can be transferred.

price – If present, the action can only be activated when this flag is clear, and clicking the action will set the flag.

shards – The amount of shards to be transferred by the action.

to – The name of the cache into which items should be deposited. If absent, items will be added to the character's possessions.

*/

export default function ItemCache({ children, ...others }) {

  return (
    <DefaultNode {...others} nodeType='itemcache'>{children}</DefaultNode>
  )
}