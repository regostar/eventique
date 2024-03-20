import React, { useState } from 'react';
import './App.css';


function App() {
  const [selectedTab, setSelectedTab] = useState('myEvents');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreateEventPage, setShowCreateEventPage] = useState(false);
  const [showChatbotPage, setShowChatbotPage] = useState(false);
  const [eventType, setEventType] = useState('');
  const [otherEventType, setOtherEventType] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDateTime, setEventDateTime] = useState('');
  const [guestList, setGuestList] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [image, setImage] = useState(null);
  const [rsvpOptions, setRSVPOptions] = useState('');
  const [budget, setBudget] = useState('');
  const [customFields, setCustomFields] = useState('');
  const [editingEvent, setEditingEvent] = useState(false);




  const activeEvents = [
    {
      id: 1,
      title: 'Birthday Party',
      date: 'March 19, 2024',
      description: 'A celebration of John\'s birthday',
      todos: ['Buy balloons', 'Prepare cake', 'Invite guests']
    },
    {
      id: 2,
      title: 'Family Get Together',
      date: 'March 30, 2024',
      description: 'A gathering of the Smith family members',
      todos: ['Prepare food', 'Arrange seating', 'Plan activities']
    },
  ];


  const pastEvents = [
    {
      id: 3,
      title: 'Baby Shower',
      date: 'March 10, 2024',
      description: 'Celebrating the arrival of the new baby',
      todos: ['Decorate venue', 'Organize games', 'Prepare gifts']
    },
    {
      id: 4,
      title: 'Virtual Comic Con',
      date: 'Jan 5th, 2024',
      description: 'An online convention for comic book enthusiasts',
      todos: ['Schedule events', 'Invite speakers', 'Promote event']
    },
  ];


  const upcomingEvents = [
    {
      id: 5,
      title: 'Office Get Together',
      date: 'April 20, 2024',
      description: 'An informal gathering of office colleagues',
      todos: ['Book venue', 'Order catering', 'Organize team-building activities']
    },
    {
      id: 6,
      title: 'Parents Wedding Anniversary',
      date: 'May 10, 2024',
      description: 'Celebrating 25 years of marriage',
      todos: ['Plan surprise party', 'Arrange for gifts', 'Prepare speeches']
    },
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


  const handleCreateEventClick = () => {
    setShowCreateEventPage(true);
  };


  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setEditingEvent(true);
    setEventType(event.eventType || '');
    setEventLocation(event.location || '');
    setEventDateTime(event.dateTime || '');
    setGuestList(event.guestList || '');
    setAdditionalDetails(event.additionalDetails || '');
    setRSVPOptions(event.rsvpOptions || '');
    setBudget(event.budget || '');
    setCustomFields(event.customFields || '');
  };

  const handleCancelEdit = () => {
    setEditingEvent(false);
    setSelectedEvent(null);
  };

  const handleSaveEdit = () => {
    // Logic to save edited event
    setEditingEvent(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = () => {
    // Logic to delete the event
    setSelectedEvent(null);
    setEditingEvent(false);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleEventTypeChange = (event) => {
    setEventType(event.target.value);
  };

  const handleOtherEventTypeChange = (event) => {
    setOtherEventType(event.target.value);
  };

  const handleEventDescriptionChange = (event) => {
    setAdditionalDetails(event.target.value);
  };

  const handleCreateEvent = () => {
    // Logic to handle event creation
    setShowCreateEventPage(false);
    setShowChatbotPage(true); // Redirecting to the chatbot page after event creation
  };

  if (showCreateEventPage) {
    return (
      <div className="create-event-page">
        <h1>Create a New Event</h1>
        <div>
          <label htmlFor="eventType">Type of Event:</label>
          <select id="eventType" onChange={handleEventTypeChange}>
            <option value="">Select Event Type</option>
            <option value="birthdayParty">Birthday Party</option>
            <option value="wedding">Wedding</option>
            <option value="babyShower">Baby Shower</option>
            <option value="others">Others</option>
          </select>
        </div>
        {eventType === "others" && (
          <div>
            <label htmlFor="otherEventType">Specify Event:</label>
            <input type="text" id="otherEventType" onChange={handleOtherEventTypeChange} />
          </div>
        )}
        <div>
          <label htmlFor="eventDescription">Event Description:</label>
          <textarea id="eventDescription" onChange={handleEventDescriptionChange}></textarea>
        </div>
        <button onClick={handleCreateEvent}>Create Event</button>
        <p><a href="#" onClick={() => setShowCreateEventPage(false)}>Return to Dashboard</a></p>
      </div>
    );
  }

  if (selectedEvent && editingEvent) {
    return (
      <div className="edit-event-page">
        <h1>Edit Event - {selectedEvent.title}</h1>
        <div>
          <label htmlFor="eventType">Event Type:</label>
          <input type="text" id="eventType" value={eventType} onChange={(e) => setEventType(e.target.value)} />
        </div>
        <div>
          <label htmlFor="eventLocation">Location:</label>
          <input type="text" id="eventLocation" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} />
        </div>
        <div>
          <label htmlFor="eventDateTime">Date and Time:</label>
          <input type="text" id="eventDateTime" value={eventDateTime} onChange={(e) => setEventDateTime(e.target.value)} />
        </div>
        <div>
          <label htmlFor="guestList">Guest List:</label>
          <input type="text" id="guestList" value={guestList} onChange={(e) => setGuestList(e.target.value)} />
        </div>
        <div>
          <label htmlFor="additionalDetails">Additional Details:</label>
          <textarea id="additionalDetails" value={additionalDetails} onChange={(e) => setAdditionalDetails(e.target.value)}></textarea>
        </div>
        <div>
          <label htmlFor="image">Image Upload:</label>
          <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div>
          <label htmlFor="rsvpOptions">RSVP Options:</label>
          <input type="text" id="rsvpOptions" value={rsvpOptions} onChange={(e) => setRSVPOptions(e.target.value)} />
        </div>
        <div>
          <label htmlFor="budget">Budget:</label>
          <input type="text" id="budget" value={budget} onChange={(e) => setBudget(e.target.value)} />
        </div>
        <div>
          <label htmlFor="customFields">Custom Fields:</label>
          <input type="text" id="customFields" value={customFields} onChange={(e) => setCustomFields(e.target.value)} />
        </div>
        <button onClick={handleSaveEdit}>Save Changes</button>
        <button onClick={handleCancelEdit}>Cancel</button>
        <button onClick={handleDeleteEvent}>Delete Event</button>
        <button onClick={() => setEditingEvent(false)}>Back to Event</button>
      </div>
    );
  }

 if (selectedEvent) {
  return (
    <div className="event-page">
      <h1>{selectedEvent.title}</h1>
      <p>Date: {selectedEvent.date}</p>
      <p>Description: {selectedEvent.description}</p>
      <h2>Your Event To-Do List:</h2> {/* Updated text here */}
      <ul>
        {selectedEvent.todos ? (
          selectedEvent.todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))
        ) : (
          <li>No to-dos for this event</li>
        )}
      </ul>
      <button onClick={() => setSelectedEvent(null)}>Back to Dashboard</button>
      {selectedTab !== 'past' && (
        <button onClick={() => setEditingEvent(true)}>Edit Event</button>
      )}
    </div>
  );
}

