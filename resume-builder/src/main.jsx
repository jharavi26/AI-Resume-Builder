import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import SignInPage from './auth/Sign-in/index.jsx';
import Home from './components/Home.jsx';
import Dashboard from './components/Dashboard.jsx';
import {ClerkProvider} from '@clerk/clerk-react';


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY


const router = createBrowserRouter([
  {
    element : <App/>,
    children : [
      {
        path : "/dashboard",
        element : <Dashboard/>
      }
    ]
  } ,

  {
    path : "/" ,
    element : <Home/>
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
