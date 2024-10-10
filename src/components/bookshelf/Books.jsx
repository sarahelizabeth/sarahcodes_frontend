import React, { useContext } from 'react';
import { MediaItem } from './MediaItem';
import { Divider } from 'rsuite';
import { FaGoodreads } from 'react-icons/fa6';
import { ContentError } from '../ContentError';
import { BookshelfContext } from '../../App';

export const Books = () => {
  const { bookshelf } = useContext(BookshelfContext);
  const books = bookshelf.filter((item) => item.media_type === 'book');

  return (
    <div className='right-container mt-4'>
      {books.map((book, index) => (
        <React.Fragment key={index}>
          <MediaItem item={book} action='read' />
          <Divider />
        </React.Fragment>
      ))}
      {books.length < 1 && <ContentError />}
    </div>
  );
};
