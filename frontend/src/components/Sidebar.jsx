import React from 'react';

function Sidebar() {
  return (
    <div className="sidebar bg-gray-200 w-64 h-screen flex flex-col">
      <div className="sidebar-content flex items-center justify-start mt-10"> { }
        <img className="w-15 h-15 ml-2 mr-2" src={'./eventique_logo.jpg'} alt="Your Logo" /> { }
        <span className="sidebar-text font-bold text-xl">Eventique</span> { }
      </div>
      <div className="sidebar-item bg-purple-600 text-white py-2 px-4 font-bold mt-4 text-center relative flex justify-center items-center">
        <img className="w-6 h-6 mr-2" src={'/calendar2_icon.png'} alt="Calendar Icon" />
        <span className="sidebar-calendar" style={{ top: '-5px' }}>Calendar</span> { }
      </div>
      <div className="sidebar-image-container mt-auto">
        <img src={'/sidebar_image.png'} alt="Sidebar Image" className="w-full" />
      </div>
    </div>
  );
}

export default Sidebar;
