import React, { useContext, useEffect, useRef, useState } from 'react';
import { DatePicker, Input, Modal, Form, Schema } from 'rsuite';
import { SpeciesIcon } from './SpeciesIcon';
import { UserContext } from '../../App';
import { API } from '../../api';
import { FaEdit } from 'react-icons/fa';
import { MdEditSquare } from 'react-icons/md';
import { FaRegSave } from 'react-icons/fa';
import { TbTrashX } from 'react-icons/tb';
import format from 'date-fns/format';
import { parseISO } from 'rsuite/esm/internals/utils/date';

export const PicModal = ({ picData, isOpen, handleClose, handleSuccess }) => {
  console.log(picData)
  const userContext = useContext(UserContext);
  const form = useRef();

  const [isEditing, setIsEditing] = useState(false);
  const [defaultBirthday, setDefaultBirthday] = useState(null);
  const [birthday, setBirthday] = useState(defaultBirthday)
  const [formValue, setFormValue] = useState({
    name: picData.name,
    breed: picData.breed,
    // birthday: defaultBirthday,
  });
  
  const DatePickerCustom = () => <DatePicker block oneTap onSelect={(val) => setFormValue({...formValue, birthday: val})} defaultValue={defaultBirthday} />;
  
  const { StringType } = Schema.Types;
  const model = Schema.Model({
    name: StringType().isRequired('Name is required.').maxLength(100, 'The maximum number of characters is 100.'),
    breed: StringType().maxLength(100, 'The maximum number of characters is 100.'),
  });

  const handleSave = () => {
    if (!form.current.check()) {
      console.error('Form Error');
      return;
    }

    console.log(formValue)
    console.log(birthday);

    // if (formValue.birthday) {
    //   const date = format(parseISO(formValue.birthday), 'yyyy-MM-dd');
    //   formValue.birthday = date;
    // } else {
    //   console.log(formValue.birthday)
    //   formValue.birthday = null;
    // }
    if (birthday) {
      const date = format(birthday, 'yyyy-MM-dd');
      formValue.birthday = date;
    } 
    else {
      // console.log(formValue.birthday);
      formValue.birthday = '';
    }

    console.log('formValue: ', formValue);

    API.patch(`/api/pets/pics/${picData.id}/`, formValue, {
      headers: { 'content-type': 'multipart/form-data' },
    })
      .then((res) => {
        console.log(res.data);
        setIsEditing(false);
      })
      .catch((error) => console.error('update pet error: ', error));
  };

  const handleDelete = () => {
    console.log(formValue);
    API.delete(`/api/pets/pics/${picData.id}/`)
      .then((res) => {
        console.log(res.data);
        handleClose();
      })
      .catch((error) => console.error('update pet error: ', error));
    setIsEditing(false)
  };

  useEffect(() => {
    if (picData.birthday) {
      setDefaultBirthday(new Date(picData.birthday));
    }
  }, []);

  return (
    <Modal overflow={false} size='lg' open={isOpen} onClose={handleClose} className='jetbrains-mono'>
      <Modal.Header className='flex mb-4 items-center'>
        <SpeciesIcon type={picData.pet_type} />
        {isEditing ? (
          <h2 className='text-xl pl-4'>Edit Info</h2>
        ) : (
          <h2 className='text-xl uppercase font-bold pl-4'>{picData.name}</h2>
        )}
      </Modal.Header>
      <Modal.Body>
        <div className='md:grid md:grid-cols-5 gap-2 text-xs md:text-sm'>
          <img className='md:col-span-3' src={picData.image} />
          {isEditing ? (
            <div className='md:col-span-2'>
              <Form
                ref={form}
                model={model}
                onChange={setFormValue}
                formValue={formValue}
                className='flex flex-col items-center'
              >
                <Form.Group controlId='name'>
                  <Form.ControlLabel>Name</Form.ControlLabel>
                  <Form.Control name='name' />
                </Form.Group>

                <Form.Group controlId='breed'>
                  <Form.ControlLabel>Breed</Form.ControlLabel>
                  <Form.Control name='breed' />
                </Form.Group>

                {/* <Form.Group controlId='birthday'>
                  <Form.ControlLabel>Birthday</Form.ControlLabel>
                  <Form.Control name='birthday' accepter={DatePickerCustom} />
                </Form.Group> */}
                <label>Birthday</label>
                <DatePicker
                  oneTap
                  onSelect={(val) => setBirthday(val)}
                  defaultValue={defaultBirthday}
                />
              </Form>
              
              <div className='flex float-right gap-3'>
                <button
                  onClick={handleDelete}
                  className='button-shadow-black font-bold text-xs py-1 px-2 mt-4 flex items-center'
                >
                  <TbTrashX size={13} />
                  <span className='pl-2 pt-[0.1rem]'>Delete</span>
                </button>
                <button
                  onClick={handleSave}
                  className='button-shadow-black font-bold text-xs py-1 px-2 mt-4 flex items-center'
                >
                  <FaRegSave />
                  <span className='pl-2'>Save</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className='mt-4 md:mt-0 md:col-span-1'>
                <p>Submitted by:</p>
                <p>{picData.breed.length > 0 ? 'Breed:' : ''}</p>
                <p>{picData.birthday ? 'Birthday:' : ''}</p>
                <p>Uploaded on:</p>
              </div>
              <div className='mt-4 md:mt-0 md:col-span-1'>
                <p>{picData.owner_name}</p>
                <p>{picData.breed}</p>
                <p>{picData.birthday ? picData.birthdayFormatted : null} </p>
                <p>{picData.createdAtFormatted}</p>
                {userContext.user.pk === picData.owner.pk && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className='button-shadow-black font-bold text-xs py-1 px-2 mt-4 flex items-center float-right'
                  >
                    <FaEdit />
                    <span className='pl-2 pt-[0.15rem]'>Edit</span>
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
