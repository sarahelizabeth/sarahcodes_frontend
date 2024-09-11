import React, { useEffect, useState } from 'react';
import API from '../../api';

export const AnswerItem = ({ answerId }) => {
  const [answerData, setAnswerData] = useState({
    body: '',
    date: '',
    time: '',
  });
  useEffect(() => {
    API.get(`/api/blog/answers/${answerId.toString()}/`)
      .then((res) => {
        const date = new Date(res.data.created_at).toLocaleDateString();
        const time = new Date(res.data.created_at).toLocaleTimeString();
        const answerData = {
          body: res.data.body,
          date: date,
          time: time,
        };
        setAnswerData(answerData);
      })
      .catch((error) => {
        console.error('get answer error: ', error);
      });
  }, []);

  return (
    <div className='mt-4'>
      <p>
        ANSWERED on {answerData.date} at {answerData.time}:
      </p>
      <p>
        {' '}
        {'>'} {answerData.body}
      </p>
    </div>
  );
};
