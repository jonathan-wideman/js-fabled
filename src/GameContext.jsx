import {
  React,
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useQuery } from "react-query";
import XMLToReact from "@condenast/xml-to-react";
import {
  elementToItem,
  elementToStartingAbilities,
  getEquippedItem,
  isEquipment,
  range,
  sectionTickCodeword,
} from "./helpers";
import { Random } from "random-js";

const STARTING_BOOK = "book2";
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

  const [character, setCharacter] = useState({ ...defaultCharacter });
  const [page, setPage] = useState(STARTING_PAGE);
  // const [page, setPage] = useState('Test')
  // const [page, setPage] = useState('1')
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

    setCharacter({
      ...defaultCharacter,
      name,
      profession,
      // rank: { value: rankValue, title: undefined },
      rank,
      // bio: undefined,
      stamina: { current: staminaMax, max: staminaMax },
      // defense: 0,
      charisma: abilities?.[0],
      combat: abilities?.[1],
      magic: abilities?.[2],
      sanctity: abilities?.[3],
      scouting: abilities?.[4],
      thievery: abilities?.[5],
      money,
      inventory: {
        ...defaultCharacter.inventory,
        items: [
          ...defaultCharacter.inventory.items,
          ...equipped,
          ...extraItems,
        ],
      },
      // titles: [],
      // god: undefined,
      // blessings: [],
      // curses: [],
      // revives: [],
      // codewords: [],
      // actions: [],
      // variables: {}
    });
  };

  const giveCharacter = (type, value) => {
    switch (type) {
      case "item":
        setCharacter({
          ...character,
          inventory: {
            ...character.inventory,
            items: [...character.inventory.items, value],
          },
        });
        break;

      case "money":
        setCharacter({ ...character, money: character.money + value });
        break;

      case "codeword":
        if (character.codewords.includes(value)) {
          return;
        }
        setCharacter({
          ...character,
          codewords: [...character.codewords, value],
        });
        break;

      default:
        break;
    }
  };

  const takeCharacter = (type, value) => {
    switch (type) {
      case "item":
        // setCharacter({ ...character, inventory: { ...character.inventory, items: [...character.inventory.items, value] } })
        setCharacter({
          ...character,
          inventory: {
            ...character.inventory,
            items: character.inventory.items.filter((item) => item !== value),
          },
        });
        // TODO: rough equivalency of items
        break;

      case "money":
        setCharacter({
          ...character,
          money: Math.max(character.money - value, 0),
        });
        break;

      case "codeword":
        if (!character.codewords.includes(value)) {
          return;
        }
        setCharacter({
          ...character,
          codewords: character.codewords.filter(
            (codeword) => codeword !== value
          ),
        });
        break;

      default:
        break;
    }
  };

  const characterHas = (type, value) => {
    switch (type) {
      case "item":
        // // setCharacter({ ...character, inventory: { ...character.inventory, items: [...character.inventory.items, value] } })
        // setCharacter({ ...character, inventory: { ...character.inventory, items: character.inventory.items.filter(item => item !== value) } })
        // // TODO: rough equivalency of items
        break;

      case "money":
        // setCharacter({ ...character, money: Math.max(character.money - value, 0) })
        break;

      case "codeword":
        return character.codewords.includes(value);

      default:
        break;
    }
  };

  const equipCharacter = (item) => {
    if (!isEquipment(item)) {
      return;
    }
    const itemIndex = character.inventory.items.indexOf(item);
    const current = getEquippedItem(character, item.type);
    const currentIndex = character.inventory.items.indexOf(current);
    let newItems = [...character.inventory.items];
    if (itemIndex >= 0) {
      newItems[itemIndex] = { ...item, equipped: true };
    }
    if (currentIndex >= 0) {
      newItems[currentIndex] = { ...current, equipped: undefined };
    }
    setCharacter({
      ...character,
      inventory: { ...character.inventory, items: newItems },
    });
  };

  const tickNextSectionBox = (section) => {
    const s = section ?? page;
    const max = sectionVars.boxes ?? 0;
    const ticked = getSectionTickedBoxes(s);
    if (ticked >= max) {
      return;
    }
    giveCharacter("codeword", sectionTickCodeword(book, s, ticked));
  };

  const getSectionTickedBoxes = (section) => {
    const s = section ?? page;
    const max = sectionVars.boxes ?? 0;
    const ticks = range(max).map((box, i) =>
      characterHas("codeword", sectionTickCodeword(book, s, i))
    );
    return ticks.reduce((sum, tick) => (sum += tick ? 1 : 0), 0);
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
        character,
        book,
        page,
        history,
        addHistory,
        clearHistory,
        gotoPage,
        storyData,
        setupStartingCharacter,
        giveCharacter,
        takeCharacter,
        equipCharacter,
        characterHas,
        tickNextSectionBox,
        getSectionTickedBoxes,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
