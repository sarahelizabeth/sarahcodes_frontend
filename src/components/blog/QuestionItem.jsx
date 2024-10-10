import React from 'react';

export const QuestionItem = ({ question }) => {
  const formatted_date = new Date(question.created_at).toLocaleDateString();
  const formatted_time = new Date(question.created_at).toLocaleTimeString();
  const lastInitial = question?.author?.last_name.charAt(0);
  const author_name = question?.author?.first_name + ' ' + lastInitial;

  return (
    <>
      <p>
        ASKED BY <span className='font-black'>{author_name}</span> on {formatted_date} at{' '}
        {formatted_time}:
      </p>
      <p>
        {'>'} {question.body}
      </p>
    </>
  );
};
