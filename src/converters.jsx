import Section from "./StoryComponents/Section"
import Paragraph from "./StoryComponents/Paragraph"
import Goto from "./StoryComponents/Goto"
import Item from "./StoryComponents/Item"
import DefaultNode from "./StoryComponents/DefaultNode"
import Give from "./StoryComponents/Give"
import Choices from "./StoryComponents/Choices"
import Outcomes from "./StoryComponents/Outcomes"
import Table from "./StoryComponents/Table"
import Choice from "./StoryComponents/Choice"
import Outcome from "./StoryComponents/Outcome"
import Result from "./StoryComponents/Result"
import Lose from "./StoryComponents/Lose"
import If from "./StoryComponents/If"
import Else from "./StoryComponents/Else"
import ElseIf from "./StoryComponents/ElseIf"
import Random from "./StoryComponents/Random"
import Difficulty from "./StoryComponents/Difficulty"
import RankCheck from "./StoryComponents/RankCheck"
import Group from "./StoryComponents/Group"
import SetSectionVariable from "./StoryComponents/Set"
import Training from "./StoryComponents/Training"
import Rest from "./StoryComponents/Rest"
import Adjust from "./StoryComponents/Adjust"
import ItemCache from "./StoryComponents/ItemCache"
import MoneyCache from "./StoryComponents/MoneyCache"
import AdjustMoney from "./StoryComponents/AdjustMoney"
import Market from "./StoryComponents/Market"
import Header from "./StoryComponents/Header"
import Trade from "./StoryComponents/Trade"
import Buy from "./StoryComponents/Buy"
import Sell from "./StoryComponents/Sell"
import Fight from "./StoryComponents/Fight"
import FightRound from "./StoryComponents/FightRound"
import FightDamage from "./StoryComponents/FightDamage"
import Flee from "./StoryComponents/Flee"
import Text from "./StoryComponents/Text"
import Description from "./StoryComponents/Description"
import Resurrection from "./StoryComponents/Resurrection"
import Curse from "./StoryComponents/Curse"
import Disease from "./StoryComponents/Disease"
import Poison from "./StoryComponents/Poison"
import Effect from "./StoryComponents/Effect"
import Return from "./StoryComponents/Return"
import Field from "./StoryComponents/Field"
import Bought from "./StoryComponents/Bought"
import Sold from "./StoryComponents/Sold"
import ExtraChoice from "./StoryComponents/ExtraChoice"
import Image from "./StoryComponents/Image"
import Reroll from "./StoryComponents/Reroll"
import SectionView from "./StoryComponents/SectionView"
import While from "./StoryComponents/While"

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
  elseif: (props) => ({ type: Else, props }),
  else: (props) => ({ type: ElseIf, props }),

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