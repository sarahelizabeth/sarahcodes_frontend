import React, { useContext, useRef, useState } from 'react';
import { Form, Modal, Schema, DatePicker, RadioGroup, Radio, Divider } from 'rsuite';
import { motion } from 'framer-motion';
import { API } from '../../api';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { UploadButton } from './UploadButton';
import { IconTooltip } from '../IconTooltip';
import { FaCat, FaKiwiBird, FaDragon } from 'react-icons/fa';
import { FaDog } from 'react-icons/fa6';
import { IoFishSharp } from 'react-icons/io5';
import { GiSandSnake } from 'react-icons/gi';
import { PiPottedPlantFill } from 'react-icons/pi';
import { UserContext } from '../../App';
import format from 'date-fns/format';

const speciesList = [
  {
    type: 'cat',
    label: 'Kitty',
    icon: <FaCat size={24} />,
  },
  {
    type: 'dog',
    label: 'Pupper',
    icon: <FaDog size={24} />,
  },
  {
    type: 'fish',
    label: 'Fishy',
    icon: <IoFishSharp size={24} />,
  },
  {
    type: 'bird',
    label: 'Birb',
    icon: <FaKiwiBird size={24} />,
  },
  {
    type: 'reptile',
    label: 'Snek',
    icon: <GiSandSnake size={24} />,
  },
  {
    type: 'plant',
    label: 'Plant Bebe',
    icon: <PiPottedPlantFill size={24} />,
  },
  {
    type: 'other',
    label: '??? (Other)',
    icon: <FaDragon size={24} />,
  },
];

export const AddPetPicModal = ({ isOpen, handleClose, handleSuccess }) => {
  const userContext = useContext(UserContext);
  const [formValue, setFormValue] = useState({
    pet_type: null,
    name: '',
    breed: '',
    birthday: null,
  });
  const [selected, setSelected] = useState('');
  const [species, setSpecies] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const form = useRef();
  const { StringType, DateType } = Schema.Types;
  const model = Schema.Model({
    name: StringType().isRequired('Name is required.').maxLength(100, 'The maximum number of characters is 100.'),
    breed: StringType().maxLength(100, 'The maximum number of characters is 100.'),
  });

  const RadioItem = ({ type, label, icon }) => (
    <Radio value={type} onChange={() => setSelected(label)}>
      <IconTooltip icon={icon} text={label} placement='bottom' />
    </Radio>
  );

  const handleImageChange = (file) => {
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    if (!form.current.check() || species.length === 0) {
      console.error('Form Error');
      return;
    }

    if (formValue.birthday) {
      const date = format(parseISO(formValue.birthday), 'yyyy-MM-dd');
      formValue.birthday = date;
    }
    formValue.owner = userContext.user.pk;
    formValue.pet_type = species;
    formValue.image = image;

    console.log('formValue: ', formValue)

    API.post(`/api/pets/pics/`, formValue, {
      headers: { 'content-type': 'multipart/form-data' },
    })
      .then((res) => {
        console.log(res.data);
        handleSuccess(res.data);
      })
      .catch((error) => console.error('create pet error: ', error));
  };

  return (
    <Modal overflow={false} open={isOpen} onClose={handleClose} className='jetbrains-mono'>
      <Modal.Header>
        <h4 className='font-bold text-2xl dosis font-extrabold'>Add a Pic of Your Cutie!</h4>
      </Modal.Header>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Form
          ref={form}
          model={model}
          onChange={setFormValue}
          formValue={formValue}
          className='flex flex-col items-center'
        >
          <Form.Group>
            <label
              className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'
              htmlFor='radio-group-inline-picker'
            >
              Species
            </label>
            <RadioGroup
              name='radio-group-inline-picker'
              inline
              appearance='picker'
              className='items-center'
              value={species}
              onChange={setSpecies}
            >
              {speciesList.map((item, index) => (
                <RadioItem type={item.type} label={item.label} icon={item.icon} key={index} />
              ))}
            </RadioGroup>
            {selected.length > 0 && <p className='md:hidden text-grey-dark text-xs italic'>Selected: {selected}</p>}
          </Form.Group>

          <Form.Group controlId='name'>
            <Form.ControlLabel>Name</Form.ControlLabel>
            <Form.Control name='name' />
          </Form.Group>

          <Form.Group controlId='breed'>
            <Form.ControlLabel>Breed</Form.ControlLabel>
            <Form.Control name='breed' />
          </Form.Group>

          <Form.Group controlId='birthday'>
            <Form.ControlLabel>Birthday</Form.ControlLabel>
            <Form.Control name='birthday' accepter={DatePicker} />
          </Form.Group>

          <UploadButton handleImage={handleImageChange} />

          {image && (
            <div className='flex justify-center items-center w-full'>
              <img src={previewImage} className='h-32 w-fit p-3' />
              <p className='text-xs'>
                {'('}
                <span>
                  <button onClick={() => setImage(null)}>remove</button>
                </span>
                {')'}
              </p>
            </div>
          )}

          <Divider />

          <button
            className='text-center flex justify-center align-end button-shadow-black uppercase mt-2 place-self-center hover:font-bold disabled:border-1 disabled:border-gray-400 disabled:text-gray-400'
            disabled={!image}
            onClick={handleSubmit}
            type='submit'
          >
            <PiUploadSimpleBold size={18} />
            <span className='pl-2'>SUBMIT</span>
          </button>
        </Form>
      </motion.div>
    </Modal>
  );
};
