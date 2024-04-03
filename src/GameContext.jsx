import { React, createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import { Random } from "random-js";
import { useAtom } from "jotai";
import { bookAtom, pageAtom } from "./store/book";

const GameContext = createContext();

export function useGameContext() {
  return useContext(GameContext);
}

export function GameProvider({ children }) {
  const rng = new Random(); // uses the nativeMath engine
  rng.d6 = () => rng.die(6);
  rng.sum2d6 = () => rng.dice(6, 2).reduce((sum, current) => (sum += current));

  const [book] = useAtom(bookAtom);
  const [page] = useAtom(pageAtom);

  const [sectionVars, setSectionVars] = useState({});

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
        rng,
        sectionVars,
        setSectionVars,
        storyData,
        adventurerStartingDataText,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
