import React, { useState, useRef, useContext } from 'react';
import { UserContext } from '../../App';
import { Modal, Form, Schema } from 'rsuite';
import Cookies from 'js-cookie';
import { API } from '../../utils/api';
import { login } from '../../utils/appwriteClient';

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

  const oldHandleSubmit = async () => {
    if (!form.current.check()) {
      console.error('Form Error');
      return;
    }

    const userInput = {
      email: formValue.email,
      password: formValue.password,
    };

    API.post(`api/auth/login/`, userInput)
      .then((res) => {
        const oneHour = 1 / 24;
        Cookies.set('access_token', res.data.access, { expires: 7 });
        Cookies.set('refresh_token', res.data.refresh, { expires: oneHour });
        localStorage.setItem('user', JSON.stringify(res.data.user));
        userContext.setUser(res.data.user);
        handleClose();
      })
      .catch((error) => {
        console.error('login error: ', error);
        if (error.status === 400) {
          console.log(error.response.data.non_field_errors[0]);
          setShowError(true);
        };
      });
  };

  const handleSubmit = async () => {
    try {
      const currentUser = await login(formValue.email, formValue.password);
      console.log(currentUser);
      userContext.setUser(currentUser);
      handleClose();
    } catch (error) {
      console.error('login error: ', error);
      setShowError(true);
    }
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
