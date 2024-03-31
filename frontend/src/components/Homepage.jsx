import React from 'react';
<<<<<<< Updated upstream
import Sidebar from './Sidebar'; 
=======
import Sidebar from './Sidebar';
import { CgProfile } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
>>>>>>> Stashed changes

function App() {
  return (
    <div className="relative">
      <div className="absolute top-0 right-0">
        <div className="flex items-center space-x-4 mt-4 mr-4">
          <div className="bg-purple-600 text-white px-4 py-2 font-bold flex items-center">
            <FaPlus className="mr-1" />
            <span>Create</span>
          </div>
          <div className="inline-block">
            <CgProfile className="w-8 h-8 mr-0.5" />
          </div>
          <div className="inline-block">
            <IoMdArrowDropdown className="w-6 h-6 mt-1 mr-6" />
          </div>
        </div>
      </div>
      <div className="flex items-start">
        <Sidebar />
        <span className="text-black px-4 py-2 font-bold ml-2 mt-4 text-2xl">
          Calendar
        </span>
      </div>
    </div>
  );
}

export default App;
