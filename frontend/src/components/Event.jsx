import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import { apiEndpoints } from '../utils/apiEndpoints';
import Loader from './Loader';

export default function Event() {
    const {eventId} = useParams()
    const [id, _] = useState(eventId)
    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(false);

    const fetchEventDetails = async () => {
        const url = apiEndpoints.GET_SINGLE_EVENT.replace('<EVENT_ID>', eventId);
        try {
            setLoading(true);
            const resp = await axios.get(url);
            if (resp?.data?.event)
                setEvent({...resp?.data?.event});
        } catch (error) {
            console.log("Error fetching event details");
        }
        setLoading(false);
    }

    useEffect(() => {
        (async () => {
            await fetchEventDetails();
        })()
    }, [id])

    if (loading) return <Loader message='Preparing the view...'/>

    return (
        <div>
            {/* Event Title */}
            <h2>{event ? event.title : 'Event Title'}</h2>
        
            {/* Start and End Dates */}
            <p>
                {event ? (
                    <>
                        Start Date: {moment(event.startDate).format('MMMM Do YYYY, h:mm a')}<br />
                        End Date: {moment(event.endDate).format('MMMM Do YYYY, h:mm a')}
                    </>
                ) : (
                    'Event Dates'
                )}
            </p>
        
            {/* Event Description */}
            <p>{event ? event.description : 'Event Description'}</p>
        
            {/* List of Tasks */}
            <div>
                <h3>Tasks:</h3>
                {/* Dummy task for now */}
                <p>
                    {/* Need to add navigation to the page that shows each task in detail */}
                    <a href="#">Task 1</a>
                </p>
            </div>
        </div> 
    );
}