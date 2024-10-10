import React, { useEffect, useState, useContext } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { BookshelfContext } from '../App';
import supabase from '../utils/supabaseClient';

export const BookshelfPage = () => {
  const [selected, setSelected] = useState(null);

  let location = useLocation();

  const bookshelfContext = useContext(BookshelfContext);

  useEffect(() => {
    const getBookshelf = async () => {
      const { data, error } = await supabase
        .from('bookshelf')
        .select(`*, views(user:users(id))`);
      bookshelfContext.setBookshelf(data);
      console.log(data);
    };
    getBookshelf();
    setSelected(location.pathname);
  }, [location]);

  return (
    <>
      <section className='w-screen h-screen grid grid-rows-4 md:grid-cols-2'>
        <span
          className={`triangle z-100 top-[13.5rem] ${selected === '/shelf/books' ? 'md:block' : 'hidden'}`}
        ></span>
        <span
          className={`triangle z-100 top-[18.5rem] ${selected === '/shelf/apps' ? 'md:block' : 'hidden'}`}
        ></span>
        <span
          className={`triangle z-100 top-[23.5rem] ${selected === '/shelf/films' ? 'md:block' : 'hidden'}`}
        ></span>
        <span
          className={`triangle z-100 top-[28rem] ${selected === '/shelf/articles' ? 'md:block' : 'hidden'}`}
        ></span>
        <div
          id='bookshelf-nav'
          className='w-full h-full md:h-screen gap-8 md:gap-0 pb-3 row-span-1 centered flex-row md:flex-col sticky top-0 overflow-hidden bg-black text-white'
        >
          <NavLink
            id='books'
            to='/shelf/books'
            className={({ isActive }) =>
              [isActive ? 'abril-fatface-shadow' : 'abril-fatface', 'my-3'].join(' ')
            }
          >
            BOOKS
          </NavLink>
          <NavLink
            id='apps'
            to='/shelf/apps'
            className={({ isActive }) =>
              [isActive ? 'outfit-extrabold tracking-wider' : 'train-one', 'my-3'].join(' ')
            }
          >
            COOL APPS
          </NavLink>
          <NavLink
            id='films'
            to='/shelf/films'
            className={({ isActive }) =>
              [isActive ? 'bangers-selected' : 'bangers', 'tracking-wideset my-3'].join(' ')
            }
          >
            FILMS & SHOWS
          </NavLink>
          <NavLink
            id='articles'
            to='/shelf/articles'
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
