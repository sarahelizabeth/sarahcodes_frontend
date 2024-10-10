import React, { useEffect, useState } from 'react';
import { API } from '../../utils/api';

export const CommentItem = ({ comment }) => {
  console.log(comment);
  const dateFormatted = new Date(comment.created_at).toLocaleDateString();
  const timeFormatted = new Date(comment.created_at).toLocaleTimeString();
  const lastInitial = comment?.author?.last_name.charAt(0);
  const author_name = comment?.author?.first_name + ' ' + lastInitial;

  return (
    <div className='py-3'>
      <p>FROM {author_name} on {dateFormatted} at {timeFormatted}:</p>
      <span className='bg-neutral-200 p-1'>{comment.body}</span>
    </div>
  );
};