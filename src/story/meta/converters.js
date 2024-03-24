import Section from "../tags/Section"
import Paragraph from "../tags/Paragraph"
import Goto from "../tags/Goto"
import Item from "../tags/Item"
import DefaultNode from "../tags/DefaultNode"
import Give from "../tags/Give"
import Choices from "../tags/Choices"
import Outcomes from "../tags/Outcomes"
import Table from "../tags/Table"
import Choice from "../tags/Choice"
import Outcome from "../tags/Outcome"
import Result from "../tags/Result"
import Lose from "../tags/Lose"
import If from "../tags/If"
import Else from "../tags/Else"
import ElseIf from "../tags/ElseIf"
import Random from "../tags/Random"
import Difficulty from "../tags/Difficulty"
import RankCheck from "../tags/RankCheck"
import Group from "../tags/Group"
import SetSectionVariable from "../tags/Set"
import Training from "../tags/Training"
import Rest from "../tags/Rest"
import Adjust from "../tags/Adjust"
import ItemCache from "../tags/ItemCache"
import MoneyCache from "../tags/MoneyCache"
import AdjustMoney from "../tags/AdjustMoney"
import Market from "../tags/Market"
import Header from "../tags/Header"
import Trade from "../tags/Trade"
import Buy from "../tags/Buy"
import Sell from "../tags/Sell"
import Fight from "../tags/Fight"
import FightRound from "../tags/FightRound"
import FightDamage from "../tags/FightDamage"
import Flee from "../tags/Flee"
import Text from "../tags/Text"
import Description from "../tags/Description"
import Resurrection from "../tags/Resurrection"
import Curse from "../tags/Curse"
import Disease from "../tags/Disease"
import Poison from "../tags/Poison"
import Effect from "../tags/Effect"
import Return from "../tags/Return"
import Field from "../tags/Field"
import Bought from "../tags/Bought"
import Sold from "../tags/Sold"
import ExtraChoice from "../tags/ExtraChoice"
import Image from "../tags/Image"
import Reroll from "../tags/Reroll"
import SectionView from "../tags/SectionView"
import While from "../tags/While"

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

  choices: (props) => ({ type: Choices, props }),
  outcomes: (props) => ({ type: Outcomes, props }),
  table: (props) => ({ type: Table, props }),

  choice: (props) => ({ type: Choice, props }),
  outcome: (props) => ({ type: Outcome, props }),

  tick: (props) => ({ type: Give, props }),
  gain: (props) => ({ type: Give, props }),
  lose: (props) => ({ type: Lose, props }),

  if: (props) => ({ type: If, props }),
  elseif: (props) => ({ type: ElseIf, props }),
  else: (props) => ({ type: Else, props }),

  random: (props) => ({ type: Random, props }),
  difficulty: (props) => ({ type: Difficulty, props }),
  rankcheck: (props) => ({ type: RankCheck, props }),

  success: (props) => ({ type: Result, props: { ...props, nodeType: 'success' } }),
  failure: (props) => ({ type: Result, props: { ...props, nodeType: 'failure' } }),

  group: (props) => ({ type: Group, props }),

  set: (props) => ({ type: SetSectionVariable, props }),

  training: (props) => ({ type: Training, props }),

  rest: (props) => ({ type: Rest, props }),

  adjust: (props) => ({ type: Adjust, props }),

  itemcache: (props) => ({ type: ItemCache, props }),
  moneycache: (props) => ({ type: MoneyCache, props }),

  adjustmoney: (props) => ({ type: AdjustMoney, props }),

  market: (props) => ({ type: Market, props }),

  header: (props) => ({ type: Header, props }),

  trade: (props) => ({ type: Trade, props }),
  buy: (props) => ({ type: Buy, props }),
  sell: (props) => ({ type: Sell, props }),

  fight: (props) => ({ type: Fight, props }),
  fightround: (props) => ({ type: FightRound, props }),
  fightdamage: (props) => ({ type: FightDamage, props }),
  flee: (props) => ({ type: Flee, props }),

  text: (props) => ({ type: Text, props }),
  desc: (props) => ({ type: Description, props }),

  resurrection: (props) => ({ type: Resurrection, props }),

  curse: (props) => ({ type: Curse, props }),
  disease: (props) => ({ type: Disease, props }),
  poison: (props) => ({ type: Poison, props }),

  effect: (props) => ({ type: Effect, props }),

  return: (props) => ({ type: Return, props }),

  field: (props) => ({ type: Field, props }),

  bought: (props) => ({ type: Bought, props }),
  sold: (props) => ({ type: Sold, props }),

  extrachoice: (props) => ({ type: ExtraChoice, props }),

  image: (props) => ({ type: Image, props }),

  // TODO: Not yet implemented; what are these?
  'include item attributes': (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'include item attributes' } }),
  'exclude item attributes': (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'exclude item attributes' } }),

  reroll: (props) => ({ type: Reroll, props }),

  sectionview: (props) => ({ type: SectionView, props }),

  while: (props) => ({ type: While, props }),



  // ===== Style Only ===== //

  // <h1>, <h2>, <h3>, <h4>
  // A heading within the text. <h1> is the largest heading, <h4> the smallest. Only used within the rule files (QuickRules.xml and Rules.xml), though it could (theoretically) be used within a section.
  h1: (props) => ({ type: 'h1', props }),
  h2: (props) => ({ type: 'h2', props }),
  h3: (props) => ({ type: 'h3', props }),
  h4: (props) => ({ type: 'h4', props }),

  // <i>, <b>
  // Italics and Bold
  i: (props) => ({ type: 'em', props }),
  b: (props) => ({ type: 'strong', props }),

}

export default converters