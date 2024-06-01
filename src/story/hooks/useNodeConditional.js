import { useAtom } from "jotai";
import {
  characterCodewordsAtom,
  characterInventoryAtom,
  isCodewordInCodewords,
  isItemInInventory,
} from "../../store/character";

export function useNodeConditionals(conditionals) {
  const [inventory] = useAtom(characterInventoryAtom);
  const [codewords] = useAtom(characterCodewordsAtom);

  return conditionals.map((conditional) =>
    evaluateConditional(conditional, inventory, codewords)
  );
}

const evaluateConditional = (conditional, inventory, codewords) => {
  const { item, codeword } = conditional;

  // Temp logic for items
  // TODO: finish implementing variations (see docs above)
  const hasItem = item ? isItemInInventory({ name: item }, inventory) : false;
  // Temp logic for codewords+
  // TODO: finish implementing variations (see docs if If element)
  const hasCodeword = codeword
    ? isCodewordInCodewords(codeword, codewords)
    : false;

  // TODO: from docs it seems like this should be an OR by default
  const conditionalResult = hasItem || hasCodeword;

  return conditionalResult;
};
