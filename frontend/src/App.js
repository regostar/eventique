import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Homepage from './components/Homepage';
// import create from './components/Create';
import Profile from './components/Profile';

function App() {
  return (
    <Routes>
      <Route path='/login' exact element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/*' element={<Homepage/>} />
      <Route path='/profile' element={<Profile/>} />
      {/* <Route path='/create' element={<create/>} /> */}
      
    </Routes>
  );
}

export default App;
