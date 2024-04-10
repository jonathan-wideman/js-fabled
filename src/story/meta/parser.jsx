import { parse } from "@xml-tools/parser";
import { buildAst, accept } from "@xml-tools/ast";
import converters from "./converters";
import React, { createElement } from "react";
import { cleanWhitespace } from "./stringUtils";
import { obfuscateHTMLEntities, deobfuscateHTMLEntities } from "./htmlEntities";

export const xmlAst = (xmlText, shouldEncodeHTMLEntities = true) => {
  const { cst, tokenVector } = parse(
    shouldEncodeHTMLEntities ? obfuscateHTMLEntities(xmlText) : xmlText
  );
  return buildAst(cst, tokenVector);
};

export const preProcessAst = (node, index, depth) => {
  const children = [...node.subElements];

  const conditionalNodes = children.filter((el) =>
    ["if", "elseif", "else"].includes(el.name)
  );

  // FIXME: preProcessAst should not modify tree
  let priorConditionals = [];
  for (const c of conditionalNodes) {
    switch (c.name) {
      case "if":
        priorConditionals = [c];
        break;

      case "elseif":
        priorConditionals.push(c);
        c.priorConditionals = [...priorConditionals];
        break;

      case "else":
        c.priorConditionals = [...priorConditionals];
        break;

      default:
        break;
    }
  }

  return {
    ...node,
    subElements: children.map((el, i) => preProcessAst(el, i, depth + 1)),
  };
};

// ============================================================================
// Story Parsing
// ============================================================================

export const processAst = (ast, visitorCallback) => {
  // accept(ast, visitorCallback);
  return traverseBreadthFirst(ast.rootElement, 0, 0, visitorCallback);
};

/**
 * Traverses a tree breadth-first starting from a given node, calling a visitor callback on each node.
 *
 * @param {object} node - The starting node of the traversal.
 * @param {number} index - The index of the node.
 * @param {number} depth - The depth of the current node in the tree.
 * @param {function} visitorCallback - The callback function to be called on each node.
 * @return {element} The root element of the tree after traversal.
 */
export const traverseBreadthFirst = (node, index, depth, visitorCallback) => {
  const hasChildren = node.subElements.length > 0;
  const childrenAndText = [...node.subElements, ...node.textContents];

  const converter = visitorCallback(node, index, depth);

  const children = childrenAndText
    .filter(
      (el) => el.type === "XMLElement" || cleanWhitespace(el?.text).length > 0
    )
    .toSorted((a, b) => a.position.startOffset - b.position.startOffset)
    .map((el, i) =>
      el.type === "XMLElement" ? (
        traverseBreadthFirst(el, i, depth + 1, visitorCallback)
      ) : (
        <React.Fragment key={`text-${depth}-${index}-${i}`}>
          {cleanWhitespace(deobfuscateHTMLEntities(el.text))}
        </React.Fragment>
      )
    );
  return createElement(
    converter.type,
    converter.props,
    children.length > 0 ? children : undefined
  );
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

/**
 * Visits an XML element node and returns a converter function and props that will produce a React element.
 *
 * @param {Object} node - The XML element node to visit.
 * @param {number} index - The index of the element node in its parent.
 * @param {number} depth - The depth of the element node in the XML tree.
 * @param {Object} data - Additional data to be passed to the converter function.
 * @return {Object|null} The converter function and props, or null if the element node has no name or no converter function is found.
 */
export const visitElement = (node, index, depth, data) => {
  if (!node.name) return null;

  const converter = converters[node.name];
  if (typeof converter !== "function") return null;

  const attributes = xmlNodeAttributes(node);
  // TODO: this should probably be cleaner
  const extraConditionals = node.priorConditionals?.map((c) =>
    xmlNodeAttributes(c)
  );
  const attrs =
    extraConditionals?.length > 0
      ? { ...attributes, extraConditionals }
      : attributes;
  const { type, props } = converter(attrs, data);
  const key = `node-${index}`;

  return { type, props: { ...props, key } };
};

/**
 * Extracts the attributes from an XML node and returns them as an object.
 *
 * @param {Object} node - The XML node to extract attributes from.
 * @return {Object} - An object containing the extracted attributes, with the attribute keys as object keys and the attribute values as object values.
 */
export function xmlNodeAttributes(node) {
  const attributes = node.attributes || [];
  const result = {};

  Array.from(attributes).forEach(({ key, value }) => {
    result[key] = deobfuscateHTMLEntities(value);
  });

  return result;
}

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

//   const attributes = xmlNodeAttributes(node);
//   const { type, props } = converter(attributes, data);
//   const newProps = Object.assign({}, { key: index }, props);

//   const children = getChildren(node);
//   const visitChildren = (child, childIndex) => visitNode(child, childIndex, converters, data);
//   const childElements = children.map(visitChildren);

//   return createElement(type, newProps, ...childElements);
// }

// ============================================================================
// Starting Character Parsing
// ============================================================================

const nodeAttributeValue = (node, key) => {
  return node.attributes.find((a) => a.key === key)?.value;
};

const nodeByProfessionAttribute = (nodes, profession) => {
  return nodes.find(
    (node) => nodeAttributeValue(node, "profession") === profession
  );
};

const nodeByNameAttribute = (nodes, name) => {
  return nodes.find((node) => nodeAttributeValue(node, "name") === name);
};

const filterNodesByProfession = (nodes, profession) => {
  return nodes.filter((node) => {
    const prof = nodeAttributeValue(node, "profession");
    // Items that don't have a profession attribute are for anyone
    return !prof || prof === profession;
  });
};

export const parseStartingCharacters = (xmlText) => {
  const ast = xmlAst(xmlText);

  const abilityNodes = ast.rootElement.subElements[0].subElements.slice(1);
  const staminaNode = ast.rootElement.subElements[1];
  const rankNode = ast.rootElement.subElements[2];
  const moneyNode = ast.rootElement.subElements[3];
  const allItemNodes = ast.rootElement.subElements[4].subElements;
  const bioNodes = ast.rootElement.subElements[5].subElements;

  const professions = bioNodes.map((node) =>
    nodeAttributeValue(node, "profession")
  );

  const data = Object.fromEntries(
    professions.map((profession) => {
      const bioNode = nodeByProfessionAttribute(bioNodes, profession);
      const abilityNode = nodeByNameAttribute(abilityNodes, profession);
      const itemNodes = filterNodesByProfession(allItemNodes, profession);
      return [
        profession,
        {
          name: nodeAttributeValue(bioNode, "name"),
          gender: nodeAttributeValue(bioNode, "gender").toUpperCase(),
          bio: bioNode.textContents
            .map((node) => cleanWhitespace(node.text))
            .join(""),
          abilities: abilityNode.textContents[0].text
            .split(" ")
            .map((a) => parseInt(a)),
          stamina: parseInt(nodeAttributeValue(staminaNode, "amount")),
          rank: parseInt(nodeAttributeValue(rankNode, "amount")),
          money: parseInt(nodeAttributeValue(moneyNode, "amount")),
          items: itemNodes.map((node) => ({
            name: nodeAttributeValue(node, "name"),
            // UK to US english
            type: node.name.replace("armour", "armor"),
            bonus: parseInt(nodeAttributeValue(node, "bonus")) || undefined,
            // TODO: only equip first item of each type
            equipped: ["weapon", "armor"].includes(
              node.name.replace("armour", "armor")
            )
              ? true
              : undefined,
          })),
        },
      ];
    })
  );

  return data;
};
