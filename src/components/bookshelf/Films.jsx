import React, { useState, useEffect } from 'react';
import { API } from '../../api';
import { MediaItem } from './MediaItem';
import { Divider } from 'rsuite';
import { FaImdb } from 'react-icons/fa';

export const Films = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    API.get(`/api/bookshelf/media/?media_type=film&media_type=show&visible=true`)
      .then((res) => {
        setFilms(res.data);
      })
      .catch((error) => console.error('films list error: ', error));
  }, []);

  return (
    <div className='right-container mt-4'>
      {films.map((film, index) => (
        <React.Fragment key={index}>
          <MediaItem item={film} action='watched' />
          <Divider />
        </React.Fragment>
      ))}
    </div>
  );
};
