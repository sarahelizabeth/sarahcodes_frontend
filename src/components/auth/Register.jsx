import React, { useContext, useState, useRef } from 'react';
import { Modal, Form, Schema } from 'rsuite';
import { RegisterForm } from './RegisterForm';
import { RegisterConfirm } from './RegisterConfirm';

export const Register = ({ isOpen, handleClose }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleFormSuccess = async () => {
    setShowConfirm(true);
  };

  const handleSubmit = () => {
    handleClose();
  };

  return (
    <Modal size='xs' open={isOpen} onClose={handleClose} className='jetbrains-mono'>
      <Modal.Header>
        {showConfirm ? <h4 className='text-2xl dosis font-extrabold'>You did the thing!</h4> : <h4 className='text-2xl dosis font-extrabold'>SIGN UP</h4>}
      </Modal.Header>
      {showConfirm ? <RegisterConfirm handleSubmit={handleSubmit} /> : <RegisterForm handleSuccess={handleFormSuccess} />}
    </Modal>
  );
};
