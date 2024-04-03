import { QueryClient, QueryClientProvider } from "react-query";
import { ReaderProvider } from "./ReaderContext";
import Story from "./story/meta/Story";
import "./App.css";
import DebugPanel from "./interface/DebugPanel";
import AdventureSheet from "./interface/AdventureSheet";
import Sidebar from "./interface/Sidebar";

function Providers({ children }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReaderProvider>{children}</ReaderProvider>
    </QueryClientProvider>
  );
}

function App() {
  return (
    <Providers>
      <div className="App">
        <Sidebar side="left">
          <DebugPanel />
        </Sidebar>
        <Story />
        <Sidebar side="right">
          <AdventureSheet />
        </Sidebar>
      </div>
    </Providers>
  );
}

export default App;
