import { ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuth, useAuthService } from './utils/auth'
import { LightMode } from './components/ui/color-mode'
import client from './utils/apolloClient'
import Home from './pages/Home'
import Game from './pages/Game'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  const { loggedIn } = useAuth();
  const authService = useAuthService();

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <ApolloProvider client={client}>
      <LightMode>
        <Router>
          <Routes>
            <Route path="/" element={loggedIn ? <Game /> : <Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          {loggedIn && <button onClick={handleLogout}>Logout</button>}
        </Router>
      </LightMode>
  </ApolloProvider>
  )
}

export default App
