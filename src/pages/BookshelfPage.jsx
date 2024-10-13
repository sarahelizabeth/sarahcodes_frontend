import React, { useEffect, useState, useContext, useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { BookshelfContext } from '../App';
import supabase from '../utils/supabaseClient';

export const BookshelfPage = () => {
  const [selected, setSelected] = useState(null);
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
  const bookRef = useRef(null);
  const appRef = useRef(null);
  const filmRef = useRef(null);
  const articleRef = useRef(null);

  let location = useLocation();

  const setDimensions = () => {
    if (window.innerWidth <= 768) {
      setNavHeights({
        bookTop: navRef.current.clientHeight,
        appTop: navRef.current.clientHeight,
        filmTop: navRef.current.clientHeight,
        articleTop: navRef.current.clientHeight,
        bookLeft: bookRef.current.offsetLeft + 5,
        appLeft: appRef.current.offsetLeft + 18,
        filmLeft: filmRef.current.offsetLeft + 18,
        articleLeft: articleRef.current.offsetLeft + 18,
      });
    } else {
      setNavHeights({
        bookTop: bookRef.current.offsetTop + 15,
        appTop: appRef.current.offsetTop + 5,
        filmTop: filmRef.current.offsetTop + 15,
        articleTop: articleRef.current.offsetTop,
        bookLeft: '50%',
        appLeft: '50%',
        filmLeft: '50%',
        articleLeft: '50%',
      });
    }
  };

  const bookshelfContext = useContext(BookshelfContext);

  useEffect(() => {
    const getBookshelf = async () => {
      const { data, error } = await supabase
        .from('bookshelf')
        .select(`*, views(user:users(id))`);
      bookshelfContext.setBookshelf(data);
    };
    getBookshelf();
    setSelected(location.pathname);
    setDimensions();
    window.addEventListener('resize', setDimensions);
    return () => window.removeEventListener('resize', setDimensions);
  }, [location]);

  return (
    <>
      <section className='w-screen h-screen grid grid-rows-4 md:grid-cols-2'>
        <span
          className={`triangle ${selected === '/shelf/books' ? 'block' : 'hidden'}`}
          style={{ top: navHeights.bookTop, left: navHeights.bookLeft }}
        ></span>
        <span
          className={`triangle ${selected === '/shelf/apps' ? 'block' : 'hidden'}`}
          style={{ top: navHeights.appTop, left: navHeights.appLeft }}
        ></span>
        <span
          className={`triangle ${selected === '/shelf/films' ? 'block' : 'hidden'}`}
          style={{ top: navHeights.filmTop, left: navHeights.filmLeft }}
        ></span>
        <span
          className={`triangle ${selected === '/shelf/articles' ? 'block' : 'hidden'}`}
          style={{ top: navHeights.articleTop, left: navHeights.articleLeft }}
        ></span>
        <div
          id='bookshelf-nav'
          ref={navRef}
          className='w-full h-full md:h-screen gap-8 md:gap-0 pb-3 row-span-1 centered flex-row md:flex-col sticky top-0 overflow-hidden bg-black text-white'
        >
          <NavLink
            id='books'
            to='/shelf/books'
            ref={bookRef}
            className={({ isActive }) => [isActive ? 'abril-fatface-shadow' : 'abril-fatface', 'my-3'].join(' ')}
          >
            BOOKS
          </NavLink>
          <NavLink
            id='apps'
            to='/shelf/apps'
            ref={appRef}
            className={({ isActive }) => [isActive ? 'outfit-extrabold tracking-wider' : 'train-one', 'my-3'].join(' ')}
          >
            COOL APPS
          </NavLink>
          <NavLink
            id='films'
            to='/shelf/films'
            ref={filmRef}
            className={({ isActive }) => [isActive ? 'bangers-selected' : 'bangers', 'tracking-wideset my-3'].join(' ')}
          >
            FILMS & SHOWS
          </NavLink>
          <NavLink
            id='articles'
            to='/shelf/articles'
            ref={articleRef}
            className={({ isActive }) => [isActive ? 'nova-mono-selected' : 'nova-mono', 'my-3 px-1'].join(' ')}
          >
            ARTICLES
          </NavLink>
        </div>
        <div className='w-full h-full md:h-screen row-span-3 overflow-y-scroll p-6 md:p-20'>
          <Outlet />
        </div>
      </section>
    </>
  );
};
