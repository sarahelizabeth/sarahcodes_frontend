import React, { useContext } from 'react';
import { ProjectsContext } from '../../pages/MainPage';
import ProjectList from './ProjectList';
import { ContentError } from '../ui/ContentError';

export const Activist = () => {
  const { projects } = useContext(ProjectsContext);
  const activistProjects = projects.filter((project) => project.project_type === 'activist');

  return (
    <>
      <div className='mt-1 md:mt-4 mb-8'>
        <h6 className='hidden md:block mb-2 dosis font-bold text-lg'>PERSONAL STATEMENT</h6>
        <p>
          I am a values-driven person; coding is not just my job but also my passion. My 10+ years of being a programmer
          have allowed me to engage in numerous experiences and projects that further the causes of civic engagement,
          human rights, women's empowerment, and social justice.
        </p>
      </div>
      <h6 className='mb-3 dosis font-extrabold text-lg'>PROJECTS</h6>
      {activistProjects.length < 1 ? <ContentError /> : <ProjectList projects={activistProjects} />}
    </>
  );
};
