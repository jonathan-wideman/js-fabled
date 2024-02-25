import React from 'react'
import DebugVerboseText from '../DebugVerboseText'
import { useGameContext } from '../GameContext'
import { bookFromNumber, getBookTitle } from '../helpers'

/*
<goto section="S" [book="S"] [force="B"] [sail="B"] [visit="B"] [dead=”B”] [flee=”B”] [codeword=”S”] [revisit=”B”] [price/flag=”S”]>
Jumps to another section.


section – The filename (without extension) of the section to turn to. If book isn't present, the default text is 'turn to S', where S is the new section. If the section name is found in the content, it will be shown as bold.

book – The book containing the new section. If this is present, the default text is TODO: 'book title S', where S is the new section. If this book isn't available, the action will be disabled.

TODO: force – If true, this action will block any later ones from execution; if false, the action is optional. The default is true, unless sail is also true.

TODO: sail – If true, requires a ship to be present at this location to be sailed on. Once a single ship is chosen and the action activated, its location will become 'at large'.

TODO: visit – Whether the section being jumped to is one that will be returned from. At the moment this is unnecessary, but is probably good practice.

TODO: dead – Enables the action only if the character's state matches this (ie. if true, the character must be dead to follow this). Defaults to false.

TODO: flee – Flees from the current fight. When the character enters a fight, this will be enabled (unless a <flee> node is also present); it will disabled once the fight is won or lost.

TODO: codeword – The codeword(s) that must be present for this action to be enabled. Multiple codewords must be divided by '|' (meaning OR) or '&' (meaning AND).

TODO: revisit – If the player may immediately <return> to this section, setting this to true means that this goto will stay enabled. For an example, see the docks in Yellowport and Marlock City.

TODO: price – If the indicated price has been 'paid' (or set with a <tick> element), this goto will be disabled. See sections 5.365 or 6.628 for examples.

TODO: flag – If the indicated price has not been paid, this goto will be disabled.
*/

// export default function Goto({ children, section, book, force, sail, visit, dead, flee, codeword, revisit, price, flag }) {
export default function Goto({ children, section, ...others }) {

  const { gotoPage } = useGameContext()

  const { book: bookNumber } = others
  const book = bookFromNumber(bookNumber)
  const bookTitle = getBookTitle(book)

  return (
    // TODO: start with capital only if necessary
    // TODO: internal text replacement
    // TODO: better error handling for missing book title
    <a className='instruction action' onClick={() => gotoPage(section, book)}>{children ?? <>Turn to {book && <>{bookTitle ?? book} </>}{section}</>}<DebugVerboseText>[goto {JSON.stringify({ ...others, section })}]</DebugVerboseText></a>
  )
}