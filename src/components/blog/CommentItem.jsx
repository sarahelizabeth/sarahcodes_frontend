import React from 'react';
import { useDateFormat, useTimeFormat, useNameAbbreviation } from '../../utils/useFormatting';

export const CommentItem = ({ comment }) => {
  return (
    <div className='py-3'>
      <p>FROM {useNameAbbreviation(comment.author)} on {useDateFormat(comment.created_at)} at {useTimeFormat(comment.created_at)}:</p>
      <span className='bg-neutral-200 p-1'>{comment.body}</span>
    </div>
  );
};