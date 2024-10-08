import React, { useState } from 'react';
import { Input } from 'rsuite';
import { API } from '../../utils/api';
import { createComment } from '../../utils/appwriteClient';

export const CommentForm = ({ questionId, userId, submitComment }) => {
  const [input, setInput] = useState('');

  const oldHandleSubmit = () => {
    if (input == '') {
      console.error('Input error');
      return;
    }

    const commentValue = {
      body: input,
      author: userContext.user.pk,
      question: questionId,
    };

    API.post(`api/blog/comments/`, commentValue)
      .then((res) => {
        console.log(res.data);
        setInput('');
        submitComment();
      })
      .catch((error) => {
        console.error('comment error: ', error);
      });
  };

  const handleSubmit = async () => {
    if (input == '') {
      console.error('Input error');
      return;
    }

    const response = await createComment(input, userId, questionId);
    console.log(response);
    setInput('');
    submitComment();
  };

  return (
    <div className='comment-form mt-4 flex flex-col w-full'>
      <Input
        value={input}
        onChange={(value) => setInput(value)}
        as='textarea'
        rows={2}
        placeholder='Enter your comment here...'
        className='self-stretch'
      />
      <button
        className='button-shadow-black hover:font-bold uppercase mt-2 place-self-end'
        onClick={handleSubmit}
        type='submit'
      >
        Submit
      </button>
    </div>
  );
};
