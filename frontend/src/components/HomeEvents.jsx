import axios from 'axios';
import { useState, useEffect } from 'react';
import Table, { sampleData } from './Table'; 
import { apiEndpoints } from '../utils/apiEndpoints';

export default function HomeEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(apiEndpoints.GET_EVENTS);
        setEvents(response.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p> // to display a loading message
      ) : (
        <>
          <Table events={events} showHeadings={false} />
          <Table events={sampleData} showHeadings={true} />
        </>
      )}
    </div>
  );
}