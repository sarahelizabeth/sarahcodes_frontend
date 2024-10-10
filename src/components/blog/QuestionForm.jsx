import React, { useContext, useEffect, useState } from 'react';
import supabase from '../../utils/supabaseClient';
import { UserContext } from '../../App';
import { QuestionsContext } from '../../pages/AMAPage';
import { Input } from 'rsuite';

export const QuestionForm = () => {
  const { user } = useContext(UserContext);
  const { questions, setQuestions } = useContext(QuestionsContext);
  const [input, setInput] = useState('');
  const [rows, setRows] = useState(4);

  useEffect(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 438) setRows(2);
  }, []);

  const handleSubmit = async () => {
    console.log(user);
    const { data, error } = await supabase
      .from('questions')
      .insert([{ body: input, author: user.id }])
      .select();
    console.log(data);
    setInput('');
    const questionData = data[0];
    questionData.author = user;
    questionData.answer = null;
    const updatedQuestions = [...questions, questionData];
    setQuestions(updatedQuestions);
  };

  return (
    <div className='question-box md:px-2 lg:px-8 grid place-items-center'>
      <Input
        value={input}
        onChange={(value) => setInput(value)}
        as='textarea'
        rows={rows}
        placeholder='Enter your question here...'
      />
      <button
        className='button-shadow-white border-2 border-white px-4 py-2 uppercase mt-2 mb-4 md:mt-6 hover:font-bold'
        onClick={handleSubmit}
        type='submit'
      >
        Submit
      </button>
    </div>
  );
};
