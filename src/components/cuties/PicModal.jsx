import React, { useContext, useEffect, useState } from 'react';
import { Modal, useToaster } from 'rsuite';
import { SpeciesIcon } from './SpeciesIcon';
import { UserContext } from '../../App';
import { PicsContext } from '../../pages/PetPicsPage';
import supabase from '../../utils/supabaseClient';
import { FaEdit } from 'react-icons/fa';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { MdErrorOutline } from 'react-icons/md';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { LuCat } from 'react-icons/lu';
import { useNameAbbreviation, useBirthdayFormat, useDateTimeFormat } from '../../utils/useFormatting';
import { PicEditForm } from './PicEditForm';

export const PicModal = ({ picData, isOpen, handleClose }) => {
  const [modalPic, setModalPic] = useState(picData);
  const [isEditing, setIsEditing] = useState(false);
  const [defaultBirthday, setDefaultBirthday] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useContext(UserContext);
  const { pics, setPics } = useContext(PicsContext);
  const toaster = useToaster();
  
  const handleEditSuccess = (newPicData) => {
    let picsWithoutNew = pics.filter((i) => i.id !== picData.id);
    setPics([...picsWithoutNew, newPicData]);
    setModalPic(newPicData);
    setIsEditing(false);
    handleShowToaster('success');
  };

  const handleShowToaster = (type) => {
    let placement = 'topCenter';
    if (type === 'cat') placement = 'bottomEnd';
    toaster.push(toast(type), { placement: placement, duration: 3000 });
    setTimeout(() => {
      toaster.clear();
    }, 5000);
  };

  const toast = (type) => {
    const toastConfig = {
      success: {
        text: 'SUCCESS!',
        color: 'text-green-600'
      },
      error: {
        text: 'ERROR!',
        color: 'text-red-500'
      },
      cat: {
        text: 'You like cats! Mee-YOW! ;)',
        color: 'text-pink-500'
      }
    };

    const { text, color } = toastConfig[type];
    
    return (
      <div className={`w-300 h-100 border-2 border-white text-lg text-white bg-white px-3 py-2 mt-4 toaster-shadow-white`}>
        <p className={`jetbrains-mono font-bold flex items-center ${color}`}>
          {type === 'success' ? <IoMdCheckmarkCircleOutline /> : type === 'error' ? <MdErrorOutline /> : <LuCat />}
          <span className='pl-2'>{text}</span>
        </p>
      </div>
    );
  };

  const handleLike = async () => {
    const { error } = await supabase.from('likes').insert([{ pet: picData.id, user: user.id }]);
    if (error) {
      console.error('like error: ', error);
      handleShowToaster('error');
      return;
    }
    if (modalPic.pet_type === 'cat') handleShowToaster('cat');
    setLikes(likes + 1);
    setIsLiked(true);
    setPics(pics.map((pic) => (pic.id === picData.id ? { ...pic, likes: [...pic.likes, { user: { id: user.id } }] } : pic)));
  };

  useEffect(() => {
    console.log(picData);
    setLikes(picData.likes.length);
    if (user) {
      const isLiked = picData.likes.some((like) => like.user.id === user.id);
      setIsLiked(isLiked);
    }
    if (picData.birthday) setDefaultBirthday(new Date(picData.birthday));
  }, []);

  return (
    <Modal overflow={false} size='lg' open={isOpen} onClose={handleClose} className='jetbrains-mono'>
      <Modal.Header className='flex mb-4 items-center'>
        <SpeciesIcon type={picData.pet_type} />
        {isEditing ? (
          <h2 className='text-[1.5rem] bungee-regular pl-4'>Edit Info</h2>
        ) : (
          <h2 className='text-xl bungee-regular uppercase font-bold pl-4'>{modalPic.name}</h2>
        )}
      </Modal.Header>
      <Modal.Body>
        <div className='md:grid md:grid-cols-3 gap-2'>
          <img className='md:col-span-2' src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/pets/${picData.imageURL}`} />
          {isEditing ? (
            <PicEditForm picData={picData} defaultBirthday={defaultBirthday} handleSuccess={handleEditSuccess} handleError={() => handleShowToaster('error')} handleCancel={() => setIsEditing(false)} />
          ) : (
            <>
              <div className='mt-4 md:mt-0 md:col-span-1'>
                <div className='flex justify-between'>
                  <div className='mb-3'>
                    <label className='uppercase text-[0.69rem] font-extrabold'>Submitted by</label>
                    <p>{useNameAbbreviation(modalPic.owner)}</p>
                  </div>
                  <div className='flex items-center gap-2 text-right'>
                    <p>{likes} likes</p>
                    {isLiked ? <FaHeart size={24} onClick={handleLike} className='text-red-500' /> : <FaRegHeart size={24} onClick={handleLike} className='md:cursor-pointer' />}
                  </div>
                </div>
                {modalPic.breed.length > 0 && (
                  <div className='mb-3'>
                    <label className='uppercase text-[0.69rem] font-extrabold'>Breed</label>
                    <p>{modalPic.breed}</p>
                  </div>
                )}
                {modalPic.birthday && (
                  <div className='mb-3'>
                    <label className='uppercase text-[0.69rem] font-extrabold'>Birthday</label>
                    <p>{useBirthdayFormat(modalPic.birthday)}</p>
                  </div>
                )}
                <div className='mb-3'>
                  <label className='uppercase text-[0.69rem] font-extrabold'>Uploaded</label>
                  <p>{useDateTimeFormat(modalPic.created_at)}</p>
                </div>
                {user && (
                  <>
                    {user.id === modalPic.owner.id && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className='button-shadow-black font-bold text-xs py-1 px-2 mt-4 flex items-center float-right'
                      >
                        <FaEdit />
                        <span className='pl-2 pt-[0.15rem]'>Edit</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
