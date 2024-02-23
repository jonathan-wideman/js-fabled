import { QueryClient, QueryClientProvider } from 'react-query'
import { GameProvider } from './GameContext'
import Story from './Story'
import './App.css'
import DebugPanel from './DebugPanel'
import AdventureSheet from './AdventureSheet'
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
      console.log(event.key)
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
