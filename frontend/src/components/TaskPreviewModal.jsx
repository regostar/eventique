import React from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import { AiOutlineCloseCircle } from 'react-icons/ai'; 
// import { BsListTask } from "react-icons/bs";
import { BiTimer } from "react-icons/bi";
import { SiTask } from "react-icons/si";

export default function TaskPreviewModal({ task, setSelectedTask }) {
  const isSameDate = task && moment(task.start).format('Do MMM')===moment(task.end).format('Do MMM');

  const handleCloseModal = () => {
    setSelectedTask(null); 
  };

  return (
    <Modal
      isOpen={!!task}
      onRequestClose={handleCloseModal}
      style={{
        content: {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', 
          padding: '20px', 
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
          position: 'relative', 
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      {task && (
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">
              {/* <BsListTask style={{ fontSize: '1.5rem', marginRight: '8px' }} />  */}
              {task.title}
            </h2>
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={handleCloseModal}
            >
              <AiOutlineCloseCircle style={{ fontSize: '1.5rem' }} />
            </button>
          </div>
          <p className="text-gray-600 mb-4 flex items-center">
            <BiTimer style={{ fontSize: '1.7rem', marginRight: '8px' }} />
            <span>
              {`Start: ${formatDate(task.start)}`}
              {!isSameDate && ` - ${formatDate(task.end)}`}
            </span>
          </p>
          
            <p className="text-gray-700 flex items-center">
              <SiTask style={{ fontSize: '1.7rem', marginRight: '8px' }} />
              {task.description}
            </p>
          
        </div>
      )}
    </Modal>
  );
}

// Function to format date and time
const formatDate = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  const formattedDate = dateTime.toLocaleDateString(); // Format date
  const formattedTime = dateTime.toLocaleTimeString(); // Format time
  return `${formattedDate} ${formattedTime}`;
};
