import React from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';

export default function Navbar({ pageName, setActivePageName }) {
  return (
    <div className='flex items-center gap-2'>
      <span className='flex-1 text-2xl text-gray-500 font-semibold capitalize'>
        {pageName}
      </span>
      <div className='flex items-center gap-3'>
        <Link
          to='/event-gen'
          onClick={() => setActivePageName('plan event')}
          className='flex items-center justify-center rounded-md font-bold bg-purple-500 text-white px-4 py-2'
        >
          <FaPlus className='mr-1' />
          <span>Create</span>
        </Link>
        <div className='flex gap-1 items-center justify-center'>
          <CgProfile className='w-8 h-8 ' />
          <IoMdArrowDropdown className='w-6 h-6' />
        </div>
      </div>
    </div>
  );
}
