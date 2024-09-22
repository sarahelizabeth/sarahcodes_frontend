import React, { useContext, useRef, useState } from 'react';
import { UserContext } from '../../App';
import { Modal } from 'rsuite';
import { API } from '../../api';
import { motion, AnimatePresence } from 'framer-motion';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { TailwindForm } from '../TailwindForm';
import { CreatePetForm } from './CreatePetForm';
import { AddPicForm } from './AddPicForm';

export const SubmitPetModal = ({ isOpen, handleClose }) => {
  const [showAddPic, setShowAddPic] = useState(false);
  const [petId, setPetId] = useState(null);

  const handleCreatePet = (pk) => {
    console.log(pk);
    setPetId(pk);
    setShowAddPic(true);
  };

  const handleAddPics = (value) => {
    console.log(value);
    
  }

  return (
    <Modal overflow={false} open={isOpen} onClose={handleClose} className='jetbrains-mono'>
      <Modal.Header>
        <h4 className='font-bold text-2xl dosis font-extrabold'>Submit Your Cutie!</h4>
      </Modal.Header>
      <Modal.Body>
        <AnimatePresence>
          {showAddPic ? <AddPicForm handleSuccess={handleAddPics} pet={petId} /> : <CreatePetForm handleSuccess={handleCreatePet} /> }
        </AnimatePresence>
      </Modal.Body>
    </Modal>
  );
}