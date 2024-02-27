import React from 'react'
import DefaultNode from "./DefaultNode"

/*

TODO:
<curse [cumulative="B"] [lift="S"] name="S">
<disease ...>
<poison ...>
A curse, disease or poison inflicted on the character. It usually contains one or more <effect> tags, which will apply while the curse is in place. Curses can be tested for and removed with the curse, disease, or poison attributes, which will define the name of the affected curse (a '?' or '*' matches a single curse or all curses of that type); see <if> and <lose>. A cursed item is done by including a <curse> tag within a <item> tag; the resulting item will remain until the curse is specifically removed.

cumulative – Whether the curse is cumulative. If so, and the curse is added more than once, the ability effect will increase in magnitude. See the <effect> tag.

lift – If present, the player can remove this curse by double-clicking the curse and answering this question in the affirmative. Relies on player's honesty. Currently only used in book 5, section 505.

name – The name of the curse.

*/

export default function Disease({ children, ...others }) {

  return (
    <DefaultNode {...others} nodeType='disease'>{children}</DefaultNode>
  )
}