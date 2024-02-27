import { QueryClient, QueryClientProvider } from 'react-query'
import { GameProvider } from './GameContext'
import Story from './story/meta/Story'
import './App.css'
import DebugPanel from './interface/DebugPanel'
import AdventureSheet from './interface/AdventureSheet'
import { useEffect, useState } from 'react'

function Providers({ children }) {
  const queryClient = new QueryClient()
  return (<QueryClientProvider client={queryClient}>
    <GameProvider>
      {children}
    </GameProvider >
  </QueryClientProvider>)
}



function App() {
  const [debugOpen, setDebugOpen] = useState(true)

  useEffect(() => {
    const onKeyUpHandler = (event) => {
      if (event.key === '`') {
        setDebugOpen(prev => !prev)
      }
    }
    document.addEventListener("keyup", onKeyUpHandler);
    return () => {
      document.removeEventListener("keyup", onKeyUpHandler);
    };
  }, [setDebugOpen])

  return (
    <Providers>
      <div className="App">
        {debugOpen && <DebugPanel />}
        <Story />
        <AdventureSheet />
      </div>
    </Providers>
  )
}

export default App
