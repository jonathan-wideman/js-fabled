import React from "react";
import { debugVerboseAtom } from "../../store/debug";
import { useAtom } from "jotai";

export default function DebugVerboseText({ children, applyWrapper = true }) {
  const [debugVerbose] = useAtom(debugVerboseAtom);

  return debugVerbose ? (
    applyWrapper ? (
      <span className="debug-verbose"> {children} </span>
    ) : (
      <>{children}</>
    )
  ) : null;
}
