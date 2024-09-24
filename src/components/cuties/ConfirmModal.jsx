import React from 'react'
import { Modal } from 'rsuite'

export const ConfirmModal = ({isOpen, handleYes, handleClose }) => {
  console.log('show confirm')
  return (
    <Modal overflow={false} size='sm' open={isOpen} onClose={handleClose} className='jetbrains-mono'>
      <Modal.Header>
        <h1>Are you sure?</h1>
        <button onClick={handleYes}>Yes</button>
        <button onClick={handleClose}>No</button>
      </Modal.Header>
    </Modal>
  )
}
