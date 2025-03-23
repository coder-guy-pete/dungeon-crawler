import { ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import client from './utils/apolloClient'
import Game from './pages/Game'
import './App.css'

function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Game />} />
        </Routes>
      </Router>
  </ApolloProvider>
  )
}

export default App
