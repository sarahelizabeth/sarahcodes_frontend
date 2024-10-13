import React, { useState, useRef } from 'react';
import { Modal, Form, Schema } from 'rsuite';
import supabase from '../../utils/supabaseClient';

export const RegisterForm = ({ handleSuccess }) => {
  const form = useRef();
  const [showError, setShowError] = useState(false);
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

  const handleSubmit = async () => {
    if (!form.current.check()) {
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: formValue.email,
      password: formValue.password1,
      options: {
        data: {
          first_name: formValue.first_name,
          last_name: formValue.last_name,
        },
      },
    });
    if (error) {
      console.error('register error: ', error);
      setShowError(true);
      return;
    }
    handleSuccess();
  };

  return (
    <Modal.Body>
      <p className='text-xs mb-3'>
        I will never send you any annoying emails (except for an email update when I've answered your question) and your
        data will only be used for my personal stalking purposes.
      </p>
      <Form fluid ref={form} model={model} onChange={setFormValue} formValue={formValue} className='flex flex-col'>
        <div className='md:flex md:flex-row md:gap-2 md:justify-between'>
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
    </Modal.Body>
  );
};
