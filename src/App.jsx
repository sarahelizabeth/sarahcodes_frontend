import React, { useState, useEffect, useMemo, createContext } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import 'rsuite/dist/rsuite.min.css';
import './App.css';

import { MainPage } from './pages/MainPage';
import { Intro } from './components/main/Intro';
import { Developer } from './components/main/Developer';
import { Mentor } from './components/main/Mentor';
import { Activist } from './components/main/Activist';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainPage />}>
      <Route index element={<Intro />} />
      <Route path='developer' element={<Developer />} />
      <Route path='mentor' element={<Mentor />} />
      <Route path='activist' element={<Activist />} />
    </Route>
  )
);

function App({ routes }) {
  return (
    <>
      <div className='w-full absolute z-10 top-4 md:top-0 flex items-center justify-center'>
        <h5 className='major-mono-display text-5xl pl-6 pt-3'>
          <span className='text-white'>sARAH</span> <span className='text-white md:text-black bg-white'>MuRRAy</span>
        </h5>
      </div>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
