import React from 'react'

export const Gallery = ({ items }) => {
  console.log(items);
  
  return (
    <div className='gallery-container'>
      {items.map((item, index) => (
        <div key={index}>
          <figure
            className='gallery-img-container'
          >
            <img
              alt={item.title}
              src={item.image}
              className='gallery-img'
            />
            {item.title ? <figcaption className='gallery-img-caption'>{item.title}</figcaption> : ''}
          </figure>
        </div>
      ))}
    </div>
  );
}
