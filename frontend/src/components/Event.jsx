import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
            Event details go here ...
        </div>
    )
}