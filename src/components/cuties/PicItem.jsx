import React, { useEffect, useState } from 'react'

export const PicItem = ({ picData }) => {
  console.log(picData)
  const [age, setAge] = useState(0);

  useEffect(() => {
     var dob = new Date(picData.birthday);

     //calculate month difference from current date in time
     var month_diff = Date.now() - dob.getTime();

     //convert the calculated difference in date format
     var age_dt = new Date(month_diff);

     //extract year from date
     var year = age_dt.getUTCFullYear();

     //now calculate the age of the user
     var age = Math.abs(year - 1970); 

     setAge(age);
  }, []);

  return (
    <div className='bg-white border-2 border-black p-2'>
      <img className='h-auto max-w-full rounded-lg object-cover object-center' src={picData.image} alt='gallery-photo' />
      <div className='p-1'>
        <p>{picData.name}, age {age.toString()}</p>
        <p>Submitted by </p>
      </div>
    </div>
  );
};
