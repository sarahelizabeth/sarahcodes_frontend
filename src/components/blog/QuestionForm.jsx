import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { Input } from 'rsuite';
import { API } from '../../utils/api';
import { createQuestion } from '../../utils/appwriteClient';

export const QuestionForm = ({ submitQuestion }) => {
  const userContext = useContext(UserContext);
  const [input, setInput] = useState('');
  const [rows, setRows] = useState(4);

  useEffect(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 438) {
      setRows(2);
    }
  }, []);

  const oldHandleSubmit = () => {
    if (input == '') {
      console.error('Input error');
      return;
    }

    const questionValue = {
      body: input,
      author: userContext.user.pk,
    };

    API.post(`api/blog/questions/`, questionValue)
      .then((res) => {
        console.log(res.data);
        setInput('');
        submitQuestion();
      })
      .catch((error) => {
        console.error('question error: ', error);
      });
  };

  const handleSubmit = async () => {
    if (input == '') {
      console.error('Input error');
      return;
    }

    try {
      const response = await createQuestion(input, userContext.user.$id);
      console.log(response);
      setInput('');
      submitQuestion();
    } catch (error) {
      console.error('question error: ', error);
    }
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
