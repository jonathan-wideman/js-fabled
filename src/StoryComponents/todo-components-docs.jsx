/*
// ===== Less Common Tags ===== //



TODO:
<rest [once="B"] [shards="N"] [stamina="V"]>
Restore some amount of the character's current Stamina. This can be as a one-time Stamina restoration, or at inns and taverns where each paid day of rest will restore some amount of Stamina.

once – whether the action can be triggered once only, or multiple times. Defaults to true if shards is absent, false otherwise.

shards – the amount of Shards to be paid for each 'unit' of Stamina restoration.

stamina – the amount of Stamina to restore. If absent, restores Stamina to its full amount. This may be an integer, a variable name, or a dice expression.



TODO:
<adjust [ability="S" [modifier="S"]] [amount="V"] [codeword="S"] [crew="S"] [god="S"] [greaterthan="V"] [item attributes] [lessthan="V"] [modifier="S"] [name="S"] [profession="S"] [ship="S"] [titleVal="S" [default="N"]] [value="V"]>
Modify a random result. One or more of these can be contained within an action that simulates rolling dice (<random>, <difficulty>, <lose>, <rankcheck>). If the tag 'matches', the value is added to the reuslt.

ability – One of the ability names. This can be used without value or amount being present, in which case the value of the ability will be added to the result.

amount – The amount to add to the result if the tag matches. Identical to value.

codeword – A codeword that must be possessed by the player.

crew – The type of crew on the current ship ('poor', 'average', 'good' or 'excellent').

default – The value to use if the character doesn't have the title given by titleVal.

god – The god that must be worshipped by the character.

greaterthan – If the value given by ability or name are greater than this value, the tag is matched. May be a number or a variable name.

item attributes – An item (or items) that must be possessed by the character for this tag to match.

lessthan – If the value given by ability or name are less than this value, the tag is matched. May be a number or a variable name.

modifier – A modifier to the ability used. This may be 'noweapon', 'noarmour', 'notool' or 'natural'; these exclude (respectively) the ability bonuses of a weapon, armour, a tool, or any of these things. The default is to include these bonuses. 'current', with ability=”stamina”, accesses the current Stamina value.

name – The name of a field or codeword whose value we want to compare against, or use directly.

profession – The profession that the character must belong to.

ship – The type of ship that must be at the current location.

titleVal – The name of the title whose 'value' we want to use (see <tick> for a discussion of title patterns).



TODO:
<itemcache name="S" text="S" [itemlimit="N"] [max="N"] [multiples="N"] [withdrawCharge="F"]>
<moneycache ... >
Define a cache in which the player can leave items and/or money. A <moneycache> can only contain money, while an <itemcache> may contain both. The name of the cache is used as a unique identifier – it may be reused in another section to display the same cache. See also the <tick> tag and its special actions, 'lock' and 'unlock'; also see <exclude> and <include>, affecting which items can be left in the cache.

name – The unique identifier of the cache. For example, 'MerchantBank' is used to refer to the character's money deposited with the merchant's guild.

text – The description of the cache, shown on-screen.

itemlimit – For item caches, the maximum number of items that can be left there.

max – The maximum amount of money that can be left in a cache. Use '0' to bar money from this cache.

multiples – Money can only be deposited in multiples of this amount; for example, a merchant guild's investment uses a value of 100.

withdrawCharge – When withdrawing money, this proportion of the withdrawal will be removed. This is a floating point number (containing a decimal point, between 0 and 1).

<transfer [item attributes] [excluded item attributes] [force="B"] [from="S"] [hidden="B"] [limit="V"] [price="S"] [shards="V"] [to="S"]>
Transfer items or money between caches and the player. The caches referred to in from and to do not have to exist elsewhere.

item attributes – The item(s) to include in the transfer.

excluded item attributes – The item(s) to exclude from the transfer. The attributes used here are the same as for regular item attributes, but with a leading 'x'. For example, xweapon="*katana" xbonus="1+" would exclude any katana with a bonus of 1 or greater from the transfer. If one or more items are excluded, and no item attributes are present, all items not excluded will be transferred.

force – Whether this action has to be clicked before execution continues. Default is true.

from – The name of the cache from which items should be taken. If absent, items will be taken from the character's possession.

hidden – Whether this action is hidden, and hence automatically activated.

limit – The maximum number of items that can be transferred.

price – If present, the action can only be activated when this flag is clear, and clicking the action will set the flag.

shards – The amount of shards to be transferred by the action.

to – The name of the cache into which items should be deposited. If absent, items will be added to the character's possessions.



TODO:
<adjustmoney [force="B"] [multiply="F"] [name="S"]>
Adjust the money held by the character or in a cache.

force – Whether this action must be activated; defaults to true.

multiply – The amount by which the money should be multiplied, rounding down. This is a floating point number (a positive number, possibly having a decimal point).

name – The name of the cache being affected. If absent, affects the character's Shards. The attribute cache can also be used for the same purpose.



TODO:
<market [buy="B"] [currency="S"] [sell="B"]>
Group a set of articles that can be bought or sold into a table. Usually articles are grouped under a matching <header> tag.

buy – whether any articles can be bought at this market; if so, a 'To buy' column will be included.

currency – the currency used at this market, in the singular. Defaults to Shards; this has only been used with a value of 'Mithral', in book 2.

sell – whether any articles can be sold at this market; if so, a 'To sell' column will be included.



TODO:
<header [type="S"] [header1="S" header2="S" ...]>
Display a row of column headers within a <market> tag. Either the type attribute or a sequence of headerN attributes must be present.

type – One of the predefined header types – one of "ship", "cargo", "armour", "weapon", "magic", "shipsale", or "other".

headerN – Defines a sequence of headers, starting with header1 and increasing the suffix for each subsequent header.



TODO:
<trade [buy="N"] [cargo="S"] [sell="N"] [ship="S" initialCrew="S" [name="S"]]>
Buy and/or sell a ship or its cargo. This is used within a <market> tag, and is arranged as a table with aligned columns. Using matching <header> and <trade> tags is the responsibility of the writer.

buy – The money required to buy the article. If missing, the article cannot be bought; if any articles can be bought at this market, it will display a '–' instead.

cargo – The type of cargo unit that can be bought and sold.

initialCrew – The crew quality of the ship being bought.

name – The name of the ship being bought.

sell – The money awarded if the article is sold. If missing, the article cannot be sold; if any article can be sold at this market, it will display a '–' instead.

ship – The type of ship that can be bought and sold.



TODO:
<buy [cargo="S"] [crew="S"] [force="B"] [flag="S"] [item attributes] [quantity="N"] [shards="N"] [ship="S" [initialCrew="S"] [name="S"]]>
Allow the player to buy an item, cargo, crew or ship.

cargo – The type of cargo unit that can be bought.

crew – The quality of crew that can be bought. The character must have a ship present with crew of the next lowest quality.

force – Whether this action must be executed; the default is false.

flag – The flag that must be set before this action will be enabled; when the action is clicked, this flag will be cleared.

initialCrew – The crew quality of the ship being bought.

item attributes – The item being bought.

name – The name of the ship being bought.

quantity – The number of times this action may be used before being permanently disabled.

shards – The price to be paid, in Shards.

ship – The type of ship that can be bought.



TODO:
<sell [cargo="S"] [item attributes] [price="S"] [quantity="N"] [shards="N"] [ship="S"]>
Allow the player to sell an item, cargo unit, or ship.

cargo – The type of cargo unit that can be sold.

item attributes – The item that can be sold; this match may be inexact, so that any matching items can be sold for this price.

price – The flag that must be clear for this action to be enabled; when the action is clicked, this flag will be set.

quantity – The number of articles that can be sold before the action becomes permanently disabled.

shards – The price that will be given, in Shards.

ship – The quality of ship to be sold.



TODO:
<fight combat="N" defence="N" name="N" stamina="N" [abilityDamaged=”S”] [attackDice=”N”] [fleeAt="N"] [group="S"] [playerDefence=”V”] [playerFirst="B"] [preDamage=”V”] [staminaLost=”S”] [useCache=”S”]>
Set up a fight for the character. This tag should be contained only by the <section> tag, not a <p> tag. The tags <fightround>, <fightdamage> and <flee> all relate to a <fight> tag in the same section.

abilityDamaged – If present, specifies an ability of the character that will be decreased by damage instead of Stamina.

attackDice – The number of dice which the player rolls to attack; the defaults is 2, obviously.

combat – The Combat score of the opponent.

defence – The Defence score of the opponent.

fleeAt – The Stamina score at which the opponent will end the fight.

group – The group to which this fight belongs. All fights in this section with the same group will be simultaneous – that is, the character attacks once, then defends against each attacker. Probably still buggy when combined with other unusual attributes.

name – The name or title of the opponent.

playerDefence – If present, replaces the normal Defence value of the character.

playerFirst – Whether the player has the first attack; defaults to true.

preDamage – An amount of damage that should be immediately inflicted on the opponent (which may kill them before the fight begins).

stamina – The Stamina score of the opponent.

staminaLost – If present, the total damage done to the opponent will be stored in the given codeword.

useCache – The name of a cache which the opponent can use against the character; specifcally, any weapons or armour in that cache. This is useful if the opponent has temporarily taken items from the character.



TODO:
<fightround [pre="B"]>
Contains actions that will occur between each round of the fight. After each attack and defence, all text and actions contained by this tag will be activated in sequence.

pre – whether this tag should be activated before the first round, or only after; defaults to false.



TODO:
<fightdamage [type="add|replace"]>
Contains actions that will occur whenever the opponent hits the character. Usually this contains some action that will do damage of a different form to the player (poison, ability loss, etc).

type – whether the actions occurring here are in addition to, or replace, the regular damage.



TODO:
<flee>
Contains text and actions that can be used in turn if the player chooses to flee an ongoing fight. If one of these tags is present, it will be activated and ready to use when a <fight> commences; after the fight it will be disabled. If there is a <goto> or <choice> tag in the same section with the flee attribute, it will only be activated once all actions within the <flee> tag have been performed.



TODO:
<text>
<desc>
Used to define a description for an action or effect; between the start and end tags there may be text and style tags. <text> may be used by <group> to describe the whole action in the text. Both tags may be present within an <effect> tag - <text> will define what is shown in the section, and <desc> will define what is shown in the list of the item or curse's effects.



TODO:
<resurrection [book="S" section="S"] [flag="S"] [god="S"] [shards="V"] [supplemental=”B”] [text="S"]>
Either allow the character to make or purchase resurrection arrangements, or trigger their existing resurrection. In the former case, both book and section must be present.

book – The book which the character will be sent to when the resurrection is triggered.

flag – The flag that must be set before this resurrection can be bought or triggered; when activated, this flag will be cleared.

god – The god granting this resurrection. If the character worships this god when the resurrection is bought, the resurrection will only remain while the character still worships the same god.

section – The section (in book) which the character will be sent to when the resurrection is triggered.

shards – The price to be paid for the resurrection arrangements.

supplemental – If true, this won't replace any previous arrangement.

text – A description of the resurrection location; the complete description of the resurrection, shown on the Adventure Sheet, includes this, the book title and section.



TODO:
<curse [cumulative="B"] [lift="S"] name="S">
<disease ...>
<poison ...>
A curse, disease or poison inflicted on the character. It usually contains one or more <effect> tags, which will apply while the curse is in place. Curses can be tested for and removed with the curse, disease, or poison attributes, which will define the name of the affected curse (a '?' or '*' matches a single curse or all curses of that type); see <if> and <lose>. A cursed item is done by including a <curse> tag within a <item> tag; the resulting item will remain until the curse is specifically removed.

cumulative – Whether the curse is cumulative. If so, and the curse is added more than once, the ability effect will increase in magnitude. See the <effect> tag.

lift – If present, the player can remove this curse by double-clicking the curse and answering this question in the affirmative. Relies on player's honesty. Currently only used in book 5, section 505.

name – The name of the curse.



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



TODO:
<return [force="B"]>
Return to the last section. This reverses the effect of the last <goto> called, returning to the previous section at the point at which it was left, with all variables intact. Note that the program can't handle two consecutive <return>s.

force – Whether the player must perform this action; defaults to true.

<items group="S" limit="N">
A hidden tag that limits how many items with a matching group attribute can be taken before their actions are disabled.

group – All items with the same group attribute in this section will be affected by the limit.

limit – The number of matching items that can be taken.

Rare & Exotic Tags



TODO:
<field {label="S"|text=”S”} name="S">
Displays the value held in the codeword name (0 if the player doesn't yet have that codeword). This value may be affected elsewhere, in which case the value displayed will change. This is currently used to display the player's status in the Uttaku court, or the current bonus for some Difficulty rolls.

label – The displayed label for the field. The attribute text is equivalent.

name – The codeword to display.



TODO:
<bought [item attributes]>
<sold [item attributes]>
These tags are used to perform a hidden action when a matching article is bought or sold. They may be contained within a <market> tag, in which case the item attributes must be present, so that when a match is bought/sold it will be activated. Alternatively, they may be contained within a sub-tag of <market> - either a <trade> tag or one of the <item> tags – in which case they will be activated when the 'article' to which they are attached is bought/sold. An action should be contained within this one; it will be performed when this tag is activated.
This functionality is used to mark a codeword when a 'free' item is sold at a market in book 3, or when a particular item is sold at the market in Smogmaw.

item attributes – When an item is bought/sold matching these attributes, this tag will be activated.



TODO:
<extrachoice [atbook="S"] [atsection="S"] [book="S"] [key="S"] [remove="S"] [section="S"] [tag="S"] [text=”S”]>
Set up (or remove) an extra choice for the player. Extra choices will appear under the 'Extra Choices' menu when at the appropriate section, and when activated will move the character to a new section (as if it were a <goto>).

atbook – The book which the character must be in for this choice to be activated. Used with atsection.

atsection – The section (in atbook) which the character must be in for this choice to be activated.

book – The book that this choice will jump to. Used with section.

key – The key of this extra choice. Use of a key allows for another choice with the same key to replace it; the extra choice can also be removed with this key.

remove – Remove an existing extra choice. An extra choice with a key that matches this value will be removed.

section – The section (in book) that this choice will jump to.

tag – The section tag that will activate this extra choice. When the character enters a section that has this tag, the extra choice will be activated.

text – Used to define the text shown in the menu item.



TODO:
<h1>, <h2>, <h3>, <h4>
A heading within the text. <h1> is the largest heading, <h4> the smallest. Only used within the rule files (QuickRules.xml and Rules.xml), though it could (theoretically) be used within a section.



TODO:
<image file="S" [book="S"] [title="S"]>
An action that will display an image related to the current section. This is usually a found map or diagram.

book – The book in which the image file is located.

file – The filename of the image file, located within the directory of the current book (or of the given book).

title – The title of the popup window showing the image.



TODO:
<include item attributes>
<exclude item attributes [reason="S"]>
Limit an item cache to allow only certain item types. One or more of these tags can be used within an <itemcache> tag. If no <include> tag is present, it will allow all items not specifically excluded; otherwise an item must match an <include> tag and not match an <exclude> tag.

item attributes – The type of item that can/cannot be left in this cache.

reason – The reason that an item can't be left at this cache; this will be displayed if the player attempts to move a matching excluded item into the cache.



TODO:
<reroll>
Undo the last dice roll that occurred. Equivalent to using a Luck blessing; it must be the very next action that occurs after the dice roll.



TODO:
<sectionview title="S" random="B">
Show a window which will display a random series of sections.

random – The number of random sections that will be shown.

title – The title of the popup window.



TODO:
<while var="S">
Repeatedly activate a block of text and actions, until a variable has been assigned a value. Currently only used in two sections, so it's somewhat under-tested.

var – A variable name. While no value has been assigned to this variable, the block will keep looping.


*/