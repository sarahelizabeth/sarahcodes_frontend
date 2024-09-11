import React, { useState, useEffect } from 'react';
import { API } from '../../api';
import { MediaItem } from './MediaItem';

export const CoolApps = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    API.get(`/api/bookshelf/media/?media_type=app&visible=true`)
      .then((res) => {
        setApps(res.data);
      })
      .catch((error) => console.error('apps list error: ', error));
  }, []);

  return (
    <div className='right-container'>
      <h6 className='mb-3'>APPS</h6>
      {apps.map((app, index) => (
        <MediaItem key={index} item={app} action='read' />
      ))}
    </div>
  );
};
