import React from "react";
import DebugVerboseText from "../meta/DebugVerboseText";
import { useAtom } from "jotai";
import { characterAddItemAtom } from "../../store/character";
import { formatModifier } from "../../helpers";

/*
TODO:
<item [name="S"] [bonus="N"] [buy="N"] [sell="N"] [tags="S"] [buytags="S"] [group="S"] [quantity="N"] [replace=”S”] [flag=”S”] [profession=”S”]>
<weapon ...>
<armour ...>
<tool ... [ability="S"]>
An item that can be taken by the character. The default text is the complete name of the item. A weapon is an item that can be wielded, one at a time, with a bonus to Combat. A tool is an item that adds a bonus to an ability; only the tool with the best bonus for an ability will be used. A piece of armour can be worn, and gives a bonus to Defence. An item is anything else. If one of these tags is used within a <market> tag, it will be displayed as a row in the market, allowing the item to be bought and sold.

TODO: name – The name of the item. This will be capitalised as necessary, and the relevant ability, bonus and effects will be added when printed. When weapons are bought or sold at a market, this attribute can be missing. A '?' can be used to indicate a single item matching all other supplied attributes; a '*' indicates all items matching the supplied attributes. Occasionally more than one item can be indicated by including multiple item names, each separated by a '|'. For example, in the Aku market you can buy an

<item name="fur cloak|wolf pelt" buy="100" sell="90"/>
which is listed as a 'Fur cloak or wolf pelt'. If the name is of the form “N <thing>s”, where N is a number, the item is treated as N units of the given currency, which may stack with pre-existing amounts of the same currency (eg. Mithrals).

TODO: bonus – The bonus that the item gives. This is either an integer, or a value of the form 'X+' to indicate an item with a bonus greater than or equal to X.

TODO: ability – The ability that the bonus applies to.

TODO: buy – The money required to buy the item.

TODO: sell – The money that the item can be sold for.

TODO: tags – one or more hidden attributes kept with this item, separated by commas. The tag 'keep' indicates that the item won't be removed by wild-card item losses (though a specific name match will remove it).

TODO: buytags – one or more of the usual tags that will be set on this item when sold. An item being sold via this action does not need to possess these tags, but any item bought will have these tags. This is used to mark the free items bought at a market in book 3.

TODO: quantity – The number of items that can be taken before disabling (defaults to 1).

TODO: group – Used with the items tag, when only a limited number of objects can be taken by the character.

TODO: replace – The name of a possession of the character that should be replaced by this item. May have an empty value, in which case the item replaced should have the same name. This can be used to replace a 'harmless' item collected by the player with one having good (or bad) effects.

TODO: flag – Taking this item will clear the matching price flag (and the item cannot be taken until the price flag is set). Sometimes combined with the quantity attribute.

TODO: profession – Only used in the 'Adventurers.xml' file, to indicate an item possessed by the specified profession.

TODO: using – When used within another element, matches only the weapon/armour being wielded/worn by the character. See 2.267 for an example.

An item can be indicated entirely within the attributes of another element (like <if>, <lose>, <choice> and others). In this case the item type (item, weapon, tool or armour) is used to supply the item's name. For example,

<lose weapon="?" bonus="1"/>
is an action that will remove a weapon with a bonus of +1 from the character.
*/

export default function Item({ children, ...others }) {
  const [, addItem] = useAtom(characterAddItemAtom);

  const item = {
    name: others.name,
    type: others.type,
    ability: others.ability,
    bonus: parseInt(others.bonus) || undefined,
  };

  const defaultContent = [
    item.name,
    {
      weapon: " [combat ",
      armor: " [defense ",
      tool: ` [${item.ability} `,
    }[item.type],
    item.bonus ? `${formatModifier(item.bonus)}]` : null,
  ];

  return (
    <a
      className="action"
      onClick={() => {
        addItem(item);
      }}
    >
      <strong>{children ?? defaultContent}</strong>
      {/* <strong>{item.name}</strong> */}
      <DebugVerboseText>[item {JSON.stringify(others)}]</DebugVerboseText>
    </a>
  );
}
