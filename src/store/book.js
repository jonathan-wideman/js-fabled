import { atom } from "jotai";

const STARTING_BOOK = "book99";
const STARTING_PAGE = "New";

export const bookAtom = atom(STARTING_BOOK);
export const pageAtom = atom(STARTING_PAGE);
export const historyAtom = atom([{ book: STARTING_BOOK, page: STARTING_PAGE }]);

export const addHistoryAtom = atom(null, (get, set, node) => {
  set(historyAtom, [...get(historyAtom), node]);
});

export const clearHistoryAtom = atom(null, (get, set) => {
  set(historyAtom, []);
});

export const gotoPageAtom = atom(null, (get, set, { book, page }) => {
  console.log("gotoPageAtom", { book, page });
  set(bookAtom, book);
  set(pageAtom, page);
  set(addHistoryAtom, { book, page });
});
