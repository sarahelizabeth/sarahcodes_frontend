import React from 'react';

export const QuestionItem = ({ question }) => {
  const formatted_date = new Date(question.$createdAt).toLocaleDateString();
  const formatted_time = new Date(question.$createdAt).toLocaleTimeString();

  return (
    <>
      <p>
        ASKED BY <span className='font-black'>{question?.author?.first_name}</span> on {formatted_date} at{' '}
        {formatted_time}:
      </p>
      <p>
        {'>'} {question.body}
      </p>
    </>
  );
};
