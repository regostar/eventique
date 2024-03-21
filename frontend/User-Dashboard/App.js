import React, { useState } from 'react';
import './App.css'; 

function App() {
  const [selectedTab, setSelectedTab] = useState('myEvents'); 

  const activeEvents = [
    { id: 1, title: 'Birthday Party', date: 'March 19, 2024' },
    { id: 2, title: 'Family Get Together', date: 'March 30, 2024' },
  ];

  const pastEvents = [
    { id: 3, title: 'Baby Shower', date: 'March 10, 2024' },
    { id: 4, title: 'Virtual Comic Con', date: 'Jan 5th, 2024' },
  ];

  const upcomingEvents = [
    { id: 5, title: 'Office Get Together', date: 'April 20, 2024' },
    { id: 6, title: 'Parents Wedding Anniversary', date: 'May 10, 2024' },
  ];

  let eventsToShow;
  if (selectedTab === 'myEvents') {
    eventsToShow = [...activeEvents, ...pastEvents, ...upcomingEvents];
  } else if (selectedTab === 'active') {
    eventsToShow = activeEvents;
  } else if (selectedTab === 'past') {
    eventsToShow = pastEvents;
  } else if (selectedTab === 'upcoming') {
    eventsToShow = upcomingEvents;
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="brand-title">Eventique</div>
        <h1>Events Dashboard</h1>
        <nav className="header-links">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">My Profile</a></li>
            <li><a href="#">Blogs</a></li>
            <li><a href="#">Offers</a></li>
            <li><a href="#">Log Out</a></li>
          </ul>
        </nav>
      </header>

      <div className="dashboard-container">
        <nav className="dashboard-navigation">
          <ul>
            <li onClick={() => setSelectedTab('myEvents')}>
              My Events {selectedTab === 'myEvents' && <span className="arrow">&#9660;</span>}
            </li>
            <li onClick={() => setSelectedTab('active')}>
              Active Events {selectedTab === 'active' && <span className="arrow">&#9660;</span>}
            </li>
            <li onClick={() => setSelectedTab('past')}>
              Past Events {selectedTab === 'past' && <span className="arrow">&#9660;</span>}
            </li>
            <li onClick={() => setSelectedTab('upcoming')}>
              Upcoming Events {selectedTab === 'upcoming' && <span className="arrow">&#9660;</span>}
            </li>
          </ul>
        </nav>
        <main className="dashboard-content">
          <section className="widget">
            <h2>
              {selectedTab === 'myEvents' ? 'My Events' :
              (selectedTab === 'active' ? 'Active Events' :
              (selectedTab === 'past' ? 'Past Events' : 'Upcoming Events'))}
            </h2>
            <ul>
              {eventsToShow.map(event => (
                <li key={event.id}>
                  <a href={`#${event.id}`}>
                    <strong>{event.title}</strong>
                  </a>
                  {' - '}
                  {event.date}
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
      <footer className="footer">
        <p><a href="#">Create a New Event</a></p>
      </footer>
    </div>
  );
}

export default App;
