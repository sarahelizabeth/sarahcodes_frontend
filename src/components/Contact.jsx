import React, { useState, useRef, useContext, useEffect } from 'react';
import { Form, Modal, Input, Schema } from 'rsuite';
import { UserContext } from '../App';
import { API } from '../api';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as='textarea' ref={ref} />);

export const Contact = ({ isOpen, handleClose }) => {
  const userContext = useContext(UserContext);
  const form = useRef();
  const initialState = {
    name: '',
    email: '',
    message: '',
  };
  const [formValue, setFormValue] = useState(initialState);

  useEffect(() => {
    if (userContext.user !== null) {
      setFormValue({
        name: userContext.user.first_name,
        email: userContext.user.email,
        message: '',
      });
    } else {
      setFormValue(initialState);
    }
  }, [isOpen]);

  const { StringType } = Schema.Types;
  const model = Schema.Model({
    name: StringType().isRequired('Name is required.'),
    email: StringType().isRequired('Email is required.').isEmail('Please enter a valid email address.'),
    message: StringType().isRequired('Message is required.'),
  });

  const handleSubmit = () => {
    if (!form.current.check()) {
      console.error('Form Error');
      return;
    }

    API.post(`/api/portfolio/contact/`, formValue)
      .then((res) => {
        console.log(res.data);
        handleClose();
      })
      .catch((error) => console.error('contact error: ', error));
  };

  return (
    <Modal open={isOpen} onClose={handleClose} className='jetbrains-mono'>
      <Modal.Header>
        <h4 className='font-bold text-xl'>Contact Me!</h4>
      </Modal.Header>
      <Modal.Body>
        <Form fluid ref={form} model={model} onChange={setFormValue} formValue={formValue} className='flex flex-col'>
          <Form.Group controlId='name'>
            <Form.ControlLabel>Name</Form.ControlLabel>
            <Form.Control name='name' />
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.ControlLabel>Email</Form.ControlLabel>
            <Form.Control name='email' />
          </Form.Group>

          <Form.Group controlId='message'>
            <Form.ControlLabel>Message</Form.ControlLabel>
            <Form.Control rows={5} name='message' accepter={Textarea} />
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
