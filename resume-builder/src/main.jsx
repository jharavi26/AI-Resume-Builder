import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import SignInPage from './auth/Sign-in/index.jsx';
import Home from './components/Home.jsx';
import Dashboard from './components/Dashboard.jsx';
import {ClerkProvider} from '@clerk/clerk-react';
import EditResume from './components/Custom/EditResume.jsx';
import View from './components/MyResume/View.jsx';


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY


const router = createBrowserRouter([
  {
    element : <App/>,
    children : [
      {
        path : "/dashboard",
        element : <Dashboard/>
      },
      {
        path : "/dashboard/:resumeId/edit",
        element : <EditResume/>
      },
    ]
  } ,

  {
    path : "/" ,
    element : <Home/>
  },
  {
    path : "/my-resume/:resumeId/view",
    element : <View/>

  },
  
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router = {router}>
    </RouterProvider>
    </ClerkProvider>
  </StrictMode>,
)
