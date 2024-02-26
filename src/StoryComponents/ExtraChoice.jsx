import React from 'react'
import DefaultNode from "./DefaultNode"

/*

TODO:
<extrachoice [atbook="S"] [atsection="S"] [book="S"] [key="S"] [remove="S"] [section="S"] [tag="S"] [text=”S”]>
Set up (or remove) an extra choice for the player. Extra choices will appear under the 'Extra Choices' menu when at the appropriate section, and when activated will move the character to a new section (as if it were a <goto>).

atbook – The book which the character must be in for this choice to be activated. Used with atsection.

atsection – The section (in atbook) which the character must be in for this choice to be activated.

book – The book that this choice will jump to. Used with section.

key – The key of this extra choice. Use of a key allows for another choice with the same key to replace it; the extra choice can also be removed with this key.

remove – Remove an existing extra choice. An extra choice with a key that matches this value will be removed.

section – The section (in book) that this choice will jump to.

tag – The section tag that will activate this extra choice. When the character enters a section that has this tag, the extra choice will be activated.

text – Used to define the text shown in the menu item.

*/

export default function ExtraChoice({ children, ...others }) {

  return (
    <DefaultNode {...others} nodeType='extrachoice'>{children}</DefaultNode>
  )
}