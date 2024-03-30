import React from 'react';
import Sidebar from './Sidebar'; 

function App() {
  return (
    <div className="relative">
      <div className="absolute top-0 right-0">
        <div className="flex items-center space-x-4 mt-4 mr-4"> { }
          <div className="bg-purple-600 text-white px-4 py-2 font-bold">
            + Create
          </div>
          <div className="profile-icon">
            {/* Inserting the profile icon */}
            <img src="profile-icon.png" alt="Profile Icon" className="w-8 h-8 rounded-full" />
          </div>
          <div className="down-arrow-icon">
            {/* Inserting the down arrow icon*/}
            <img src={process.env.PUBLIC_URL + '/down_arrow.png'} alt="down-arrow-icon" className="w-4 h-4 mt-1 mr-2" /> { }
          </div>
        </div>
      </div>
      <div className="app-container">
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
