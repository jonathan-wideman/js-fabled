const trimNewlines = (text) => {
  return text.replaceAll(/[\r\n\t]*/g, "");
};
const condenseSpaces = (text) => {
  return text.replaceAll(/ +/g, " ");
};
export const cleanWhitespace = (text) => {
  return condenseSpaces(trimNewlines(text));
};
