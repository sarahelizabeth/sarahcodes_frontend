import React, { useState, useContext } from 'react';
import { Input } from 'rsuite';
import supabase from '../../utils/supabaseClient';
import { QuestionsContext } from '../../pages/AMAPage';
import { UserContext } from '../../App';

export const CommentForm = ({ questionId, userId, submitComment }) => {
  const [input, setInput] = useState('');
  const { questions, setQuestions } = useContext(QuestionsContext);
  const { user } = useContext(UserContext);

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
    if (error) {
      console.error(error);
      return;
    }

    const commentData = data[0];
    commentData.author = user;

    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        let commentsArray = [];
        if (question?.comments?.length > 0) {
          commentsArray = question.comments;
        }
        commentsArray.push(commentData);
        return { ...question, comments: commentsArray };
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
