import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { HiOutlineBars3BottomLeft } from 'react-icons/hi2';
import { BiTimer } from 'react-icons/bi';
import { SiTask } from 'react-icons/si';
import { LiaGlassCheersSolid } from 'react-icons/lia';

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
  const { taskId } = useParams();
  const [id, _] = useState(taskId);
  const navigate = useNavigate();
  const isTaskEdit = !!taskId && taskId !== 'new';
  console.log("task edit ",isTaskEdit);

  console.log(task);
  const getEvents = () => {
    const url = apiEndpoints.GET_EVENTS;
    let resp = null;
    try {
      // resp = await axios.get(url);
    } catch (error) {
      console.log('Error fetching events');
    }
  };

  const getTask = () => {
    const url = apiEndpoints.GET_SINGLE_TASK.replace('<TASK_ID>', taskId);
    let resp = null;
    try {
      // resp = await axios.get(url);
      // setTask({ ...resp?.data });
    } catch (error) {
      console.log('Invalid task ID');
    }
    setTask({ ...testTask });
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

  return (
    <div className='flex flex-col p-4 gap-5'>
      <div className='flex items-center gap-4'>
        <SiTask className='w-6 h-6' />
        <input
          placeholder='Give a title'
          className='text-2xl outline-none border-b-2 border-gray-200 focus:border-gray-400 p-2 w-full'
          value={task?.title || ''}
          onChange={(e) => updateTask('title', e.target.value)}
        />
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
          className='w-fit outline-none border-gray-300 border-b-2 focus:border-gray-500'
        />
        <span>to</span>
        <Datetime
          value={task?.end || moment()}
          dateFormat='dddd, MMMM Do'
          timeFormat='hh:mm a'
          isValidDate={valid}
          onChange={(date) => updateTask('end', moment(date).toDate())}
          className='outline-none border-gray-300 border-b-2 focus:border-gray-500'
        />
      </div>
      <div className='flex items-center gap-4'>
        <LiaGlassCheersSolid className='w-6 h-6' />
        {isTaskEdit ? (
          <div className='flex gap-1'>
            <span className='text-md capitalise'>Event:</span>
            <Link
              to={`/events/${task?.event?.id}`}
              className='capitalise text-md text-gray-500 cursor-pointer transition ease-in-out delay-50 hover:border-b hover:border-gray-300'
            >
              {task?.event?.title}
            </Link>
          </div>
        ) : (
          <select>
            <option value='some Event'>Choose an event</option>
          </select>
        )}
      </div>
      <div className='flex gap-4'>
        <HiOutlineBars3BottomLeft className='w-7 h-7' />
        <textarea
          cols='30'
          rows='10'
          className='w-1/2 resize-none outline-none border-b-2 border-gray-300 overflow-y-auto'
          placeholder='Describe the task'
          value={task?.description}
          onChange={(e) => updateTask('description', e.target.value)}
        />
      </div>
    </div>
  );
}
