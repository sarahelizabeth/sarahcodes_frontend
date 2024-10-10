import React, { useState } from 'react';
import { Divider } from 'rsuite';
import { IoChevronDownSharp, IoChevronUpSharp } from 'react-icons/io5';

const MentorList = ({ projects }) => {
  const [isToggled, setIsToggled] = useState([]);

  const handleToggle = (index) => {
    setIsToggled((prev) => {
      if (prev.includes(index)) {
        return prev.filter((item) => item !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return (
    <>
      {projects.map((project, index) => (
        <div key={index}>
          <div className='flex mb-6'>
            <div className='img-container w-32 h-32 pt-1'>
              <img className='h-full max-w-fit object-cover' src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/projects/logos${project.logoURL}`} />
            </div>
            <div className='pl-4 flex flex-col'>
              <p className='underline'>{project.title}</p>
              <p className={`${!isToggled.includes(index) && 'line-clamp-3'}`}>{project.description}</p>
              <button
                className='self-end items-center underline hover:cursor-pointer hover:italic flex'
                onClick={() => handleToggle(index)}
              >
                {isToggled.includes(index) ? <IoChevronUpSharp size={14} /> : <IoChevronDownSharp size={14} />}
                <span className='pl-2'>{isToggled.includes(index) ? 'Read less' : 'Read more'}</span>
              </button>
            </div>
          </div>
          <div className='quote-container text-justify flex flex-col'>
            <p>{project.quote}</p>
            <p className='place-self-end'>
              {'⏤'} {project.attribution}
            </p>
          </div>
          <Divider />
        </div>
      ))}
    </>
  );
};

export default MentorList;
