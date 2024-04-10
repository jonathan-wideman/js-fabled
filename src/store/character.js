import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { isEquipment } from "../helpers";

const defaultCharacter = {
  name: undefined,
  profession: undefined,
  // rank: { value: 0, title: undefined },
  rank: 0,
  gender: undefined,
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

// Bio
export const characterNameAtom = atom(defaultCharacter.name);
export const characterProfessionAtom = atom(defaultCharacter.profession);
export const characterRankAtom = atom(defaultCharacter.rank);
export const characterGenderAtom = atom(defaultCharacter.gender);
export const characterBioAtom = atom(defaultCharacter.bio);
// Stats
export const characterStaminaAtom = atom(defaultCharacter.stamina);
export const characterDefenseAtom = atom(defaultCharacter.defense);
export const characterCharismaAtom = atom(defaultCharacter.charisma);
export const characterCombatAtom = atom(defaultCharacter.combat);
export const characterMagicAtom = atom(defaultCharacter.magic);
export const characterSanctityAtom = atom(defaultCharacter.sanctity);
export const characterScoutingAtom = atom(defaultCharacter.scouting);
export const characterThieveryAtom = atom(defaultCharacter.thievery);
// Posessions
export const characterMoneyAtom = atom(0);
export const characterInventoryAtom = atom(defaultCharacter.inventory);
// Titles
export const characterTitlesAtom = atom(defaultCharacter.titles);
// Metaphysical
export const characterGodAtom = atom(defaultCharacter.god);
export const characterBlessingsAtom = atom(defaultCharacter.blessings);
export const characterCursesAtom = atom(defaultCharacter.curses);
export const characterRevivesAtom = atom(defaultCharacter.revives);
// Special actions
export const characterActionsAtom = atom(defaultCharacter.actions);
// History
export const characterCodewordsAtom = atom(defaultCharacter.codewords);
export const characterVariablesAtom = atom(defaultCharacter.variables);

// ============================================================================
// Starting Characters
// ============================================================================

export const startingCharactersAtom = atom({});

export const initializeCharacterAtom = atom(null, (get, set, profession) => {
  const data = get(startingCharactersAtom);

  const { name, bio, gender, rank, stamina, money, abilities, items } =
    data[profession];

  set(characterNameAtom, name);
  set(characterProfessionAtom, profession);
  set(characterRankAtom, rank);
  set(characterGenderAtom, gender);
  set(characterBioAtom, bio);
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

// FIXME: Memory leaks, see https://jotai.org/docs/utilities/family#caveat-memory-leaks
// TODO: Maybe this should be a hook instead, but it would also need a helper function to be used in other atoms
// or it could be done like we do other inventory functions above; just as helper functions rather than atoms or hooks
export const characterHasItemAtom = atomFamily((item) =>
  atom((get) => {
    const inventory = get(characterInventoryAtom);
    return isItemInInventory(item, inventory);
  })
);

// FIXME: Memory leaks, see https://jotai.org/docs/utilities/family#caveat-memory-leaks
// TODO: Maybe this should be a hook instead, but it would also need a helper function to be used in other atoms
// or it could be done like we do other inventory functions above; just as helper functions rather than atoms or hooks
export const characterHasCodewordAtom = atomFamily((codeword) =>
  atom((get) => {
    const codewords = get(characterCodewordsAtom);
    return isCodewordInCodewords(codeword, codewords);
  })
);

export const isItemInInventory = (item, inventory) => {
  // TODO: fuzzy equivalency for items, based on multiple properties
  return inventory.items.some((i) => i.name === item.name);
};

export const isCodewordInCodewords = (codeword, codewords) => {
  return codewords.includes(codeword);
};
