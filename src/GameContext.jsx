import { React, createContext, useContext } from "react";
import { useQuery } from "react-query";
import { useAtom } from "jotai";
import { bookAtom, pageAtom } from "./store/book";

const GameContext = createContext();

export function useGameContext() {
  return useContext(GameContext);
}

export function GameProvider({ children }) {
  const [book] = useAtom(bookAtom);
  const [page] = useAtom(pageAtom);

  /* ===== XML Queries ===== */

  const storyData = useQuery(["storyData", book, page], () =>
    fetch(`/books/${book}/${page}.xml`).then((res) => res.text())
  );

  const adventurerStartingDataText = useQuery(
    ["adventurerStartingDataText", book],
    () => fetch(`/books/${book}/Adventurers.xml`).then((res) => res.text())
  );

  return (
    <GameContext.Provider
      value={{
        storyData,
        adventurerStartingDataText,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
