import React, { useState, useEffect } from 'react';
import { data } from '../assets/data';

const getRandomQuestions = (data, numQuestions) => {
  const shuffled = [...data].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numQuestions);
};

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState(false);

  useEffect(() => {
    setQuestions(getRandomQuestions(data, 20));
  }, []);

  const checkAnswer = (selectedOption) => {
    if (selectedAnswer !== null) return;

    const question = questions[index];
    setSelectedAnswer(selectedOption);

    if (question.ans === selectedOption) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const nextQuestion = () => {
    if (selectedAnswer === null) return;

    if (index + 1 === questions.length) {
      setResult(true);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
    }
  };

  const restartQuiz = () => {
    setIndex(0);
    setScore(0);
    setResult(false);
    setSelectedAnswer(null);
    setQuestions(getRandomQuestions(data, 20));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-400 px-4 sm:px-6 md:px-8 select-none">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Quiz App</h1>
        <hr className="mb-4" />
        {result ? (
          <Result
            score={score}
            totalQuestions={questions.length}
            restartQuiz={restartQuiz}
          />
        ) : (
          questions.length > 0 && (
            <QuizQuestion
              question={questions[index]}
              index={index}
              selectedAnswer={selectedAnswer}
              checkAnswer={checkAnswer}
              nextQuestion={nextQuestion}
              totalQuestions={questions.length}
            />
          )
        )}
      </div>
    </div>
  );
};

const Result = ({ score, totalQuestions, restartQuiz }) => (
  <div className="text-center">
    <h2 className="text-2xl mb-4">
      You scored {score} out of {totalQuestions}
    </h2>
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      onClick={restartQuiz}
    >
      Try Again
    </button>
  </div>
);

const QuizQuestion = ({
  question,
  index,
  selectedAnswer,
  checkAnswer,
  nextQuestion,
  totalQuestions,
}) => (
  <>
    <div>
      <h2 className="text-xl mb-4">
        {index + 1}. {question.question}
      </h2>
      <ul className="space-y-2">
        {['option1', 'option2', 'option3', 'option4'].map((option, i) => (
          <li
            key={i}
            className={`cursor-pointer border p-2 rounded text-lg transition
            ${selectedAnswer === null ? 'hover:bg-gray-200' : ''}
            ${
              selectedAnswer === i + 1 && question.ans === i + 1
                ? 'bg-green-500 text-white'
                : ''
            }
            ${
              selectedAnswer === i + 1 && question.ans !== i + 1
                ? 'bg-red-500 text-white'
                : ''
            }
            ${
              selectedAnswer !== null && question.ans === i + 1
                ? 'bg-green-500 text-white'
                : ''
            }
          `}
            onClick={() => checkAnswer(i + 1)}
          >
            {question[option]}
          </li>
        ))}
      </ul>
      <button
        className={`mt-4 w-full px-4 py-2 rounded text-white
        ${
          selectedAnswer === null
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-700'
        }
      `}
        onClick={nextQuestion}
        disabled={selectedAnswer === null}
      >
        Next
      </button>
      <div className="mt-2 text-center">
        {index + 1} out of {totalQuestions}
      </div>
    </div>
    <footer className="mt-4 text-center">
      Created by
      <a
        className="text-blue-500 hover:text-blue-700"
        href="https://github.com/emirberkoncu"
        target="_blank"
        rel="noreferrer"
      >
        &nbsp;@emirberkoncu
      </a>
    </footer>
  </>
);

export default Quiz;
