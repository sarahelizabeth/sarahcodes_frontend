import React, { useContext, useState, useRef } from 'react';
import { Modal, Form, Schema } from 'rsuite';
import { API } from '../../api';
import Cookies from 'js-cookie';
import { UserContext, LoginContext, RegisterContext } from '../../App';

export const Register = ({ isOpen, handleClose }) => {
  const form = useRef();
  const userContext = useContext(UserContext);
  const [showError, setShowError] = useState(false);
  // const loginContext = useContext(LoginContext);
  // const registerContext = useContext(RegisterContext);
  const [formValue, setFormValue] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password1: '',
    password2: '',
  });

  const { StringType } = Schema.Types;
  const model = Schema.Model({
    first_name: StringType().isRequired('First name is required.'),
    email: StringType().isRequired('Email is required.').isEmail('Please enter a valid email address.'),
    password1: StringType()
      .proxy(['password2'])
      .minLength(6, 'Must contain at least 6 characters.')
      .containsLetter('Must contain at least one letter.')
      .containsNumber('Must contain at least one number.')
      .containsUppercaseLetter('Must contain at least one uppercase letter.')
      .containsLowercaseLetter('Must contain at least one lowercase letter.'),
    password2: StringType().equalTo('password1'),
  });

  const setCookies = (response) => {
    console.log(response);
    const oneHour = 1 / 24;
    Cookies.set('access_token', response.access, { expires: 7 });
    Cookies.set('refresh_token', response.refresh, { expires: oneHour });
    localStorage.setItem('user', JSON.stringify(response.user));
  };

  const handleSubmit = () => {
    if (!form.current.check()) {
      console.error('Form Error');
      return;
    }

    formValue['last_name'] = 'null';

    API.post(`api/auth/register/`, formValue)
      .then((res) => {
        console.log(res.data);
        const response = res.data;
        return response.user;
      })
      .then((res) => {
        console.log(res);
        const user = {
          email: res.email,
          password: formValue.password1,
        };
        // abstract away this function and fucking figure out
        // how to do fucking promise calls!!!!!!
        API.post(`api/auth/login/`, user)
          .then((res) => {
            console.log(res.data);
            setCookies(res.data);
            userContext.setUser(res.data);
            handleClose();
          })
          .catch((error) => {
            console.error('login error: ', error);
            setShowError(true);
            return error;
          });
      })
      .catch((error) => {
        console.error('register error: ', error);
      });
  };

  return (
    <Modal size='xs' open={isOpen} onClose={handleClose} className='jetbrains-mono'>
      <Modal.Header>
        <h4 className='text-2xl dosis font-extrabold'>SIGN UP</h4>
      </Modal.Header>
      <p className='text-xs mt-3 mb-3'>
        I will never send you any annoying emails (except for an email update when I've answered your question) and your
        data will only be used for my personal stalking purposes.
      </p>
      <Form fluid ref={form} model={model} onChange={setFormValue} formValue={formValue} className='flex flex-col'>
        <div className='md:flex md:flex-row md:justify-between'>
          <Form.Group controlId='first-name'>
            <Form.ControlLabel>First Name</Form.ControlLabel>
            <Form.Control name='first_name' />
            <Form.HelpText>This field is required</Form.HelpText>
          </Form.Group>

          <Form.Group controlId='last-name'>
            <Form.ControlLabel>Last Name</Form.ControlLabel>
            <Form.Control name='last_name' />
          </Form.Group>
        </div>

        <Form.Group controlId='email'>
          <Form.ControlLabel>Email</Form.ControlLabel>
          <Form.Control name='email' />
          <Form.HelpText>This field is required</Form.HelpText>
        </Form.Group>

        <Form.Group controlId='password1'>
          <Form.ControlLabel>Password</Form.ControlLabel>
          <Form.Control name='password1' type='password' autoComplete='off' />
        </Form.Group>

        <Form.Group controlId='password2'>
          <Form.ControlLabel>Confirm Password</Form.ControlLabel>
          <Form.Control name='password2' type='password' autoComplete='off' />
        </Form.Group>

        {showError && (
          <div className='p-3'>
            <p className='text-red-900'>Something went wrong {':('} Please try again later.</p>
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
    </Modal>
  );
};
