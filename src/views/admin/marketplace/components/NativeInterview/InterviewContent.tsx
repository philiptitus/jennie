//NativeInterview

import React from 'react';
import { Box } from '@chakra-ui/react';
import InterviewIntroduction from '../InterviewIntroduction';
import InterviewQuestionNative from '../Native';

interface InterviewContentProps {
  startInterview: boolean;
  questions: any[];
  currentQuestionIndex: number;
  questionType: string;
  handleStartInterview: () => void;
  handleNextQuestion: () => void;
}

const InterviewContent: React.FC<InterviewContentProps> = ({
  startInterview,
  questions,
  currentQuestionIndex,
  questionType,
  handleStartInterview,
  handleNextQuestion,
}) => {
  return (
    <Box>
      {!startInterview ? (
        <InterviewIntroduction onStart={handleStartInterview} />
      ) : (
        <InterviewQuestionNative
          question={questions[currentQuestionIndex]}
          questionType={questionType}
          onNextQuestion={handleNextQuestion}
        />
      )}
    </Box>
  );
};

export default InterviewContent;
