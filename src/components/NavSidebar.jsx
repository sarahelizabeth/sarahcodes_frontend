import React, { useRef } from 'react';
import { motion, useCycle } from 'framer-motion';
import { useDimensions } from './navigation/useDimensions';
import { NavToggle } from './navigation/NavToggle';
import { Navigation } from './navigation/Navigation';

import './navigation/navigation.css';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    height: '100vh',
    transition: {
      type: 'spring',
      stiffness: 40,
      restDelta: 4,
    },
  }),
  closed: {
    clipPath: 'circle(25px at 40px 40px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
    transitionEnd: {
      height: '75px',
    },
  },
};

export const NavSidebar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.nav initial={false} animate={isOpen ? 'open' : 'closed'} custom={height} ref={containerRef}>
      <motion.div className='background' variants={sidebar} />
      <Navigation toggleOpen={toggleOpen} />
      <NavToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};
