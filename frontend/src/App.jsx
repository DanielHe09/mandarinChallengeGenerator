import './App.css'
import ClerkProviderWithRoutes from './auth/ClerkProviderWithRoutes'
import {Routes, Route} from 'react-router-dom'

//importing our components
import {Layout} from './layout/Layout'
import {AuthenticationPage} from './auth/AuthenticationPage'
import {ChallengeGenerator} from './challenge/ChallengeGenerator'
import {HistoryPanel} from './history/HistoryPanel'

function App() {
  
  return <ClerkProviderWithRoutes>
    <Routes>
      <Route path="/sign-in/*" element={<AuthenticationPage />} />
      <Route path="/sign-up/*" element={<AuthenticationPage />} />
      {/*parent route then 2 children routes of the parent route, whenever the user is on the children, layout component is 
      rendered around the page content */}
      <Route element={<Layout />}>
        <Route path="/" element={<ChallengeGenerator />} />
        <Route path="/history" element={<HistoryPanel />} />
      </Route>
    </Routes>
  </ClerkProviderWithRoutes>
  
}

export default App
