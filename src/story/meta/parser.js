import { parse } from "@xml-tools/parser";
import { buildAst, accept } from "@xml-tools/ast";

export const xmlAst = (xmlText) => {
  const { cst, tokenVector } = parse(xmlText);
  const xmlDocAst = buildAst(cst, tokenVector);
  // console.log("xmlDocAst", xmlDocAst);
  return xmlDocAst;
};

export const processAst = (ast, visitorCallback) => {
  // accept(ast, visitorCallback);
  return traverseBreadthFirst(ast.rootElement, 0, 0, visitorCallback);
};

export const traverseBreadthFirst = (
  element,
  index,
  depth,
  visitorCallback
) => {
  const children = element.subElements;
  const result = visitorCallback(element);
  if (children.length > 0) {
    // has children
    // for (const child of children) {
    //   traverseBreadthFirst(child, depth + 1, visitorCallback);
    // }
    return {
      node: result,
      children: children.map((child, i) =>
        traverseBreadthFirst(child, i, depth + 1, visitorCallback)
      ),
    };
  } else {
    // no children; this is a leaf node
    return result;
  }
};

// <outcomes> => always seems to relate to a single, default variable from <random> or from <difficulty> or it will have a var
// egs.
// 1:29
// 1:38
// 3:15
// 3:34
// 3:147

// <if>...<elseif>...<else>
// not many examples of nested if
// all seem to have tags as siblings
// egs.
// 2:567
//

// group ??
