import React, { useEffect, useState } from 'react';
import { BsChatRightHeart } from 'react-icons/bs';

export const PicItem = ({ picData }) => {
  const [age, setAge] = useState(0);
  const lastInitial = picData?.owner?.last_name.charAt(0);
  const owner_name = picData?.owner?.first_name + ' ' + lastInitial;

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
  }, [picData]);

  return (
    <div className='bg-white border-2 border-black p-2 w-full'>
      <img
        className='h-auto w-full rounded-lg object-cover object-center'
        src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/pets/${picData.imageURL}`}
        alt='gallery-photo'
      />
      <div className='p-1 text-left'>
        <p className='uppercase'>
          <span className='font-bold'>{picData.name}</span>
          {picData.birthday ? <span className='text-xs'>, age {age.toString()}</span> : null}
        </p>
        <p className='flex items-center'>
          <BsChatRightHeart /> <span className='pl-2'>{owner_name}</span>
        </p>
      </div>
    </div>
  );
};
