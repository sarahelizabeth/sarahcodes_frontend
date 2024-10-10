import React, { useState, useRef, useContext } from 'react';
import { UserContext } from '../../App';
import { Modal, Form, Schema } from 'rsuite';
import supabase from '../../utils/supabaseClient';

export const Login = ({ isOpen, handleClose }) => {
  const userContext = useContext(UserContext);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Unable to log in with these credentials. Please sign up or try again.');
  const form = useRef();
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const { StringType } = Schema.Types;
  const model = Schema.Model({
    email: StringType().isRequired('Email is required.').isEmail('Please enter a valid email address.'),
    password: StringType().isRequired('Password is required.'),
  });

  const handleSubmit = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formValue.email,
      password: formValue.password,
    });
    console.log(data, error);
    userContext.setUser(data);
    localStorage.setItem('session', JSON.stringify(data));
    handleClose();
  };

  return (
    <Modal size='xs' open={isOpen} onClose={handleClose} className='jetbrains-mono'>
      <Modal.Header>
        <h4 className='font-bold text-2xl dosis font-extrabold'>LOG IN</h4>
      </Modal.Header>
      <Modal.Body>
        <Form fluid ref={form} model={model} onChange={setFormValue} formValue={formValue} className='flex flex-col'>
          <Form.Group controlId='email'>
            <Form.ControlLabel>Email</Form.ControlLabel>
            <Form.Control name='email' />
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.ControlLabel>Password</Form.ControlLabel>
            <Form.Control name='password' type='password' autoComplete='off' />
          </Form.Group>

          {showError && (
            <div className='p-3'>
              <p className='text-red-900'>{errorMessage}</p>
            </div>
          )}

          <button
            className='text-center button-shadow-black hover:font-bold uppercase mt-2 place-self-center'
            onClick={handleSubmit}
            type='submit'
          >
            Submit
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
