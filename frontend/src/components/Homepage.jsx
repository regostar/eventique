import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Calendar from './Calendar';
import Profile from './Profile';
import Chatpage from './Chatpage';

function Homepage() {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 h-full flex flex-col px-4 py-2 gap-4'>
        <Navbar />
        <div>
          <Routes>
            <Route path='' element={<Calendar />} />
            <Route path='/event-gen' element={<Chatpage />} />
            <Route path='/user-profile/:userId' element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
