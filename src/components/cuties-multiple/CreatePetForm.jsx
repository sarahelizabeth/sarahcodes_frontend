import React, { useContext, useRef, useState } from 'react';
import { Form, Schema, DatePicker, RadioGroup, Radio } from 'rsuite';
import { API } from '../../api';
import { motion, AnimatePresence } from 'framer-motion';
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


export const CreatePetForm = ({ handleSuccess }) => {
  const userContext = useContext(UserContext);
  const [formValue, setFormValue] = useState({
    pet_type: null,
    name: '',
    breed: '',
    birthday: new Date(),
  });
  const [selected, setSelected] = useState('');
  const [species, setSpecies] = useState('');

  const form = useRef();
  const { StringType, DateType } = Schema.Types;
  const model = Schema.Model({
    name: StringType().isRequired('Name is required.').maxLength(100, 'The maximum number of characters is 100.'),
    breed: StringType().maxLength(100, 'The maximum number of characters is 100.'),
    birthday: DateType().isRequired('Birthday is required.'),
  });

  const RadioInline = ({ children }) => (
    <RadioGroup name='pet_type' inline appearance='picker' className='items-center' value={species} onChange={setSpecies}>
      {children}
    </RadioGroup>
  );
  const RadioItem = ({ type, label, icon }) => (
    <Radio value={type} onChange={() => setSelected(label)}>
      <IconTooltip icon={icon} text={label} placement='bottom' />
    </Radio>
  );

  const handleChange = (formValue) => {
    console.log(formValue)
    setFormValue(formValue)
  }

  const handleSubmit = () => {
    handleSuccess(6);
    return;
    
    if (!form.current.check() || species.length === 0) {
      console.error('Form Error');
      return;
    }

    const date = format(formValue.birthday, 'yyyy-MM-dd');
    formValue.birthday = date;
    formValue.owner = userContext.user.pk;
    formValue.pet_type = species;

    API.post(`/api/pets/cuties/`, formValue)
      .then((res) => {
        console.log(res.data);
        handleSuccess(res.data.pk);
      })
      .catch((error) => console.error('create pet error: ', error));
  };

  return (
    <motion.div
      key={'create'}
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

        <button
          className='text-center button-shadow-black hover:font-bold border-2 border-black px-4 py-2 uppercase mt-2 place-self-center'
          onClick={handleSubmit}
          type='submit'
        >
          Next
        </button>
      </Form>
    </motion.div>
  );
}
