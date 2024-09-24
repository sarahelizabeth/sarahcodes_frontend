import React, { useEffect, useState } from 'react';
import { GiPawHeart } from 'react-icons/gi';
import { RiHeartsLine } from 'react-icons/ri';
import { PiHandHeartBold } from 'react-icons/pi';
import { TbCameraHeart } from 'react-icons/tb';
import { TbPhotoHeart } from 'react-icons/tb';
import { BsChatRightHeartFill } from 'react-icons/bs';
import { BsChatRightHeart } from 'react-icons/bs';

export const PicItem = ({ picData }) => {
  console.log(picData)
  const [age, setAge] = useState(0);

  const getAge = (birthday) => {
    var birthdayFormatted = new Date(birthday);
    var monthsDiff = Date.now() - birthdayFormatted.getTime();
    var monthsDiffFormatted = new Date(monthsDiff);
    var birthYear = monthsDiffFormatted.getUTCFullYear();
    var age = Math.abs(birthYear - 1970); 
    return age;
  };

  useEffect(() => {
    let age = getAge(picData.birthday);
    setAge(age);
  }, []);

  return (
    <div className='bg-white border-2 border-black p-2'>
      <img
        className='h-auto max-w-full rounded-lg object-cover object-center'
        src={picData.image}
        alt='gallery-photo'
      />
      <div className='p-1 text-left'>
        <p className='uppercase'>
          <span className='font-bold'>{picData.name}</span>
          {picData.birthday ? <span className='text-xs'>, age {age.toString()}</span> : null}
        </p>
        <p className='flex items-center'>
          <BsChatRightHeart /> <span className='pl-2'>{picData.owner_name}</span>
        </p>
      </div>
    </div>
  );
};