if (selectedEvent && editingEvent) {
  return (
    <div className="event-page">
      <h1>Edit Event - {selectedEvent.title}</h1>
      {/* Edit event form fields... */}
      <button onClick={handleSaveEdit}>Save</button>
      <button onClick={handleCancelEdit}>Cancel</button>
    </div>
  );
}

if (showChatbotPage) {
  const handleSendMessage = () => {
    // Logic to send message
    const replyMessage = `Happy to help you with this! Let's see how we could get started...
    
Here are some fun themes and ideas for hosting a memorable birthday party for your 10-year-old brother:

- Superhero Party: Decorate with superhero-themed decorations, have superhero-themed games like "Save the City" obstacle courses or "Hero Training" challenges.
  
- Adventure Quest: Organize a treasure hunt or scavenger hunt around the house or backyard with clues leading to hidden treasures or prizes.
  
- Video Game Tournament: Set up different gaming stations with popular video games and host a friendly tournament with prizes for the winners.
  
- Sports Extravaganza: Have a sports-themed party with various games like soccer, basketball, or relay races, followed by a pizza party.
  
- Movie Marathon: Create a cozy movie-watching area with bean bags or blankets, and screen your brother's favorite movies with plenty of popcorn and snacks.`;

    // Displaying the reply message
    const messagesContainer = document.querySelector(".messages");
    const userMessage = document.createElement("div");
    userMessage.className = "message user-message";
    userMessage.textContent = "User: " + document.getElementById("userInput").value;
    messagesContainer.appendChild(userMessage);
    const botReply = document.createElement("div");
    botReply.className = "message bot-message";
    botReply.textContent = "Bot: " + replyMessage;
    messagesContainer.appendChild(botReply);

    // Resetting the input field value to blank
    document.getElementById("userInput").value = "";
  };

  return (
    <div className="chatbot-page">
      <h1>Go ahead, plan your event!</h1>
      <div className="chat-container">
        <div className="messages">
          { }
          <div className="message bot-message">Hi, how can I help you?</div>
          {}
        </div>
        <div className="input-container">
          <input type="text" id="userInput" placeholder="Type your message..." />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
      <p><a href="#" onClick={() => setShowChatbotPage(false)}>Return to Dashboard</a></p>
    </div>
  );
}

if (selectedEvent !== null) {
  return (
    <div className="event-page">
      <h1>{selectedEvent.title}</h1>
      <p>Date: {selectedEvent.date}</p>
      <p>Description: {selectedEvent.description}</p>
      <h2>To-Do List:</h2>
      <ul>
        {selectedEvent.todos ? (
          selectedEvent.todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))
        ) : (
          <li>No to-dos for this event</li>
        )}
      </ul>
      <button onClick={() => setSelectedEvent(null)}>Back to Dashboard</button>
      <button onClick={() => setEditingEvent(true)}>Edit Event</button>
    </div>
  );
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
                <a href={`#${event.id}`} onClick={() => handleEventClick(event)}>
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
      <p><button onClick={handleCreateEventClick}>Create a New Event</button></p>
    </footer>
  </div>
);
}

export default App
