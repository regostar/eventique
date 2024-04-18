import axios from 'axios';
import { useState, useEffect } from 'react';

import { apiEndpoints } from '../utils/apiEndpoints';

export default function HomeEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const url = apiEndpoints.GET_EVENTS;
    let resp = null;
    try {
        // resp = axios.get(url);
    } catch (error) {
        console.log("error fetching events");
    }
  });
  return <p>table goes here</p>;
}
