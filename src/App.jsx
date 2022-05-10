import { QueryClient, QueryClientProvider } from 'react-query'
import { GameProvider } from './GameContext'
import Story from './Story'
import './App.css'
import DebugPanel from './DebugPanel'
import AdventureSheet from './AdventureSheet'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <div className="App">
          <DebugPanel />
          <Story />
          <AdventureSheet />
        </div>
      </GameProvider >
    </QueryClientProvider>
  )
}

export default App
