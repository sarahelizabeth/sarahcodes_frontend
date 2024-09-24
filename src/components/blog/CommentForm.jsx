import React, { useContext, useState } from 'react';
import { Input } from 'rsuite';
import { API } from '../../api';
import { UserContext } from '../../App';

export const CommentForm = ({ questionId, submitComment }) => {
  const userContext = useContext(UserContext);
  const [input, setInput] = useState('');

  const handleSubmit = () => {
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
