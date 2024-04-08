import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';

export default function Navbar() {
  return (
    <div className='flex items-center gap-2'>
      <span className='flex-1 text-2xl text-gray-500 font-semibold'>Calendar</span>
      <div className='flex items-center gap-3'>
        <div className='flex items-center justify-center rounded-md font-bold bg-purple-600 text-white px-4 py-2'>
          <FaPlus className='mr-1' />
          <span>Create</span>
        </div>
        <div className='flex gap-1 items-center justify-center'>
          <CgProfile className='w-8 h-8 ' />
          <IoMdArrowDropdown className='w-6 h-6' />
        </div>
      </div>
    </div>
  );
}
