const trimNewlines = (text) => {
  return text.replaceAll(/[\r\n\t]*/g, "");
};

const condenseSpaces = (text) => {
  return text.replaceAll(/ +/g, " ");
};

// FIXME: this deletes too many whitespaces in certain parts of the text, eg. book 2 section 32
export const cleanWhitespace = (text) => {
  return condenseSpaces(trimNewlines(text));
};
