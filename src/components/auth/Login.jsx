import React, { useState, useRef, useContext } from 'react';
import { UserContext } from '../../App';
import { Modal, Form, Schema } from 'rsuite';
import Cookies from 'js-cookie';
import API from '../../api';
// import { login } from './apiCalls';

const Login = ({ isOpen, handleClose }) => {
  const userContext = useContext(UserContext);
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
    if (!form.current.check()) {
      console.error('Form Error');
      return;
    }

    const newUser = {
      email: formValue.email,
      password: formValue.password,
    };

    API.post(`api/auth/login/`, newUser)
      .then((res) => {
        console.log(res.data);
        const oneHour = 1 / 24;
        Cookies.set('access_token', res.data.access, { expires: 7 });
        Cookies.set('refresh_token', res.data.refresh, { expires: oneHour });
        localStorage.setItem('user', JSON.stringify(res.data.user));
        userContext.setUser(res.data.user);
        handleClose();
      })
      .catch((error) => {
        console.error('login error: ', error);
      });
  };

  return (
    <Modal size='sm' open={isOpen} onClose={handleClose} className='jetbrains-mono'>
      <Modal.Header>
        <h4 className='font-bold'>Log In</h4>
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

          <button
            className='text-center button-shadow-black hover:font-bold border-2 border-black px-4 py-2 uppercase mt-2 place-self-center'
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

export default Login;
