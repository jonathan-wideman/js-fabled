import { atom } from "jotai";

// const STARTING_BOOK = "book99";
// const STARTING_PAGE = "New";
const STARTING_BOOK = "book1";
const STARTING_PAGE = "10";

export const bookAtom = atom(STARTING_BOOK);
export const pageAtom = atom(STARTING_PAGE);
export const historyAtom = atom([{ book: STARTING_BOOK, page: STARTING_PAGE }]);

export const addHistoryAtom = atom(null, (get, set, node) => {
  set(historyAtom, [...get(historyAtom), node]);
});

export const clearHistoryAtom = atom(null, (get, set) => {
  const node = {
    book: get(bookAtom),
    page: get(pageAtom),
  };
  set(historyAtom, [node]);
});

export const popHistoryAtom = atom(null, (get, set) => {
  set(historyAtom, get(historyAtom).slice(0, -1));
});

export const gotoPageAtom = atom(null, (get, set, { book, page }) => {
  set(bookAtom, book);
  set(pageAtom, page);
  set(addHistoryAtom, { book, page });
});
