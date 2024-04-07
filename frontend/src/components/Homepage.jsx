import React, {useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import axios from 'axios';
import moment from 'moment';

import Sidebar from './Sidebar';
import Navbar from './Navbar';

import { apiEndpoints } from '../utils/apiEndpoints';

const aspectRatio = window.screen.width/window.screen.height;

function Homepage() {
  const [tasks, setTasks] = useState([])

  const fetchAndRenderTasks = async (dateInfo) => {
    const start = moment(dateInfo.start).toISOString()
    const end = moment(dateInfo.end).toISOString()
    
    const url = apiEndpoints.GET_TASKS.replace('<START_TIME>', start).replace('<END_TIME>', end);

    let resp = null;
    try {
      resp = await axios.get(url);
    } catch (error) {
      console.log('error fetching task');
    }
    if(!resp?.data?.tasks)
      return 

    setTasks(resp.data.tasks);
  }

  const renderEventContent = (eventInfo) => {
    const startTime = moment(eventInfo.event.start).format('hh:mm a');
    return (
      <div className='flex gap-1 px-1'>
        <b>{startTime}</b>
        <i>{eventInfo.event.title}</i>
      </div>
      )
  }

  return (
      <div className='flex'>
        <Sidebar />
        <div className='flex-1 h-full flex flex-col px-4 py-2 gap-4'>
          <Navbar/>
          <div className=''>
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
            />
          </div>
        </div>
      </div>
  );
}

export default Homepage;
