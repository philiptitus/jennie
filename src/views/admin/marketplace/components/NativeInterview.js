import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Flex, Progress, Text, Spinner, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
  createColumnHelper, getCoreRowModel, getSortedRowModel, SortingState, useReactTable
} from '@tanstack/react-table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInterviewRoomDetails, resetFetchInterviewRoomDetails } from '../../../../server/actions/actions1';
import SessionHeader from './NativeInterview/SessionHeader';
import InterviewContent from './NativeInterview/InterviewContent';
import InterviewCompletionDialog from './NativeInterview/InterviewCompletionDialog';

const columnHelper = createColumnHelper();

export default function NativeInterview(props) {
  const { tableData } = props;
  const [sorting, setSorting] = useState([]);
  const [startInterview, setStartInterview] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionType, setQuestionType] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const { loading, error, room } = useSelector(state => state.interviewRoomDetail);
  const { session } = useSelector(state => state.latestInterviewSession);

  useEffect(() => {
    if (session && session.id) {
      dispatch(fetchInterviewRoomDetails(session.id));
    }
  }, [dispatch, session]);

  useEffect(() => {
    if (room && room.blocks && room.coding_questions) {
      const allQuestions = [...room.blocks, ...room.coding_questions];
      const cleanedQuestions = allQuestions.map(question => ({
        ...question,
        question: question.question.replace(/\*/g, '')
      }));
      setQuestions(cleanedQuestions);
      setQuestionType('interview');
    }
  }, [room]);

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
      cell: (info) => <Flex align='center'><Avatar src={info.getValue()[1]} /><Text>{info.getValue()[0]}</Text></Flex>
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

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  if (loading) {
    return <Spinner />;
  }

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
