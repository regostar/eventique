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

// Use the test Data when needed
//import { testEvent } from '../testData';

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

  // console.log(testEvent);

  const fetchNSetPlan = async (url) => {
    let resp = null;
    try {
      setLoading(true);
      resp = await axios.get(url);
    } catch (error) { 
      console.log('error fetching event plan');
    }

    setLoading(false);

    if (resp?.data) {
      setPlan(resp?.data?.event);
    }
  };

  const handleSendClick = async () => {
    const url = apiEndpoints.GEN_EVENT.replace('<PROMPT>', prompt);
    await fetchNSetPlan(url);
    // setPlan(testEvent);
  };

  const handleRegenerateClick = async () => {
    const url = apiEndpoints.REGEN_EVENT.replace('<PROMPT>', prompt);
    await fetchNSetPlan(url);
  };

  const taskClickHandler = (taskIdx) => {
    setSelectedTask({ ...plan?.tasks[taskIdx] });
  };

  const handleRepromptClick = () => {
    setPrompt('');
    setPlan(null);
  };

  const handleApproveClick = async () => {
    const url = apiEndpoints.APPROVE_PLAN;
    try {
      await axios.post(url, plan);
    } catch (error) {
      console.log('Error approving plan');
      return;
    }

    console.log('Data saved to the database');
    navigate('/'); // redirecting to the homepage
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
      const shouldScroll = plan.tasks.length > 6; // condition to add the scrollbar
      mainContent = (
        // defining the height of the shouldScroll variable and preventing excessive scrolling
        <div className={`overflow-y-${shouldScroll ? 'auto' : 'hidden'} flex flex-col gap-2 justify-start w-full p-2`} style={{ maxHeight: shouldScroll ? 'calc(100vh - 300px)' : 'auto' }}> 
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
            disabled={!!plan}
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
