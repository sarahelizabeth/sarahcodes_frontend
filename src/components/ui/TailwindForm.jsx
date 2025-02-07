import React, { useState } from 'react';
import { RadioGroup, Radio } from 'rsuite';
import { IconTooltip } from './IconTooltip';
import { FaCat, FaKiwiBird, FaDragon } from 'react-icons/fa';
import { FaDog } from 'react-icons/fa6';
import { IoFishSharp } from 'react-icons/io5';
import { GiSandSnake } from 'react-icons/gi';
import { PiPottedPlantFill } from 'react-icons/pi';

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



export const TailwindForm = () => {
  const [selected, setSelected] = useState('');
  const [species, setSpecies] = useState('')

  const handleSubmit = () => {
    console.log(species)
  }

  const RadioItem = ({ type, label, icon }) => (
    <Radio value={type} onChange={() => setSelected(label)}>
      <IconTooltip icon={icon} text={label} placement='bottom' />
    </Radio>
  );

  return (
    <div className='px-6 mb-4 flex flex-col my-2'>
      <div className='-mx-3 md:flex mb-6'>
        <div className='md:w-1/2 px-3 mb-6 md:mb-0'>
          <label
            className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'
            htmlFor='grid-first-name'
          >
            First Name
          </label>
          <input
            className='appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3'
            id='grid-first-name'
            type='text'
            placeholder='Jane'
          />
          <p className='text-red text-xs italic'>Please fill out this field.</p>
        </div>
        <div className='md:w-1/2 px-3'>
          <label
            className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'
            htmlFor='grid-last-name'
          >
            Last Name
          </label>
          <input
            className='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4'
            id='grid-last-name'
            type='text'
            placeholder='Doe'
          />
        </div>
      </div>
      <div className='-mx-3 md:flex mb-6'>
        <div className='md:w-full px-3'>
          <label
            className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'
            htmlFor='grid-password'
          >
            Password
          </label>
          <input
            className='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3'
            id='grid-password'
            type='password'
            placeholder='******************'
          />
          <p className='text-grey-dark text-xs italic'>Make it as long and as crazy as you'd like</p>
        </div>
      </div>
      <div className='-mx-3 md:flex mb-6'>
        <div className='md:w-full px-3'>
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
        </div>
      </div>
      <div className='-mx-3 md:flex mb-2'>
        <div className='md:w-1/2 px-3 mb-6 md:mb-0'>
          <label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2' htmlFor='grid-city'>
            City
          </label>
          <input
            className='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4'
            id='grid-city'
            type='text'
            placeholder='Albuquerque'
          />
        </div>
        <div className='md:w-1/2 px-3'>
          <label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2' htmlFor='grid-state'>
            State
          </label>
          <div className='relative'>
            <select
              className='block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded'
              id='grid-state'
            >
              <option>New Mexico</option>
              <option>Missouri</option>
              <option>Texas</option>
            </select>
            <div class='pointer-events-none absolute right-0 top-4 px-2 text-grey-darker'>
              <svg class='h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
          </div>
        </div>
        <div className='md:w-1/2 px-3'>
          <label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2' htmlFor='grid-zip'>
            Zip
          </label>
          <input
            className='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4'
            id='grid-zip'
            type='text'
            placeholder='90210'
          />
        </div>
      </div>
      <button className='btn' type='submit' onClick={handleSubmit}>Submit</button>
    </div>
  );
}
