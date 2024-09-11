import React from 'react';

export const QuestionItem = ({ question }) => {
  const formatted_date = new Date(question.created_at).toLocaleDateString();
  const formatted_time = new Date(question.created_at).toLocaleTimeString();

  return (
    <>
      <p>
        ASKED BY <span className='font-black'>{question.author.first_name}</span> on {formatted_date} at{' '}
        {formatted_time}:
      </p>
      <p>
        {'>'} {question.body}
      </p>
    </>
  );
};
