const condenseNewlines = (text) => {
  return text.replaceAll(/[\r\n\t]+/g, " ");
};

const condenseSpaces = (text) => {
  return text.replaceAll(/ +/g, " ");
};

// TODO: trim may delete too many whitespaces at the beginning or end of the text
export const cleanWhitespace = (text) => {
  return condenseSpaces(condenseNewlines(text)).trim();
};
