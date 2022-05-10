import Section from "./Section"
import Paragraph from "./Paragraph"
import Goto from "./Goto"
import Item from "./Item"
import DefaultNode from "./DefaultNode"
import DebugVerboseText from "./DebugVerboseText"
import Give from "./Give"

const converters = {
    /*
    FLApp - XML Format - Complete List
    This is a long list of all the XML tags that the program uses. I've attempted to give them some semblance of order, rather than just listing them alphabetically. See the accompanying HowTo file for an introduction to the concepts involved. As I said there, I am available for clarification – there are things that may seem obvious to me and hence I haven't explained them clearly (or at all).
    
    For each tag, the list of recognised attributes is given. Square brackets indicate an optional attribute. For the attribute values, a character indicating the value type has been given. A 'B' indicates a boolean value (any string starting with a 't' or 'T' is interpreted as 'true'; any string starting with a 'f' or 'F' is interpreted as 'false'). A 'N' indicates an integer. A 'V' indicates a value, which may be either an integer or the name of a (non-empty) variable. A 'S' indicates some sort of text string – if not explained, it's either an identifier or a description visible to the player.
    */

    // ===== Common tags ===== //
    section: (props) => ({ type: Section, props }),
    p: (props) => ({ type: Paragraph, props }),
    goto: (props) => ({ type: Goto, props }),



    // ===== TEMP ===== //
    item: (props) => ({ type: Item, props: { ...props, type: 'item' } }),
    weapon: (props) => ({ type: Item, props: { ...props, type: 'weapon' } }),
    armor: (props) => ({ type: Item, props: { ...props, type: 'armor' } }),
    armour: (props) => ({ type: Item, props: { ...props, type: 'armor' } }),
    tool: (props) => ({ type: Item, props: { ...props, type: 'tool' } }),

    // choices: (props) => ({ type: 'ul', props }),
    // outcomes: (props) => ({ type: 'ul', props }),
    // table: (props) => ({ type: 'ul', props }), // table?
    choices: (props) => ({ type: ({ children, ...others }) => <><ul>{children}</ul><DebugVerboseText>[choices {JSON.stringify(others)}]</DebugVerboseText></>, props }),
    outcomes: (props) => ({ type: ({ children, ...others }) => <><ul>{children}</ul><DebugVerboseText>[outcomes {JSON.stringify(others)}]</DebugVerboseText></>, props }),
    table: (props) => ({ type: ({ children, ...others }) => <><ul>{children}</ul><DebugVerboseText>[table {JSON.stringify(others)}]</DebugVerboseText></>, props }),

    choice: (props) => ({ type: ({ children, section, ...others }) => <li>{children} <Goto section={section} /><DebugVerboseText>[choice {JSON.stringify({ ...others, section })}]</DebugVerboseText></li>, props }),
    outcome: (props) => ({ type: ({ children, section, ...others }) => <li>{children} <Goto section={section} /><DebugVerboseText>[outcome {JSON.stringify({ ...others, section })}]</DebugVerboseText></li>, props }),

    tick: (props) => ({ type: Give, props }),
    gain: (props) => ({ type: Give, props }),
    lose: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'lose', isAction: true } }),

    if: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'if' } }),
    elseif: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'elseif' } }),
    else: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'else' } }),

    random: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'random', isAction: true } }),
    difficulty: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'difficulty', isAction: true } }),
    rankcheck: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'rankcheck', isAction: true } }),

    // success: (props) => ({ type: ({ children, section }) => <li>{children} <Goto section={section} /></li>, props }),
    // failure: (props) => ({ type: ({ children, section }) => <li>{children} <Goto section={section} /></li>, props }),
    success: (props) => ({ type: ({ children, section, ...others }) => <li>{children ?? 'If you succeed'} <Goto section={section} /><DebugVerboseText>[success {JSON.stringify({ ...others, section })}]</DebugVerboseText></li>, props }),
    failure: (props) => ({ type: ({ children, section, ...others }) => <li>{children ?? 'If you fail'} <Goto section={section} /><DebugVerboseText>[failure {JSON.stringify({ ...others, section })}]</DebugVerboseText></li>, props }),

    group: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'group' } }),

    set: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'set' } }),
    
    training: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'training' } }),

    rest: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'rest' } }),
    
    adjust: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'adjust' } }),
    
    itemcache: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'itemcache' } }),
    moneycache: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'moneycache' } }),

    adjustmoney: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'adjustmoney' } }),

    market: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'market' } }),

    header: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'header' } }),

    trade: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'trade' } }),
    buy: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'buy' } }),
    sell: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'sell' } }),

    fight: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'fight' } }),
    fightround: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'fightround' } }),
    fightdamage: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'fightdamage' } }),
    flee: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'flee' } }),

    text: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'text' } }),
    desc: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'desc' } }),

    resurrection: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'resurrection' } }),

    curse: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'curse' } }),
    disease: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'disease' } }),
    poison: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'poison' } }),

    effect: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'effect' } }),

    return: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'return' } }),

    field: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'field' } }),

    bought: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'bought' } }),
    sold: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'sold' } }),

    extrachoice: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'extrachoice' } }),

    h1: (props) => ({ type: 'h1', props }),
    h2: (props) => ({ type: 'h2', props }),
    h3: (props) => ({ type: 'h3', props }),
    h4: (props) => ({ type: 'h4', props }),

    image: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'image' } }),
    
    'include item attributes': (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'include item attributes' } }),
    'exclude item attributes': (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'exclude item attributes' } }),

    reroll: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'reroll' } }),
    
    sectionview: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'sectionview' } }),
    
    while: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'while' } }),

    i: (props) => ({ type: 'em', props }),
    b: (props) => ({ type: 'strong', props }),

}

