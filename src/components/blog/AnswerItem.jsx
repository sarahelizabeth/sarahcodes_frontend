import React, { useEffect, useState } from 'react';

export const AnswerItem = ({ answer }) => {
  const dateFormatted = new Date(answer.created_at).toLocaleDateString();
  const timeFormatted = new Date(answer.created_at).toLocaleTimeString();

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
