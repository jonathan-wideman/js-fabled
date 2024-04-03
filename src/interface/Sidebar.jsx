import { useState } from "react";

export default function Sidebar({
  side = "left",
  defaultOpen = true,
  children,
  ...others
}) {
  const [open, setOpen] = useState(defaultOpen);

  const onClickTab = () => {
    console.log("onClickTab", open);
    setOpen((prev) => !prev);
  };

  return (
    <div className="sidebar">
      {side === "right" ? (
        <SidebarTabs side={side} onClickTab={onClickTab} />
      ) : null}
      {open ? (
        <div className="pane" {...others}>
          {children}
        </div>
      ) : null}
      {side === "left" ? (
        <SidebarTabs side={side} onClickTab={onClickTab} />
      ) : null}
    </div>
  );
}

function SidebarTabs({ side, onClickTab }) {
  return (
    <div>
      <div>
        <button onClick={() => onClickTab()}>A</button>
      </div>
      <div>
        <button onClick={() => onClickTab()}>B</button>
      </div>
      <div>
        <button onClick={() => onClickTab()}>C</button>
      </div>
    </div>
  );
}
