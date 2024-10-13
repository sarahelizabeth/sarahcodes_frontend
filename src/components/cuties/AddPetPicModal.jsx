import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Modal, Schema, DatePicker, RadioGroup, Radio, Divider, Checkbox, Whisper, Tooltip, Input, Loader } from 'rsuite';
import { motion } from 'framer-motion';
import supabase from '../../utils/supabaseClient';
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
import { PicsContext } from '../../pages/PetPicsPage';

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

export const AddPetPicModal = ({ isOpen, handleClose }) => {
  const { user } = useContext(UserContext);
  const { pics, setPics } = useContext(PicsContext);
  const [formValue, setFormValue] = useState({
    pet_type: null,
    name: '',
    breed: '',
  });
  const [birthday, setBirthday] = useState(new Date());
  const [selected, setSelected] = useState('');
  const [species, setSpecies] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showAddCaption, setShowAddCaption] = useState(false);
  const [caption, setCaption] = useState('');
  const [captionCount, setCaptionCount] = useState(0);
  const [captionError, setCaptionError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useRef();
  const whisperRef = useRef();

  const { StringType } = Schema.Types;
  const model = Schema.Model({
    name: StringType().isRequired('Name is required.').maxLength(100, 'The maximum number of characters is 100.'),
    breed: StringType().maxLength(100, 'The maximum number of characters is 100.'),
  });

  const RadioItem = ({ type, label, icon }) => (
    <Radio value={type} onChange={() => setSelected(label)}>
      <IconTooltip icon={icon} text={label} placement='bottom' />
    </Radio>
  );

  // const DatePickerComponent = () => <DatePicker oneTap value={birthday} placement='topStart' onChange={(value) => setBirthday(value)} />;

  const handleImageChange = (file) => {
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    const timestamp = +new Date();
    const uploadName = `${timestamp}-${image.name}`;
    const { data: uploadData, error } = await supabase.storage.from('pets').upload(uploadName, image);

    if (error) {
      console.error('upload error: ', error);
      return;
    }
    return uploadData;
  };

  useEffect(() => {
    let count = caption.length;
    setCaptionCount(count);

    if (count <= 300) {
      setCaptionError(false);
    }
  }, [caption]);

  const handleSubmit = async () => {
    console.log(birthday)
    if (species.length === 0) {
      whisperRef.current.open();
      return;
    }

    if (!form.current.check()) {
      console.error('Form Error');
      return;
    }

    if (captionCount > 300) {
      setCaptionError(true);
      return;
    }

    setIsLoading(true);

    const imageData = await uploadImage();
    formValue.imageURL = imageData.path;

    if (formValue.birthday) {
      const date = format(formValue.birthday, 'yyyy-MM-dd');
      formValue.birthday = date;
    }
    if (caption) {
      formValue.caption = caption;
    }

    formValue.pet_type = species;
    formValue.owner = user.id;

    const { data, error } = await supabase.from('pets').insert([formValue]).select();

    if (error) {
      console.error('insert pet error: ', error);
      setShowError(true);
      return;
    }

    const picData = data[0];
    picData.owner = user;

    setPics([...pics, picData]);
    handleClose();
  };

  return (
    <Modal overflow={false} open={isOpen} onClose={handleClose} className='jetbrains-mono'>
      <Modal.Header>
        <h4 className='font-bold text-2xl dosis font-extrabold'>Add a Pic of Your Cutie!</h4>
      </Modal.Header>
      <Modal.Body>
        <Form
          ref={form}
          model={model}
          onChange={setFormValue}
          formValue={formValue}
          className='flex flex-col items-center'
        >
          <Form.Group>
            <Whisper
              placement='bottomStart'
              trigger='none'
              ref={whisperRef}
              className='bg-white'
              speaker={<Tooltip>Select which species your pet is!</Tooltip>}
            >
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
            </Whisper>
            {selected.length > 0 && <p className='md:hidden text-grey-dark text-xs italic'>Selected: {selected}</p>}
          </Form.Group>
          <Form.Group controlId='name'>
            <Form.ControlLabel>Name</Form.ControlLabel>
            <Form.Control name='name' />
          </Form.Group>
          <Form.Group controlId='breed'>
            <Form.ControlLabel>
              Breed <span className='text-xs italic text-gray-500'>(optional)</span>
            </Form.ControlLabel>
            <Form.Control name='breed' />
          </Form.Group>
          {/* <Form.Group controlId='birthday'>
            <Form.ControlLabel>
              Birthday <span className='text-xs italic text-gray-500'>(optional)</span>
            </Form.ControlLabel>
            <Form.Control name='birthday' accepter={DatePickerComponent} />
          </Form.Group> */}
          <DatePicker oneTap value={birthday} placement='topStart' onChange={(value) => setBirthday(value)} />;
          <UploadButton handleImage={handleImageChange} />
          {image && (
            <>
              <div className='flex justify-center content-center flex-col items-center w-full'>
                <img src={previewImage} className='h-32 w-fit m-3' />
                <p className='text-xs'>
                  {'('}
                  <span>
                    <button onClick={() => setImage(null)}>remove</button>
                  </span>
                  {')'}
                </p>
              </div>
              <div className='flex justify-center text-center items-center'>
                <p>Do you want to add a caption?</p>
                <Checkbox
                  value={showAddCaption}
                  checked={showAddCaption}
                  onChange={() => setShowAddCaption(!showAddCaption)}
                />
              </div>
              {showAddCaption && (
                <div className='w-full'>
                  <Input value={caption} onChange={(value) => setCaption(value)} as='textarea' rows={2} />
                  <p
                    className={`text-right ${captionCount > 300 ? 'text-red-500' : ''} ${
                      captionError ? 'font-black' : 'font-light'
                    }`}
                  >
                    {captionCount}/300 characters
                  </p>
                </div>
              )}
            </>
          )}
          <Divider />
          {showError && <p className='text-red-500'>Error submitting your pet pic. Please close and try again.</p>}
          <button
            className='text-center flex justify-center align-end button-shadow-black uppercase mt-2 place-self-center hover:font-bold disabled:border-1 disabled:border-gray-400 disabled:text-gray-400'
            disabled={!image || isLoading}
            onClick={handleSubmit}
            type='submit'
          >
            {isLoading ? <Loader /> : <PiUploadSimpleBold size={18} />}
            <span className='pl-2'>SUBMIT</span>
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
