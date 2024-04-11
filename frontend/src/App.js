import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Homepage from './components/Homepage';

function App() {
  return (
    <Routes>
      <Route path='/login' exact element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/*' element={<Homepage/>} />
    </Routes>
  );
}

export default App;
