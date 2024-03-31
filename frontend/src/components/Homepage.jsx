import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!

import Sidebar from './Sidebar';
import Navbar from './Navbar';

const aspectRatio = window.screen.width/window.screen.height;

function Homepage() {
  return (
      <div className='flex'>
        <Sidebar />
        <div className='flex-1 h-full flex flex-col px-4 py-2 gap-4'>
          <Navbar/>
          <div className=''>
            <FullCalendar
            aspectRatio={aspectRatio + 0.25}
              plugins={[dayGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek,dayGridDay',
              }}
              initialView='dayGridMonth'
            />
          </div>
        </div>
      </div>
  );
}

export default Homepage;