export default converters




/*
TODO:
<choices>, <outcomes>, <table>
Groups a set of choices or outcomes. Generally the elements within the table can be mixed, as long as the number of columns matches up.

var – Used only in the <outcomes> element, for a set of outcomes that use the same var and may be repeatedly enabled. See 6.731 for the only (buggy) example.

<choice [box="S"] [god="S"] [item tags] [pay=”B”] [profession="S"] [shards="V" [currency="S"]]>
One of a set of available choices, arranged in a table. Each choice consists of an automatic goto and a description (enclosed by the start and end tag). All attributes used by goto can be present here.

box – The codeword that must be present for this option to be enabled. Changes to the codeword made within the section will immediately affect this option. To show a checkbox as part of the choice description, include the text '{box}'; this will match the codeword state.

currency – The currency of the money indicated by shards. Defaults to 'Shards'.

flee – If true, this option will be enabled when a fight within the section commences, and disabled afterwards.

god – The god that the character must worship to select this option.

item tags – The item that the character must possess to select this option.

pay – Whether the money/item will be removed if the character takes this choice. If shards is present, defaults to true; if an item is present, defaults to false.

profession – The profession that the character must belong to to select this option.

shards – The amount of money the character must have to select this option.

Blessings are specified by the blessing attribute (containing the name of the blessing). As usual, an '*' matches all blessings, and a '?' matches a single one. The possible values:

defence – Defence through Faith. The bonus attribute optionally specifies the Defence bonus (defaults to 3).

disease/poison – Immunity to Disease/Poison.

injury – Immunity to Injury.

luck – Luck.

storm – Safety from Storms.



TODO:
<outcome [blessing="S"] [codeword="S"] [flag="S"] [range="S" [var="S"]] >
Usually one of a set after a dice roll has occurred, with one being enabled. It can also be used to group a block of text and actions, as if it were an if tag. All attributes used by goto can be present here.

blessing – A blessing that must be possessed for this option to enable.

codeword – One or more codewords that must be possessed for this option to enable. Multiple codewords may be combined with '|' or '&', to indicate a logical OR or AND respectively. The default text will be the list of codewords, separated by commas and the appropriate 'or'/'and' before the last codeword.

flag – The flag that must be set for this option to enable. Used in combination with other constraints (range or codewords) for a set of outcomes that can be repeatedly triggered.

range – A dice result range, specified as a single number, a range (X-Y) or two numbers (X,Y). The dice result is gotten from the anonymous variable, unless var is specified.

var – The variable holding the dice result with which range is compared.

Codewords are kept as a set of strings mapping to integers. A codeword is 'present' if it is in the set and maps to any integer other than 0. Tick counts are also kept with the codewords, with a codeword in the form 'book/section' mapping to the number of ticks. An arbitrary 'count' is also kept with the codewords (eg. your status at the Uttaku court).



TODO:
<lose [ability="S" amount="V" [fatal="B"]] [blessing="S" [permanent=”B”]] [cache="S"] [cargo="S"] [codeword="S"] [crew="N"] [curse attributes] [flag="S"] [force="B"] [itemAt=”V”] [price="S"] [resurrection="B"] [shards="V"] [ship="B"] [stamina="S"] [staminato="V"] [item attributes [chance="S"] [multiple="V"]] [title=”S”]>
'Remove' something from the character. Note that multiple actions can be included here, and all will be executed (eg. item="*" shards="*" will remove all shards and items). If the action would do nothing, it remains disabled and execution continues.

ability – The ability to deduct amount from. This may be one of the six abilities, 'stamina', or 'rank'. A '?' lets the player choose which of the six abilities will be affected; a '*' means it affects all six abilities.

amount – The amount to deduct from ability. This may be a number, a variable name, or a dice expression. If an adjustment would reduce the ability to 0 or less this will kill the character (depending on the fatal attribute).

blessing – The blessing(s) to remove from the character. This can be one of the standard types, '?' or '*'.

cache – The name of the money or item cache to remove money and items from.

cargo – The cargo type to remove from the ship. If it's one of the known types, removes all cargo of that type from the current ship. It can also be '?', to remove a single cargo unit of the player's choice, or '*' to remove all cargo.

chance – This is only relevant if item="*" is present; it gives the probability (given as a fraction 'X/Y', between 0 and 1) for each item's removal.

codeword – A codeword to remove from the character. The default text if this is present is 'erase the codeword CODEWORD'. If the codeword is found in the action text, it will be automatically italicised.

crew – An integer 'step' to deduct from the current ship's crew. For example, a value of 1 will downgrade the crew from excellent to good, good to average, or average to poor. A negative value can also be used here to upgrade the crew, which complements the <gain crew="S"> action nicely.

curse attributes – The curse, poison or disease to remove from the character. The name of the curse will be used for the default text, if present.

fatal – Determines whether an adjustment made by ability and amount can kill the character. If true, and an ability would be reduced to 0, current stamina is reduced to 0 instead. Either way, the ability will only be reduced to 1.

flag – The name of the flag that must be set before this action can be activated. Activating the action will clear the flag.

force – Whether this action needs to be activated before execution can continue. Defaults to true.

item attributes – An item (or items) to remove from the character, or an item cache if cache is present. See also the chance and multiple attributes. If present, the default text will be the item description.

itemAt – Removes the item at the given position (from a cache or the character's possession). A '1' indicates the first item, a '2' the second, and so on. Currency will be skipped in this count; items with the 'keep' tag will remain.

multiple – The number of items removed from the character, or an item cache. Generally used with item="?" (or another item type).

permanent – If true, a blessing can be removed even if permanent.

price – The name of the flag that must be clear for this action to be enabled. Activating the action will set the flag (and disable the action).

resurrection – If true, clears the character's resurrection arrangements.

shards – The number of shards to remove from the character, or a cache if cache is present. This may be a number, a variable name, or '*' to indicate all available shards. If cache is present, the shards will be removed from the cache instead. The default text if this is present is 'X Shards'.

ship – If true, removes the 'current' ship (which the character is on, or is at the same location).

stamina – The amount to deduct from current stamina. This may be a number, a variable name, or in the form 'Xd + Y', where X is the number of dice to be rolled and Y is added to the result. The default text if this is present is 'lose X Stamina point(s)'.

staminato – The value to set the current stamina to. This may be a number or a variable name. This may actually restore stamina, if it is currently lower than the value given.

title – The name of a title that the character will lose. This will provide the default text if present.



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



TODO:
<random [dice="N"] [flag="S"] [force="B"] [type=”S”] [var="S"]>
Simulate the roll of a number of dice. The result will be stored in a variable, and execution will continue from this point. This tag may contain a number of <adjust> tags, which modify the result.

dice – The number of dice to roll (defaults to 2). This determines the default text – either 'roll one die', 'roll two dice', or 'roll X dice' for numbers larger than two.

flag – The flag that must be set for this action to enable. When activated, this action doesn't clear the flag; this is usually done by a related <outcome> tag.

force – Whether the player must activate this action to continue; defaults to true.

type – If 'travel', a blessing of Safe Travel may be used to reroll.

var – The variable that the result will be stored in; if missing, the anonymous variable is used.



TODO:
<difficulty ability="S" level="N" [flag="S"] [force="B"] [modifier="S"] [var="S"]>
Handle an ability roll. This rolls two dice, adds the player's ability score, and subtracts the Difficulty of the roll from this. The result is stored in a variable, with a value greater than 0 being a success, and a non-positive result being a failure. The default text is 'make a A roll at Difficulty L', where A is the ability name and L is the Difficulty level. This tag may contain a number of <adjust> tags, which modify the result.

ability – The ability being tested. This can be one or more ability names separated by a '|' character, or '?' to indicate a choice from all six abilities. If only one ability is given, it will be stored in a special variable so that the corresponding <success> and <failure> tags can use it automatically.

flag – The flag that must be set for this action to be enabled. When the action is activated, the flag is cleared.

force – Whether the player must activate this action to continue; defaults to true.

level – The Difficulty level of the roll.

modifier – A modifier to the ability used. This may be 'noweapon', 'noarmour', 'notool', or 'natural'; these exclude (respectively) the ability bonuses of a weapon, armour, a tool, or any of these things. The default is to include these bonuses. A final value, 'current', can be used with ability=”stamina” to make a roll against the current Stamina value.

var – The variable that the result will be stored in; if missing, the anonymous variable is used.



TODO:
<rankcheck [add="N"] [dice="N"] [force="B"] [var="S"]>
Roll one or more dice, comparing the result to the character's Rank ability. 'Success' is counted as rolling less than or equal to Rank; 'failure' is rolling more than Rank. The result can be tested for using the <success> and <failure> tags, as with the <difficulty> action.

add – The number to be added to the dice roll.

dice – The number of dice to roll; defaults to 1. The default text is 'roll one die', 'roll two dice', or 'roll X dice', depending on the value.

force – Whether this action is forced; defaults to true.

var – The variable into which the 'result' is stored. The result, in this case, is the character's Rank plus 1, minus the result of the dice. This means that success is indicated by the result being greater than zero, failure being less than or equal to zero (as for the <difficulty> action).



TODO:
<success [ability="S"] [section="S" [book=”S”]] [var="S"]>
<failure ... >
Handle the results of a <difficulty> or <rankcheck> action. This can either be used as part of a group of choices (within a <outcomes> or <choices> tag) or as an <if> node, containing a block of text and actions. Success is defined by the variable (by default, the anonymous one) containing a value greater than zero; a lower value indicates failure.

ability – The ability that was being tested, used in describing the default text. Usually unnecessary, since the previous <difficulty> action will define the ability being tested.

book – Used with the section attribute, as in a <goto> tag.

section – The section to which the player is directed; used when the tag is part of a group of outcomes.

var – The variable tested for success.



TODO:
<group [force="B"]>
Perform a sequence of actions with one 'click'. The <group> tag should contain one or more action tags, usually preceded by a <text> tag giving the action text. Group tags are tricky; their initial enabled/disabled state is gotten from their first action 'child'; a reroll triggered after the group tag will backtrack to the last child action of the group. Use with care!

force – whether this action must be clicked; defaults to false.



TODO:
<set [cache="S"] [codeword="S"] [dock="S"] [force="B"] [item attributes] [modifier="S"] [value="S"] [var="S"]>
Assign a value to one of the variables held for this section. May also be used to dock a ship. If this action has no text, it will be hidden and automatically executed.

cache – The name of the cache that the indicated item is located in.

codeword – If value is missing, the value of this codeword will be assigned to the variable var.

dock – The name of the dock at which a ship, in the current location, will be moved to. The usual way to dock ships is via the dock attribute of the root section tag.

force – Whether the action must be executed by the player (if not hidden). Defaults to true.

item attributes – An item which will be referred to by the value attribute.

modifier - A modifier to any ability used in value. This may be 'noweapon', 'noarmour', 'notool' or 'natural'; these exclude (respectively) the ability bonuses of a weapon, armour, a tool, or any of these things. The default is to include these bonuses.

value – The value to be assigned to var. This can be an expression including the symbols '(', ')', '*', '/', '+', '-', integers, and variable names. Other identifiers may also be used:

armour – The Defence bonus of the armour indicated by the item attributes.

crew – The value of the crew in the 'current' ship (poor = 1, average = 2, good = 3, excellent = 4).

shards – The number of Shards held by the player, or in the

weapon – The Combat bonus of the weapon indicated by the item attributes.

an ability name – the six standard ones, as well as 'rank', 'defence', and 'stamina'. modifier affects all of these; if 'stamina' and modifier is absent, the default is to use the current stamina.

var – The variable to assign the result of value to; if missing, the result will be assigned to the anonymous variable.



TODO:
<training ability="S" [add="N"] [dice="N"] [var="S"]>
Roll the given number dice; if greater than the current value of the given ability, raise that ability by one.

ability – The ability to be tested against and raised. Multiple abilities may be selected from using '*', '?', or by separating a list of ability names with '|'.

add – The value to add to the dice roll.

dice – The number of dice to be rolled; defaults to two. The default text is 'roll one die', 'roll two dice', or 'roll X dice', depending on the value of this attribute.

var – The variable to store the result in. The result, in this case, is the result of the dice roll plus add.




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