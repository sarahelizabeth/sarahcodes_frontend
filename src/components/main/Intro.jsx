import React from 'react';
import { NavLink } from 'react-router-dom';
import { PiDownloadSimpleBold } from 'react-icons/pi';

export const Intro = () => {
  const handleResumeDownload = () => {
    fetch('Sarah_Murray_CV_2024.pdf').then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);

        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = 'Sarah_Murray_CV_2024.pdf';
        alink.click();
      });
    });
  };

  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <div>
        <p className='mb-3 dosis font-extrabold text-xl pb-2'>WELCOME TO MY BRAIN</p>
        <p>
          Hi! I’m Sarah, and I invite you to poke around my super awesome website. Explore my portfolio by clicking on
          {` `}
          <NavLink to='/developer' className='font-bold hover:underline hover:underline-offset-4 hover:text-black'>
            DEVELOPER
          </NavLink>
          ,{' '}
          <NavLink to='/mentor' className='font-bold hover:underline hover:underline-offset-4 hover:text-black'>
            MENTOR
          </NavLink>
          , or{' '}
          <NavLink to='/activist' className='font-bold hover:underline hover:underline-offset-4 hover:text-black'>
            ACTIVIST
          </NavLink>
          {` `}above, read about my daring exploits, learn about the causes & organizations that are important to me,
          check out my favorite books & movies, or ask me a question!
          <br />
          <br />
          Or you can just look at pictures of my kitty, which, honestly, is probably the best use of your time.
        </p>
        <p className='text-xs mt-4'>
          <span className='dosis font-semibold underline text-xs pr-2'>COMING SOON</span>OAuth sign in capabilities &
          more!
        </p>
      </div>
      <button
        className='md:hidden button-shadow-black flex border-2 border-black text-black px-4 py-2 uppercase mt-12 mb-4 hover:font-bold z-20'
        onClick={handleResumeDownload}
        type='submit'
      >
        <PiDownloadSimpleBold size={18} />
        <span className='pl-2'>Resume</span>
      </button>
    </div>
  );
};