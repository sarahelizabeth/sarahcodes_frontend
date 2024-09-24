import React, { useContext, useEffect, useMemo, useState, createContext } from 'react';
import { UserContext } from '../App';
import { API } from '../api';
import { useToaster } from 'rsuite';
import { PicItem } from '../components/cuties/PicItem';
import { PicModal } from '../components/cuties/PicModal';
import { AddPetPicModal } from '../components/cuties/AddPetPicModal';
import { motion } from 'framer-motion';

export const PicsContext = createContext(null);

export const PetPicsPage = ({ handlePageChange }) => {
  const userContext = useContext(UserContext);
  const toaster = useToaster();

  const [pics, setPics] = useState([]);
  const picsContext = useMemo(() => ({ pics, setPics }), [pics]);

  const [currentPic, setCurrentPic] = useState(null);
  const [openSubmit, setOpenSubmit] = useState(false);
  const [openView, setOpenView] = useState(false);

  const handleOpenPicModal = (item) => {
    let birthdayFormatted = new Date(item.birthday).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
    let createdAtFormatted = new Date(item.created_at).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC',
    });
    console.log(createdAtFormatted)
    item.birthdayFormatted = birthdayFormatted;
    item.createdAtFormatted = createdAtFormatted;

    setCurrentPic(item);
    setOpenView(true);
  };

  const handleClosePicModal = () => {
    setCurrentPic(null);
    setOpenView(false);
  };

  const handleSubmitPicture = () => {
    if (!userContext.user) {
      handleShowWarning();
      return;
    }
    setOpenSubmit(true);
  };

  const handleSubmitSuccess = (pic) => {
    setPics([...pics, pic]);
    setOpenSubmit(false);
  };

  const handleEditSuccess = (pic) => {
    // setPics([...pics, pic]);
    setCurrentPic(null);
    setOpenView(false);
  };

  const handleShowWarning = () => {
    let mediaPlacement = 'bottomStart';
    const windowWidth = window.innerWidth;
    if (windowWidth <= 438) {
      mediaPlacement = 'topCenter';
    }
    toaster.push(warning, { placement: mediaPlacement, duration: 3000 });
    setTimeout(() => {
      toaster.clear();
    }, 5000);
  };

  const warning = (
    <div className='w-300 h-100 border-2 border-white text-white bg-black px-3 py-2 mt-4 toaster-shadow-white'>
      <p className='jetbrains-mono'>
        Please log in or sign up to post <br></br> a pic of your cutie!
      </p>
    </div>
  );

  useEffect(() => {
    API.get(`api/pets/pics/`)
      .then((res) => {
        console.log(res.data);
        handlePageChange();
        picsContext.setPics(res.data);
      })
      .catch(error => console.error('get all pet pics err: ', error));
  }, []);

  return (
    <PicsContext.Provider value={picsContext}>
      <div className='px-4 relative top-28 sm:top-[5.25rem] pt-2'>
        <div className='text-center md:flex md:justify-center md:items-center md:mb-3'>
          <h2 className='bungee-shade text-5xl'>PET PICS!!!</h2>
          <h5 className='bungee-hairline uppercase text-xs py-3 md:max-w-40 md:ml-3'>
            {'('}AKA The Best Part of this Entire Website{'}'}
          </h5>
        </div>
        <div className='gallery-container'>
          {picsContext.pics.map((item, index) => (
            <figure className='gallery-img-container' key={index}>
              <motion.button
                onClick={() => handleOpenPicModal(item)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.975 }}
              >
                <PicItem picData={item} />
              </motion.button>
              {currentPic && (
                <PicModal
                  picData={currentPic}
                  isOpen={openView}
                  handleClose={handleClosePicModal}
                  handleSuccess={handleEditSuccess}
                />
              )}
            </figure>
          ))}
        </div>
        <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2'>
          <button
            onClick={handleSubmitPicture}
            className='button-shadow-black-outline border-2 border-black text-black bg-white px-4 py-2 uppercase mt-2 mb-4 hover:font-extrabold z-20'
          >
            Submit Your Own
          </button>
        </div>
        <AddPetPicModal
          isOpen={openSubmit}
          handleClose={() => setOpenSubmit(false)}
          handleSuccess={handleSubmitSuccess}
        />
      </div>
    </PicsContext.Provider>
  );
}
