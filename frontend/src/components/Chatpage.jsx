import React, { useState } from 'react';
import axios from 'axios';
import { RiQuestionMark, RiSendPlaneFill } from 'react-icons/ri';
import { BiPaint } from 'react-icons/bi';
import { PiLightbulb } from 'react-icons/pi';

import PromptSuggestion from './PromptSuggestion';
import Loader from './Loader';

import { apiEndpoints } from '../utils/apiEndpoints';

const iconCSS = 'w-6 h-6 text-[#9BD61DFF]';
const suggestions = [
  {
    display: 'Plan for birthday party',
    icon: <RiQuestionMark className={iconCSS} />,
  },
  {
    display: 'create a roadmap to host a small formal meetup',
    icon: <BiPaint className={iconCSS} />,
  },
  {
    display: 'I wish to surprise my in-laws coming this weekend, what do I do?',
    icon: <PiLightbulb className={iconCSS} />,
  },
];

export default function Chatpage() {
  const [prompt, setPrompt] = useState('');
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendClick = async (e) => {
    const url = apiEndpoints.GEN_EVENT.replace('<PROMPT>', prompt);
    let resp = null;
    try {
      setLoading(true);
      resp = await axios.get(url);
    } catch (error) {
      console.log('error fetching event plan');
    }

    setLoading(false);

    if (resp?.data?.response) {
      console.log(resp?.data?.response);
      setPlan(
        resp?.data?.response.replace(' ', '&nbsp;').replace('\n', '<br>')
      );
    }
  };

  let mainContent = '';
  if (!loading) {
    mainContent = !plan ? (
      <div className='flex flex-col w-full px-4 gap-1 justify-items-start justify-center'>
        {suggestions.map((option) => (
          <PromptSuggestion option={option} setPrompt={setPrompt} />
        ))}
      </div>
    ) : (
      <div
        className='overflow-y-auto'
        dangerouslySetInnerHTML={{ __html: plan }}
      />
    );
  } else mainContent = <Loader message={'Creating a plan ...'} />;

  return (
    <>
      <div className='flex flex-col gap-5 h-full justify-start items-center px-4'>
        <div className='flex flex-col w-full gap-3'>
          <div className='flex flex-col px-4 py-2 items-center justify-center'>
            <p className='text-3xl text-gray-800 font-bold'>
              Go Ahead plan your Event!
            </p>
          </div>
          {mainContent}
        </div>
        <div className='flex flex-1 absolute bottom-2 justify-center items-center w-full mt-auto p-2 border-2 rounded-lg border-purple-200 focus-within:shadow-md'>
          <input
            type='text'
            className='outline-none p-2 flex-1'
            placeholder='Describe your event...'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <RiSendPlaneFill
            className='w-9 h-9 p-2 cursor-pointer'
            onClick={handleSendClick}
          />
        </div>
      </div>
    </>
  );
}
