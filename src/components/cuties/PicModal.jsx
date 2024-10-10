import React, { useContext, useEffect, useRef, useState } from 'react';
import { DatePicker, Modal, Form, Schema, useToaster } from 'rsuite';
import { SpeciesIcon } from './SpeciesIcon';
import { UserContext } from '../../App';
import { PicsContext } from '../../pages/PetPicsPage';
import { API } from '../../utils/api';
import { FaEdit, FaRegSave } from 'react-icons/fa';
import { TbTrashX, TbTrash } from 'react-icons/tb';
import { ImCancelCircle } from 'react-icons/im';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import format from 'date-fns/format';
import { useDateFormat, useTimeFormat, useAge, useNameAbbreviation, useBirthdayFormat, useDateTimeFormat } from '../../utils/useFormatting';

export const PicModal = ({ picData, isOpen, handleClose }) => {
  const [modalPic, setModalPic] = useState(picData);
  const { user } = useContext(UserContext);
  const { pics, setPics } = useContext(PicsContext);
  const form = useRef();
  const toaster = useToaster();

  const [isEditing, setIsEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [defaultBirthday, setDefaultBirthday] = useState(null);
  const [birthday, setBirthday] = useState(defaultBirthday)
  const [formValue, setFormValue] = useState({
    name: picData.name,
    breed: picData.breed,
  });
  
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

    let birthdayFormatted;
    if (birthday) {
      const date = format(birthday, 'yyyy-MM-dd');
      formValue.birthday = date;

      birthdayFormatted = new Date(birthday).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      });
      formValue.birthdayFormatted = birthdayFormatted;
    } else {
      formValue.birthday = '';
    }

    const merged = Object.assign({}, picData, formValue);
    setModalPic(merged);

    API.patch(`/api/pets/pics/${picData.id}/`, formValue, {
      headers: { 'content-type': 'multipart/form-data' },
    })
      .then((res) => {
        let picsWithoutNew = pics.filter((i) => i.id !== picData.id);
        setPics([...picsWithoutNew, merged])
      })
      .catch((error) => console.error('update pet error: ', error));
    setIsEditing(false);
    handleShowSuccess();
  };

  const handleShowSuccess = () => {
    let mediaPlacement = 'topCenter';
    const windowWidth = window.innerWidth;
    if (windowWidth <= 438) {
      mediaPlacement = 'topCenter';
    }
    toaster.push(success, { placement: mediaPlacement, duration: 3000 });
    setTimeout(() => {
      toaster.clear();
    }, 5000);
  };

  const success = (
    <div className='w-300 h-100 border-2 border-white text-lg text-white bg-white px-3 py-2 mt-4 toaster-shadow-white'>
      <p className='jetbrains-mono text-green-600 font-bold flex items-center'>
        <IoMdCheckmarkCircleOutline />
        <span className='pl-2'>SUCCESS!</span>
      </p>
    </div>
  );

  const handleDelete = () => {
    API.delete(`/api/pets/pics/${picData.id}/`)
      .then((res) => {
        let newPics = picsContext.pics.filter(i => i.id !== picData.id);
        picsContext.setPics(newPics);
        handleClose();
      })
      .catch((error) => console.error('update pet error: ', error));
    setIsEditing(false);
  };

  useEffect(() => {
    console.log(picData);
    if (picData.birthday) {
      setDefaultBirthday(new Date(picData.birthday));
    }
  }, []);

  return (
    <Modal overflow={false} size='lg' open={isOpen} onClose={handleClose} className='jetbrains-mono'>
      <Modal.Header className='flex mb-4 items-center'>
        <SpeciesIcon type={picData.pet_type} />
        {isEditing ? (
          <h2 className='text-[1.5rem] bungee-regular pl-4'>Edit Info</h2>
        ) : (
          <h2 className='text-xl bungee-regular uppercase font-bold pl-4'>{modalPic.name}</h2>
        )}
      </Modal.Header>
      <Modal.Body>
        <div className='md:grid md:grid-cols-3 gap-2'>
          <img className='md:col-span-2' src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/pets/${picData.imageURL}`} />
          {isEditing ? (
            <div className='md:col-span-1'>
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

                <div className='rs-form-group w-[300px] mb-4'>
                  <label>Birthday</label>
                  <DatePicker oneTap onSelect={(val) => setBirthday(val)} defaultValue={defaultBirthday} />
                </div>
              </Form>

              {showConfirm ? (
                <div className='flex float-right gap-2'>
                  <p>Are you sure?</p>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className='text-xs py-1 px-2 mt-4 flex items-center hover:underline hover:font-extrabold'
                  >
                    <ImCancelCircle />
                    <span className='pl-2 pt-[0.1rem]'>No, cancel</span>
                  </button>
                  <button
                    onClick={handleDelete}
                    className='text-xs py-1 px-2 mt-4 flex items-center hover:text-red-500 hover:underline hover:font-extrabold'
                  >
                    <TbTrash size={13} />
                    <span className='pl-2'>Yes, delete</span>
                  </button>
                </div>
              ) : (
                <div className='flex float-right gap-3'>
                  <button
                    onClick={() => setShowConfirm(true)}
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
              )}
            </div>
          ) : (
            <>
              <div className='mt-4 md:mt-0 md:col-span-1'>
                <div className='mb-3'>
                  <label className='uppercase text-[0.69rem] font-extrabold'>Submitted by</label>
                  <p>{useNameAbbreviation(modalPic.owner)}</p>
                </div>
                {modalPic.breed.length > 0 ? (
                  <div className='mb-3'>
                    <label className='uppercase text-[0.69rem] font-extrabold'>Breed</label>
                    <p>{modalPic.breed}</p>
                  </div>
                ) : (
                  ''
                )}
                {modalPic.birthday ? (
                  <div className='mb-3'>
                    <label className='uppercase text-[0.69rem] font-extrabold'>Birthday</label>
                    <p>{useBirthdayFormat(modalPic.birthday)}</p>
                  </div>
                ) : (
                  ''
                )}
                <div className='mb-3'>
                  <label className='uppercase text-[0.69rem] font-extrabold'>Uploaded on</label>
                  <p>{useDateTimeFormat(modalPic.created_at)}</p>
                </div>
                {/* {user && (
                  <>
                    {user.$id === modalPic.owner.$id && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className='button-shadow-black font-bold text-xs py-1 px-2 mt-4 flex items-center float-right'
                      >
                        <FaEdit />
                        <span className='pl-2 pt-[0.15rem]'>Edit</span>
                      </button>
                    )}
                  </>
                )} */}
              </div>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
