import React from 'react';
import { IoCalendarOutline } from 'react-icons/io5';

import eventique_logo from '../assets/login/logo.jpg';
import sidebar_image from '../assets/Homepage/sidebar_image.png';

function Sidebar() {
  return (
    <div className='bg-gray-200 flex flex-col overflow-y-scroll hide-scrollbar'>
      <div className='flex items-center justify-start py-2'>
        <img
          className='w-12 h-12 ml-2 mr-2'
          src={eventique_logo}
          alt='Eventique Logo'
        />
        <span className='font-bold text-xl text-gray-800'>Eventique</span>
      </div>
      <div className='px-4'>
        <div className='flex items-center gap-2 rounded-md bg-purple-600 text-white py-2 px-4 font-bold mt-4 text-center relative'>
          <IoCalendarOutline className='w-6 h-6' />
          <span className='text-lg'>Calendar</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
