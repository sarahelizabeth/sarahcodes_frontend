import React, { useState, useEffect } from 'react';
import ProjectList from './ProjectList';
import { API } from '../../api';

import { FaAws, FaDocker, FaGithub, FaHtml5, FaNode, FaPython, FaReact, FaSass, FaVuejs } from 'react-icons/fa';
import { SiDjango, SiTailwindcss, SiNextdotjs, SiTypescript, SiVite } from 'react-icons/si';
import { DiPostgresql } from 'react-icons/di';

import { IconTooltip } from '../IconTooltip';

export const Developer = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get(`api/portfolio/projects?project_type=developer`)
      .then((res) => {
        setProjects(res.data);
      })
      .catch((error) => console.error('developer list error: ', error));
  }, []);

  return (
    <>
      <div className='mt-1 md:mt-4 mb-8'>
        <h6 className='mb-2 dosis font-extrabold text-lg'>PERSONAL STATEMENT</h6>
        <p>
          With 8 years of professional experience in full-stack development and 10+ years of writing code, I have a
          strong foundation in creating sophisticated, robust, user-centric applications. I have a deep respect for the
          power of technology to amplify people's voices, channel their creativity, and change lives.
        </p>
      </div>
      <div className='mb-8'>
        <h6 className='mb-3 dosis font-extrabold text-lg'>STACK</h6>
        <div className='stack-grid grid grid-cols-5 w-full gap-2'>
          <IconTooltip placement='topStart' text='React' icon={<FaReact size={35} />} />
          <IconTooltip placement='top' text='VueJS' icon={<FaVuejs size={35} />} />
          <IconTooltip placement='top' text='Django' icon={<SiDjango size={35} />} />
          <IconTooltip placement='top' text='PostgreSQL' icon={<DiPostgresql size={35} />} />
          <IconTooltip placement='topEnd' text='TypeScript' icon={<SiTypescript size={32} />} />
          <IconTooltip placement='top' text='Python' icon={<FaPython size={35} />} />
          <IconTooltip placement='top' text='HTML' icon={<FaHtml5 size={35} />} />
          <IconTooltip placement='top' text='Sass' icon={<FaSass size={35} />} />
          <IconTooltip placement='top' text='Tailwind CSS' icon={<SiTailwindcss size={35} />} />
          <IconTooltip placement='top' text='AWS' icon={<FaAws size={38} />} />
          <IconTooltip placement='bottomStart' text='Docker' icon={<FaDocker size={35} />} />
          <IconTooltip placement='bottom' text='Github' icon={<FaGithub size={35} />} />
          <IconTooltip placement='bottom' text='Next.js' icon={<SiNextdotjs size={35} />} />
          <IconTooltip placement='bottom' text='Node.js' icon={<FaNode size={35} />} />
          <IconTooltip placement='bottomEnd' text='Vite' icon={<SiVite size={35} />} />
        </div>
      </div>
      <h6 className='mb-3 dosis font-extrabold text-lg'>PROJECTS</h6>
      <ProjectList projects={projects} />
    </>
  );
};

