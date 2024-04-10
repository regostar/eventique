import React, { useState } from 'react';
import { RiQuestionMark, RiSendPlaneFill } from 'react-icons/ri';
import { BiPaint } from 'react-icons/bi';

const suggestions = [
  { display: 'Plan for birthday party', icon: <RiQuestionMark /> },
  {
    display: 'create a roadmap to host a small formal meetup',
    icon: <BiPaint />,
  },
];

export default function Chatpage() {
  const [prompt, setPrompt] = useState('')
  return (
    <>
      <div className='flex flex-col gap-5 h-full justify-start items-center px-4'>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col px-4 py-2 items-center justify-center'>
            <p className='text-3xl text-gray-800 font-bold'>
              Go Ahead plan your Event!
            </p>
          </div>
          <div className='flex flex-col w-full gap-1 items-center justify-center'>
            {suggestions.map((option) => {
              return (
                <div className='flex justify-center gap-2 items-center p-2'>
                  {option.icon}
                  <p>{option.display}</p>
                </div>
              );
            })}
          </div>
        </div>
          <div className='flex flex-1 absolute bottom-0 justify-center items-center w-full mt-auto p-2 border-2 rounded-lg border-purple-200 focus:shadow-md'>
            <input
              type='text'
              className='outline-none p-2 flex-1'
              placeholder='Describe your event...'
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <RiSendPlaneFill className='w-9 h-9 p-2' />
          </div>
        </div>
    </>
  );
}
