import React, { useEffect, useState } from 'react';
import { API } from '../../api';
import { MediaItem } from './MediaItem';
import { Divider } from 'rsuite';
import { FaGoodreads } from 'react-icons/fa6';

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
    <div className='right-container mt-4'>
      {books.map((book, index) => (
        <React.Fragment key={index}>
          <MediaItem item={book} action='read' />
          <Divider />
        </React.Fragment>
      ))}
    </div>
  );
};
