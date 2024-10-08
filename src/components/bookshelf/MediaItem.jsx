import React, { useContext, useEffect, useState } from 'react';
import { API } from '../../utils/api';
import { addView } from '../../utils/appwriteClient';
import { Button, useToaster } from 'rsuite';
import { UserContext } from '../../App';
import { IoCheckboxSharp } from 'react-icons/io5';
import { LiaPlusSquareSolid } from 'react-icons/lia';
import { MediaModal } from './MediaModal';
import { BookshelfContext } from '../../App';

export const MediaItem = ({ item, action }) => {
  const userContext = useContext(UserContext);
  const { bookshelf, setBookshelf } = useContext(BookshelfContext);
  const user = userContext.user;

  const [hasLiked, setHasLiked] = useState(false);
  const [viewers, setViewers] = useState([]);
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);

  const toaster = useToaster();

  const oldHandleLike = (item) => {
    if (user === null) {
      handleShowWarning();
      return;
    }

    if (hasLiked) {
      console.log('delete like');
      // bring up a confirm screen? we don't want to keep sending api calls\
      // if they hit the like button over and over
      // setHasLiked(false);
      return;
    }

    const likeValue = {
      author: user.pk,
      media: item.pk,
    };
    API.post(`/api/bookshelf/likes/`, likeValue)
      .then((res) => {
        console.log(res.data);
        setHasLiked(true);
      })
      .catch((error) => console.error('item like error: ', error));
  };

  const handleLike = async(item) => {
    if (user === null) {
      handleShowWarning();
      return;
    }
    const response = await addView(item, user.$id);
    console.log(response);
    const updatedBookshelf = bookshelf.map((item) => {
      if (item.$id === response.$id) {
        return response;
      }
      return item;
    });
    setBookshelf(updatedBookshelf);
    console.log(response);
    setHasLiked(true);
    // setViewers(response.viewers);
  };

  const handleShowWarning = () => {
    let mediaPlacement = 'bottomStart';
    const windowWidth = window.innerWidth;
    if (windowWidth <= 438) {
      mediaPlacement = 'topCenter';
    }
    toaster.push(warning, { placement: mediaPlacement, duration: 3000 });
    setTimeout(() => {
      toaster.clear();
    }, 5000);
  };

  const warning = (
    <div className='w-300 h-100 border-2 border-white text-white bg-black px-3 py-2 mt-4 toaster-shadow-white'>
      <p className='jetbrains-mono'>
        Please log in or sign up to interact <br></br> with my bookshelf!
      </p>
    </div>
  );

  useEffect(() => {
    if (user) {
      const checkHasLiked = item.viewers?.some((item) => {
        return item.$id === userContext.user.$id;
      });
      setHasLiked(checkHasLiked);
      // setViewers(item.viewers);
    }
  }, [hasLiked]);

  return (
    <div className='grid grid-cols-5 gap-4'>
      <div className='relative col-span-2' onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <img className='object-cover' src={item.image} />
        {hover && (
          <button onClick={() => setOpen(true)} className='project-btn absolute top-0 left-0 w-full h-full'>
            <span className='text-black font-bold'>View More</span>
          </button>
        )}
      </div>
      <div className='col-span-3'>
        <div className='flex items-start'>
          <a
            href={item.link}
            target='_blank'
            className='uppercase hover:underline text-black text-sm hover:text-black hover:italic font-bold grow'
          >
            {item.title}
          </a>
        </div>
        <p className='pt-1 mb-2'>
          {'>'} {item.creator}
        </p>
        <div className='flex justify-between gap-2 items-center'>
          {hasLiked ? (
            <>
              <IoCheckboxSharp size={23} />
              <p className='text-xs'>
                {item.viewers.length} other people have also {action} this
              </p>
            </>
          ) : (
            <div className='flex justify-start items-start w-full'>
              <LiaPlusSquareSolid size={28} className='pt-1' />
              <Button size='sm' variant='ghost' onClick={() => handleLike(item)}>
                Mark as {action}
              </Button>
            </div>
          )}
        </div>
      </div>
      <MediaModal media={item} isOpen={open} handleClose={() => setOpen(false)} />
    </div>
  );
};
