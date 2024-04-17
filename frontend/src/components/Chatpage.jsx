import React, { useState } from 'react';
import axios from 'axios';
import { RiQuestionMark, RiSendPlaneFill } from 'react-icons/ri';
import { BiPaint } from 'react-icons/bi';
import { PiLightbulb } from 'react-icons/pi';
import { FaSyncAlt, FaEraser, FaCheck } from 'react-icons/fa';
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
    }
  ],
};

const iconsBeforeSend = [
  {
    key: 'send',
    name: 'Send',
    icon: <RiSendPlaneFill className='w-9 h-9 p-2' />,
  },
];

const iconsAfterSend = [
  {
    key: 'regenerate',
    name: 'Regenerate',
    icon: <FaSyncAlt className='w-5 h-5 text-purple-600' />,
  },
  {
    key: 'reprompt',
    name: 'Clear',
    icon: <FaEraser className='w-5 h-5 text-gray-600' />,
  },
  {
    key: 'approve',
    name: 'Approve',
    icon: <FaCheck className='w-5 h-5 text-green-600' />,
  },
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
    setSelectedTask({ ...plan?.tasks[taskIdx] });
  };

  const handleRegenerateClick = () => {
    console.log('Regenerate button clicked'); // dummy functionality for now since we have not confirmed on the API for this yet
  };

  const handleRepromptClick = () => {
    setPrompt('');
    setPlan(null);
  };

  const handleApproveClick = () => {
    console.log('Data saved to the database'); // dummy functionality  for now to save data to the database
    navigate(''); // redirecting to the homepage
  };

  const btnOnClicks = {
    regenerate: handleRegenerateClick,
    reprompt: handleRepromptClick,
    approve: handleApproveClick,
    send: handleSendClick,
  };

  let mainContent = '';
  if (!loading) {
    if (!plan) {
      mainContent = (
        <div className='flex flex-col w-full px-4 gap-1 justify-items-start justify-center'>
          {suggestions.map((option, index) => (
            <PromptSuggestion
              key={index}
              option={option}
              setPrompt={setPrompt}
            />
          ))}
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
        </div>
      );
    }
  } else mainContent = <Loader message={'Creating a plan ...'} />;

  let buttonsToShow = '';
  if (!plan) {
    buttonsToShow = iconsBeforeSend.map((btn, i) => {
      return (
        <button
          className='flex justify-center items-center'
          title={btn.name}
          key={i}
          onClick={btnOnClicks[btn.key]}
        >
          {btn.icon}
        </button>
      );
    });
  } else {
    buttonsToShow = iconsAfterSend.map((btn, i) => {
      return (
        <button
          className='flex justify-center items-center transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110'
          title={btn.name}
          key={i}
          onClick={btnOnClicks[btn.key]}
        >
          {btn.icon}
        </button>
      );
    });
  }

  return (
    <>
      <div className='flex flex-col gap-5 h-full items-center justify-between px-4'>
        <div className='flex flex-col w-full gap-3'>
          <div className='flex flex-col px-4 py-2 items-center justify-center'>
            <p className='text-3xl text-gray-800 font-bold capitalize'>
              {plan?.title || 'Go Ahead plan your Event!'}
            </p>
            <TaskPreviewModal
              task={selectedTask}
              setSelectedTask={setSelectedTask}
            />
          </div>
          {mainContent}
        </div>
        <div className='flex justify-center items-center w-full gap-1 p-2 border-2 rounded-lg border-purple-200 focus-within:shadow-md'>
          <input
            type='text'
            className={`outline-none p-2 flex-1 hover:cursor-no-drop`}
            disabled = {!!plan}
            placeholder={plan ? 'X Disabled X' : 'Describe your event...'}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className='flex justify-center items-center gap-4'>
            {buttonsToShow}
          </div>
        </div>
      </div>
    </>
  );
}
