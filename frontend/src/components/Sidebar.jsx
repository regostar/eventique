import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoCalendarOutline } from 'react-icons/io5';
import { BsStars } from 'react-icons/bs';

import eventique_logo from '../assets/login/logo.jpg';

const sidebarOptions = [
  {
    name: 'Calendar',
    icon: <IoCalendarOutline className='w-6 h-6' />,
    linkTo: '',
  },
  {
    name: 'plan event',
    icon: <BsStars className='w-6 h-6' />,
    linkTo: '/event-gen',
  },
];
// active and inactive classes to be set later for better UX
const isNotActiveStyle =
  'flex items-center gap-2 rounded-md bg-purple-500 text-white py-2 px-4 font-bold mt-4 text-center relative';
const isActiveStyle =
  'flex items-center gap-2 rounded-md bg-purple-500 text-white py-2 px-4 font-bold mt-4 text-center relative';


function Sidebar({setActivePageName}) {
  return (
    <div className='bg-gray-200 rounded-lg mx-3 my-2 flex flex-col overflow-y-scroll hide-scrollbar'>
      <div className='flex items-center justify-start py-2'>
        <img
          className='w-12 h-12 ml-2 mr-2'
          src={eventique_logo}
          alt='Eventique Logo'
        />
        <span className='font-bold text-xl text-gray-800'>Eventique</span>
      </div>
      <div className='px-4'>
        {sidebarOptions.map((option, i) => {
          return (
            // <div key={i} className=>
            <NavLink
              to={option.linkTo}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={(e) => setActivePageName(option.name)}
            >
              {option.icon}
              <span className='text-lg capitalize'>{option.name}</span>
            </NavLink>
            // </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
