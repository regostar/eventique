import React from 'react';
import Modal from 'react-modal';

export default function TaskPreviewModal({ task, setSelectedTask }) {
  return (
    <Modal
      isOpen={!!task}
      onRequestClose={() => setSelectedTask(null)}
    >
      <p>Title: {task?.title}</p>
    </Modal>
  );
}
