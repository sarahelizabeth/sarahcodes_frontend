import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { UserContext, ContactContext, LoginContext, RegisterContext } from '../../App';
import supabase from '../../utils/supabaseClient';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

const ulVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1, delayChildren: 0.3 },
  },
};

const liVariants = {
  open: {
    y: 0,
    display: 'block',
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
    transitionEnd: {
      display: 'none',
    },
  },
};

export const Navigation = ({ toggleOpen }) => {
  const contactContext = useContext(ContactContext);
  const loginContext = useContext(LoginContext);
  const registerContext = useContext(RegisterContext);
  const { user, setUser } = useContext(UserContext);

  const handleContact = () => {
    contactContext.setOpenContact(true);
    toggleOpen();
  };

  const handleRegister = () => {
    registerContext.setOpenRegister(true);
    toggleOpen();
  };

  const handleLogin = () => {
    loginContext.setOpenLogin(true);
    toggleOpen();
  };

  const handleLogout = async () => {
    const { data, error } = await supabase.auth.signOut();
    console.log(data, error);
    // localStorage.removeItem('session');
    setUser(null);
    toggleOpen();
  };

  const navigation = [
    {
      title: 'Home',
      link: '/',
    },
    {
      title: 'Ask Me Anything',
      link: '/ama',
    },
    {
      title: 'Bookshelf',
      link: '/shelf',
    },
    {
      title: 'Pet Pics',
      link: '/cuties',
    },
  ];

  return (
    <motion.ul className='navlist' variants={ulVariants}>
      {navigation.map((item, i) => (
        <motion.li key={i} variants={liVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <a className='text-black hover:text-black hover:font-bold' href={item.link}>
            {item.title}
          </a>
        </motion.li>
      ))}
      {user ? (
        <motion.li variants={liVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <button className='text-black hover:underline hover:font-bold' onClick={handleLogout}>
            Logout
          </button>
        </motion.li>
      ) : (
        <>
          <motion.li variants={liVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <button className='text-black hover:underline hover:font-bold' onClick={handleLogin}>
              Log In
            </button>
          </motion.li>
          <motion.li variants={liVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <button className='text-black hover:underline hover:font-bold' onClick={handleRegister}>
              Sign Up
            </button>
          </motion.li>
        </>
      )}
      <motion.li variants={liVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <button className='text-black hover:underline hover:font-bold' onClick={handleContact}>
          Contact
        </button>
      </motion.li>
      <motion.li variants={liVariants}>
        <div className='flex gap-5 pt-3'>
          <motion.a
            href='https://github.com/sarahelizabeth?tab=repositories'
            target='_blank'
            className='hover:text-black focus:text-black'
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub size={28} />
          </motion.a>
          <motion.a
            href='https://www.linkedin.com/in/semurray1/'
            target='_blank'
            className='hover:text-black focus:text-black'
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaLinkedinIn size={28} />
          </motion.a>
        </div>
      </motion.li>
    </motion.ul>
  );
};
