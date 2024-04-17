import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { apiEndpoints } from '../utils/apiEndpoints';

import { task as testTask } from '../testData';

/*
Component to be used for both editing and creating a new task
if routed to via a taskId it will have update option else Add new task
*/
const blankTask = {
  title: '',
  start: '',
  description: '',
  end: '',
  event: {
    id: '',
    title: '',
  },
};

export default function Task() {
  const [task, setTask] = useState({ ...blankTask });
  const { taskId } = useParams();
  const [id, _] = useState(taskId)
  const navigate = useNavigate();

  const getEvents = () => 
  {
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
    if (!taskId || taskId == 'new') {
      getEvents();
    } else {
      getTask();
    }
  }, [id]);

  const updateTask = (attribute, val) => {
    setTask((prevTask) => {
      const updatedTask = {
        ...prevTask,
        [attribute]: val,
      };
      setTask(updatedTask);
    });
  };

  return (
    <div className='flex flex-col p-4 gap-2'>
      <input
        placeholder='Give a title'
        className='text-2xl outline-none border-b-2 border-gray-200 focus:border-gray-400 p-2 w-full'
        value={task?.title}
        onChange={(e) => updateTask('title', e.target.value)}
      />
    </div>
  );
}
