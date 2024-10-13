import React from 'react'
import { Modal } from 'rsuite'

export const RegisterConfirm = ({ handleSubmit }) => {
  return (
    <Modal.Body className='text-center'>
      <p className='py-4 mb-2'>Thanks for signing up! Please check your email for a confirmation link.</p>
      <button
        className='text-center button-shadow-black hover:font-bold uppercase mt-2 place-self-center'
        onClick={handleSubmit}
        type='submit'
      >
        Cool, I'll BRB
      </button>
    </Modal.Body>
  );
}