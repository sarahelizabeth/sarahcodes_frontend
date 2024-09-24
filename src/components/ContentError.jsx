import React from 'react';
import { BsEmojiGrimace } from 'react-icons/bs';

export const ContentError = () => {
  return (
    <div className='w-full'>
      <p className='corrupted-file font-extrabold text-lg flex items-center'>
        <span className='pr-3'>OOPS!</span> <BsEmojiGrimace />
      </p>
      <p className='text-xs'>
        I'm sorry, but I'm either slacking off or I messed something up and now my API is crapping out. Please come
        back later and I SWEAR there will actually be content this time.
      </p>
      <p className='text-xs dosis font-semibold underline pr-2'>
        <a href='https://www.youtube.com/watch?v=PzF1TuzyTdY'>Or you could check out these kittens instead!</a>
      </p>
    </div>
  );
}
