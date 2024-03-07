import { parse } from "@xml-tools/parser";
import { buildAst, accept } from "@xml-tools/ast";
import converters from "./converters";
import React, { createElement } from "react";
import { decodeHTMLEntities } from "./htmlEntities";

const obfuscateHTMLEntities = (text) => {
  return text.replaceAll(/&(.*?);/g, "||HTML Entity||$1||");
};
const deobfuscateHTMLEntities = (text) => {
  return decodeHTMLEntities(
    text.replaceAll(/\|\|HTML Entity\|\|(.*?)\|\|/g, "&$1;")
  );
};

export const xmlAst = (xmlText) => {
  // console.log("xmlText", xmlText);
  // const { cst, tokenVector } = parse(xmlText);
  const replacedHTMLEntities = obfuscateHTMLEntities(xmlText);
  const { cst, tokenVector } = parse(replacedHTMLEntities);
  // console.log('cst', cst)
  const xmlDocAst = buildAst(cst, tokenVector);
  console.log("xmlDocAst", xmlDocAst);
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
  const data = null;
  const result = visitorCallback(element, index, depth, data);
  if (children.length > 0) {
    // has children
    // for (const child of children) {
    //   traverseBreadthFirst(child, depth + 1, visitorCallback);
    // }
    // return {
    //   node: result,
    //   children: children.map((child, i) =>
    //     traverseBreadthFirst(child, i, depth + 1, visitorCallback)
    //   ),
    // };

    // const childrenResults = children.map((child, i) =>
    //   traverseBreadthFirst(child, i, depth + 1, visitorCallback)
    // );
    // return { ...result, children: childrenResults };

    // const childElements = children.map((child, i) =>
    //   traverseBreadthFirst(child, i, depth + 1, visitorCallback)
    // );

    const childElements = [...element.subElements, ...element.textContents]
      .filter(
        (el) => el.type === "XMLElement" || reservedTrim(el?.text).length > 0
      )
      .toSorted((a, b) => a.position.startOffset - b.position.startOffset)
      .map((el, i) =>
        el.type === "XMLElement" ? (
          traverseBreadthFirst(el, i, depth + 1, visitorCallback)
        ) : (
          <React.Fragment key={`text-${depth}-${index}-${i}`}>
            {reservedTrim(deobfuscateHTMLEntities(el.text))}
          </React.Fragment>
        )
      );
    // return createElement(result.type, result.props, ...childElements);\
    // console.log("result", result, childElements)
    return createElement(result.type, result.props, childElements);
  } else {
    // no children; this is a leaf node
    // return result;
    // console.log(element.textContents);
    const textChildren = element.textContents
      .filter((el) => reservedTrim(deobfuscateHTMLEntities(el.text)).length > 0)
      .map((el, i) => (
        <React.Fragment key={`text-${depth}-${index}-${i}`}>
          {reservedTrim(deobfuscateHTMLEntities(el.text))}
        </React.Fragment>
      ));
    return createElement(
      result.type,
      result.props,
      textChildren.length > 0 ? textChildren : undefined
    );
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

// Special text characters like quotes
// egs.
// 2:449

export const visitElement = (
  node,
  index,
  depth,
  // converters,
  data
) => {
  if (!node) {
    return null;
  }

  const {
    name: tagName,
    // type: nodeType,
  } = node;

  //   // if this is a text node
  //   if (nodeType === 3) {
  //     return node.nodeValue;
  //   }

  if (!tagName) {
    return null;
  }

  const converter = converters[tagName];

  if (typeof converter !== "function") {
    return null;
  }

  const attributes = getAttributes(node);
  // const attributes = {};

  const { type, props } = converter(attributes, data);
  const newProps = Object.assign({}, { key: `node-${index}` }, props);
  // const newProps = {};

  // const children = getChildren(node);
  // const visitChildren = (child, childIndex) => visitNode(child, childIndex, converters, data);
  // const childElements = children.map(visitChildren);
  // const childElements = [];

  // instead, we could return the hydrated converter and let the traverser create the react elements
  // return createElement(type, newProps, ...childElements);

  return { type, props: newProps };
};

// export function visitNode(node, index, converters, data) {
//   if (!node) {
//     return null;
//   }

//   const { tagName, nodeType } = node;

//   // if this is a text node
//   if (nodeType === 3) {
//     return node.nodeValue;
//   }

//   if (!tagName) {
//     return null;
//   }

//   const converter = converters[tagName];

//   if (typeof converter !== 'function') {
//     return null;
//   }

//   const attributes = getAttributes(node);
//   const { type, props } = converter(attributes, data);
//   const newProps = Object.assign({}, { key: index }, props);

//   const children = getChildren(node);
//   const visitChildren = (child, childIndex) => visitNode(child, childIndex, converters, data);
//   const childElements = children.map(visitChildren);

//   return createElement(type, newProps, ...childElements);
// }

export function getAttributes(node) {
  if (!node) {
    return {};
  }

  const { attributes } = node;

  if (!attributes || !attributes.length) {
    return {};
  }

  // return attributes.reduce((prev, cur) => prev[cur.key] = cur.value, {})

  const result = {};

  Array.from(attributes).forEach(({ key, value }) => {
    // result[key] = value;
    result[key] = deobfuscateHTMLEntities(value);
  });
  // .forEach(({ name, value }) => {
  //   result[name] = value;
  // });

  return result;
}

const reservedTrim = (text) => {
  return text.replaceAll(/[\r\n\t]*/g, "").replaceAll(/ +/g, " ");
};
