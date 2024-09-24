import React, { useState, useEffect } from 'react';
import { API } from '../../api';
import ProjectList from './ProjectList';
import { ContentError } from '../ContentError';

export const Activist = () => {
  const [projects, setProjects] = useState([]);
  const [contentError, setContentError] = useState(false);

  useEffect(() => {
    API.get(`api/portfolio/projects/?project_type=activist`)
      .then((res) => {
        setProjects(res.data);
      })
      .catch(error => {
        console.error('get activist projects err: ', error);
        setContentError(true);
      });
  }, []);

  return (
    <>
      <div className='mt-1 md:mt-4 mb-8'>
        <h6 className='mb-2 dosis font-bold text-lg'>PERSONAL STATEMENT</h6>
        <p>
          I am a values-driven person; coding is not just my job but also my passion. My 10+ years of being a programmer
          have allowed me to engage in numerous experiences and projects that further the causes of civic engagement,
          human rights, women's empowerment, and social justice.
        </p>
      </div>
      <h6 className='mb-3 dosis font-extrabold text-lg'>PROJECTS</h6>
      <ProjectList projects={projects} />
      {contentError && <ContentError />}
    </>
  );
};
