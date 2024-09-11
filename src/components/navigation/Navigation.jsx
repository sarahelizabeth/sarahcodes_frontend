import { motion } from 'framer-motion';
import { UserContext, ContactContext, LoginContext, RegisterContext } from '../../App';
import { useContext } from 'react';
import API from '../../api';
import Cookies from 'js-cookie';

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
  const userContext = useContext(UserContext);

  const handleLogout = () => {
    const access_token = Cookies.get('access_token');
    API.post(`api/auth/logout/`, {
      headers: { Authorization: `Bearer ${access_token}` },
    })
      .then(() => {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        localStorage.removeItem('user');
        userContext.setUser(null);
        toggleOpen();
      })
      .catch((error) => {
        console.error('logout error: ', error);
      });
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
      {userContext.user ? (
        <motion.li variants={liVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <button className='text-black hover:underline hover:font-bold' onClick={handleLogout}>
            Logout
          </button>
        </motion.li>
      ) : (
        <>
          <motion.li variants={liVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <button
              className='text-black hover:underline hover:font-bold'
              onClick={() => loginContext.setOpenLogin(true)}
            >
              Log In
            </button>
          </motion.li>
          <motion.li variants={liVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <button
              className='text-black hover:underline hover:font-bold'
              onClick={() => registerContext.setOpenRegister(true)}
            >
              Sign Up
            </button>
          </motion.li>
        </>
      )}
      <motion.li variants={liVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <button
          className='text-black hover:underline hover:font-bold'
          onClick={() => contactContext.setOpenContact(true)}
        >
          Contact
        </button>
      </motion.li>
    </motion.ul>
  );
};
