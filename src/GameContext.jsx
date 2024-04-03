import { React, createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import {
  elementToItem,
  elementToStartingAbilities,
  range,
  sectionTickCodeword,
} from "./helpers";
import { Random } from "random-js";
import { useAtom } from "jotai";
import {
  characterActionsAtom,
  characterBioAtom,
  characterBlessingsAtom,
  characterCharismaAtom,
  characterCodewordsAtom,
  characterCombatAtom,
  characterCursesAtom,
  characterDefenseAtom,
  characterGodAtom,
  characterInventoryAtom,
  characterMagicAtom,
  characterMoneyAtom,
  characterNameAtom,
  characterProfessionAtom,
  characterRankAtom,
  characterRevivesAtom,
  characterSanctityAtom,
  characterScoutingAtom,
  characterStaminaAtom,
  characterThieveryAtom,
  characterTitlesAtom,
  characterVariablesAtom,
} from "./store/character";

const STARTING_BOOK = "book99";
const STARTING_PAGE = "New";

const defaultCharacter = {
  name: undefined,
  profession: undefined,
  // rank: { value: 0, title: undefined },
  rank: 0,
  bio: undefined,
  stamina: { current: 0, max: 0 },
  defense: 0,
  charisma: 0,
  combat: 0,
  magic: 0,
  sanctity: 0,
  scouting: 0,
  thievery: 0,
  money: 0,
  inventory: { max: 12, items: [] },
  titles: [],
  god: undefined,
  blessings: [],
  curses: [],
  revives: [],
  codewords: [],
  actions: [],
  variables: {},
};

const GameContext = createContext();

export function useGameContext() {
  return useContext(GameContext);
}

export function GameProvider({ children }) {
  const rng = new Random(); // uses the nativeMath engine
  rng.d6 = () => rng.die(6);
  rng.sum2d6 = () => rng.dice(6, 2).reduce((sum, current) => (sum += current));

  const [debug, setDebug] = useState(true);
  const [debugVerbose, setDebugVerbose] = useState(true);
  const [debugParserXmlTools, setDebugParserXmlTools] = useState(true);

  const [page, setPage] = useState(STARTING_PAGE);
  const [book, setBook] = useState(STARTING_BOOK);
  const [history, setHistory] = useState([
    { book: STARTING_BOOK, page: STARTING_PAGE },
  ]);
  const [sectionVars, setSectionVars] = useState({});

  const gotoPage = (newPage, newBook = null) => {
    newBook && setBook(newBook);
    setPage(newPage);
    addHistory({ book: newBook ?? book, page: newPage });
  };

  const addHistory = (node) => {
    setHistory([...history, node]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

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
        debug,
        setDebug,
        debugVerbose,
        setDebugVerbose,
        debugParserXmlTools,
        setDebugParserXmlTools,
        rng,
        sectionVars,
        setSectionVars,
        book,
        page,
        history,
        addHistory,
        clearHistory,
        gotoPage,
        storyData,
        adventurerStartingDataText,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
