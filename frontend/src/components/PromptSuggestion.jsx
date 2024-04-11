import React from 'react';

export default function PromptSuggestion({ option, setPrompt }) {
  return (
    <div
      className='flex justify-start p-1 border-2 border-gray-100 hover:border-gray-300 hover:cursor-pointer rounded-md gap-2 items-center p-2'
      onClick={(e) => setPrompt(option.display)}
    >
      <div className='flex justify-center bg-[#F6FCE8FF] p-4 rounded-sm'>{option.icon}</div>
      <p>{option.display}</p>
    </div>
  );
}
