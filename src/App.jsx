import React, { useState, useEffect, useMemo, createContext } from 'react';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import 'rsuite/dist/rsuite.min.css';
import './App.css';

import { NavSidebar } from './components/NavSidebar';
import { Contact } from './components/Contact';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';

import { MainPage } from './pages/MainPage';
import { Intro } from './components/main/Intro';
import { Developer } from './components/main/Developer';
import { Mentor } from './components/main/Mentor';
import { Activist } from './components/main/Activist';

import { AMAPage } from './pages/AMAPage';

import { BookshelfPage } from './pages/BookshelfPage';
import { Landing } from './components/bookshelf/Landing';
import { Articles } from './components/bookshelf/Articles';
import { Books } from './components/bookshelf/Books';
import { CoolApps } from './components/bookshelf/CoolApps';
import { Films } from './components/bookshelf/Films';

export const UserContext = createContext();
export const RegisterContext = createContext();
export const LoginContext = createContext();
export const ContactContext = createContext();

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      {
        index: true,
        element: <Intro />,
      },
      {
        path: 'developer',
        element: <Developer />,
      },
      {
        path: 'mentor',
        element: <Mentor />,
      },
      {
        path: 'activist',
        element: <Activist />,
      },
    ],
  },
  {
    path: '/ama',
    element: <AMAPage />,
  },
  {
    path: '/shelf',
    element: <BookshelfPage />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'articles',
        element: <Articles />,
      },
      {
        path: 'books',
        element: <Books />,
      },
      {
        path: 'apps',
        element: <CoolApps />,
      },
      {
        path: 'films',
        element: <Films />,
      },
    ],
  },
]);

function App() {
  const [user, setUser] = useState(null);
  const userContext = useMemo(() => ({ user, setUser }), [user]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  }, []);

  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openContact, setOpenContact] = useState(false);

  const closeModal = () => {
    setOpenLogin(false);
    setOpenRegister(false);
    setOpenContact(false);
  };

  return (
    <UserContext.Provider value={userContext}>
      <RegisterContext.Provider value={{ openRegister, setOpenRegister }}>
        <LoginContext.Provider value={{ openLogin, setOpenLogin }}>
          <ContactContext.Provider value={{ openContact, setOpenContact }}>
            <NavSidebar />
            <div className='w-full fixed z-10 top-0 flex items-center justify-end md:justify-center'>
              <a href='/' className='main-link top-4 md:top-1 text-center w-2/3 md:pl-6'>
                {' '}
                <h5 className='major-mono-display text-[2.5rem] leading-[2.7rem] md:text-5xl md:pl-0 pt-1 md:pt-3'>
                  <span className='text-white'>sARAH</span>{' '}
                  <span className='text-white md:text-black md:bg-white'>MuRRAy</span>
                </h5>{' '}
              </a>
            </div>
            <RouterProvider router={router} />
          </ContactContext.Provider>
        </LoginContext.Provider>
      </RegisterContext.Provider>
      <Register isOpen={openRegister} handleClose={closeModal} />
      <Login isOpen={openLogin} handleClose={closeModal} />
      <Contact isOpen={openContact} handleClose={closeModal} />
    </UserContext.Provider>
  );
}

export default App;
