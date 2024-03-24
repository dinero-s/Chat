import { GlobalContext } from './context'
import Router from './routes'

function App() {
  return (
    <GlobalContext>
      <Router />
    </GlobalContext>
    
  )
}

export default App
