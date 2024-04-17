import React from 'react';
import moment from 'moment';

export default function TaskOverview({ title, start, end, clickHandler }) {
  return (
    <div
      className='flex justify-between items-center rounded-lg w-full cursor-pointer p-3 border-2 border-gray-400'
      onClick={clickHandler}
    >
      <p className='text-lg capitalize'>{title}</p>
      <div className='flex flex-col justify-between text-gray-400 italic'>
        <span>{moment(start).format('Do MMM, ddd h:mm a')}</span>
        <span>{moment(end).format('Do MMM, ddd h:mm a')}</span>
      </div>
    </div>
  );
}
