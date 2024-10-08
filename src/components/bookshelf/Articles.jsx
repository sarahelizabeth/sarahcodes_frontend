import React, { useState, useEffect, useContext } from 'react';
import { MediaItem } from './MediaItem';
import { API } from '../../utils/api';
import { useFetch } from '../../utils/useFetch';
// import { getArticles } from '../../utils/appwriteClient';
import { Divider } from 'rsuite';
import { IoLogoYoutube } from 'react-icons/io5';
import { FiExternalLink } from 'react-icons/fi';
import { ContentError } from '../ContentError';
import { BookshelfContext } from '../../App';

export const Articles = () => {
  const { bookshelf } = useContext(BookshelfContext);
  const articles = bookshelf.filter((item) => item.media_type === 'article');
  // const { data: articles, error: contentError } = useFetch(getArticles);
  // const [articles, setArticles] = useState([]);
  // const [contentError, setContentError] = useState(false);

  // useEffect(() => {
  //   API.get(`/api/bookshelf/media/?media_type=article&visible=true`)
  //     .then((res) => {
  //       setArticles(res.data);
  //     })
  //     .catch(error => {
  //       console.error('articles list error: ', error);
  //       setContentError(true);
  //     });
  // }, []);

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
