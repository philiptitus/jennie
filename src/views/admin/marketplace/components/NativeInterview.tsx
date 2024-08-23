import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Flex, Progress, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
  createColumnHelper, getCoreRowModel, getSortedRowModel, SortingState, useReactTable
} from '@tanstack/react-table';
import { interviewBlocks, interviewCodingQuestions } from './data';
import SessionHeader from './NativeInterview/SessionHeader';
import InterviewContent from './NativeInterview/InterviewContent';
import InterviewCompletionDialog from './NativeInterview/InterviewCompletionDialog';

type RowObj = {
  name: string[];
  artworks: number;
  rating: number;
};

const columnHelper = createColumnHelper<RowObj>();

export default function NativeInterview(props: { tableData: any }) {
  const { tableData } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [startInterview, setStartInterview] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);
  const [questionType, setQuestionType] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

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
    navigate('/admin/default');
  };

  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: () => <Text>NAME</Text>,
      cell: (info: any) => <Flex align='center'><Avatar src={info.getValue()[1]} /><Text>{info.getValue()[0]}</Text></Flex>
    }), 
    columnHelper.accessor('artworks', {
      id: 'artworks',
      header: () => <Text>ARTWORKS</Text>,
      cell: (info) => <Text>{info.getValue()}</Text>
    }),
    columnHelper.accessor('rating', {
      id: 'rating',
      header: () => <Text>RATING</Text>,
      cell: (info) => <Flex align='center'><Progress value={info.getValue()} /></Flex>
    })
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true
  });

  return (
    <Flex direction='column' w='100%' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
      <SessionHeader />
      <InterviewContent
        startInterview={startInterview}
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        questionType={questionType}
        handleStartInterview={handleStartInterview}
        handleNextQuestion={handleNextQuestion}
      />
      <InterviewCompletionDialog isOpen={isOpen} cancelRef={cancelRef} handleClose={handleClose} />
    </Flex>
  );
}
