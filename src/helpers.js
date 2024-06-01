export const nextPage = (page) => {
  const pageNumber = getPageNumber(page);
  return pageNumber ? `${pageNumber + 1}` : undefined;
};

export const prevPage = (page) => {
  const pageNumber = getPageNumber(page);
  return pageNumber ? `${Math.max(pageNumber - 1, 1)}` : undefined;
};

export const getPageNumber = (page) => {
  const pageNumber = parseInt(page);
  return isNaN(pageNumber) ? undefined : pageNumber;
};

export const elementToItem = (e) => {
  const ignoreAttributes = [
    // TODO: ignore other attributes
    "profession",
  ];
  // lowercase, since this isn't necessarily xml
  let type = e?.tagName?.toLowerCase();
  // exception for uk english
  if (type == "armour") {
    type = "armor";
  }
  let item = {
    ...Object.fromEntries(
      Array.from(e?.attributes)
        .map((a) => [a.name, a.value])
        .filter((a) => !ignoreAttributes.includes(a[0]))
    ),
    type,
  };
  // convert any properties that should be numbers
  // TODO: other properties
  item = {
    ...item,
    bonus: parseInt(item.bonus) || undefined,
  };
  return item;
};

export const elementToStartingAbilities = (e) => {
  const abilities = e?.textContent?.split(" ").map((a) => parseInt(a) || 0);
  return abilities;
};

export const getRankTitle = (rank) =>
  [
    "Outcast",
    "Commoner",
    "Guildmember",
    "Master/Mistress",
    "Gentleman/Lady",
    "Baron/Baroness",
    "Count/Countess",
    "Earl/Viscountess",
    "Marquis/Marchioness",
    "Duke/Duchess",
    "Hero/Heroine",
  ]?.[rank - 1];

export const formatModifier = (value) =>
  value ? (value > 0 ? `+${value}` : `${value}`) : null;

export const isEquipment = (item) => ["weapon", "armor"].includes(item.type);

export const bookFromNumber = (number) =>
  number ? `book${number}` : undefined;
export const sectionCodeword = (book, page) =>
  `${book.replace("book", "")}.${page}`;
export const sectionTickCodeword = (book, page, n) =>
  `${book.replace("book", "")}.${page}[${n}]`;

export const conditionalElements = (condition, ...elements) =>
  condition ? elements : [];

export const range = (n) => [...Array(n)];

// TODO: read from server
export const bookMetadata = {
  book1: { title: "The War-Torn Kingdom" },
  book2: { title: "Cities of Gold and Glory" },
  book3: { title: "Over the Blood-Dark Sea" },
  book4: { title: "Devils & Howling Darkness" },
  book5: { title: "The Court of Hidden Faces" },
  book6: { title: "Lords of the Rising Sun" },
  book7: { title: "The Serpent-King\u2019s Domain" },
  book8: { title: "The Lone and Level Sands" },
  book9: { title: "The Isle of a Thousand Spires" },
  book10: { title: "Legions of the Labyrinth" },
  book11: { title: "The City in the Clouds" },
  book12: { title: "Into The Underworld" },
  book99: { title: "Test Book" },
};

export const getBookTitle = (book) => bookMetadata[book]?.title;
