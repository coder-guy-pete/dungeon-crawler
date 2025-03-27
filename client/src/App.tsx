import { ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import client from './utils/apolloClient'
import Home from './pages/Home'
import Game from './pages/Game'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useAuth, useAuthService } from './utils/auth'

function App() {
  const { loggedIn } = useAuth();
  const authService = useAuthService();

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={loggedIn ? <Game /> : <Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        {loggedIn && <button onClick={handleLogout}>Logout</button>}
      </Router>
  </ApolloProvider>
  )
}

export default App
