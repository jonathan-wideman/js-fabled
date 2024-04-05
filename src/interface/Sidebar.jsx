import { useEffect, useState } from "react";

export default function Sidebar({
  side = "left",
  // children,
  tabs = [],
  defaultTabId,
  ...others
}) {
  // const [open, setOpen] = useState(defaultOpen);
  // const [selected, setSelected] = useState(0);
  const [selectedId, setSelectedId] = useState(defaultTabId);
  const selectedTab = tabs.find((tab) => selectedId && tab.id === selectedId);

  const onClickTabButton = (id) => {
    console.log("onClickTabButton", id);
    // setOpen((prev) => !prev);
    setSelectedId((prev) => (prev === id ? undefined : id));
  };

  useEffect(() => {
    console.log("selectedId", selectedId);
  }, [selectedId]);

  return (
    <div className="sidebar">
      {side === "right" ? (
        <SidebarTabButtons tabs={tabs} onClickTabButton={onClickTabButton} />
      ) : null}
      {selectedTab ? (
        // <div className="pane" {...others}>
        //   {children[selected]}
        // </div>
        <div key={selectedId} className="pane" {...others}>
          {selectedTab.content}
        </div>
      ) : null}
      {side === "left" ? (
        <SidebarTabButtons tabs={tabs} onClickTabButton={onClickTabButton} />
      ) : null}
    </div>
  );
}

function SidebarTabButtons({ tabs, onClickTabButton }) {
  return (
    <div>
      {tabs.map((tab) => (
        <div key={tab.id}>
          <button
            onClick={() => onClickTabButton(tab.id)}
            style={{ padding: "0.3rem", width: "2rem", height: "2rem" }}
          >
            {tab.icon || tab.label}
          </button>
        </div>
      ))}
    </div>
  );
}
