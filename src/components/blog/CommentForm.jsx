import React, { useState, useContext } from 'react';
import { Input } from 'rsuite';
import { API } from '../../utils/api';
import { createComment } from '../../utils/appwriteClient';
import supabase from '../../utils/supabaseClient';
import { QuestionsContext } from '../../pages/AMAPage';
import { UserContext } from '../../App';

export const CommentForm = ({ questionId, userId, submitComment }) => {
  const [input, setInput] = useState('');
  const { questions, setQuestions } = useContext(QuestionsContext);
  const { user } = useContext(UserContext);

  const oldHandleSubmit = () => {
    if (input == '') {
      console.error('Input error');
      return;
    }

    const commentValue = {
      body: input,
      author: userContext.user.id,
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

  const appwriteHandleSubmit = async () => {
    if (input == '') {
      console.error('Input error');
      return;
    }

    const response = await createComment(input, userId, questionId);
    console.log(response);
    setInput('');
    submitComment();
  };

  const handleSubmit = async () => {
    if (input == '') {
      console.error('Input error');
      return;
    }

    const { data, error } = await supabase
      .from('comments')
      .insert([{ body: input, author: user.id, question: questionId }])
      .select();
    console.log(data);

    const commentData = data[0];
    commentData.author = user;

    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        return { ...question, comments: [...question.comments, commentData] };
      }
      return question;
    });
    
    setInput('');
    setQuestions(updatedQuestions);
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
