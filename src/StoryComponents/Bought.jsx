import React from 'react'
import DefaultNode from "./DefaultNode"

/*

TODO:
<bought [item attributes]>
<sold [item attributes]>
These tags are used to perform a hidden action when a matching article is bought or sold. They may be contained within a <market> tag, in which case the item attributes must be present, so that when a match is bought/sold it will be activated. Alternatively, they may be contained within a sub-tag of <market> - either a <trade> tag or one of the <item> tags – in which case they will be activated when the 'article' to which they are attached is bought/sold. An action should be contained within this one; it will be performed when this tag is activated.
This functionality is used to mark a codeword when a 'free' item is sold at a market in book 3, or when a particular item is sold at the market in Smogmaw.

item attributes – When an item is bought/sold matching these attributes, this tag will be activated.

*/

export default function Bought({ children, ...others }) {

  return (
    <DefaultNode {...others} nodeType='bought'>{children}</DefaultNode>
  )
}