import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IoCube } from 'react-icons/io5';
import { BiTimer } from 'react-icons/bi';
import { HiOutlineBars3BottomLeft } from 'react-icons/hi2';
import moment from 'moment';

import { apiEndpoints } from '../utils/apiEndpoints';
import { testEvent } from '../testData';
import Loader from './Loader';
import TaskOverview from './TaskOverview';
import TaskPreviewModal from './TaskPreviewModal';

export default function Event() {
  const { eventId } = useParams();
  const [id, _] = useState(eventId);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const taskClickHandler = (taskIdx) => {
    setSelectedTask({ ...event?.tasks[taskIdx] });
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const formattedDate = moment(dateTime).format('Do MMM');
    const formattedTime = moment(dateTime).format('h:mm A');
    return `${formattedDate} ${formattedTime}`;
  };

  const fetchEventDetails = async () => {
    const url = apiEndpoints.GET_SINGLE_EVENT.replace('<EVENT_ID>', eventId);
    try {
      setLoading(true);
      // const resp = await axios.get(url);
      // if (resp?.data?.event)
      //     setEvent({...resp?.data?.event});
      setEvent({ ...testEvent });
    } catch (error) {
      console.log('Error fetching event details');
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await fetchEventDetails();
    })();
  }, [id]);

  if (loading) return <Loader message='Preparing the view...' />;

  return (
    <div className='flex flex-col gap-4 h-full overflow-y-auto w-full py-2'>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col'>
          <div className='flex gap-2 items-center justify-start p-2'>
            <IoCube className='w-6 h-6' />
            <p className='flex-1 text-2xl text-gray-800 capitalize'>
              {event?.title}
            </p>
          </div>
          <div className='flex gap-2 items-center text-md text-gray-500 justify-start p-2'>
            <BiTimer className='w-6 h-6' />
            <span>
              {` ${formatDateTime(event?.start)}`}
              {moment(event?.start).isSame(event?.end, 'day')
                ? ` - ${moment(event?.end).format('h:mm A')}`
                : ` - ${formatDateTime(event?.end)}`}
            </span>
          </div>
        </div>
        {event?.purpose && (
          <div className='flex gap-2 items-center justify-start p-2'>
            <HiOutlineBars3BottomLeft className='text-md w-7 h-7' />
            <p className='text-md text-gray-700'>{event?.purpose}</p>
          </div>
        )}
      </div>
      {event?.tasks && (
        <div className='flex flex-col gap-2 justify-center items-center p-2 '>
          <p className='text-xl text-gray-800 font-bold'>Tasks</p>
          <TaskPreviewModal
            task={selectedTask}
            setSelectedTask={setSelectedTask}
          />
          <div
            className={`overflow-y-scroll max-h-[50vh] bg-transparent rounded-md shadow-inner hide-scrollbar flex flex-col gap-2 justify-start w-full p-2`}
          >
            {event?.tasks?.map((task, idx) => (
              <TaskOverview
                key={idx}
                title={task?.title}
                start={task?.start}
                end={task?.end}
                clickHandler={(e) => taskClickHandler(idx)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
