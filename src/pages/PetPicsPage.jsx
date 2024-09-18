import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App'
import { Gallery } from '../components/cuties/Gallery';
import { API } from '../api';

export const PetPicsPage = ({ handleTitleChange }) => {
  const userContext = useContext(UserContext);
  const [pics, setPics] = useState([]);

  useEffect(() => {
    API.get(`api/pets/pics/`)
      .then((res) => {
        handleTitleChange();
        setPics(res.data);
      })
      .catch(error => console.error('get all pet pics err: ', error));
  }, []);

  return (
    <div className='bg-black px-10 pt-20'>
      <div className='header-container text-white text-center'>
        <h2 className='bungee-shade text-5xl'>PET PICS!!!</h2>
        <h5 className='bungee-hairline uppercase text-3xl py-3'>AKA The Best Part of this Entire Website</h5>
      </div>
      <Gallery items={pics} />
    </div>
  );
}
