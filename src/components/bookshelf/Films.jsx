import React, { useContext } from 'react';
import { MediaItem } from './MediaItem';
import { Divider } from 'rsuite';
import { FaImdb } from 'react-icons/fa';
import { ContentError } from '../ContentError';
import { BookshelfContext } from '../../App';

export const Films = () => {
  const { bookshelf } = useContext(BookshelfContext);
  const films = bookshelf.filter((item) => item.media_type === 'film');

  return (
    <div className='right-container mt-4'>
      {films.map((film, index) => (
        <React.Fragment key={index}>
          <MediaItem item={film} action='watched' />
          <Divider />
        </React.Fragment>
      ))}
      {films.length < 1 && <ContentError />}
    </div>
  );
};
