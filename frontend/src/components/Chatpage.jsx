import React, { useState } from 'react';
import axios from 'axios';
import { RiQuestionMark, RiSendPlaneFill } from 'react-icons/ri';
import { BiPaint } from 'react-icons/bi';
import { PiLightbulb } from 'react-icons/pi';
import { FaSyncAlt, FaPen, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 

import PromptSuggestion from './PromptSuggestion';
import TaskOverview from './TaskOverview';
import TaskPreviewModal from './TaskPreviewModal';

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

const testEvent = {
  title: 'abc',
  tasks: [
    {
      title: 'Find Venue',
      start: '2023-07-02T09:00:00Z',
      description:
        'Look for a suitable venue that can accommodate 15 guests and is within the budget.',
      end: '2023-07-03T17:00:00Z',
    },
    {
      title: 'Book catering',
      start: '2023-07-01T09:00:00Z',
      end: '2023-07-01T17:00:00Z',
      description:
        'Contact caterers and finalize vegetarian meal for 15 guests, ensuring it fits within the budge.',
    },
    {
      title: 'Book catering',
      start: '2023-07-01T09:00:00Z',
      end: '2023-07-01T17:00:00Z',
      description:
        'Contact caterers and finalize vegetarian meal for 15 guests, ensuring it fits within the budge.',
    },
    {
      title: 'Book catering',
      start: '2023-07-01T09:00:00Z',
      end: '2023-07-01T17:00:00Z',
      description:
        'Contact caterers and finalize vegetarian meal for 15 guests, ensuring it fits within the budge.',
    },
    {
      title: 'Book catering',
      start: '2023-07-01T09:00:00Z',
      end: '2023-07-01T17:00:00Z',
      description:
        'Contact caterers and finalize vegetarian meal for 15 guests, ensuring it fits within the budge.',
    },    {
      title: 'Book catering',
      start: '2023-07-01T09:00:00Z',
      end: '2023-07-01T17:00:00Z',
      description:
        'Contact caterers and finalize vegetarian meal for 15 guests, ensuring it fits within the budge.',
    },    {
      title: 'Book catering',
      start: '2023-07-01T09:00:00Z',
      end: '2023-07-01T17:00:00Z',
      description:
        'Contact caterers and finalize vegetarian meal for 15 guests, ensuring it fits within the budge.',
    },    {
      title: 'Book catering',
      start: '2023-07-01T09:00:00Z',
      end: '2023-07-01T17:00:00Z',
      description:
        'Contact caterers and finalize vegetarian meal for 15 guests, ensuring it fits within the budge.',
    },
    {
      title: 'Book catering',
      start: '2023-07-01T09:00:00Z',
      end: '2023-07-01T17:00:00Z',
      description:
        'Contact caterers and finalize vegetarian meal for 15 guests, ensuring it fits within the budge.',
    },
    {
      title: 'Book catering',
      start: '2023-07-01T09:00:00Z',
      end: '2023-07-01T17:00:00Z',
      description:
        'Contact caterers and finalize vegetarian meal for 15 guests, ensuring it fits within the budge.',
    },
  ],
}

const buttonsToShow = [
  { name: 'Regenerate', icon: <FaSyncAlt />, color: 'text-purple-600' },
  { name: 'Reprompt', icon: <FaPen />, color: 'text-gray-600' },
  { name: 'Approve', icon: <FaCheck />, color: 'text-green-600' }
];

export default function Chatpage() {
  const [prompt, setPrompt] = useState('');
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate(); 

  const handleSendClick = async () => {
    const url = apiEndpoints.GEN_EVENT.replace('<PROMPT>', prompt);
    let resp = null;
    try {
      setLoading(true);
      // resp = await axios.get(url);
    } catch (error) {
      console.log('error fetching event plan');
    }

    setLoading(false);

    // if (resp?.data) {
    //   console.log(resp?.data);
    //   setPlan(resp?.data?.event);
    // }
    setPlan(testEvent);
  };

  const taskClickHandler = (taskIdx) => {
    setSelectedTask({...plan?.tasks[taskIdx]})
  }

  const handleRegenerateClick = () => {
    console.log('Regenerate button clicked'); // dummy functionality for now since we have not confirmed on the API for this yet
  };

  const handleRepromptClick = () => {
    setPrompt('');
    setPlan(null);
  };

  const handleApproveClick = () => {
    console.log('Data saved to the database'); // dummy functionality  for now to save data to the database
    navigate('/Homepage'); // redirecting to the homepage 
  };

  let mainContent = '';
  if (!loading) {
    if (!plan) {
      mainContent = (
        <div className='flex flex-col w-full px-4 gap-1 justify-items-start justify-center'>
          {suggestions.map((option, index) => (
            <PromptSuggestion key={index} option={option} setPrompt={setPrompt} />
          ))}
          <div className='flex justify-center items-center w-full mt-64 p-2 border-2 rounded-lg border-purple-200 focus-within:shadow-md'>
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
      );
    } else {
      mainContent = (
        <div className='overflow-y-auto flex flex-col gap-2 justify-start w-full p-2'>
          {plan?.tasks?.map((task, idx) => (
            <TaskOverview
              key={idx}
              title={task?.title}
              start={task?.start}
              end={task?.end}
              clickHandler={(e) => taskClickHandler(idx)}
            />
          ))}
          <div className='flex justify-around mt-4'>
            {buttonsToShow.map((button, index) => (    
              <div key={index} className='flex flex-col items-center mt-40'>
                {/* redirecting a button for each item in the buttonsToShow array  */}
                <button className={`icon-btn ${button.color}`} onClick={button.name === 'Reprompt' ? handleRepromptClick : (button.name === 'Regenerate' ? handleRegenerateClick : (button.name === 'Approve' ? handleApproveClick : null))}>{button.icon}</button> 
                <span>{button.name}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
  } else mainContent = <Loader message={'Creating a plan ...'} />;

  return (
    <>
      <div className='flex flex-col gap-5 h-full items-center px-4'>
        <div className='flex flex-col w-full flex-1 gap-3'>
          <div className='flex flex-col px-4 py-2 items-center justify-center'>
            <p className='text-3xl text-gray-800 font-bold'>
              Go Ahead plan your Event!
            </p>
            <TaskPreviewModal task={selectedTask} setSelectedTask={setSelectedTask}/>
          </div>
          {mainContent}
        </div>
      </div>
    </>
  );
}
