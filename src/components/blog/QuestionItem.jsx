import React from 'react';
import { useDateFormat, useTimeFormat, useNameAbbreviation } from '../../utils/useFormatting';

export const QuestionItem = ({ question }) => {
  return (
    <>
      <p>
        ASKED BY <span className='font-black'>{useNameAbbreviation(question.author)}</span> on {useDateFormat(question.created_at)} at{' '}
        {useTimeFormat(question.created_at)}:
      </p>
      <p>
        {'>'} {question.body}
      </p>
    </>
  );
};
