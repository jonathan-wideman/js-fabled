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
  if (get(characterHasCodewordAtom)) {
    return;
  }
  set(characterCodewordsAtom, [...codewords, value]);
});

export const characterRemoveItemAtom = atom(null, (get, set, value) => {
  const inventory = get(characterInventoryAtom);
  if (!get(characterHasItemAtom)) {
    return;
  }
  set(characterInventoryAtom, {
    ...inventory,
    items: inventory.items.filter((item) => item !== value),
  });
});

export const characterRemoveCodewordAtom = atom(null, (get, set, value) => {
  const codewords = get(characterCodewordsAtom);
  // Don't need to update state if the player already doesn't have the codeword
  if (!get(characterHasCodewordAtom)) {
    return;
  }
  set(
    characterCodewordsAtom,
    codewords.filter((codeword) => codeword !== value)
  );
});

// FIXME: replace references to characterHas

// const characterHas = (type, value) => {
//   switch (type) {
//     case "item":
//       // // setCharacter({ ...character, inventory: { ...character.inventory, items: [...character.inventory.items, value] } })
//       // setCharacter({ ...character, inventory: { ...character.inventory, items: character.inventory.items.filter(item => item !== value) } })
//       // // TODO: rough equivalency of items
//       break;

// // Using atomFamily to create a derived atom for a single thing by ID
// const thingByIdAtom = atomFamily((id) => atom((get) => {
//   const things = get(thingsAtom);
//   return things.find(thing => thing.id === id);
//  }));

// FIXME: value
export const characterHasItemAtom = atomFamily((item) =>
  atom((get) => {
    const inventory = get(characterInventoryAtom);
    // TODO: fuzzy equivalency for items, based on multiple properties
    const hasItem = inventory.items.some((i) => i.name === item.name);
    console.log("item", item, "hasItem", hasItem);
    return hasItem;
    // return inventory.items.includes(value);
  })
);
//     case "money":
//       // setCharacter({ ...character, money: Math.max(character.money - value, 0) })
//       break;

// FIXME: value
export const characterHasMoneyAtom = atom((get) => {
  const money = get(characterMoneyAtom);
  return money >= value;
});

//     case "codeword":
//       return character.codewords.includes(value);

// FIXME: value
export const characterHasCodewordAtom = atom((get) => {
  const codewords = get(characterCodewordsAtom);
  return codewords.includes(value);
});

//     default:
//       break;
//   }
// };

// FIXME: reimplement these

// const tickNextSectionBox = (section) => {
//   const s = section ?? page;
//   const max = sectionVars.boxes ?? 0;
//   const ticked = getSectionTickedBoxes(s);
//   if (ticked >= max) {
//     return;
//   }
//   giveCharacter("codeword", sectionTickCodeword(book, s, ticked));
// };

const tickNextSectionBoxAtom = atom(null, (get, set, { section, max }) => {
  // const ticked = getSectionTickedBoxes(section);
  // FIXME: characterCodewordsAtom
  const ticked = get(characterCodewordsAtom);
  if (ticked >= max) {
    return;
  }
  set(characterAddCodewordAtom, sectionTickCodeword(book, s, ticked));
});

// const getSectionTickedBoxes = (section) => {
//   const s = section ?? page;
//   const max = sectionVars.boxes ?? 0;
//   const ticks = range(max).map((box, i) =>
//     characterHas("codeword", sectionTickCodeword(book, s, i))
//   );
//   return ticks.reduce((sum, tick) => (sum += tick ? 1 : 0), 0);
// };
