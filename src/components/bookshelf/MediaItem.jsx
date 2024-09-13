import React, { useContext, useEffect, useState } from 'react';
import { API } from '../../api';
import { Button, useToaster } from 'rsuite';
import { UserContext } from '../../App';
import { IoCheckboxSharp } from 'react-icons/io5';
import { LiaPlusSquareSolid } from 'react-icons/lia';
import { MediaModal } from './MediaModal';

export const MediaItem = ({ item, action }) => {
  const userContext = useContext(UserContext);
  const user = userContext.user;

  const [hasLiked, setHasLiked] = useState(false);
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);

  const handleLike = (item) => {
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

  const handleShowWarning = () => {
    toaster.push(warning, { placement: 'bottomStart', duration: 3000 });
    setTimeout(() => {
      toaster.clear();
    }, 5000);
  };

  const warning = (
    <div className='w-300 h-100 border-2 border-white text-white px-3 py-2 mt-4 toaster-shadow-white'>
      <p className='jetbrains-mono'>
        Please log in or sign up to interact <br></br> with my bookshelf!
      </p>
    </div>
  );

  useEffect(() => {
    if (user) {
      const checkHasLiked = item.likes?.some((like) => {
        return like.author === user.pk;
      });
      setHasLiked(checkHasLiked);
    }
  }, []);

  return (
    <div className='item-container grid grid-cols-4 gap-4'>
      <div className='media-image-container relative' onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <img className='object-cover' src={item.image} />
        {hover && (
          <button onClick={() => setOpen(true)} className='project-btn absolute top-0 left-0 w-full h-full'>
            <span className='text-black font-bold'>View More</span>
          </button>
        )}
      </div>
      <div className='col-span-3 text'>
        <div className='flex items-start'>
          <a
            href={item.link}
            target='_blank'
            className='uppercase hover:underline text-black hover:text-black hover:italic font-bold grow'
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
                {item.likes.length} other people have also {action} this
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
