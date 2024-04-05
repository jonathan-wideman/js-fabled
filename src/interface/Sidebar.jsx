import { useState } from "react";

export default function Sidebar({
  side = "left",
  tabs = [],
  defaultTabId,
  ...others
}) {
  const [selectedId, setSelectedId] = useState(defaultTabId);
  const selectedTab = tabs.find((tab) => selectedId && tab.id === selectedId);

  const onClickTabButton = (id) => {
    setSelectedId((prev) => (prev === id ? undefined : id));
  };

  return (
    <div className="sidebar">
      {side === "right" ? (
        <SidebarTabButtons tabs={tabs} onClickTabButton={onClickTabButton} />
      ) : null}
      {selectedTab ? (
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
