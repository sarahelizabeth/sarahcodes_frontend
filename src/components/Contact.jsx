import React, { useState, useRef, useContext, useEffect } from 'react';
import { Form, Modal, Input, Schema, Divider } from 'rsuite';
import { UserContext } from '../App';
import { API } from '../utils/api';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { SiBuymeacoffee } from 'react-icons/si';
import { IconTooltip } from './IconTooltip';
import { GrMailOption } from 'react-icons/gr';
import { VscMail } from 'react-icons/vsc';
import { IoIosMail } from 'react-icons/io';


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
        <h4 className='font-bold text-2xl dosis font-extrabold'>Contact Me!</h4>
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
            className='text-center button-shadow-black hover:font-bold uppercase mt-2 place-self-center'
            onClick={handleSubmit}
            type='submit'
          >
            Submit
          </button>
        </Form>
        <Divider>OR CHECK OUT MY OTHER STUFF</Divider>
        <div className='flex justify-center gap-5 pt-3 '>
          <motion.a
            href='https://github.com/sarahelizabeth?tab=repositories'
            target='_blank'
            className='hover:text-black focus:text-black'
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub size={36} />
          </motion.a>
          <motion.a
            href='https://www.linkedin.com/in/semurray1/'
            target='_blank'
            className='hover:text-black focus:text-black'
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaLinkedinIn size={36} />
          </motion.a>
          <motion.a
            href='https://buymeacoffee.com/sarahcodesgood'
            target='_blank'
            className='hover:text-black focus:text-black'
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconTooltip icon={<SiBuymeacoffee size={36} />} text='Buy me a coffee!' placement='top' />
          </motion.a>
          <motion.a
            href='mailto:hello@sarahcodes.xyz?cc=sarahemurray@proton.me&subject=Hello!%20from%20Sarah%20Codes%20Good'
            className='hover:text-black focus:text-black mt-[-3px]'
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconTooltip icon={<IoIosMail size={44} />} text='Email me! hello@sarahcodes.xyz' placement='top' />
          </motion.a>
        </div>
      </Modal.Body>
    </Modal>
  );
};
