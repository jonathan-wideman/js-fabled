import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { isEquipment, sectionTickCodeword } from "../helpers";

// Bio
export const characterNameAtom = atom(undefined);
export const characterProfessionAtom = atom(undefined);
export const characterRankAtom = atom(0);
export const characterBioAtom = atom(undefined);
// Stats
export const characterStaminaAtom = atom({ current: 0, max: 0 });
export const characterDefenseAtom = atom(0);
export const characterCharismaAtom = atom(0);
export const characterCombatAtom = atom(0);
export const characterMagicAtom = atom(0);
export const characterSanctityAtom = atom(0);
export const characterScoutingAtom = atom(0);
export const characterThieveryAtom = atom(0);
// Posessions
export const characterMoneyAtom = atom(0);
export const characterInventoryAtom = atom({ max: 12, items: [] });
// Titles
export const characterTitlesAtom = atom([]);
// Metaphysical
export const characterGodAtom = atom(undefined);
export const characterBlessingsAtom = atom([]);
export const characterCursesAtom = atom([]);
export const characterRevivesAtom = atom([]);
// Special actions
export const characterActionsAtom = atom([]);
// History
export const characterCodewordsAtom = atom([]);
export const characterVariablesAtom = atom({});

// ============================================================================
// Inventory
// ============================================================================

export const characterDropItem = atom(null, (get, set, item) => {
  const inventory = get(characterInventoryAtom);
  const newItems = inventory.items.filter((i) => i !== item);
  set(characterInventoryAtom, { ...inventory, items: newItems });
});

export const characterEquipItem = atom(null, (get, set, item) => {
  if (!isEquipment(item)) {
    return;
  }

  const inventory = get(characterInventoryAtom);
  const currentEquipment = getEquippedItem(inventory, item.type);

  const newItems = inventory.items.map((i) => {
    if (i === currentEquipment) {
      // this will also handle unequipping if item === currentEquipment
      return { ...i, equipped: undefined };
    } else if (i === item) {
      return { ...i, equipped: true };
    } else {
      return i;
    }
  });

  set(characterInventoryAtom, { ...inventory, items: newItems });
});

const getEquippedItem = (inventory, type) => {
  // assume we can only have one equipped item of each type
  return inventory.items.find((item) => item.type === type && item.equipped);
};

const getBestTool = (inventory, ability) => {
  // find all the tools with a bonus for this ability
  const items = inventory.items.filter(
    (item) => item.type === "tool" && item.ability === ability && item.bonus
  );
  // if we don't have any, return
  if (items.length == 0) {
    return;
  }
  // find the tool with the largest bonus
  const item = items.reduce((prev, current) =>
    prev.bonus > current.bonus ? prev : current
  );
  // an item with no bonus or a negative bonus is not better than nothing
  if (item.bonus <= 0) {
    return;
  }
  // finally, return the best item
  return item;
};

// ============================================================================
// Calculated Stats
// ============================================================================

export const characterCalcualtedDefenseAtom = atom((get) => {
  const details = statDetails(
    "defense",
    get(characterDefenseAtom),
    get(characterInventoryAtom),
    get(characterRankAtom),
    get(characterCalcualtedCombatAtom).value
  );
  return {
    value: sumDetails(details),
    details,
  };
});
export const characterCalcualtedCharismaAtom = atom((get) => {
  const details = statDetails(
    "charisma",
    get(characterCharismaAtom),
    get(characterInventoryAtom)
  );
  return {
    value: sumDetails(details),
    details,
  };
});
export const characterCalcualtedCombatAtom = atom((get) => {
  const details = statDetails(
    "combat",
    get(characterCombatAtom),
    get(characterInventoryAtom)
  );
  return {
    value: sumDetails(details),
    details,
  };
});
export const characterCalcualtedMagicAtom = atom((get) => {
  const details = statDetails(
    "magic",
    get(characterMagicAtom),
    get(characterInventoryAtom)
  );
  return {
    value: sumDetails(details),
    details,
  };
});
export const characterCalcualtedSanctityAtom = atom((get) => {
  const details = statDetails(
    "sanctity",
    get(characterSanctityAtom),
    get(characterInventoryAtom)
  );
  return {
    value: sumDetails(details),
    details,
  };
});
export const characterCalcualtedScoutingAtom = atom((get) => {
  const details = statDetails(
    "scouting",
    get(characterScoutingAtom),
    get(characterInventoryAtom)
  );
  return {
    value: sumDetails(details),
    details,
  };
});
export const characterCalcualtedThieveryAtom = atom((get) => {
  const details = statDetails(
    "thievery",
    get(characterThieveryAtom),
    get(characterInventoryAtom)
  );
  return {
    value: sumDetails(details),
    details,
  };
});

