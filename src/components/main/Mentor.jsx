import React, { useState, useEffect } from 'react';
import { API } from '../../api';
import MentorList from './MentorList';
import { ContentError } from '../ContentError';

export const Mentor = () => {
  const [projects, setProjects] = useState([]);
  const [contentError, setContentError] = useState(false);

  useEffect(() => {
    API.get(`api/portfolio/projects/?project_type=mentor`)
      .then((res) => {
        setProjects(res.data);
      })
      .catch(error => {
        console.error('get mentor projects: ', error);
        setContentError(true);
      });
  }, []);

  return (
    <>
      <div className='mt-1 md:mt-4 mb-8'>
        <h6 className='mb-2 dosis font-extrabold text-lg'>PERSONAL STATEMENT</h6>
        <p>
          There are few things that get me more excited than sharing my knowledge of and love for technology with
          others, whether that be in the capacity of mentor, teacher, or coworker, i feel privileged to have the
          opportunity yo change lives by inducing learning .
        </p>
      </div>
      <h6 className='mb-3 dosis font-extrabold text-lg'>EXPERIENCES</h6>
      <MentorList projects={projects} />
      {contentError || (projects.length < 1 && <ContentError />)}
    </>
  );
};

