import React, { useEffect } from "react";
import Checkbox from "./Checkbox";
import DebugVerboseText from "../meta/DebugVerboseText";
import { useReaderContext } from "../../ReaderContext";
import { range } from "../../helpers";
import { useAtom } from "jotai";
import {
  bookSectionKey,
  sectionTicksAtom,
  sectionVarsAtom,
} from "../../store/section";
import {
  startingCharactersAtom,
  initializeCharacterAtom,
} from "../../store/character";
import { parseStartingCharacters } from "../meta/parser";
import { bookAtom, pageAtom } from "../../store/book";

/*
<section name="S" [dock="S"] [boxes="N"] [profession="S"] [start="B"] [tag="S"] [image=”S”] [todock=”S”]>
The root element for most files.

name – The title displayed at the top of the document. Generally this matches the filename, though it may be longer (eg. for the section describing a starting character)

boxes – The number of checkboxes displayed after the section title.

TODO: dock – The dock location, if cargo is being bought or sold at this location, or the character's current ship is docking here, or a ship will be sailed from here. See goto for related attributes. Any ships with a matching dock will be enabled.

TODO: image – The filename of an image to be displayed in this section. This should be found somewhere in the path defined for this book.

profession – The profession of the starting character being described in this section. This is only used when starting a new game, before the character choice has been finalised.

TODO: start – When true, signals the first section of a new book. Whichever character the player has chosen will be finalised.

tag – One or more tags that identify the 'type' of section, comma-separated. If the player has an extra choice with one of these tags, it will be activated.

TODO: todock – When the character leaves this section, any ships at sea that the character isn't in will be moved to the given dock. This is handy if the player has gained a ship while at sea, since only one can be sailed at a time.
*/

// export default function Section({ children, name, boxes, dock, image, profession, start, tag, todock }) {
export default function Section({ children, name, ...others }) {
  const { startingCharactersQuery } = useReaderContext();
  const [book] = useAtom(bookAtom);
  const [page] = useAtom(pageAtom);
  const [, setSectionVars] = useAtom(sectionVarsAtom);
  const [, initializeCharacter] = useAtom(initializeCharacterAtom);
  const [, setStartingCharacters] = useAtom(startingCharactersAtom);

  // TODO: combine this to a single atom or hook or something
  const [sectionTicks] = useAtom(sectionTicksAtom);
  const ticks = sectionTicks[bookSectionKey(book, page)] ?? 0;

  const { profession, boxes: boxesStr, tag: tagsStr } = others;
  const boxes = parseInt(boxesStr) || undefined;
  const tags = tagsStr?.split(",");

  // If there is a profession, set up the character
  useEffect(() => {
    if (!startingCharactersQuery.isSuccess) return;

    const xmlText = startingCharactersQuery.data;

    if (profession) {
      setStartingCharacters(parseStartingCharacters(xmlText));
      initializeCharacter(profession);
    }
  }, [profession, startingCharactersQuery]);

  useEffect(() => {
    setSectionVars({
      boxes,
      tags, // TODO: activate player extra choices if applicable
    });
  }, []);

  return (
    <div>
      <h2 className="section-title">{name ?? page}</h2>
      {boxes && (
        <div className="section-subtitle">
          {range(boxes).map((box, i) => (
            <Checkbox key={i} active={i < ticks} />
          ))}{" "}
        </div>
      )}
      <DebugVerboseText>
        [section {JSON.stringify({ ...others, name })}]
      </DebugVerboseText>
      <section>{children}</section>
    </div>
  );
}
