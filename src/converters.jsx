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

  // if: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'if' } }),
  // elseif: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'elseif' } }),
  // else: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'else' } }),
  if: (props) => ({ type: If, props }),
  elseif: (props) => ({ type: Else, props }),
  else: (props) => ({ type: ElseIf, props }),

  // random: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'random', isAction: true } }),
  // difficulty: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'difficulty', isAction: true } }),
  // rankcheck: (props) => ({ type: DefaultNode, props: { ...props, nodeType: 'rankcheck', isAction: true } }),
  random: (props) => ({ type: Random, props }),
  difficulty: (props) => ({ type: Difficulty, props }),
  rankcheck: (props) => ({ type: RankCheck, props }),

  success: (props) => ({ type: Result, props: { ...props, nodeType: 'success' } }),
  failure: (props) => ({ type: Result, props: { ...props, nodeType: 'failure' } }),

  group: (props) => ({ type: Group, props }),

  set: (props) => ({ type: SetSectionVariable, props }),

  training: (props) => ({ type: Training, props }),

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