import React from 'react'
import Landing from './pages/LandingPage'
import Login from './pages/Login'
import NavBar from './components/NavBar'
import Reviewers from './pages/Reviewers'
import Authors from './pages/Authors'


function App() {
  return (
    <div>
    <NavBar/>
    <Authors/>
    {/* <Reviewers/> */}
      {/* <Landing/> */}
      {/* <Login/> */}
    </div>
  )
}

export default App
