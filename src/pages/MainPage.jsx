import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { PiDownloadSimpleBold } from 'react-icons/pi';

export const MainPage = () => {
  const [selected, setSelected] = useState(null);

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

  let location = useLocation();

  useEffect(() => {
    setSelected(location.pathname);
  }, [location]);

  return (
    <>
      <section className='w-screen h-screen grid grid-rows-4 md:grid-cols-2'>
        <span className={`triangle z-100 top-60 ${selected === '/developer' ? 'md:block' : 'hidden'}`}></span>
        <span className={`triangle z-100 top-80 ${selected === '/mentor' ? 'md:block' : 'hidden'}`}></span>
        <span className={`triangle z-100 top-[25rem] ${selected === '/activist' ? 'md:block' : 'hidden'}`}></span>
        <div
          id='main-nav'
          className='w-full h-full md:h-screen gap-8 md:gap-0 pb-3 row-span-1 centered flex-row md:flex-col sticky top-0 overflow-hidden bg-black text-white'
        >
          <NavLink
            id='developer'
            to='/developer'
            className={({ isActive }) => [isActive ? 'corrupted-file' : 'press-start-2p', 'my-3'].join(' ')}
          >
            DEVELOPER
          </NavLink>
          <NavLink
            id='mentor'
            to='/mentor'
            className={({ isActive }) => [isActive ? 'knewave-selected' : 'knewave', 'my-3'].join(' ')}
          >
            MENTOR
          </NavLink>
          <NavLink
            id='activist'
            to='/activist'
            className={({ isActive }) => [isActive ? 'rubik-glitch' : 'rubik font-extrabold', 'my-3'].join(' ')}
          >
            ACTIVIST
          </NavLink>
          <button
            className='button-shadow-white hidden md:flex justify-center align-end border-2 border-white text-white px-4 py-2 absolute bottom-10 uppercase mt-2 mb-4 hover:font-bold z-20'
            onClick={handleResumeDownload}
            type='submit'
          >
            <PiDownloadSimpleBold size={18} />
            <span className='pl-2'>Resume</span>
          </button>
        </div>
        <div className='w-full h-full md:h-screen row-span-3 overflow-y-scroll p-6 md:p-20'>
          <Outlet />
        </div>
      </section>
    </>
  );
};
