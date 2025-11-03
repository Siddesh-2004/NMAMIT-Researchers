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
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout'
import InReview from './pages/InReview'
import SubmitPaper from './pages/SubmitPaper'
import Profile from './pages/Profile' 


// function App() {
//   return (
//     <div>
//     <NavBar/>
//    <Home/>
//     {/* <Authors/> */}
//     {/* <Reviewers/> */}
//     {/* <InRevision/> */}
//       {/* <Landing/> */}
//       {/* <Login/> */}
//       {/* <Topic /> */}
//       {/* <ContactUs /> */}
//       {/* <InRevisionCard /> */}
//     </div>
//   )
// }

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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
        <Route path="Profile" element={<Profile />} />
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
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}
export default App
