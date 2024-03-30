import React, { useState } from "react";
import DebugVerboseText from "./DebugVerboseText";
import {
  conditionalElements,
  formatModifier,
  isEquipment,
} from "../../helpers";
import { characterDropItem, characterEquipItem } from "../../store/character";
import { useAtom } from "jotai";

const formatBrief = (item) => {
  const ability =
    item.ability ??
    (item.type ? { armor: "defense", weapon: "combat" }[item.type] : undefined);
  const bonus = item.bonus;

  if (ability && bonus) {
    return ` (${ability} ${formatModifier(bonus)})`;
  }
};

export default function SheetItem({ item }) {
  const [, equipItem] = useAtom(characterEquipItem);
  const [, dropItem] = useAtom(characterDropItem);

  const [expanded, setExpanded] = useState(false);

  const actions = [
    ...conditionalElements(isEquipment(item), {
      label: "equip",
      callback: () => {
        if (isEquipment(item)) {
          equipItem(item);
        }
      },
    }),
    {
      label: "drop",
      callback: () => {
        dropItem(item);
      },
    },
  ];

  const onClickItem = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <span onClick={onClickItem}>
        {item.name}
        {formatBrief(item)}
        {item.equipped && <span className="info"> [equipped] </span>}
      </span>
      {expanded && (
        <>
          <br />
          {actions.map((a, i) => (
            <span
              className="action"
              onClick={() => {
                a.callback();
                setExpanded(false);
              }}
              key={i}
            >
              {" "}
              [{a.label}]{" "}
            </span>
          ))}
        </>
      )}
      <DebugVerboseText>
        <br />
        {JSON.stringify(item)}
      </DebugVerboseText>
    </>
  );
}
