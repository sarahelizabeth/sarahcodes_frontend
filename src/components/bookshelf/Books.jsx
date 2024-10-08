import React, { useEffect, useState } from 'react';
import { API } from '../../utils/api';
import { MediaItem } from './MediaItem';
import { Divider } from 'rsuite';
import { FaGoodreads } from 'react-icons/fa6';
import { ContentError } from '../ContentError';

export const Books = () => {
  const [books, setBooks] = useState([]);
  const [contentError, setContentError] = useState(false);

  useEffect(() => {
    API.get(`/api/bookshelf/media/?media_type=book&visible=true`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((error) => {
        console.error('books list error: ', error);
        setContentError(true);
      });  
  }, []);

  return (
    <div className='right-container mt-4'>
      {books.map((book, index) => (
        <React.Fragment key={index}>
          <MediaItem item={book} action='read' />
          <Divider />
        </React.Fragment>
      ))}
      {contentError || (books.length < 1 && <ContentError />)}
    </div>
  );
};
