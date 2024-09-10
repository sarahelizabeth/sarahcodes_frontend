import React, { useState } from 'react';
import { Button, Divider } from 'rsuite';
import ProjectModal from './ProjectModal';

const ProjectList = ({ projects }) => {
  const [hover, setHover] = useState(null);
  const [open, setOpen] = useState(null);

  return (
    <>
      {projects.map((project, index) => (
        <div key={index}>
          <div className='grid grid-cols-4 mb-6'>
            <div className='relative' onMouseOver={() => setHover(index)} onMouseLeave={() => setHover(null)}>
              <img className='object-cover' src={project.logo} />
              {hover == index && (
                <button onClick={() => setOpen(index)} className='project-btn absolute top-0 left-0 w-full h-full'>
                  <span className='text-black font-bold'>View More</span>
                </button>
              )}
            </div>
            <div className='col-span-3 pl-5 flex flex-col'>
              <button
                className='text-lg text-left hover:underline hover:underline-offset-4'
                onClick={() => setOpen(index)}
              >
                {project.title}
              </button>
              <p className='grow truncate text-sm pt-1'>{project.description}</p>
              <div className='tag-container flex flex-wrap gap-2 w-full'>
                {project.tools.slice(0, 4).map((tool, index) => (
                  <span
                    key={index}
                    className='bg-gray-100 text-xs rounded-full px-3 py-1 text-sm font-semibold text-gray-600'
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <ProjectModal project={project} isOpen={open === index} handleClose={() => setOpen(null)} />
          <Divider />
        </div>
      ))}
    </>
  );
};

export default ProjectList;
