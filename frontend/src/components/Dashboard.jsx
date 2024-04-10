import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EventDetailsHome from './EventDetailsHome';

import { FaUserCircle } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

import profileIcon from '../assets/dashboard/profile-icon.png';
import createEventIcon from '../assets/dashboard/create-event-icon.png';

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [myEvents] = useState([
    {
        id: 1,
        title: 'Birthday Party',
        date: new Date('2024-03-19'),
        description: "A celebration of John's birthday",
        estimatedInvites: '200',
        partyTheme: 'Superhero',
        attendees: 150,
        rsvps: 120,
        foodPreference: 'Indian: Vegetarian',
        venue: 'City Park',
        duration: '4 hours',
        entertainment: 'DJ',
        specialRequests: 'No nuts in food',
        todos: ['Buy balloons', 'Prepare cake', 'Invite guests'],
      },
      {
        id: 2,
        title: 'Parents Wedding Anniversary',
        date: new Date('2024-03-30'),
        description: 'Celebrating the 20th Wedding Anniversary of Mr. and Mrs. Smith',
        estimatedInvites: '50',
        partyTheme: 'Romantic',
        attendees: 48,
        rsvps: 49,
        foodPreference: 'Mediterranean: Non-Vegetarian',
        venue: 'Town Hall',
        duration: '6 hours',
        entertainment: 'DJ',
        specialRequests: 'Add Vegan food as well',
        todos: ['Prepare food', 'Arrange seating', 'Plan activities'],
      },
      {
        id: 3,
        title: 'Baby Shower',
        date: new Date('2024-03-10'),
        description: 'Celebrating the arrival of the new baby',
        estimatedInvites: '50',
        partyTheme: 'Pink and Blue',
        attendees: 100,
        rsvps: 60,
        foodPreference: 'Italian: Non-Vegetarian, Mexican: Non- Vegetarian',
        venue: 'Beach Resort- Idaho',
        duration: '12 hours',
        entertainment: 'Jazz',
        specialRequests: 'N/A',
        todos: ['Decorate venue', 'Organize games', 'Prepare gifts'],
      },
      {
        id: 4,
        title: 'Virtual Comic Con',
        date: new Date('2024-01-05'),
        description: 'An online convention for comic book enthusiasts',
        estimatedInvites: '200',
        partyTheme: 'N/A',
        attendees: 48,
        rsvps: 49,
        foodPreference: 'N/A',
        venue: 'Online/Virtual Platform- Discord',
        duration: '6 hours',
        entertainment: 'N/A',
        specialRequests: 'Please make sure we face no technical issues during the event',
        todos: ['Schedule events', 'Invite speakers', 'Promote event'],
      },
    ]);
  

  const getEventStatus = (eventDate) => {
    const currentDate = new Date();
    if (eventDate < currentDate) {
      return 'Past';
    } else if (eventDate > currentDate) {
      return 'Upcoming';
    } else {
      return 'Today';
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="app-container" style={{ backgroundColor: '#f2e6ff', minHeight: '100vh', padding: '20px' }}>
      <header className="header" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '48px', marginTop: '0' }}>Eventique</h1>
      </header>

      <nav className='flex justify-center items-center gap-1' style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        {/* should redirect to chat bot */}
        <Link className='text-white font-bold bg-purple-500 flex items-center justify-center w-8 h-8 p-1 rounded-md' to="/">
          <IoMdAdd/>
        </Link>
        <Link className='flex items-center justify-center w-12 h-12' to="/profile">
          <FaUserCircle fontSize={21}/>
        </Link>
      </nav>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ backgroundColor: 'lightgreen', padding: '20px', borderRadius: '10px', width: '70%' }}>
          <main className="dashboard-content">
            <section className="widget">
              <h2>My Events</h2>
              <ul>
                {myEvents.map(event => (
                  <li key={event.id}>
                    <strong>{event.title}</strong>
                    {' - '}
                    {event.date.toLocaleDateString()} {/* Displaying event date */}
                    {' ('}
                    {/* Display event status */}
                    {getEventStatus(event.date)}
                    {')'}
                    {' '}
                  </li>
                ))}
              </ul>
            </section>
          </main>
        </div>
      </div>

      {/* Render EventDetailsHome component if an event is selected */}
      {selectedEvent && (
        <EventDetailsHome event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}

export default App;
