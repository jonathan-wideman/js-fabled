import React from "react";
import DebugVerboseText from "../meta/DebugVerboseText";

export default function Wip({ children }) {
  return (
    <>
      <DebugVerboseText applyWrapper={false}>
        <span className="debug-verbose debug-wip"> ⚠ </span>
      </DebugVerboseText>
      {children}
    </>
  );
}
