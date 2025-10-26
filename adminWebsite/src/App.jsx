import React from 'react'
import Login from './pages/Login.jsx'
import NavBar from './components/NavBar.jsx'
import Home from './pages/Home.jsx'
import InRevision from './pages/InRevision.jsx'
import InReview from './pages/InReview.jsx'
import Topic from './pages/Topic.jsx'
function App() {
  return (
    <>
      <NavBar />
       {/* <Login />  */}
       {/* <Home /> */}
       {/* <InRevision/> */}
       {/* <InReview/> */}
       <Topic/>
    </>
  )
}

export default App
