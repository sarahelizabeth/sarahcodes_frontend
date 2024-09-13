import React from 'react';

export const Intro = () => {
  return (
    <div className='h-full flex items-center'>
      <div>
        <p className='mb-3 dosis font-extrabold text-xl pb-2'>WELCOME TO MY BRAIN</p>
        <p>
          Hi! I’m Sarah, and I invite you to poke around my super awesome website. Explore my portfolio, read about my
          daring exploits, learn about the causes & organizations that are important to me, check out my favorite books
          & movies, or ask me a question!
          {/* Or you can just look at pictures of my kitty, which, honestly, is probably the
          best use of your time. */}
        </p>
        <p className='text-xs'>
          <span className='dosis font-semibold underline text-xs pr-2'>COMING SOON!</span>A whole entire page of
          pictures of my kitty!!!
        </p>
      </div>
    </div>
  );
};