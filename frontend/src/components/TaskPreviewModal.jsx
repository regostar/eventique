import React from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import moment from 'moment';
import axios from 'axios';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { HiOutlineBars3BottomLeft } from 'react-icons/hi2';
import { BiTimer } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { IoCube } from 'react-icons/io5';

import { apiEndpoints } from '../utils/apiEndpoints';

export default function TaskPreviewModal({ task, setSelectedTask }) {
  const navigate = useNavigate();
  
  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  const handleEdit = () => {
    if (task?.taskId) navigate(`/tasks/${task?.taskId}`);
  };

  const handleDelete = async () => {
    apiEndpoints.DELETE_TASK.replace('<TASK_ID>', task?.taskId);
    try {
      await axios.delete();
    } catch (error) {
      console.log('error deleting');
    }
    handleCloseModal();
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const formattedDate = moment(dateTime).format('Do MMM');
    const formattedTime = moment(dateTime).format('h:mm A');
    return `${formattedDate} ${formattedTime}`;
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
          position: 'fixed',
          zIndex: 9999,
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998,
        },
      }}
    >
      {task && (
        <div className='flex flex-col gap-6 px-4 py-2'>
          <div className='flex flex-col gap-2'>
            <div className='flex justify-between items-center'>
              <h2 className='text-xl font-bold flex items-center'>
                <IoCube style={{ fontSize: '1.5rem', marginRight: '8px' }} />{' '}
                {/* IoCube icon */}
                {task.title}
              </h2>
              <div className='flex'>
                {task?.taskId && (
                  <button
                    className='text-gray-600 hover:text-gray-800 mr-4'
                    onClick={handleEdit}
                  >
                    <FaEdit style={{ fontSize: '1.5rem' }} />
                  </button>
                )}
                {task?.taskId && (
                  <button
                    className='text-gray-600 hover:text-gray-800 mr-4'
                    onClick={handleDelete}
                  >
                    <RiDeleteBin6Line style={{ fontSize: '1.5rem' }} />
                  </button>
                )}
                <button
                  className='text-gray-600 hover:text-gray-800'
                  onClick={handleCloseModal}
                >
                  <AiOutlineCloseCircle style={{ fontSize: '1.5rem' }} />
                </button>
              </div>
            </div>
            <p className='text-gray-600 flex items-center'>
              <BiTimer style={{ fontSize: '1.7rem', marginRight: '8px' }} />
              <span>
                {` ${formatDateTime(task.start)}`}
                {moment(task.start).isSame(task.end, 'day')
                  ? ` - ${moment(task.end).format('h:mm A')}`
                  : ` - ${formatDateTime(task.end)}`}
              </span>
            </p>
          </div>
          <p className='text-gray-700 flex items-center'>
            <HiOutlineBars3BottomLeft
              style={{ fontSize: '1.7rem', marginRight: '8px' }}
            />
            {task.description}
          </p>
        </div>
      )}
    </Modal>
  );
}
