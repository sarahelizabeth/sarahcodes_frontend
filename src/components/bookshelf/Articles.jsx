import React, { useContext } from 'react';
import { MediaItem } from './MediaItem';
import { Divider } from 'rsuite';
import { ContentError } from '../ui/ContentError';
import { BookshelfContext } from '../../App';

export const Articles = () => {
  const { bookshelf } = useContext(BookshelfContext);
  const articles = bookshelf.filter((item) => item.media_type === 'article');

  return (
    <div className='right-container mt-4'>
      {articles.map((article, index) => (
        <React.Fragment key={index}>
          <MediaItem item={article} action='read' />
          <Divider />
        </React.Fragment>
      ))}
      {articles.length < 1 && <ContentError />}
    </div>
  );
};
