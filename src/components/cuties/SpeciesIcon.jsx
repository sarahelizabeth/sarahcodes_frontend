import React from 'react';
import { FaCat, FaKiwiBird, FaDragon } from 'react-icons/fa';
import { FaDog } from 'react-icons/fa6';
import { IoFishSharp } from 'react-icons/io5';
import { GiSandSnake } from 'react-icons/gi';
import { PiPottedPlantFill } from 'react-icons/pi';

export const SpeciesIcon = ({ type }) => {
  return (
    <>
      {(() => {
        switch (type) {
          case 'cat':
            return <FaCat size={24} />;
          case 'dog':
            return <FaDog size={24} />;
          case 'fish':
            return <IoFishSharp size={24} />;
          case 'bird':
            return <FaKiwiBird size={24} />;
          case 'reptile':
            return <GiSandSnake size={24} />;
          case 'plant':
            return <PiPottedPlantFill size={24} />;
          case 'other':
            return <FaDragon size={24} />;
          default:
            return null;
        }
      })()}
    </>
  );
};
