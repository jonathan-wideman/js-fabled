import { parse } from "@xml-tools/parser";
import { buildAst, accept } from "@xml-tools/ast";

export const xmlAst = (xmlText) => {
  const { cst, tokenVector } = parse(xmlText);
  const xmlDocAst = buildAst(cst, tokenVector);
  // console.log("xmlDocAst", xmlDocAst);
  return xmlDocAst;
};

export const processAst = (ast, visitorCallback) => {
  accept(ast, visitorCallback);
};
