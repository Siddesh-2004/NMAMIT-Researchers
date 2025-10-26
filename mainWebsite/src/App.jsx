import React from 'react'
import Landing from './pages/LandingPage'
import Login from './pages/Login'
import NavBar from './components/NavBar'
import Reviewers from './pages/Reviewers'
import Authors from './pages/Authors'
import TopicCard from './components/TopicCard'
import ContactUs from './pages/ContactUs'
import InRevision from './pages/InRevision'
import Topic from './pages/Topic'
import Home from './pages/Home'



function App() {
  return (
    <div>
    <NavBar/>
   <Home/>
    {/* <Authors/> */}
    {/* <Reviewers/> */}
    {/* <InRevision/> */}
      {/* <Landing/> */}
      {/* <Login/> */}
      {/* <Topic /> */}
      {/* <ContactUs /> */}
      {/* <InRevisionCard /> */}
    </div>
  )
}

export default App
