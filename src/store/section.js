import { atom } from "jotai";

// these should be reset every time the section changes
export const sectionVarsAtom = atom([]);
// export const sectionTempVarsAtom = atom([]);
export const sectionTicksAtom = atom({});

export const tickNextSectionBoxAtom = atom(
  null,
  (get, set, { book, section, max }) => {
    const sectionTicks = get(sectionTicksAtom);
    const key = bookSectionKey(book, section);
    const ticks = (sectionTicks[key] ?? 0) + 1;
    if (ticks > max) {
      return;
    }
    set(sectionTicksAtom, { ...sectionTicks, [key]: ticks });
  }
);

export const bookSectionKey = (book, section) => `${book}-${section}`;


// const [sectionVars, setSectionVars] = useState({});