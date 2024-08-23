import React, { useState, useEffect, useRef } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { TopCreatorHeader } from './TableTopCreators/TopCreatorHeader';
import { CreatorTable } from './TableTopCreators/CreatorTable';
import { InterviewCompleteDialog } from './TableTopCreators/InterviewCompleteDialog';
import InterviewIntroduction from './InterviewIntroduction';
import InterviewQuestion from './InterviewQuestion';
import { interviewBlocks, interviewCodingQuestions } from './data';

export default function TopCreatorTable(props: { tableData: any }) {
  const { tableData } = props;
  const [startInterview, setStartInterview] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);
  const [questionType, setQuestionType] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const allQuestions = [...interviewBlocks, ...interviewCodingQuestions];
    setQuestions(allQuestions);
    setQuestionType('interview');
  }, []);

  const handleStartInterview = () => {
    setStartInterview(true);
    setCurrentQuestionIndex(0);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStartInterview(false);
      setIsOpen(true);
      console.log('Interview finished');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Flex direction='column' w='100%' overflowX={{ sm: "scroll", lg: "hidden" }}>
      <TopCreatorHeader />
      
      <Box>
        {!startInterview ? (
          <InterviewIntroduction onStart={handleStartInterview} />
        ) : (
          <InterviewQuestion 
            question={questions[currentQuestionIndex]} 
            questionType={questionType}
            onNextQuestion={handleNextQuestion} 
          />
        )}
      </Box>

      <InterviewCompleteDialog
        isOpen={isOpen}
        cancelRef={cancelRef}
        onClose={handleClose}
      />
    </Flex>
  );
}
