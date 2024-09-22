import React, { useRef } from 'react';
import { RiImageAddFill } from 'react-icons/ri';

export const UploadButton = ({ handleImage }) => {
  const imageInput = useRef(null);

  const handleClick = (event) => {
    imageInput.current.click();
  };

  const handleChange = (event) => {
    const imageData = event.target.files[0];
    handleImage(imageData);
  };

  return (
    <>
      <button
        className='py-2 px-3 border-2 border-dashed border-black flex justify-center items-center'
        onClick={handleClick}
      >
        <span className='pr-2'>Choose image</span>
        <RiImageAddFill size={26} />
      </button>
      <input type='file' onChange={handleChange} ref={imageInput} style={{ display: 'none' }} />
    </>
  );
};
