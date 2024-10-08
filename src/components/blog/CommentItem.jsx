import React, { useEffect, useState } from 'react';
import { API } from '../../utils/api';

export const CommentItem = ({ comment }) => {
  console.log(comment);
  const dateFormatted = new Date(comment.$createdAt).toLocaleDateString();
  const timeFormatted = new Date(comment.$createdAt).toLocaleTimeString();
  // const [comment, setComment] = useState({
  //   first_name: '',
  //   last_name: '',
  //   body: '',
  //   date: '',
  //   time: '',
  // });

  // useEffect(() => {
  //   API.get(`/api/blog/comments/${commentId.toString()}/`)
  //     .then((res) => {
  //       const date = new Date(res.data.created_at).toLocaleDateString();
  //       const time = new Date(res.data.created_at).toLocaleTimeString();
  //       const comment = {
  //         first_name: res.data.author.first_name,
  //         last_name: res.data.author.last_name,
  //         body: res.data.body,
  //         date: date,
  //         time: time,
  //       };
  //       setComment(comment);
  //     })
  //     .catch((error) => {
  //       console.error('get comment error: ', error);
  //     });
  // }, []);

  return (
    <p className='py-3'>
      FROM {comment.author.first_name} on {dateFormatted} at {timeFormatted}: {comment.body}
    </p>
  );
};