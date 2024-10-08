import React, { useContext, useEffect, useRef, useState } from 'react';
import { Divider, useToaster } from 'rsuite';
import { QuestionsContext } from '../../pages/AMAPage';
import { QuestionItem } from './QuestionItem';
import { AnswerItem } from './AnswerItem';
import { CommentItem } from './CommentItem';
import { CommentForm } from './CommentForm';
// import CommentBlock from './CommentBlock';
import { BiCommentAdd } from 'react-icons/bi';
import { MdOutlineInsertComment } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { UserContext } from '../../App';

export const Questions = ({ submitComment }) => {
  const questions = useContext(QuestionsContext);
  const userContext = useContext(UserContext);
  // const containerRef = useRef(null);
  const [showForm, setShowForm] = useState(-1);
  const [showComments, setShowComments] = useState(-1);
  const toaster = useToaster();

  const handleShowComments = (index, len) => {
    if (len === 0) return;
    if (index === showComments) setShowComments(-1);
    else setShowComments(index);
    setShowForm(-1);
  };

  const handleShowForm = (index) => {
    if (userContext.user === null) {
      handleShowWarning();
      return;
    }
    if (index === showForm) setShowForm(-1);
    else setShowForm(index);
    setShowComments(-1);
  };

  const handleSubmitComment = (index) => {
    setShowForm(-1);
    submitComment();
    setShowComments(index);
  };

  const handleShowWarning = () => {
    toaster.push(warning, { placement: 'bottomStart', duration: 3000 });
    setTimeout(() => {
      toaster.clear();
    }, 3000);
  };

  const warning = (
    <div className='w-300 h-100 border-2 border-white text-white px-3 py-2 mt-4 toaster-shadow-white'>
      <p className='jetbrains-mono'>Please log in to comment!</p>
    </div>
  );

  return (
    <div className='m-0 md:mt-5'>
      {questions.toReversed().map((question, index) => (
        <div key={index} className='item'>
          <QuestionItem question={question} />
          {question.answer !== null && <AnswerItem answer={question.answer} />}
          <div className='comment-container mt-4'>
            <div className='flex justify-between'>
              <button
                onClick={() => handleShowComments(index, question.comments.length)}
                className='flex items-end gap-x-2'
              >
                <MdOutlineInsertComment size={18} />
                <p className='hover:underline'>
                  {question.comments && question.comments.length} {`comment${question.comments && question.comments.length === 1 ? '' : 's'}`}
                </p>
              </button>
              <button onClick={() => handleShowForm(index)} className='flex items-end gap-x-2'>
                <p className='hover:underline'>Add comment</p>
                <BiCommentAdd size={18} />
              </button>
            </div>
            <div className='mt-2'>
              {showComments === index &&
                question.comments.map((comment, index) => (
                  <div key={index}>
                    <CommentItem comment={comment} />
                  </div>
                ))}
              {showForm === index && (
                <CommentForm questionId={question.$id} userId={userContext.user.$id} submitComment={() => handleSubmitComment(index)} />
              )}
            </div>
            {/* <CommentBlock
              isVisible={showForm === index}
              questionId={question.pk}
              submitComment={() => handleSubmitComment(index)}
            /> */}
          </div>
          <Divider />
        </div>
      ))}
    </div>
  );
};
