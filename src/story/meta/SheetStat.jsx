import React from "react";
import DebugVerboseText from "./DebugVerboseText";
import { formatModifier } from "../../helpers";
import StatLabel from "./StatLabel";

export default function SheetStat({ label, stat }) {
  const { value, details } = stat;
  return (
    <div>
      <StatLabel>{label}</StatLabel>
      {value}
      <DebugVerboseText>
        {details
          .map((detail) => `${detail.label} ${formatModifier(detail.value)} `)
          .join(", ")}
      </DebugVerboseText>
    </div>
  );
}
