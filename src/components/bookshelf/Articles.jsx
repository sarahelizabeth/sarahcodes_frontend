import React, { useState, useEffect } from 'react';
import { MediaItem } from './MediaItem';
import { API } from '../../api';
import { Divider } from 'rsuite';
import { IoLogoYoutube } from 'react-icons/io5';
import { FiExternalLink } from 'react-icons/fi';

export const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    API.get(`/api/bookshelf/media/?media_type=article&visible=true`)
      .then((res) => {
        setArticles(res.data);
      })
      .catch((error) => console.error('articles list error: ', error));
  }, []);

  return (
    <div className='right-container mt-4'>
      {articles.map((article, index) => (
        <React.Fragment key={index}>
          <MediaItem item={article} action='read' />
          <Divider />
        </React.Fragment>
      ))}
    </div>
  );
};
