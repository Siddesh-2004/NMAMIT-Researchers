import React from 'react'
import Landing from './pages/LandingPage'
import Login from './pages/Login'
import NavBar from './components/NavBar'

import Authors from './pages/Authors'
import ContactUs from './pages/ContactUs'

import Topic from './pages/Topic'
import Home from './pages/Home'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout'
import InReview from './pages/InReview'
import SubmitPaper from './pages/SubmitPaper'
import Profile from './pages/Profile' 
import InRevision from './pages/InRevision'
import Reviewers from './pages/Reviewers' 


// function App() {
//   return (
//     <div>
//     <NavBar/>
//    <Home/>
//     {/* <Authors/> */}
//     {/* <Reviewers/> */}
//     {/* <InRevision/> */}
      // {/* <Landing/> */}
//       {/* <Login/> */}
//       {/* <Topic /> */}
//       {/* <ContactUs /> */}
//       {/* <InRevisionCard /> */}
//     </div>
//   )
// }

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // NEW STATE: Tracks if the user has clicked "Get Started"
  const [showLogin, setShowLogin] = useState(false); 
  
  // The function to trigger the switch from Landing to Login
  const handleGetStarted = () => {
    setShowLogin(true);
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="InRevision" element={<InRevision />} />
        <Route path="InReview" element={<InReview />} />
        <Route path="Topics" element={<Topic />} />
        <Route path="SubmitPaper" element={<SubmitPaper />} />
        <Route path="Reviewers" element={<Reviewers />} />
        <Route path="Authors" element={<Authors />} />
        <Route path="Profile" element={<Profile setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="Contact-us" element={<ContactUs />} />


      </Route>
    )
  );

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "h-20",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#06274D",
            color: "#ffff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: "black",
              secondary: "white",
            },
          },
        }}
      />
      {isLoggedIn ? (
        <RouterProvider router={router} />
      ): showLogin ? (
        // 2. User is NOT logged in, but has clicked "Get Started": Show the Login Page
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : (
        // 3. User is NOT logged in, and hasn't clicked yet: Show the Landing Page
        <Landing handleGetStarted={handleGetStarted} />
      )}
    </>
  );
}
export default App
