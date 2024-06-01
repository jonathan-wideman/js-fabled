import React from "react";
import DefaultNode from "./DefaultNode";

/*

TODO:
<effect [ability="S"] [bonus="N"] [divide="N"] [multiplier="N"] [target="N"] [text="S"] [type="aura|wielded|use"] [uses="N"] [verb="S"]>
Define an effect of an item or curse. Effects may modify an ability, apply a temporary boost to an ability, or perform some other action.

ability – The ability which is affected. Usually accompanied by one of bonus, divide or target. Alternatively, if the type is 'use', this may be used as the effect of a 'potion of attribute', which will temporarily raise the ability by one.

bonus – The bonus to apply to ability. This may be positive or negative.

divide – The amount by which the ability is divided.

multiplier – Multiplies the ability bonus. When part of a cumulative curse, the curse may be repeatedly added to the player to increase this value.

target – The value to which the ability is set.

text – A description of the effect, to be displayed with the item or curse. Alternatively, the tag may contain a <desc> tag.

type – Used only on items: the conditions under which the effect occurs. An 'aura' is applied while the item is possessed; if 'wielded', the item must be worn or wielded; otherwise, an item has to be 'used' for its effect to be applied. In this last case the tag should contain one or more actions that will occur.

uses – The number of times that an item can be 'used' before it disappears. If absent, there is no limit.

verb – The description of the way in which an item will be 'used', displayed in the popup menu eg. the character will 'Read' a book, or 'Drink' a potion.

*/

export default function Effect({ children, ...others }) {
  return (
    <DefaultNode {...others} nodeType="effect">
      ({children})
    </DefaultNode>
  );
}
