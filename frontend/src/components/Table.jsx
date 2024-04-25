import React from 'react';
import moment from 'moment';

const PAST = 'past';
const IN_PROGRESS = 'inprogress';
const UPCOMING = 'upcoming';

const Table = ({ events, showHeadings }) => {
  const hasScroll = events.length > 6; // adding the number of rows limit to enable the scrolling bar
  console.log('from table:\n', events);

  const getEventStatus = (startDate, endDate) => {
    const now = moment(); // creating a moment object representing the current date and time
    const start = moment(startDate);
    const end = moment(endDate);

    if (now.isAfter(end)) {
      // if current date is after the end date then the event was in the past
      return PAST;
    } else if (now.isBetween(start, end)) {
      // if the current date is between the start and the end dates of the event, then the event is in progress
      return IN_PROGRESS;
    } else {
      return UPCOMING; // upcoming event
    }
  };

  const getStatusColor = (status) => {
    if (status == PAST) return 'bg-yellow-100';
    else if (status == IN_PROGRESS) return 'bg-green-100';
    else return 'bg-purple-100';
  };

  return (
    <div className={`rounded-md shadow-md hide-scrollbar overflow-x-auto ${hasScroll ? 'max-h-96' : ''}`}>
      <table className='table-auto w-full border-collapse border border-gray-400'>
        {showHeadings && (
          <thead>
            <tr>
              <th className='px-4 py-2 bg-gray-200 border border-gray-400'>
                Event
              </th>
              <th className='px-4 py-2 bg-gray-200 border border-gray-400'>
                Start Date
              </th>
              <th className='px-4 py-2 bg-gray-200 border border-gray-400'>
                End Date
              </th>
              <th className='px-4 py-2 bg-gray-200 border border-gray-400'>
                Status
              </th>
            </tr>
          </thead>
        )}
        <tbody>
          {events.map((event, index) => {
            const estatus = getEventStatus(event.start, event.end);
            // adding the data in the table
            return (
              <tr key={index}>
                <td className='capitalize px-4 py-2 border border-gray-400'>
                  {event.title}
                </td>
                <td className='px-4 py-2 border border-gray-400'>
                  {moment(event.start).format('dddd, MMMM Do hh:mm a')}
                </td>
                <td className='px-4 py-2 border border-gray-400'>
                  {moment(event.end).format('dddd, MMMM Do hh:mm a')}
                </td>
                <td className='px-4 py-2 border border-gray-400'>
                  <span className={`capitalize rounded-full px-3 py-1 ${getStatusColor(estatus)}`}>{estatus}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
