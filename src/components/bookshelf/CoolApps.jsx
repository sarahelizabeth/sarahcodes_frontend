import React, { useState, useEffect } from 'react';
import { API } from '../../api';
import { MediaItem } from './MediaItem';
import { Divider } from 'rsuite';
import { FaAppStoreIos } from 'react-icons/fa';
import { ContentError } from '../ContentError';

export const CoolApps = () => {
  const [apps, setApps] = useState([]);
  const [contentError, setContentError] = useState(false);

  useEffect(() => {
    API.get(`/api/bookshelf/media/?media_type=app&visible=true`)
      .then((res) => {
        setApps(res.data);
      })
      .catch((error) => {
        console.error('apps list error: ', error);
        setContentError(true);
      });
  }, []);

  return (
    <div className='right-container mt-4'>
      {apps.map((app, index) => (
        <React.Fragment key={index}>
          <MediaItem item={app} action='used' />
          <Divider />
        </React.Fragment>
      ))}
      {contentError && <ContentError />}
    </div>
  );
};
