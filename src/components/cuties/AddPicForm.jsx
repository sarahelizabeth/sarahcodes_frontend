import React, { useState } from 'react';
import { Divider } from 'rsuite';
import { motion } from 'framer-motion';
import { API } from '../../api';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { UploadButton } from './UploadButton';

export const AddPicForm = ({ petId, handleSuccess }) => {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleImageChange = (file) => {
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
    console.log(file)
    let fileNameArr = file.name.split('.');
    let randomInt = Math.floor(Math.random() * 100);
    let fileName = fileNameArr[0] + randomInt.toString() + '.' + fileNameArr[1];
    let imageObject = {
      image: file,
      preview: URL.createObjectURL(file),
      name: fileName,
    };
    setImages([...images, imageObject]);
    console.log(images)
  };

  const removeImage = (image, index) => {
    console.log(image)
    console.log(index)
    console.log(images);
    // const updatedImageArray = images.filter((i) => {
    //   return i.name !== image.name;
    // });
    const updatedImageArray = images.toSpliced(index, 1);
    setImages(updatedImageArray);

    console.log(updatedImageArray);
  }

  const handleUpload = () => {
    console.log(image)
    console.log(images)
    return;
    let picData = new FormData();
    picData.append('image', image, image.name);
    picData.append('pet', petId);
    console.log(picData)
    API.post(`/api/pets/pics/`, picData, {
      headers: { 'content-type': 'multipart/form-data' },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.error('upload pic error: ', error));

    // handleSuccess(fileList);
  };

  return (
    <motion.div
      key={'upload'}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col items-center'
    >
      <UploadButton handleImage={handleImageChange} />
      {/* {previewImage && (
        <div className='image-container flex flex-col justify-center items-center w-full'>
          <img src={previewImage} className='h-32 w-fit py-3' />
          <div className='md:w-full px-3'>
            <label
              className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'
              htmlFor='image-caption'
            >
              Add a caption <span className='text-[0.5rem]'>(optional)</span>
            </label>
            <input
              className='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3'
              id='image-caption'
              type='text'
              placeholder='This is my adorable kitty!'
            />
          </div>
        </div>
      )} */}
      {images.length && (
        <div className='flex justify-center items-center w-full'>
          {images.map((i, index) => (
            <div key={index} id={index}>
              <img src={i.preview} className='h-32 w-fit p-3' />
              <p className='text-xs'>
                {'('}
                <span>
                  <button onClick={() => removeImage(i, index)}>remove</button>
                </span>
                {' | '}
                <span>
                  <button onClick={() => addCaption(i, index)}>add caption</button>
                </span>
                {')'}
              </p>
            </div>
          ))}
        </div>
      )}
      <Divider />
      <button
        className='text-center flex justify-center align-end button-shadow-black hover:font-bold border-2 disabled:border-1 border-black disabled:border-gray-400 px-4 py-2 uppercase mt-2 place-self-center disabled:text-gray-400'
        disabled={!image}
        onClick={handleUpload}
        type='submit'
      >
        <PiUploadSimpleBold size={18} />
        <span className='pl-2'>UPLOAD</span>
      </button>
    </motion.div>
  );
}
