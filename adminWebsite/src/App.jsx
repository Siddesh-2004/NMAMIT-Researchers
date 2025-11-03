import { useState } from "react";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import InRevision from "./pages/InRevision.jsx";
import InReview from "./pages/InReview.jsx";
import AddReviewer from "./pages/AddReviewer.jsx";
import DeleteContent from "./pages/DeleteReviewer.jsx";
import Layout from "./Layout.jsx";
import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="InRevision" element={<InRevision />} />
        <Route path="InReview" element={<InReview />} />
        <Route path="AddReviewer" element={<AddReviewer />} />
        <Route path="DeleteContent" element={<DeleteContent />} />
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

export default App;
