import { QueryClient, QueryClientProvider } from "react-query";
import { ReaderProvider } from "./ReaderContext";
import Story from "./story/meta/Story";
import "./App.css";
import DebugPanel from "./interface/DebugPanel";
import AdventureSheet from "./interface/AdventureSheet";
import Sidebar from "./interface/Sidebar";
import { useAtom } from "jotai";
import { debugAtom } from "./store/debug";
import IconSpider from "./icons/IconSpider";
import IconMap from "./icons/IconMap";
import IconPerson from "./icons/IconPerson";
import IconPen from "./icons/IconPen";
import { conditionalElements } from "./helpers";
import { useEffect, useState } from "react";

function Providers({ children }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReaderProvider>{children}</ReaderProvider>
    </QueryClientProvider>
  );
}

function App() {
  const [debug, setDebug] = useAtom(debugAtom);

  useEffect(() => {
    const onKeyUpHandler = (event) => {
      if (event.key === "`") {
        setDebug((prev) => !prev);
      }
    };
    document.addEventListener("keyup", onKeyUpHandler);
    return () => {
      document.removeEventListener("keyup", onKeyUpHandler);
    };
  }, [setDebug]);

  const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;

  const [leftSidebarSelectedId, setLeftSidebarSelectedId] = useState(
    debug ? "debug" : undefined
  );
  const [rightSidebarSelectedId, setRightSidebarSelectedId] = useState(
    isMobileViewport ? undefined : "sheet"
  );

  const onClickLeftSidebarTabButton = (id) => {
    setLeftSidebarSelectedId((prev) => (prev === id ? undefined : id));
  };
  const onClickRightSidebarTabButton = (id) => {
    setRightSidebarSelectedId((prev) => (prev === id ? undefined : id));
  };

  return (
    <Providers>
      <div className="App">
        {isMobileViewport ? (
          <>
            {!rightSidebarSelectedId ? <Story /> : null}
            <Sidebar
              side="full"
              tabs={[
                {
                  id: "sheet",
                  label: "Sheet",
                  icon: <IconPerson />,
                  content: (
                    <div className="sidebar-content full sheet">
                      <AdventureSheet />
                    </div>
                  ),
                },
                {
                  id: "map",
                  label: "Map",
                  icon: <IconMap />,
                  content: <div className="sidebar-content full">Map</div>,
                },
                {
                  id: "notes",
                  label: "Notes",
                  icon: <IconPen />,
                  content: <div className="sidebar-content full">Notes</div>,
                },
                ...conditionalElements(debug, {
                  id: "debug",
                  label: "Debug",
                  icon: <IconSpider />,
                  content: (
                    <div className="sidebar-content full debug">
                      <DebugPanel />
                    </div>
                  ),
                }),
              ]}
              selectedId={rightSidebarSelectedId}
              onClickTabButton={onClickRightSidebarTabButton}
            />
          </>
        ) : (
          <>
            <Sidebar
              side="left"
              tabs={[
                ...conditionalElements(debug, {
                  id: "debug",
                  label: "Debug",
                  icon: <IconSpider />,
                  content: (
                    <div className="sidebar-content debug">
                      <DebugPanel />
                    </div>
                  ),
                }),
                {
                  id: "map",
                  label: "Map",
                  icon: <IconMap />,
                  content: <div className="sidebar-content">Map</div>,
                },
                {
                  id: "notes",
                  label: "Notes",
                  icon: <IconPen />,
                  content: <div className="sidebar-content">Notes</div>,
                },
              ]}
              selectedId={leftSidebarSelectedId}
              onClickTabButton={onClickLeftSidebarTabButton}
            />
            <Story />
            <Sidebar
              side="right"
              tabs={[
                {
                  id: "sheet",
                  label: "Sheet",
                  icon: <IconPerson />,
                  content: (
                    <div className="sidebar-content sheet">
                      <AdventureSheet />
                    </div>
                  ),
                },
              ]}
              selectedId={rightSidebarSelectedId}
              onClickTabButton={onClickRightSidebarTabButton}
            />
          </>
        )}
      </div>
    </Providers>
  );
}

export default App;
