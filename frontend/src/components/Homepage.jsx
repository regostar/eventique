import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Calendar from './Calendar';
import Profile from './Profile';
import Chatpage from './Chatpage';
import HomeEvents from './HomeEvents';
import Task from './Task';

function Homepage() {
  const [activePageName, setActivePageName] = useState('calendar')
  return (
    <div className='flex h-screen'>
      <Sidebar setActivePageName = {setActivePageName}/>
      <div className='flex-1 h-full flex flex-col px-4 py-2 gap-4'>
        <Navbar pageName = {activePageName} setActivePageName={setActivePageName}/>
        <div className='relative h-screen'>
          <Routes>
            <Route path='' element={<Calendar />} />
            <Route path='/event-gen' element={<Chatpage />} />
            <Route path='/user-profile/:userId' element={<Profile />} />
            <Route path='/events' element={<HomeEvents />}/>
            <Route path='/tasks/:taskId' element={<Task/>}/>
            <Route path='/tasks/new' element={<Task/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
