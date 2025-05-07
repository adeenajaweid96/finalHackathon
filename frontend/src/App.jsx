import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './pages/Login.jsx';
import Register from './pages/register.jsx'
import  Dashboard from './pages/Dashboard.jsx'



function App() {

  return (
    <>
    <Routes>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login />}/>
    <Route path='/' element={<Dashboard />}/>
   </Routes>
   </>
  )
}

export default App

