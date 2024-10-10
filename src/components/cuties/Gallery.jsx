import React, { useState, useContext } from 'react';
import { PicItem } from './PicItem';
import { PicModal } from './PicModal';
import { motion } from 'framer-motion';
import { PicsContext } from '../../pages/PetPicsPage';

export const Gallery = () => {
  const { pics } = useContext(PicsContext);
  const [currentPic, setCurrentPic] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpenPicModal = (item) => {
    setCurrentPic(item);
    setOpen(true);
  };

  const handleClosePicModal = () => {
    setCurrentPic(null);
    setOpen(false);
  };

  return (
    <div className='gallery-container'>
      {pics.map((item, index) => (
        <figure className='gallery-img-container' key={index}>
          <motion.button
            onClick={() => handleOpenPicModal(item)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.975 }}
            className='w-full'
          >
            <PicItem picData={item} />
          </motion.button>
          {currentPic && (
            <PicModal
              picData={currentPic}
              isOpen={open}
              handleClose={handleClosePicModal}
            />
          )}
        </figure>
      ))}
    </div>
  );
};
