import React, { useContext } from 'react';
import ProjectList from './ProjectList';
import { IconTooltip } from '../ui/IconTooltip';
import { ContentError } from '../ui/ContentError';
import { ProjectsContext } from '../../pages/MainPage';
import StackList from './StackList';

export const Developer = () => {
  const { projects } = useContext(ProjectsContext);
  const developerProjects = projects.filter((project) => project.project_type === 'developer');

  return (
    <>
      <div className='mt-1 md:mt-4 mb-8'>
        <h6 className='hidden md:block mb-2 dosis font-extrabold text-lg'>PERSONAL STATEMENT</h6>
        <p>
          With 8 years of professional experience in full-stack development and 10+ years of writing code, I have a
          strong foundation in creating sophisticated, robust, user-centric applications. I have a deep respect for the
          power of technology to amplify people's voices, channel their creativity, and change lives.
        </p>
      </div>
      <div className='mb-8'>
        <h6 className='mb-3 dosis font-extrabold text-lg'>STACK</h6>
        <StackList size={35} />
      </div>
      <h6 className='mb-3 dosis font-extrabold text-lg'>PROJECTS</h6>
      {developerProjects.length < 1 ? <ContentError /> : <ProjectList projects={developerProjects} />}
    </>
  );
};

