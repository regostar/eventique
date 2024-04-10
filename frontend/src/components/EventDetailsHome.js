function EventDetailsHome({ event, onClose }) {
    return (
      <div className="event-details">
        <h2>{event.title}</h2>
        <p><strong>Date:</strong> {event.date.toLocaleDateString()}</p>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Number of Attendees:</strong> {event.attendees}</p>
        <p><strong>Number of RSVPs:</strong> {event.rsvps}</p>
        <p><strong>Food Preference:</strong> {event.foodPreference}</p>
        <p><strong>Venue:</strong> {event.venue}</p>
        <p><strong>Event Duration:</strong> {event.duration}</p>
        <p><strong>Decoration Theme:</strong> {event.decorationTheme}</p>
        <p><strong>Entertainment:</strong> {event.entertainment}</p>
        <p><strong>Special Requests:</strong> {event.specialRequests}</p>
        <p><strong>Your TO-DO List:</strong></p>
        <ul>
          {event.todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }
  
  export default EventDetailsHome;
  