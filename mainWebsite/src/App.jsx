import React from 'react'
import Landing from './pages/LandingPage'
import Login from './pages/Login'
import NavBar from './components/NavBar'
import Reviewers from './pages/Reviewers'

function App() {
  return (
    <div>
    <NavBar/>
    <Reviewers/>
      {/* <Landing/> */}
      {/* <Login/> */}
    </div>
  )
}

export default App
