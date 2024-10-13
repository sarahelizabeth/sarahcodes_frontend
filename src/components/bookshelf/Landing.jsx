import React, { useEffect, useState } from 'react';

export const Landing = () => {
  const [text, setText] = useState('above');

  useEffect(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 767) setText('to the left');
  }, []);

  return (
    <div className='h-full flex md:items-center pt-12 md:pt-0'>
      <div>
        <p className='mb-3 dosis font-extrabold text-xl pb-2'>A FEW OF MY FAVORITE THINGS</p>
        <p>
          Please explore my favorite books, movies, TV shows, apps, and articles by clicking on the links {text}. Let me know which ones you've
          read/watched by hitting the "mark as read" button.
        </p>
        <p className='text-xs'>
          <span className='dosis font-semibold underline text-xs pr-2'>COMING SOON!</span>See which other users like the stuff you like and recommend things you think I would like!
        </p>
      </div>
    </div>
  );
};
