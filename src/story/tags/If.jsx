import React, { useMemo } from "react";
import DefaultNode from "./DefaultNode";
import { useAtom } from "jotai";
import {
  characterHasCodewordAtom,
  characterHasItemAtom,
} from "../../store/character";

/*
TODO:
<if [ability="S" [modifier="S"]] [blessing="S"] [book="S"] [cache="S"] [cargo="S"] [codeword="S"] [crew="S"] [curse|poison|disease="S"] [dead="B"] [docked="S"] [equals="V"] [gender="M/F"] [god="S"] [greaterthan="V"] [item attributes] [lessthan="V"] [name="S"] [not="B"] [profession="S"] [resurrection="B"] [shards="V"] [ship="S"] [ticks="N"] [title="S"] [var="S"]>
<elseif ... >
<else>
Test whether any one of the conditions defined by the attributes are met; if so, the text and actions between the start and end tag will be activated. If the conditions in a leading <if> tag are not met, any following <elseif> tags will be tested until one matches. A final <else> tag (without attributes) will match if all preceding tags have failed to. <if>s may be nested, though I'd advise keeping it simple.

ability – An ability value to be tested against (see equals, lessthan and greaterthan). See also modifier, which affects the ability value.

blessing – Test whether the character possesses the given blessing.

book – Test whether the system can find the given book.

cache – If present, the name of the cache location of which any item or shards tested.

cargo – Test whether a ship at the current location has the given cargo. A '?' may be used to test for any cargo. See also docked.

codeword – Test whether the character has the given codeword. Multiple codewords may be given, separated by '|' or '&', to indicate a logical OR or AND respectively. If one of the codewords is found in the enclosed text, it will rendered in italics.

curse|poison|disease – Test whether the character has a curse with the given name. A '?' will test for any curse of the given type.

crew – Test whether a ship at the current location has a crew of this quality. See also docked.

dead – If true, test whether the character is dead (current stamina at zero, or natural score of any ability at zero); if false, the opposite.

docked – Matches a ship at the given location, rather than at the current location. Used in combination with cargo, crew or ship to match a ship at this location; if these are missing, tests for the presence of any ship at this dock.

equals – Test whether a number is equal to the value given by this attribute (a number or variable). Only one of equals, greaterthan or lessthan must be successful. The value being tested is given by ability, name or var. The number of items matched by the item attributes may also be tested against.

gender – Test the gender of the character ('m' or 'M' for male, 'f' or 'F' for female).

god – Test whether the character worships the given god. May be '*' to test whether the character worships any god.

greaterthan – Tests whether a number is greater than the value given by this attribute (a number or variable). See equals.

item attributes – Tests whether the character possesses the given item. If cache is present, the items matched must be in the named cache. See also equals.

lessthan – Tests whether a number is less than the value given by this attribute (a number or variable). See equals.

modifier – A modifier to any ability given by ability. This may be 'noweapon', 'noarmour', 'notool' or 'natural'; these exclude (respectively) the ability bonuses of a weapon, armour, a tool, or any of these things. The default is to include these bonuses.

name – Compares the value held by the codeword of this name. See equals.

not – If true, reverses the result of the tag; the tag will only match if all tests fail.

profession – Tests whether the character belongs to the given profession.

resurrection – Tests whether the character has any resurrection arrangements.

shards – Tests whether the character has at least this number of Shards. If cache is present, the Shards must be in the named cache.

ship – Tests whether there is a ship of the given type at the current location. See also docked.

ticks – Tests whether this section has this number of ticks.

title – Tests whether the character has the given title. Multiple titles may be tested for, separated by '|' or '&' to test for logical OR or AND respectively.

var – Tests whether the value held in this variable matches any comparisons. See equals.

*/

export default function If({ children, ...others }) {
  // Temp logic for items
  // TODO: finish implementing variations (see docs above)
  const { item: itemName } = others;
  const item = useMemo(() => ({ name: itemName }), [itemName]);
  const [hasItem] = useAtom(characterHasItemAtom(item));

  // Temp logic for codewords
  // TODO: finish implementing variations (see docs above)
  const { codeword } = others;
  const [hasCodeword] = useAtom(characterHasCodewordAtom(codeword));

  // TODO: from docs it seems like this should be an OR by default
  const conditionalResult = hasItem || hasCodeword;

  return (
    <DefaultNode {...others} nodeType="if">
      <span>{conditionalResult ? "☑" : "☐"}</span>
      {children}
    </DefaultNode>
  );
}
