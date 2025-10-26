import React from 'react'
import Landing from './pages/LandingPage'
import Login from './pages/Login'
import NavBar from './components/NavBar'

import Authors from './pages/Authors'
import TopicCard from './components/TopicCard'
import ContactUs from './pages/ContactUs'

import Topic from './pages/Topic'
import Home from './pages/Home'
import InRevision from './pages/InRevision'



function App() {
  return (
    <div>
    <NavBar/>
   {/* <Home/> */}
    {/* <Authors/> */}
    {/* <Reviewers/> */}
    <InRevision/>
      {/* <Landing/> */}
      {/* <Login/> */}
      {/* <Topic /> */}
      {/* <ContactUs /> */}
      
      
    </div>
  )
}

export default App
