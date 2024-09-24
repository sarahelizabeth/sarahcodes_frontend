import React, { useContext, useEffect, useMemo, useState, createContext } from 'react';
import { UserContext } from '../App';
import { API } from '../api';
import { useToaster } from 'rsuite';
import { AddPetPicModal } from '../components/cuties/AddPetPicModal';
import { Gallery } from '../components/cuties/Gallery';

export const PicsContext = createContext(null);

export const PetPicsPage = ({ handlePageChange }) => {
  const userContext = useContext(UserContext);
  const toaster = useToaster();

  const [pics, setPics] = useState([]);
  const picsContext = useMemo(() => ({ pics, setPics }), [pics]);
  
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (!userContext.user) {
      handleShowWarning();
      return;
    }
    setOpen(true);
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
        handlePageChange();
        const picsFormatted = res.data.map((item) => {
          if (item.birthday) {
            let birthdayFormatted = new Date(item.birthday).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'UTC',
            });
            item.birthdayFormatted = birthdayFormatted;
          }

          let createdAtFormatted = new Date(item.created_at).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'UTC',
          });

          item.createdAtFormatted = createdAtFormatted;
          return item;
        });
        picsContext.setPics(picsFormatted);
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
        <Gallery />
        <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2'>
          <button
            onClick={handleSubmit}
            className='button-shadow-black-outline border-2 border-black text-black bg-white px-4 py-2 uppercase mt-2 mb-4 hover:font-extrabold z-20'
          >
            Submit Your Own
          </button>
        </div>
        <AddPetPicModal
          isOpen={open}
          handleClose={() => setOpen(false)}
        />
      </div>
    </PicsContext.Provider>
  );
}
