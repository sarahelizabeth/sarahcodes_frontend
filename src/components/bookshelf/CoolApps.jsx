import React, { useState, useEffect } from 'react';
import { API } from '../../api';
import { MediaItem } from './MediaItem';
import { Divider } from 'rsuite';

export const CoolApps = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    API.get(`/api/bookshelf/media`)
      .then((res) => {
        console.log(res.data);
        setApps(res.data);
      })
      .catch((error) => console.error('apps list error: ', error));
  }, []);

  return (
    <div className='right-container'>
      {apps.map((app, index) => (
        <React.Fragment key={index}>
          <MediaItem item={app} action='used' />
          <Divider />
        </React.Fragment>
      ))}
    </div>
  );
};
