import React, { useContext } from 'react';
import { ProjectsContext } from '../../pages/MainPage';
import MentorList from './MentorList';
import { ContentError } from '../ui/ContentError';
import ProjectList from './ProjectList';

export const Mentor = () => {
  const { projects, setProjects } = useContext(ProjectsContext);
  const mentorProjects = projects.filter((project) => project.project_type === 'mentor');

  return (
    <>
      <div className='mt-1 md:mt-4 mb-8'>
        <h6 className='hidden md:block mb-2 dosis font-extrabold text-lg'>PERSONAL STATEMENT</h6>
        <p>
          There are few things that get me more excited than sharing my knowledge of and love for technology with
          others, whether that be in the capacity of mentor, teacher, or coworker, i feel privileged to have the
          opportunity yo change lives by inducing learning .
        </p>
      </div>
      <h6 className='mb-3 dosis font-extrabold text-lg'>EXPERIENCES</h6>
      {mentorProjects.length < 1 ? <ContentError /> : <MentorList projects={mentorProjects} />}
    </>
  );
};

