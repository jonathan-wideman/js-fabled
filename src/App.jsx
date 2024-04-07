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
import { useEffect } from "react";

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

  return (
    <Providers>
      <div className="App">
        <Sidebar
          side="left"
          tabs={[
            ...conditionalElements(debug, {
              id: "debug",
              label: "Debug",
              icon: <IconSpider />,
              content: <DebugPanel />,
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
          defaultTabId={debug ? "debug" : undefined}
        ></Sidebar>
        <Story />
        <Sidebar
          side="right"
          tabs={[
            {
              id: "sheet",
              label: "Sheet",
              icon: <IconPerson />,
              content: <AdventureSheet />,
            },
          ]}
          defaultTabId={"sheet"}
        ></Sidebar>
      </div>
    </Providers>
  );
}

export default App;
