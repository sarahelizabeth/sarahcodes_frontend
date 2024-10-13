import React, { useRef, useState, useEffect } from 'react';
import { Form, Schema } from 'rsuite';
import DatePicker from 'rsuite/DatePicker';
import { TbTrashX } from 'react-icons/tb';
import { FaRegSave } from 'react-icons/fa';
import format from 'date-fns/format';
import supabase from '../../utils/supabaseClient';

export const PicEditForm = ({ picData, defaultBirthday, handleSuccess, handleError, handleCancel }) => {
  const form = useRef();
  const [birthday, setBirthday] = useState(defaultBirthday);
  const [formValue, setFormValue] = useState({
    name: picData.name,
    breed: picData.breed,
  });

  const { StringType } = Schema.Types;
  const model = Schema.Model({
    name: StringType().isRequired('Name is required.').maxLength(100, 'The maximum number of characters is 100.'),
    breed: StringType().maxLength(100, 'The maximum number of characters is 100.'),
  });

  const handleSave = async () => {
    if (!form.current.check()) {
      console.error('Form Error');
      return;
    }

    if (birthday) {
      const date = format(birthday, 'yyyy-MM-dd');
      formValue.birthday = date;
    }

    const { error } = await supabase.from('pets').update(formValue).eq('id', picData.id);
    if (error) {
      console.error('update pet error: ', error);
      handleError();
      return;
    }

    const merged = Object.assign({}, picData, formValue);
    handleSuccess(merged);
  };

  

  return (
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

      <div className='flex float-right gap-3'>
        <button
          onClick={handleCancel}
          className='button-shadow-black font-bold text-xs py-1 px-2 mt-4 flex items-center'
        >
          <TbTrashX size={13} />
          <span className='pl-2 pt-[0.1rem]'>Cancel</span>
        </button>
        <button onClick={handleSave} className='button-shadow-black font-bold text-xs py-1 px-2 mt-4 flex items-center'>
          <FaRegSave />
          <span className='pl-2'>Save</span>
        </button>
      </div>
    </div>
  );
};