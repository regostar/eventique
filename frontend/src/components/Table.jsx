import React from 'react';
import moment from 'moment';

const Table = ({ events, showHeadings }) => {
  const hasScroll = events.length > 6;  // adding the number of rows limit to enable the scrolling bar

  const getStatusColor = (startDate, endDate) => {
    const now = moment();  // creating a moment object representing the current date and time
    const start = moment(startDate);
    const end = moment(endDate);
  
    if (now.isAfter(end)) {  // if current date is after the end date then the event was in the past
      return 'bg-yellow-100 rounded-full px-3 py-1'; 
    } else if (now.isBetween(start, end)) {  // if the current date is between the start and the end dates of the event, then the event is in progress
      return 'bg-green-100 rounded-full px-3 py-1'; 
    } else {
      return 'bg-purple-100 rounded-full px-3 py-1'; // upcoming event
    }
  };

  return (
    <div className={`overflow-x-auto ${hasScroll ? 'max-h-96' : ''}`}>
      <table className="table-auto w-full border-collapse border border-gray-400">
        {showHeadings && (
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-200 border border-gray-400">Event</th>
              <th className="px-4 py-2 bg-gray-200 border border-gray-400">Start Date</th>
              <th className="px-4 py-2 bg-gray-200 border border-gray-400">End Date</th>
              <th className="px-4 py-2 bg-gray-200 border border-gray-400">Status</th>
            </tr>
          </thead>
        )}
        <tbody>
          {events.map((event, index) => (    // adding the data in the table
            <tr key={index}>
              <td className="px-4 py-2 border border-gray-400">{event.event}</td>
              <td className={`px-4 py-2 border border-gray-400 ${getStatusColor(event.startDate, event.endDate)}`}>
                {moment(event.startDate).format('dddd, MMMM Do hh:mm a')}
              </td>
              <td className={`px-4 py-2 border border-gray-400 ${getStatusColor(event.startDate, event.endDate)}`}>
                {moment(event.endDate).format('dddd, MMMM Do hh:mm a')}
              </td>   
              <td className="px-4 py-2 border border-gray-400">
                <span className={getStatusColor(event.startDate, event.endDate)}>
                  {event.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
