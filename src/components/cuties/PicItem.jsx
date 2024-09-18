import React from 'react'

export const PicItem = ({ images }) => {
  return (
    <div className="grid gap-4">
      {images.map((link, index) => (
        <div key={index}>
          <img
            className='h-auto max-w-full rounded-lg object-cover object-center'
            src='https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
            alt='gallery-photo'
          />
        </div>
      ))}
    </div>
  );
}
