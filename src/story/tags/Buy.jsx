import React from 'react'
import DefaultNode from "./DefaultNode"

/*

TODO:
<buy [cargo="S"] [crew="S"] [force="B"] [flag="S"] [item attributes] [quantity="N"] [shards="N"] [ship="S" [initialCrew="S"] [name="S"]]>
Allow the player to buy an item, cargo, crew or ship.

cargo – The type of cargo unit that can be bought.

crew – The quality of crew that can be bought. The character must have a ship present with crew of the next lowest quality.

force – Whether this action must be executed; the default is false.

flag – The flag that must be set before this action will be enabled; when the action is clicked, this flag will be cleared.

initialCrew – The crew quality of the ship being bought.

item attributes – The item being bought.

name – The name of the ship being bought.

quantity – The number of times this action may be used before being permanently disabled.

shards – The price to be paid, in Shards.

ship – The type of ship that can be bought.

*/

export default function Buy({ children, ...others }) {

  return (
    <DefaultNode {...others} nodeType='buy'>{children}</DefaultNode>
  )
}