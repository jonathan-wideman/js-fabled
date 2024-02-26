import React from 'react'
import DefaultNode from "./DefaultNode"

/*

TODO:
<image file="S" [book="S"] [title="S"]>
An action that will display an image related to the current section. This is usually a found map or diagram.

book – The book in which the image file is located.

file – The filename of the image file, located within the directory of the current book (or of the given book).

title – The title of the popup window showing the image.

*/

export default function Image({ children, ...others }) {

  return (
    <DefaultNode {...others} nodeType='image'>{children}</DefaultNode>
  )
}