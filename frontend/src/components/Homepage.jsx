import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Calendar from './Calendar';
import Profile from './Profile';
import Chatpage from './Chatpage';
import HomeEvents from './HomeEvents';
import Task from './Task';
import Event from './Event';



function Homepage() {
  (function() {
      let token = localStorage.getItem('authToken');
      if (token) {
          axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      } else {
          axios.defaults.headers.common['Authorization'] = null;
          /*if setting null does not remove Authorization header then try     
            delete axios.defaults.headers.common['Authorization'];
          */
      }
  })();
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
            <Route path='/events/:eventId' element={<Event />}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
