import React from 'react';
import { IoCalendarOutline } from "react-icons/io5";

import eventique_logo from '../assets/login/logo.jpg';
import sidebar_image from '../assets/Homepage/sidebar_image.png';

function Sidebar() {
  return (
    <div className="bg-gray-200 w-64 h-screen flex flex-col">
      <div className="flex items-center justify-start mt-10">
        <img className="w-12 h-12 ml-2 mr-2" src={eventique_logo} alt="Your Logo" />
        <span className="font-bold text-xl text-gray-800">Eventique</span>
      </div>
      <div className="bg-purple-600 text-white py-2 px-4 font-bold mt-4 text-center relative flex justify-center items-center">
        <IoCalendarOutline className="w-6 h-6 mr-2" />
        <span className="text-lg">Calendar</span>
      </div>
      <div className="mt-auto flex justify-center">
        <img src={sidebar_image} alt="Sidebar Image" className="w-full" />
      </div>
    </div>
  );
}

export default Sidebar;
