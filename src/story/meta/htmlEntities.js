export const decodeHTMLEntities = (text) => {
  return text.replaceAll(/&(.*?);/g, (match, p1) => ENTITY_MAP[p1] ?? match);
};

const ENTITY_MAP = {
  amp: "&",
  // "#189": "½", // probably not correct in book text
  // "#191": "¿", // probably not correct in book text
  // "#201": "", // probably not correct in book text; does not exist? // codewords only: "elan", "elite"
  // "#233": "", // probably not correct in book text; does not exist?
  // "#239": "", // probably not correct in book text; does not exist?
  "#8211": "–",
  "#8212": "—",
  "#8216": "‘",
  "#8217": "’",
  "#8220": "“",
  "#8221": "”",
  "#8230": "…",
};

// Ctrl+Shift+F
// &#(?!189)(?!191)(?!201)(?!233)(?!239)(?!8211)(?!8212)(?!8216)(?!8217)(?!8220)(?!8221)(?!8230).*?;

export const obfuscateHTMLEntities = (text) => {
  return text.replaceAll(/&(.*?);/g, "||HTML Entity||$1||");
};

export const deobfuscateHTMLEntities = (text) => {
  return decodeHTMLEntities(
    text.replaceAll(/\|\|HTML Entity\|\|(.*?)\|\|/g, "&$1;")
  );
};
