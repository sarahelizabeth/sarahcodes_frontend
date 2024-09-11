import React, { useEffect, useState } from 'react';
import API from '../../api';
import { MediaItem } from './MediaItem';

export const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get(`/api/bookshelf/media/?media_type=book&visible=true`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((error) => console.error('books list error: ', error));
  }, []);

  return (
    <div className='right-container'>
      <h6 className='mb-3'>BOOKS</h6>
      {books.map((book, index) => (
        <MediaItem key={index} item={book} action='read' />
      ))}
    </div>
  );
};
