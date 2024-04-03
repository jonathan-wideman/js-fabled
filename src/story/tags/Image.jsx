import React, { useState } from "react";
import DebugVerboseText from "../meta/DebugVerboseText";
import { bookAtom } from "../../store/book";
import { useAtom } from "jotai";

/*

TODO:
<image file="S" [book="S"] [title="S"]>
An action that will display an image related to the current section. This is usually a found map or diagram.

book – The book in which the image file is located.

file – The filename of the image file, located within the directory of the current book (or of the given book).

title – The title of the popup window showing the image.

JW:
NB. <image> can occur within an <item>. If so, it should display the image when the item is used, rather than in the story text

TODO: make image display prettier

*/

export default function Image({ children, ...others }) {
  const [storeBook] = useAtom(bookAtom);
  const { book, file, title } = others;
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  if (!children) {
    // <image> can occur within an <item>. If so, it should display the image when the item is used, rather than in the story text
    // The only case where this occurs, the image does not have child nodes
    // So, if we do not have child nodes, assume we should not display an image
    // TODO: add the image functionality to the item it would affect
    return (
      <DebugVerboseText>[image {JSON.stringify(others)}]</DebugVerboseText>
    );
  }

  return (
    <>
      <span className={"action"} onClick={toggle}>
        {children}
      </span>
      {open && (
        <img
          src={`books/${storeBook}/${file}`}
          onClick={toggle}
          className="story-image"
        />
      )}
      <DebugVerboseText>[image {JSON.stringify(others)}]</DebugVerboseText>
    </>
  );
}
