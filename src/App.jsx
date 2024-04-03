import { QueryClient, QueryClientProvider } from "react-query";
import { GameProvider } from "./GameContext";
import Story from "./story/meta/Story";
import "./App.css";
import DebugPanel from "./interface/DebugPanel";
import AdventureSheet from "./interface/AdventureSheet";

function Providers({ children }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>{children}</GameProvider>
    </QueryClientProvider>
  );
}

function App() {
  return (
    <Providers>
      <div className="App">
        <DebugPanel />
        <Story />
        <AdventureSheet />
      </div>
    </Providers>
  );
}

export default App;
