import React, { useContext, useEffect, useState } from 'react';
import supabase from '../../utils/supabaseClient';
import { Button, useToaster } from 'rsuite';
import { UserContext } from '../../App';
import { IoCheckboxSharp } from 'react-icons/io5';
import { LiaPlusSquareSolid } from 'react-icons/lia';
import { MediaModal } from './MediaModal';
import { BookshelfContext } from '../../App';

export const MediaItem = ({ item, action }) => {
  const { user } = useContext(UserContext);
  const { bookshelf, setBookshelf } = useContext(BookshelfContext);
  const image = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/projects/bookshelf/${item.imageURL}`;

  const [hasLiked, setHasLiked] = useState(false);
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);

  const toaster = useToaster();

  const handleLike = async (item) => {
    if (user) {
      const { data, error } = await supabase.from('views').insert([{ user: user.id, media: item.id }]).select();
      if (error) {
        console.error(error);
        return;
      }
      const updatedItem = item.views.push({ user: { id: user.id } });
      setBookshelf([...bookshelf, updatedItem]);
      setHasLiked(true);
    } else {
      handleShowWarning();
    }
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
      const checkLiked = item.views.some((view) => view.user.id === user.id);
      if (checkLiked) setHasLiked(true);
    }
  }, [hasLiked]);

  return (
    <div className='grid grid-cols-5 gap-4'>
      <div className='relative col-span-2' onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <img className='object-cover' src={image} />
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
        {(item?.creator && item?.creator?.length > 0) && (
          <p className='pt-1 mb-2'>
            {'>'} {item.creator}
          </p>
        )}
        <div className='flex justify-between gap-2 items-center'>
          {hasLiked ? (
            <>
              <IoCheckboxSharp size={23} />
              <p className='text-xs'>
                {item.views.length} other people have also {action} this
              </p>
            </>
          ) : (
            <div className='flex justify-start items-start w-full'>
              <Button size='sm' variant='ghost' onClick={() => handleLike(item)} startIcon={<LiaPlusSquareSolid />}>
                <span className='text-xs'>Mark as {action}</span>
              </Button>
            </div>
          )}
        </div>
      </div>
      {open && <MediaModal media={item} isOpen={open} handleClose={() => setOpen(false)} />}
    </div>
  );
};
