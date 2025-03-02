import React from 'react';
import "./App.css";
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Header from './components/Custom/Header';



function App() {

  const {user , isLoaded , isSignedIn} = useUser();

  if(!isSignedIn && isLoaded){
    return < Navigate to = {'/auth/Sign-in'}/>
  } 

  return (
    <>
    <Header/>
    <Outlet/>
    </>
    
  )
}

export default App