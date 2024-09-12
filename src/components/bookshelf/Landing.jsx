import React from 'react';

export const Landing = () => {
  return (
    <div className='h-full flex items-center'>
      <div>
        <p className='mb-3 dosis font-extrabold text-xl pb-2'>A FEW OF MY FAVORITE THINGS</p>
        <p>
          Please explore my favorite books, movies, TV shows, apps, and articles. Let me know which ones you've
          read/watched by hitting the "mark as read" button.
        </p>
        <p className='text-xs'>
          <span className='dosis font-semibold underline text-xs pr-2'>COMING SOON!</span>See which other users like the stuff you like and recommend things you think I would like!
        </p>
      </div>
    </div>
  );
};
