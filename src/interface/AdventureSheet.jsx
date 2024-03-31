import React from "react";
import { getRankTitle } from "../helpers";
import SheetItem from "../story/meta/SheetItem";
import SheetStat from "../story/meta/SheetStat";
import StatLabel from "../story/meta/StatLabel";
import { useAtom } from "jotai";
import {
  characterActionsAtom,
  characterBioAtom,
  characterBlessingsAtom,
  characterCalcualtedCharismaAtom,
  characterCalcualtedCombatAtom,
  characterCalcualtedDefenseAtom,
  characterCalcualtedMagicAtom,
  characterCalcualtedSanctityAtom,
  characterCalcualtedScoutingAtom,
  characterCalcualtedThieveryAtom,
  characterCodewordsAtom,
  characterCursesAtom,
  characterGodAtom,
  characterInventoryAtom,
  characterMoneyAtom,
  characterNameAtom,
  characterProfessionAtom,
  characterRankAtom,
  characterRevivesAtom,
  characterStaminaAtom,
  characterTitlesAtom,
  characterVariablesAtom,
} from "../store/character";
import { sectionTicksAtom } from "../store/section";

export default function AdventureSheet() {
  const [name] = useAtom(characterNameAtom);
  const [profession] = useAtom(characterProfessionAtom);
  const [rank] = useAtom(characterRankAtom);
  const [bio] = useAtom(characterBioAtom);
  const [stamina] = useAtom(characterStaminaAtom);
  const [calculatedDefense] = useAtom(characterCalcualtedDefenseAtom);
  const [calculatedCharisma] = useAtom(characterCalcualtedCharismaAtom);
  const [calculatedCombat] = useAtom(characterCalcualtedCombatAtom);
  const [calculatedMagic] = useAtom(characterCalcualtedMagicAtom);
  const [calculatedSanctity] = useAtom(characterCalcualtedSanctityAtom);
  const [calculatedScouting] = useAtom(characterCalcualtedScoutingAtom);
  const [calculatedThievery] = useAtom(characterCalcualtedThieveryAtom);
  const [money] = useAtom(characterMoneyAtom);
  const [inventory] = useAtom(characterInventoryAtom);
  const [titles] = useAtom(characterTitlesAtom);
  const [god] = useAtom(characterGodAtom);
  const [blessings] = useAtom(characterBlessingsAtom);
  const [curses] = useAtom(characterCursesAtom);
  const [revives] = useAtom(characterRevivesAtom);
  const [codewords] = useAtom(characterCodewordsAtom);
  const [actions] = useAtom(characterActionsAtom);
  const [variables] = useAtom(characterVariablesAtom);

  const [sectionTicks] = useAtom(sectionTicksAtom);

  return (
    <>
      <div className="sheet pane">
        <div>
          <StatLabel>Name:</StatLabel>
          {name}
        </div>
        <div>
          <StatLabel>Profession:</StatLabel>
          {profession}
        </div>
        <div>
          <StatLabel>Rank:</StatLabel>
          {rank} ({getRankTitle(rank)})
        </div>
        <div>
          <StatLabel>Bio:</StatLabel>
          {bio}...
        </div>
        <div>
          <StatLabel>Stamina:</StatLabel>
          {stamina.current}/{stamina.max}
        </div>
        <SheetStat label={"DEFENSE"} stat={calculatedDefense} />
        <SheetStat label={"CHARISMA"} stat={calculatedCharisma} />
        <SheetStat label={"COMBAT"} stat={calculatedCombat} />
        <SheetStat label={"MAGIC"} stat={calculatedMagic} />
        <SheetStat label={"SANCTITY"} stat={calculatedSanctity} />
        <SheetStat label={"SCOUTING"} stat={calculatedScouting} />
        <SheetStat label={"THIEVERY"} stat={calculatedThievery} />
        <div>
          <StatLabel>Money:</StatLabel>
          {money} Shards
        </div>
        <div>
          <StatLabel>Possessions:</StatLabel>({inventory.items.length}/
          {inventory.max})
          <ul>
            {" "}
            {inventory.items.map((item, i) => (
              <li key={i}>
                <SheetItem item={item} />
              </li>
            ))}{" "}
          </ul>
        </div>
        <div>
          <StatLabel>Special Actions:</StatLabel>
          <ul>
            {" "}
            {actions.map((action, i) => (
              <li key={i}>{action}</li>
            ))}{" "}
          </ul>
        </div>
        <div>
          <StatLabel>Titles and Honors:</StatLabel>
          <ul>
            {" "}
            {titles.map((title, i) => (
              <li key={i}>{title}</li>
            ))}{" "}
          </ul>
        </div>
        <div>
          <StatLabel>God:</StatLabel>
          {god}
        </div>
        <div>
          <StatLabel>Blessings:</StatLabel>
          <ul>
            {" "}
            {blessings.map((blessing, i) => (
              <li key={i}>{blessing}</li>
            ))}{" "}
          </ul>
        </div>
        <div>
          <StatLabel>Curses:</StatLabel>
          <ul>
            {" "}
            {curses.map((curse, i) => (
              <li key={i}>{curse}</li>
            ))}{" "}
          </ul>
        </div>
        <div>
          <StatLabel>Resurrection Arrangements:</StatLabel>
          <ul>
            {" "}
            {revives.map((revive, i) => (
              <li key={i}>{revive}</li>
            ))}{" "}
          </ul>
        </div>
        <div>
          <StatLabel>Codewords:</StatLabel>
          <ul>
            {" "}
            {codewords.map((codeword, i) => (
              <li key={i}>{codeword}</li>
            ))}{" "}
          </ul>
        </div>
        <div>
          <StatLabel>Variables:</StatLabel>
          {JSON.stringify(variables)}
        </div>
        <div>
          <StatLabel>SECTION INFO:</StatLabel>
          Section ticks: {JSON.stringify(sectionTicks, null, 2)}
        </div>
      </div>
    </>
  );
}
