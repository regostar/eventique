import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';
import { apiEndpoints } from '../utils/apiEndpoints';
import Loader from './Loader';

import { events as testEvents } from '../testData';

export default function HomeEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true); // setting loading to true before fetching the data
        const response = await axios.get(apiEndpoints.GET_EVENTS);
        if (response?.data?.events)
          setEvents(response.data.events);
        // setEvents([ ...testEvents ]);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false); // setting loading to false after the data is fetched
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader message='Loading...' /> // adding the loader message
      ) : (
        <>
          <Table events={events} showHeadings={true} />
        </>
      )}
    </div>
  );
}
