import React from 'react'
import DefaultNode from "./DefaultNode"

/*

TODO:
<sell [cargo="S"] [item attributes] [price="S"] [quantity="N"] [shards="N"] [ship="S"]>
Allow the player to sell an item, cargo unit, or ship.

cargo – The type of cargo unit that can be sold.

item attributes – The item that can be sold; this match may be inexact, so that any matching items can be sold for this price.

price – The flag that must be clear for this action to be enabled; when the action is clicked, this flag will be set.

quantity – The number of articles that can be sold before the action becomes permanently disabled.

shards – The price that will be given, in Shards.

ship – The quality of ship to be sold.

*/

export default function Sell({ children, ...others }) {

  return (
    <DefaultNode {...others} nodeType='sell'>{children}</DefaultNode>
  )
}