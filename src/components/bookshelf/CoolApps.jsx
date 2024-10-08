import React, { useState, useEffect, useContext } from 'react';
import { API } from '../../utils/api';
import { MediaItem } from './MediaItem';
import { Divider } from 'rsuite';
import { FaAppStoreIos } from 'react-icons/fa';
import { ContentError } from '../ContentError';
import { BookshelfContext } from '../../App';

export const CoolApps = () => {
  const { bookshelf } = useContext(BookshelfContext);
  const apps = bookshelf.filter((item) => item.media_type === 'app');

  return (
    <div className='right-container mt-4'>
      {apps.map((app, index) => (
        <React.Fragment key={index}>
          <MediaItem item={app} action='used' />
          <Divider />
        </React.Fragment>
      ))}
      {apps.length < 1 && <ContentError />}
    </div>
  );
};
