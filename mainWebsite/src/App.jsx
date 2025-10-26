import React from 'react'
import Landing from './pages/LandingPage'
import Login from './pages/Login'
import NavBar from './components/NavBar'

import Authors from './pages/Authors'
import ContactUs from './pages/ContactUs'

import Topic from './pages/Topic'
import Home from './pages/Home'
import InRevision from './pages/InRevision'
import SubmitPaper from './pages/SubmitPaper'
import Reviewers from './pages/Reviewers'
import Profile from './pages/Profile'



function App() {
  return (
    <div>
    <NavBar/>
   {/* <Home/> */}
    {/* <Authors/> */}
    {/* <SubmitPaper/> */}
    {/* <Reviewers/> */}
    {/* <InRevision/> */}
      {/* <Landing/> */}
      {/* <Login/> */}
      {/* <Topic /> */}
      {/* <ContactUs /> */}
      <Profile/>
      
      
    </div>
  )
}

export default App
