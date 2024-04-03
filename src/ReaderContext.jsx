import { React, createContext, useContext } from "react";
import { useQuery } from "react-query";
import { useAtom } from "jotai";
import { bookAtom, pageAtom } from "./store/book";

const ReaderContext = createContext();

export function useReaderContext() {
  return useContext(ReaderContext);
}

export function ReaderProvider({ children }) {
  const [book] = useAtom(bookAtom);
  const [page] = useAtom(pageAtom);

  /* ===== XML Queries ===== */

  const storyQuery = useQuery(["story", book, page], () =>
    fetch(`/books/${book}/${page}.xml`).then((res) => res.text())
  );

  const startingCharactersQuery = useQuery(
    ["startingCharacters", book],
    () => fetch(`/books/${book}/Adventurers.xml`).then((res) => res.text())
  );

  return (
    <ReaderContext.Provider
      value={{
        storyQuery,
        startingCharactersQuery,
      }}
    >
      {children}
    </ReaderContext.Provider>
  );
}
