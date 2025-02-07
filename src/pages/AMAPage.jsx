import React, { useState, useEffect, useContext, createContext, useMemo } from 'react';
import supabase from '../utils/supabaseClient';
import { UserContext, LoginContext, RegisterContext } from '../App';
import { QuestionForm } from '../components/blog/QuestionForm';
import { Questions } from '../components/blog/Questions';
import { ContentError } from '../components/ui/ContentError';

export const QuestionsContext = createContext(null);

export const AMAPage = () => {
  const { user } = useContext(UserContext);
  const loginContext = useContext(LoginContext);
  const registerContext = useContext(RegisterContext);

  const [questions, setQuestions] = useState([]);
  const questionsContext = useMemo(() => ({ questions, setQuestions }), [questions]);

  const [contentError, setContentError] = useState(false);

  useEffect(() => {
    const getQuestions = async () => {
      const { data, error } = await supabase
        .from('questions')
        .select(`*, author:users(first_name, last_name), comments(*, author:users(first_name, last_name)), answer:answers(body, created_at)`);
      setQuestions(data);

      if (error) {
        console.error(error);
        setContentError(true);
      }
    };
    getQuestions();
  }, []);

  return (
    <QuestionsContext.Provider value={questionsContext}>
      <section className='w-screen h-screen grid grid-rows-7 md:grid-cols-2'>
        <div className='w-full h-full md:h-screen row-span-3 centered flex-row md:flex-col sticky top-0 overflow-hidden bg-black text-white'>
          <div className='w-4/5 md:w-3/4 lg:w-2/3 p-1'>
            <h1 id='ask' className='knewave text-white text-center text-2xl md:text-5xl pb-1 md:pb-2'>
              Ask Me Anything!
            </h1>
            {user == null ? (
              <>
                <p className='py-2 text-center'>Sign up or log in to ask me a question or leave a comment!</p>
                <div className='flex justify-center gap-6 my-5 pb-3 md:pb-0'>
                  <button
                    className='button-shadow-white border-2 border-white px-4 py-2 uppercase'
                    onClick={() => registerContext.setOpenRegister(true)}
                  >
                    Sign Up
                  </button>
                  <button
                    className='button-shadow-white border-2 border-white px-4 py-2 uppercase'
                    onClick={() => loginContext.setOpenLogin(true)}
                  >
                    Log In
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className='mt-1 md:mt-5 mb-3 md:px-2 lg:px-10 text-center lg:text-justify text-xs'>
                  Enter your query below and you will receive an email as soon as I answer it!
                </p>
                <QuestionForm />
              </>
            )}
          </div>
        </div>
        <div className='w-full h-full md:h-screen row-span-4 overflow-y-scroll p-8 md:p-20'>
          <Questions />
          {contentError || (questions.length < 1 && <ContentError />)}
        </div>
      </section>
    </QuestionsContext.Provider>
  );
};
