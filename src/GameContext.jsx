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
  const [debugParserXmlToReact, setDebugParserXmlToReact] = useState(true);
  const [debugParserXmlTools, setDebugParserXmlTools] = useState(true);

  const [page, setPage] = useState(STARTING_PAGE);
  const [book, setBook] = useState(STARTING_BOOK);
  const [history, setHistory] = useState([
    { book: STARTING_BOOK, page: STARTING_PAGE },
  ]);
  const [sectionVars, setSectionVars] = useState({});

  const [, setCharacterName] = useAtom(characterNameAtom);
  const [, setCharacterProfession] = useAtom(characterProfessionAtom);
  const [, setCharacterRank] = useAtom(characterRankAtom);
  const [, setCharacterBio] = useAtom(characterBioAtom);
  const [, setCharacterStamina] = useAtom(characterStaminaAtom);
  const [, setCharacterDefense] = useAtom(characterDefenseAtom);
  const [, setCharacterCharisma] = useAtom(characterCharismaAtom);
  const [, setCharacterCombat] = useAtom(characterCombatAtom);
  const [, setCharacterMagic] = useAtom(characterMagicAtom);
  const [, setCharacterSanctity] = useAtom(characterSanctityAtom);
  const [, setCharacterScouting] = useAtom(characterScoutingAtom);
  const [, setCharacterThievery] = useAtom(characterThieveryAtom);
  const [, setCharacterMoney] = useAtom(characterMoneyAtom);
  const [, setCharacterInventory] = useAtom(characterInventoryAtom);
  const [, setCharacterTitles] = useAtom(characterTitlesAtom);
  const [, setCharacterGod] = useAtom(characterGodAtom);
  const [, setCharacterBlessings] = useAtom(characterBlessingsAtom);
  const [, setCharacterCurses] = useAtom(characterCursesAtom);
  const [, setCharacterRevives] = useAtom(characterRevivesAtom);
  const [, setCharacterCodewords] = useAtom(characterCodewordsAtom);
  const [, setCharacterActions] = useAtom(characterActionsAtom);
  const [, setCharacterVariables] = useAtom(characterVariablesAtom);

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

  // FIXME: extract this to character.js also
  const setupStartingCharacter = (name, profession) => {
    // TODO: error handling if adventurers file isn't loaded yet
    // TODO: make parsing more flexible

    if (!startingCharacterData.isSuccess) {
      return;
    }

    const adventurersData = new DOMParser().parseFromString(
      startingCharacterData.data,
      "text/xml"
    );
    // console.log(adventurersData)s
    const staminaMax =
      parseInt(
        adventurersData
          .getElementsByTagName("stamina")?.[0]
          ?.getAttribute("amount")
      ) || 0;
    const rank =
      parseInt(
        adventurersData
          .getElementsByTagName("rank")?.[0]
          ?.getAttribute("amount")
      ) || 0;
    const money =
      parseInt(
        adventurersData
          .getElementsByTagName("gold")?.[0]
          ?.getAttribute("amount")
      ) || 0;
    // const abilities = adventurersData.querySelector(`profession[name="${profession}"]`)?.textContent?.split(' ')
    const abilities = elementToStartingAbilities(
      adventurersData.querySelector(`profession[name="${profession}"]`)
    );

    const items = Array.from(
      adventurersData.querySelectorAll(
        [
          `weapon[profession="${profession}"]`,
          `weapon:not([profession])`,
          `armour[profession="${profession}"]`,
          `armour:not([profession])`,
          `armor[profession="${profession}"]`,
          `armor:not([profession])`,
          `item[profession="${profession}"]`,
          `item:not([profession])`,
        ].join(", ")
      )
    ).map((e) => elementToItem(e));
    // console.log(items)
    // TODO: only equip single best items
    const equipped = items.map((item) =>
      ["weapon", "armor"].includes(item.type)
        ? { ...item, equipped: true }
        : item
    );
    const extraItems = [
      // { name: 'compass', type: 'tool', ability: 'scouting', bonus: 1 }
    ];

    setCharacterName(name);
    setCharacterProfession(profession);
    setCharacterRank(rank);
    // setCharacterBio();
    setCharacterStamina({ current: staminaMax, max: staminaMax });
    // setCharacterDefense();
    setCharacterCharisma(abilities?.[0]);
    setCharacterCombat(abilities?.[1]);
    setCharacterMagic(abilities?.[2]);
    setCharacterSanctity(abilities?.[3]);
    setCharacterScouting(abilities?.[4]);
    setCharacterThievery(abilities?.[5]);
    setCharacterMoney(money);
    setCharacterInventory({
      ...defaultCharacter.inventory,
      items: [...defaultCharacter.inventory.items, ...equipped, ...extraItems],
    });
    // setCharacterTitles();
    // setCharacterGod();
    // setCharacterBlessings();
    // setCharacterCurses();
    // setCharacterRevives();
    // setCharacterCodewords();
    // setCharacterActions();
    // setCharacterVariables();
  };

  /* ===== XML Queries ===== */

  const storyData = useQuery(["storyData", book, page], () =>
    fetch(`/books/${book}/${page}.xml`).then((res) => res.text())
  );

  const startingCharacterData = useQuery(["startingCharacterData", book], () =>
    fetch(`/books/${book}/Adventurers.xml`).then((res) => res.text())
  );

  return (
    <GameContext.Provider
      value={{
        debug,
        setDebug,
        debugVerbose,
        setDebugVerbose,
        debugParserXmlToReact,
        setDebugParserXmlToReact,
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
        setupStartingCharacter,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
