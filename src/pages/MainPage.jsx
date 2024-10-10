import React, { createContext, useContext, useMemo, useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { PiDownloadSimpleBold } from 'react-icons/pi';
import supabase from '../utils/supabaseClient';

export const ProjectsContext = createContext();

export const MainPage = () => {
  const [navHeights, setNavHeights] = useState({
    nav: 0,
    developerTop: 0,
    mentorTop: 0,
    activistTop: 0,
    developerLeft: 0,
    mentorLeft: 0,
    activistLeft: 0,
  });
  const navRef = useRef(null);
  const developerRef = useRef(null);
  const mentorRef = useRef(null);
  const activistRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [projects, setProjects] = useState([]);
  const projectsContext = useMemo(() => ({ projects, setProjects }), [projects]);

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

  const setDimensions = () => {
    if (window.innerWidth <= 768) {
      setNavHeights({
        nav: navRef.current.clientHeight,
        developerTop: '25%',
        mentorTop: '25%',
        activistTop: '25%',
        developerLeft: developerRef.current.offsetLeft + 35,
        mentorLeft: mentorRef.current.offsetLeft + 7,
        activistLeft: activistRef.current.offsetLeft + 16,
      });
    } else {
      setNavHeights({
        nav: navRef.current.clientHeight,
        developerTop: developerRef.current.offsetTop - 10,
        mentorTop: mentorRef.current.offsetTop,
        activistTop: activistRef.current.offsetTop - 2,
        developerLeft: '50%',
        mentorLeft: '50%',
        activistLeft: '50%',
      });
    }
  };

  useEffect(() => {
    const getProjects = async () => {
      const { data, error } = await supabase.from('projects').select('*');
      setProjects(data);
      console.log(data);
    };
    getProjects();

    setSelected(location.pathname);
    setDimensions();
    window.addEventListener('resize', setDimensions);
    return () => window.removeEventListener('resize', setDimensions);
  }, [location]);

  return (
    <section className='w-screen h-screen grid grid-rows-4 md:grid-cols-2'>
      <span
        id='developer'
        className={`triangle ${selected === '/developer' ? 'block' : 'hidden'}`}
        style={{ top: navHeights.developerTop, left: navHeights.developerLeft }}
      ></span>
      <span
        id='mentor'
        className={`triangle ${selected === '/mentor' ? 'block' : 'hidden'}`}
        style={{ top: navHeights.mentorTop, left: navHeights.mentorLeft }}
      ></span>
      <span
        id='activist'
        className={`triangle ${selected === '/activist' ? 'block' : 'hidden'}`}
        style={{ top: navHeights.activistTop, left: navHeights.activistLeft }}
      ></span>
      <div
        id='main-nav'
        ref={navRef}
        className='w-full h-full md:h-screen gap-8 md:gap-0 pb-3 row-span-1 centered flex-row md:flex-col sticky top-0 overflow-hidden bg-black text-white'
      >
        <NavLink
          id='developer'
          ref={developerRef}
          to='/developer'
          className={({ isActive }) => [isActive ? 'corrupted-file' : 'press-start-2p', 'my-3'].join(' ')}
        >
          DEVELOPER
        </NavLink>
        <NavLink
          id='mentor'
          ref={mentorRef}
          to='/mentor'
          className={({ isActive }) =>
            [isActive ? 'knewave-selected' : 'knewave text-[14px] md:text-[40px]', 'my-3'].join(' ')
          }
        >
          MENTOR
        </NavLink>
        <NavLink
          id='activist'
          ref={activistRef}
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
        <ProjectsContext.Provider value={projectsContext}>
          <Outlet />
        </ProjectsContext.Provider>
      </div>
    </section>
  );
};
