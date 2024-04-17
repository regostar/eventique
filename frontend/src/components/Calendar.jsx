import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import axios from 'axios';
import moment from 'moment';

import { apiEndpoints } from '../utils/apiEndpoints';
import TaskPreviewModal from './TaskPreviewModal';

const aspectRatio = window.screen.width / window.screen.height;

export default function Calendar() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

  const fetchAndRenderTasks = async (dateInfo) => {
    const start = moment(dateInfo.start).toISOString();
    const end = moment(dateInfo.end).toISOString();

    const url = apiEndpoints.GET_TASKS.replace('<START_TIME>', start).replace(
      '<END_TIME>',
      end
    );

    let resp = null;
    try {
      resp = await axios.get(url);
    } catch (error) {
      console.log('error fetching task');
    }
    if (!resp?.data?.tasks) return;

    setTasks(resp.data.tasks);
  };

  const renderEventContent = (eventInfo) => {
    const startTime = moment(eventInfo.event.start).format('hh:mm a');
    return (
      <div className='flex gap-1 p-1 bg-blue-300 text-black rounded-md border-1 border-black hover:bg-blue-400 cursor-pointer'>
        <b>{startTime}</b>
        <i>{eventInfo.event.title}</i>
      </div>
    );
  };

  const handleTaskClick = (eventClickInfo) => {
    const taskRaw = eventClickInfo.event;
    const task = {
      start: taskRaw.start,
      end: taskRaw.end,
      title: taskRaw.title,
      ...taskRaw?._def?.extendedProps,
      // task id is in _def.publicId
      taskId: taskRaw?._def?.publicId,
    };
    setSelectedTask(task);
  };

  return (
    <>
      <TaskPreviewModal task={selectedTask} setSelectedTask={setSelectedTask} />
      <FullCalendar
        events={tasks} //adds tasks to calendar
        eventContent={renderEventContent} //allows to custom set task display format on calendar
        aspectRatio={aspectRatio + 0.25}
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay',
        }}
        initialView='dayGridMonth'
        datesSet={fetchAndRenderTasks} //triggered every time visible date range changes
        eventClick={handleTaskClick}
      />
    </>
  );
}
