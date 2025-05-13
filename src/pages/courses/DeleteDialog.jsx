import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const DialogContent = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  width: 400px;
  text-align: center;

  .dialog-title {
    font-size: 20px;
    color: #333;
    margin-bottom: 16px;
  }

  .dialog-message {
    margin-bottom: 24px;
    color: #666;
  }

  .dialog-buttons {
    display: flex;
    justify-content: center;
    gap: 16px;
  }

  button {
    padding: 8px 24px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
  }

  .confirm {
    background-color: #dc3545;
    color: white;
    &:hover {
      background-color: #c82333;
    }
  }

  .cancel {
    background-color: #6c757d;
    color: white;
    &:hover {
      background-color: #5a6268;
    }
  }
`;

const DeleteDialog = ({ title, message, onConfirm, onCancel }) => (
  <DialogOverlay>
    <DialogContent>
      <h2 className='dialog-title'>{title}</h2>
      <p className='dialog-message'>{message}</p>
      <div className='dialog-buttons'>
        <button className='confirm' onClick={onConfirm}>
          Delete
        </button>
        <button className='cancel' onClick={onCancel}>
          Cancel
        </button>
      </div>
    </DialogContent>
  </DialogOverlay>
);

DeleteDialog.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteDialog;
