import React, { useEffect, useState } from 'react';
import { API } from '../../utils/api';

export const AnswerItem = ({ answer }) => {
  const dateFormatted = new Date(answer.$createdAt).toLocaleDateString();
  const timeFormatted = new Date(answer.$createdAt).toLocaleTimeString();

  return (
    <div className='mt-4'>
      <p>
        ANSWERED on {dateFormatted} at {timeFormatted}:
      </p>
      <p>
        {' '}
        {'>'} {answer?.body}
      </p>
    </div>
  );
};
