import React from "react";
import { debugVerboseAtom } from "../../store/debug";
import { useAtom } from "jotai";

export default function DebugVerboseText({ children }) {
  const [debugVerbose] = useAtom(debugVerboseAtom);

  return debugVerbose ? (
    <span className="debug-verbose"> {children} </span>
  ) : null;
}
