import React from 'react'

export const Sidebar = ({ toggleSidebar, showSidebar }) => {

  return (
    <div
      className='top-0 z-10 w-10 bg-blue-600  p-10 pl-20 text-white absolute h-full ease-in-out duration-300'
      style={{ transform: `translateX(${showSidebar ? '0' : '-100%'})`, left: '-20px' }}
      onClick={toggleSidebar}
    >
      <button className='mt-20 text-4xl font-semibold text-white'>I am a sidebar</button>
    </div>
  );
}

export default Sidebar