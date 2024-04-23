import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { HiOutlineBars3BottomLeft } from 'react-icons/hi2';
import { MdOutlineCancel } from 'react-icons/md';
import { IoIosLink } from 'react-icons/io';
import { BiTimer } from 'react-icons/bi';
import { SiTask } from 'react-icons/si';
import { LiaGlassCheersSolid } from 'react-icons/lia';

import Loader from './Loader';
import axios from 'axios';
import 'react-datetime/css/react-datetime.css';
import Datetime from 'react-datetime';
import moment from 'moment';

import { apiEndpoints } from '../utils/apiEndpoints';

import { task as testTask } from '../testData';

/*
Component to be used for both editing and creating a new task
if routed to via a taskId it will have update option else Add new task
*/
const blankTask = {
  title: '',
  start: moment().toDate(),
  description: '',
  end: moment().toDate(),
  event: {
    id: '',
    title: '',
  },
};

const yesterday = moment().subtract(1, 'day');
function valid(current) {
  return current.isAfter(yesterday);
}

export default function Task() {
  const [task, setTask] = useState({ ...blankTask });
  const [events, setEvents] = useState([]);
  const { taskId } = useParams();
  const [id, _] = useState(taskId);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isTaskEdit = !!taskId && taskId !== 'new';

  const getEvents = async () => {
    const url = apiEndpoints.GET_EVENTS;
    let resp = null;
    try {
      resp = await axios.get(url);
    } catch (error) {
      console.log('Error fetching events');
    }

    if (resp?.data?.events) setEvents([...resp?.data?.events]);
    setLoading(false);
  };

  const getTask = async () => {
    const url = apiEndpoints.GET_SINGLE_TASK.replace('<TASK_ID>', taskId);
    try {
      const resp = await axios.get(url);
      const rawTask = resp?.data;

      const safe_task = {
        ...rawTask,
        start: moment(rawTask.start).toDate(),
        end: moment(rawTask.end).toDate(),
      }
      setTask(safe_task );
      
      setLoading(false);
    } catch (error) {
      console.log('Invalid task ID');
    }
  };

  useEffect(() => {
    if (!isTaskEdit) {
      getEvents();
    } else {
      getTask();
    }
  }, [id]);

  const updateTask = (attribute, val) => {
    console.log(attribute, val);
    setTask((prevTask) => {
      const updatedTask = {
        ...prevTask,
        [attribute]: val,
      };
      return updatedTask;
    });
  };

  const handleUpdateClick = async () => {
    const url = apiEndpoints.UPDATE_TASK.replace('<TASK_ID>', taskId);
    let resp = null;
    try {
      resp = await axios.patch(url, task);
    } catch (error) {
      console.log('error updating task');
    }

    if (resp?.data) navigate('/');
  };

  const handleAddClick = async () => {
    const url = apiEndpoints.ADD_TASK;
    let resp = null;
    try {
      resp = await axios.post(url, task);
    } catch (error) {
      console.log('error adding task');
    }

    if (resp?.data) {
      console.log('Added successfully, should redirect to event');
      navigate('/');
    }
  };

  const setChosenEvent = (eventId) => {
    setTask((prevTask) => {
      const updatedTask = {
        ...prevTask,
        [prevTask.event.id]: eventId,
      };
      ;
      return updatedTask;
    });
  };

  if (loading)
    return <Loader message='Preparing Form...'/>

  return (
    <div className='flex flex-col p-4 gap-5 text-slate-900'>
      <div className='flex items-center gap-4'>
        <SiTask className='w-6 h-6' />
        <div className='flex items-center justify-between rounded-md border-b-2 border-gray-200 focus:border-gray-400 p-2 w-3/4'>
          <input
            placeholder='Give a title'
            className='text-2xl outline-none flex-1'
            value={task?.title || ''}
            onChange={(e) => updateTask('title', e.target.value)}
          />
          <MdOutlineCancel
            className='w-6 h-6 cursor-pointer text-gray-400 hover:text-gray-700'
            onClick={(e) => updateTask('title', '')}
          />
        </div>
        <div className='flex items-center gap-2 text-slate-600'>
          <button
            className='flex items-center justify-center p-2 rounded-md bg-purple-200 capitalize hover:text-white hover:bg-purple-500'
            onClick={(e) => {
              if (isTaskEdit) handleUpdateClick();
              else handleAddClick();
            }}
          >
            {isTaskEdit ? 'update' : 'add task'}
          </button>
          <button
            onClick={(e) => navigate('/')}
            className='p-2 rounded-md bg-gray-200 capitalize hover:text-white hover:bg-gray-700'
          >
            cancel
          </button>
        </div>
      </div>
      <div className='flex flex-auto items-center gap-4'>
        <BiTimer className='w-6 h-6' />
        <Datetime
          value={task?.start || moment()}
          dateFormat='dddd, MMMM Do'
          timeFormat='hh:mm a'
          isValidDate={valid}
          onChange={(date) => {
            updateTask('start', moment(date).toDate());
            if (moment(task.end).isBefore(moment(date)))
              updateTask('end', date);
          }}
          className='rounded-md outline-none border-gray-300 border-b-2 focus:border-gray-500'
        />
        <span>to</span>
        <Datetime
          value={task?.end || moment()}
          dateFormat='dddd, MMMM Do'
          timeFormat='hh:mm a'
          isValidDate={valid}
          onChange={(date) => updateTask('end', moment(date).toDate())}
          className='rounded-md outline-none border-gray-300 border-b-2 focus:border-gray-500'
        />
      </div>
      <div className='flex items-center gap-4 border-b-2 border-transparent'>
        <LiaGlassCheersSolid className='w-6 h-6' />
        {isTaskEdit ? (
          <div className='flex items-center gap-2'>
            <span className='text-md capitalize'>Event:</span>
            <Link
              to={`/events/${task?.event?.id}`}
              className='flex gap-1 rounded-md pl-1 capitalize text-md text-gray-500 cursor-pointer transition ease-in-out delay-50 border-b hover:border-gray-500'
            >
              <span>{task?.event?.title}</span>
              <IoIosLink className='w-4 h-4' />
            </Link>
          </div>
        ) : (
          <div className='flex items-center'>
            <select
              className='py-2 pr-28 rounded-md text-gray-800 bg-white capitalize border-gray-300 border-b-2 focus:outline:none'
              onChange={(e) => setChosenEvent(e.target.value)}
            >
              <option value=''>Choose an event</option>
              {events.map((event, i) => {
                return (
                  <option
                    key={i}
                    value={event.id}
                    className='capitalize text-gray-700 :bg-indigo-500'
                  >
                    {event.description}
                  </option>
                );
              })}
            </select>
          </div>
        )}
      </div>
      <div className='flex gap-4'>
        <HiOutlineBars3BottomLeft className='w-7 h-7' />
        <textarea
          cols='50'
          rows='10'
          className='w-3/4 resize-none outline-none border-b-2 border-gray-300 overflow-y-auto rounded-md'
          placeholder='Describe the task'
          value={task?.description}
          onChange={(e) => updateTask('description', e.target.value)}
        />
      </div>
    </div>
  );
}
