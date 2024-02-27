import React from 'react'
import DefaultNode from "./DefaultNode"

/*

TODO:
<sectionview title="S" random="B">
Show a window which will display a random series of sections.

random – The number of random sections that will be shown.

title – The title of the popup window.

*/

export default function SectionView({ children, ...others }) {

  return (
    <DefaultNode {...others} nodeType='sectionview'>{children}</DefaultNode>
  )
}