const statDetails = (abilityName, base, inventory, rank = 0, combat = 0) => {
  const bestTool = getBestTool(inventory, abilityName);
  const weapon = getEquippedItem(inventory, "weapon");
  const armor = getEquippedItem(inventory, "armor");

  // TODO: add any current buffs/debuffs

  return [
    abilityName === "defense"
      ? { label: "rank", value: rank }
      : { label: abilityName, value: base },
    abilityName === "combat"
      ? { label: weapon?.name ?? "no weapon", value: weapon?.bonus ?? 0 }
      : undefined,
    abilityName === "defense"
      ? { label: armor?.name ?? "no armor", value: armor?.bonus ?? 0 }
      : undefined,
    bestTool ? { label: bestTool.name, value: bestTool.bonus } : undefined,
    abilityName === "defense" ? { label: "combat", value: combat } : undefined,
  ].filter((detail) => detail !== undefined);
};

const sumDetails = (details) => {
  return details.reduce((sum, detail) => (sum += detail.value), 0);
};

// ============================================================================
// Story Actions
// ============================================================================

export const characterAddItemAtom = atom(null, (get, set, value) => {
  const inventory = get(characterInventoryAtom);
  set(characterInventoryAtom, {
    ...inventory,
    items: [...inventory.items, value],
  });
});

export const characterAdjustMoneyAtom = atom(null, (get, set, value) => {
  set(characterMoneyAtom, get(characterMoneyAtom) + value);
});

export const characterAddCodewordAtom = atom(null, (get, set, value) => {
  const codewords = get(characterCodewordsAtom);
  // Don't need to update state if the player already has the codeword
  // TODO: can we maybe use a helper function instead of atom family?
  if (get(characterHasCodewordAtom(value))) {
    return;
  }
  set(characterCodewordsAtom, [...codewords, value]);
});

// TODO: not tested
export const characterRemoveItemAtom = atom(null, (get, set, value) => {
  const inventory = get(characterInventoryAtom);
  // FIXME: characterHasItemAtom usage is wrong
  // FIXME: also will need to use vague equivalency here for story actions
  if (!get(characterHasItemAtom(item))) {
    return;
  }
  set(characterInventoryAtom, {
    ...inventory,
    items: inventory.items.filter((item) => item !== value),
  });
});

// TODO: not tested
export const characterRemoveCodewordAtom = atom(null, (get, set, value) => {
  const codewords = get(characterCodewordsAtom);
  // Don't need to update state if the player already doesn't have the codeword
  if (!get(characterHasCodewordAtom(value))) {
    return;
  }
  set(
    characterCodewordsAtom,
    codewords.filter((codeword) => codeword !== value)
  );
});

// FIXME: replace references to characterHas

// FIXME: Memory leaks, see https://jotai.org/docs/utilities/family#caveat-memory-leaks
// TODO: Maybe this should be a hook instead, but it would also need a helper function to be used in other atoms
// or it could be done like we do other inventory functions above; just as helper functions rather than atoms or hooks
export const characterHasItemAtom = atomFamily((item) =>
  atom((get) => {
    const inventory = get(characterInventoryAtom);
    // TODO: fuzzy equivalency for items, based on multiple properties
    return inventory.items.some((i) => i.name === item.name);
  })
);

// FIXME: Memory leaks, see https://jotai.org/docs/utilities/family#caveat-memory-leaks
// TODO: Maybe this should be a hook instead, but it would also need a helper function to be used in other atoms
// or it could be done like we do other inventory functions above; just as helper functions rather than atoms or hooks
export const characterHasCodewordAtom = atomFamily((codeword) =>
  atom((get) => {
    const codewords = get(characterCodewordsAtom);
    return codewords.includes(codeword);
  })
);

// // FIXME: extract this to character.js also
// const setupStartingCharacter = (name, profession) => {
//   // TODO: error handling if adventurers file isn't loaded yet
//   // TODO: make parsing more flexible

//   if (!startingCharacterData.isSuccess) {
//     return;
//   }

//   const adventurersData = new DOMParser().parseFromString(
//     startingCharacterData.data,
//     "text/xml"
//   );
//   // console.log(adventurersData)s
//   const staminaMax =
//     parseInt(
//       adventurersData
//         .getElementsByTagName("stamina")?.[0]
//         ?.getAttribute("amount")
//     ) || 0;
//   const rank =
//     parseInt(
//       adventurersData
//         .getElementsByTagName("rank")?.[0]
//         ?.getAttribute("amount")
//     ) || 0;
//   const money =
//     parseInt(
//       adventurersData
//         .getElementsByTagName("gold")?.[0]
//         ?.getAttribute("amount")
//     ) || 0;
//   // const abilities = adventurersData.querySelector(`profession[name="${profession}"]`)?.textContent?.split(' ')
//   const abilities = elementToStartingAbilities(
//     adventurersData.querySelector(`profession[name="${profession}"]`)
//   );

//   const items = Array.from(
//     adventurersData.querySelectorAll(
//       [
//         `weapon[profession="${profession}"]`,
//         `weapon:not([profession])`,
//         `armour[profession="${profession}"]`,
//         `armour:not([profession])`,
//         `armor[profession="${profession}"]`,
//         `armor:not([profession])`,
//         `item[profession="${profession}"]`,
//         `item:not([profession])`,
//       ].join(", ")
//     )
//   ).map((e) => elementToItem(e));
//   // console.log(items)
//   // TODO: only equip single best items
//   const equipped = items.map((item) =>
//     ["weapon", "armor"].includes(item.type)
//       ? { ...item, equipped: true }
//       : item
//   );
//   const extraItems = [
//     // { name: 'compass', type: 'tool', ability: 'scouting', bonus: 1 }
//   ];

