import React from 'react';
import moment from 'moment';

const Table = ({ events, showHeadings }) => {
  const hasScroll = events.length > 6;  // condition to add the scrolling bar option

  const getStatusColor = (status) => { // function to add color to the statuses
    switch (status) {
      case 'In Progress':
        return 'bg-green-100 rounded-full px-3 py-1'; 
      case 'Past':
        return 'bg-yellow-100 rounded-full px-3 py-1'; 
      case 'Upcoming':
        return 'bg-purple-100 rounded-full px-3 py-1'; 
      default:
        return '';
    }
  };

  return (
    <div className={`overflow-x-auto ${hasScroll ? 'max-h-96' : ''}`}>
      <table className="table-auto w-full border-collapse border border-gray-400">
        {showHeadings && (    
          <thead>
            <tr>
              {/* Adding column names */}
              <th className="px-4 py-2 bg-gray-200 border border-gray-400">Event</th>  
              <th className="px-4 py-2 bg-gray-200 border border-gray-400">Start Date</th>
              <th className="px-4 py-2 bg-gray-200 border border-gray-400">End Date</th>
              <th className="px-4 py-2 bg-gray-200 border border-gray-400">Status</th>
            </tr>
          </thead>
        )}
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border border-gray-400">{event.event}</td>
              <td className="px-4 py-2 border border-gray-400">
                {moment(event.startDate).format('dddd, MMMM Do hh:mm a')}
              </td>
              <td className="px-4 py-2 border border-gray-400">
                {moment(event.endDate).format('dddd, MMMM Do hh:mm a')}
              </td>
              <td className="px-4 py-2 border border-gray-400">
                <span className={getStatusColor(event.status)}>
                  {/* rendering the status of each event */}
                  {event.status}  
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

// Adding sample test data for now
export const sampleData = [
  {
    event: "Event 1",
    startDate: "2024-04-20",
    endDate: "2024-04-22",
    status: "Upcoming"
  },
  {
    event: "Event 2",
    startDate: "2024-05-10",
    endDate: "2024-05-12",
    status: "Past"
  },
  {
    event: "Event 3",
    startDate: "2024-06-01",
    endDate: "2024-06-03",
    status: "Past"
  },
  {
    event: "Event 2",
    startDate: "2024-05-10",
    endDate: "2024-05-12",
    status: "In Progress"
  },
  {
    event: "Event 2",
    startDate: "2024-05-10",
    endDate: "2024-05-12",
    status: "Upcoming"
  },
  {
    event: "Event 2",
    startDate: "2024-05-10",
    endDate: "2024-05-12",
    status: "In Progress"
  },
  {
    event: "Event 2",
    startDate: "2024-05-10",
    endDate: "2024-05-12",
    status: "Upcoming"
  },
  {
    event: "Event 2",
    startDate: "2024-05-10",
    endDate: "2024-05-12",
    status: "In Progress"
  },
  {
    event: "Event 2",
    startDate: "2024-05-10",
    endDate: "2024-05-12",
    status: "Past"
  },
  {
    event: "Event 2",
    startDate: "2024-05-10",
    endDate: "2024-05-12",
    status: "Upcoming"
  },
  {
    event: "Event 2",
    startDate: "2024-05-10",
    endDate: "2024-05-12",
    status: "Past"
  }
];