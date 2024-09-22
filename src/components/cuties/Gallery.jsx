import React, { useState } from 'react';
import { PicItem } from './PicItem';
import { PicModal } from './PicModal';

export const Gallery = ({ items }) => {
  console.log(items);
  const [currentPic, setCurrentPic] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpenPicModal = (item) => {
    console.log(item);
    setCurrentPic(item);
    setOpen(true);
  };

  const handleClosePicModal = () => {
    setCurrentPic(null);
    setOpen(false);
  }

  return (
    <div className='gallery-container'>
      {items.map((item, index) => (
        <figure className='gallery-img-container' key={index}>
          <button onClick={() => handleOpenPicModal(item)}>
            <PicItem picData={item} />
          </button>
          {currentPic && <PicModal picData={currentPic} isOpen={open} handleClose={handleClosePicModal} />}
        </figure>
      ))}
    </div>
  );
};