//   setCharacterName(name);
//   setCharacterProfession(profession);
//   setCharacterRank(rank);
//   // setCharacterBio();
//   setCharacterStamina({ current: staminaMax, max: staminaMax });
//   // setCharacterDefense();
//   setCharacterCharisma(abilities?.[0]);
//   setCharacterCombat(abilities?.[1]);
//   setCharacterMagic(abilities?.[2]);
//   setCharacterSanctity(abilities?.[3]);
//   setCharacterScouting(abilities?.[4]);
//   setCharacterThievery(abilities?.[5]);
//   setCharacterMoney(money);
//   setCharacterInventory({
//     ...defaultCharacter.inventory,
//     items: [...defaultCharacter.inventory.items, ...equipped, ...extraItems],
//   });
//   // setCharacterTitles();
//   // setCharacterGod();
//   // setCharacterBlessings();
//   // setCharacterCurses();
//   // setCharacterRevives();
//   // setCharacterCodewords();
//   // setCharacterActions();
//   // setCharacterVariables();
// };

// FIXME: migrate ADVENTURER_STARTING_DATA back to parsing from the xml:

const ADVENTURER_STARTING_DATA = {
  Priest: {
    name: "Ignatius the Devout",
    gender: "m",
    abilities: [4, 2, 3, 6, 4, 2],
    stamina: 13,
    rank: 2,
    money: 16,
    items: [
      { name: "leather jerkin", type: "armor", bonus: 1, equipped: true },
      { name: "mace", type: "weapon", equipped: true },
      { name: "map", type: "item" },
    ],
  },
  Mage: {
    name: "Chalor the Exiled One",
    gender: "m",
    abilities: [2, 2, 6, 1, 5, 3],
    stamina: 13,
    rank: 2,
    money: 16,
    items: [
      { name: "leather jerkin", type: "armor", bonus: 1, equipped: true },
      { name: "staff", type: "weapon", equipped: true },
      { name: "map", type: "item" },
    ],
  },
  Rogue: {
    name: "Andriel the Hammer",
    gender: "m",
    abilities: [5, 4, 4, 1, 2, 6],
    stamina: 13,
    rank: 2,
    money: 16,
    items: [
      { name: "leather jerkin", type: "armor", bonus: 1, equipped: true },
      { name: "sword", type: "weapon", equipped: true },
      { name: "map", type: "item" },
    ],
  },
  Troubadour: {
    name: "Marana Fireheart",
    gender: "f",
    abilities: [6, 3, 4, 3, 2, 4],
    stamina: 13,
    rank: 2,
    money: 16,
    items: [
      { name: "leather jerkin", type: "armor", bonus: 1, equipped: true },
      { name: "sword", type: "weapon", equipped: true },
      { name: "map", type: "item" },
    ],
  },
  Warrior: {
    name: "Astariel Skysong",
    gender: "m",
    abilities: [3, 6, 2, 4, 3, 2],
    stamina: 13,
    rank: 2,
    money: 16,
    items: [
      { name: "leather jerkin", type: "armor", bonus: 1, equipped: true },
      { name: "battle-axe", type: "weapon", equipped: true },
      { name: "map", type: "item" },
    ],
  },
  Wayfarer: {
    name: "Liana the Swift",
    gender: "f",
    abilities: [2, 5, 2, 3, 6, 4],
    stamina: 13,
    rank: 2,
    money: 16,
    items: [
      { name: "leather jerkin", type: "armor", bonus: 1, equipped: true },
      { name: "spear", type: "weapon", equipped: true },
      { name: "map", type: "item" },
    ],
  },
};

export const initializeCharacterAtom = atom(null, (get, set, profession) => {
  // FIXME: migrate ADVENTURER_STARTING_DATA back to parsing from the xml:
  const data = ADVENTURER_STARTING_DATA;

  const { name, rank, stamina, money, abilities, items } = data[profession];

  set(characterNameAtom, name);
  set(characterProfessionAtom, profession);
  set(characterRankAtom, rank);
  // setCharacterBio();
  set(characterStaminaAtom, { current: stamina, max: stamina });
  // setCharacterDefense();
  set(characterCharismaAtom, abilities?.[0]);
  set(characterCombatAtom, abilities?.[1]);
  set(characterMagicAtom, abilities?.[2]);
  set(characterSanctityAtom, abilities?.[3]);
  set(characterScoutingAtom, abilities?.[4]);
  set(characterThieveryAtom, abilities?.[5]);
  set(characterMoneyAtom, money);
  set(characterInventoryAtom, { max: 12, items });
  // setCharacterTitles();
  // setCharacterGod();
  // setCharacterBlessings();
  // setCharacterCurses();
  // setCharacterRevives();
  // setCharacterCodewords();
  // setCharacterActions();
  // setCharacterVariables();
});
