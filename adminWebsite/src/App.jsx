import React from 'react'
import { useState } from 'react'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import InRevision from './pages/InRevision.jsx'
import InReview from './pages/InReview.jsx'
import AddReviewer from './pages/AddReviewer.jsx'
import DeleteContent from './pages/DeleteReviewer.jsx'
import Layout from "./Layout.jsx"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const router =createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
        <Route path="" element={<Home/>}/>
        <Route path='InRevision' element={<InRevision/>}/>
        <Route path='InReview' element={<InReview/>}/>
        <Route path='AddReviewer' element={<AddReviewer/>}/>
        <Route path='DeleteContent' element={<DeleteContent/>}/>
      </Route>
    )
  )
  return (
    <>
      {
        isLoggedIn ? <RouterProvider router={router}/> : <Login setIsLoggedIn={setIsLoggedIn}/>
      }
    </>
  )
}

export default App
