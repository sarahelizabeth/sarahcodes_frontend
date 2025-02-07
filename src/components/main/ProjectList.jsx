import React, { useState } from 'react';
import { Divider } from 'rsuite';
import ProjectModal from './ProjectModal';
import { getStackItemByLabel } from './StackList';

const ProjectList = ({ projects }) => {
  const [hover, setHover] = useState(null);
  const [open, setOpen] = useState(null);

  return (
    <>
      {projects.map((project, index) => (
        <div key={index}>
          <div className='grid grid-cols-4 mb-6'>
            <div className='relative' onMouseOver={() => setHover(index)} onMouseLeave={() => setHover(null)}>
              <img className='object-cover' src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/projects/logos${project.logoURL}`} />
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
                {project.title} {'>>'}
              </button>
              <div className='grow'>
                <p className='line-clamp-2 text-xs pt-1'>{project.description}</p>
              </div>
              <div className='tag-container hidden md:flex flex-wrap gap-2 w-full'>
                {project.tools.slice(0, 3).map((tool, index) => (
                  <div key={index} className='rounded-md flex items-center bg-slate-100 py-0.5 px-2.5 border border-transparent text-xs text-slate-900 transition-all shadow-sm'>
                    {getStackItemByLabel(tool).icon}
                    <p className='pl-2 dosis font-semibold'>{tool}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {open === index && <ProjectModal project={project} isOpen={open === index} handleClose={() => setOpen(null)} />}
          <Divider />
        </div>
      ))}
    </>
  );
};

export default ProjectList;
