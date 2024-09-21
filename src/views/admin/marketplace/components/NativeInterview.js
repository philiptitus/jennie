import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Flex, Progress, Text, Spinner, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
  createColumnHelper, getCoreRowModel, getSortedRowModel, SortingState, useReactTable
} from '@tanstack/react-table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInterviewRoomDetails, resetFetchInterviewRoomDetails } from '../../../../server/actions/actions1';
import { markInterviewRoom, resetInterviewRoomMarking } from '../../../../server/actions/actions2'; // Adjust the path as necessary
import SessionHeader from './NativeInterview/SessionHeader';
import InterviewContent from './NativeInterview/InterviewContent';

const columnHelper = createColumnHelper();

export default function NativeInterview(props) {
  const { tableData } = props;
  const [sorting, setSorting] = useState([]);
  const [startInterview, setStartInterview] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionType, setQuestionType] = useState('');
  const [allIds, setAllIds] = useState([]);
  const [allTypes, setAllTypes] = useState([]);
  const [fullQuestions, setFullQuestions] = useState([]); // New state for fullQuestions
  const cancelRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const { loading: roomLoading, error: roomError, room } = useSelector(state => state.interviewRoomDetail);
  const { session } = useSelector(state => state.latestInterviewSession);
  const { loading: markingLoading, error: markingError } = useSelector(state => state.interviewRoomMarking);

  useEffect(() => {
    if (session && session.id) {
      dispatch(fetchInterviewRoomDetails(session.id));
    }
  }, [dispatch, session]);

  useEffect(() => {
    if (room && room.blocks && room.coding_questions) {
      const allQuestions = [...room.blocks.map(block => ({ ...block, type: 'block' })), ...room.coding_questions.map(coding => ({ ...coding, type: 'coding_question' }))];
      const cleanedQuestions = allQuestions.map(question => ({
        ...question,
        question: question.question.replace(/\*/g, '')
      }));

      const ids = allQuestions.map(question => question.id);
      const types = allQuestions.map(question => question.type);

      setAllIds(ids);
      setAllTypes(types);
      setQuestions(cleanedQuestions);
      setQuestionType('interview');

      // Create the fullQuestions list
      const fullQuestionsList = cleanedQuestions.map((question, index) => ({
        id: ids[index],
        question: question.question,
        type: types[index]
      }));

      setFullQuestions(fullQuestionsList);
    }
  }, [room]);

  const handleStartInterview = () => {
    setStartInterview(true);
    setCurrentQuestionIndex(0);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < fullQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStartInterview(false);
      console.log('Interview finished');

      if (session && session.id) {
        dispatch(markInterviewRoom(session.id));
      }
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (markingLoading) {
      timeoutId = setTimeout(() => {
        if (!markingError) {
          toast({
            title: 'Success',
            description: 'Interview response is being marked. Please check your notifications any moment from now for further updates and your email too.',
            status: 'success',
            duration: 10000,
            isClosable: true,
          });

          setTimeout(() => {
            navigate('/admin/default');
          }, 2000);
        }
      }, 5000);
    }

    if (markingError) {
      toast({
        title: 'Error',
        description: markingError,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      dispatch(resetInterviewRoomMarking());
      clearTimeout(timeoutId);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [markingLoading, markingError, dispatch, navigate, toast]);

  useEffect(() => {
    if (roomError) {
      toast({
        title: 'Error',
        description: roomError,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [roomError, toast]);

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

  if (roomLoading) {
    return <Spinner />;
  }

  return (
    <Flex direction='column' w='100%' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
      <SessionHeader />
      <InterviewContent
        startInterview={startInterview}
        questions={fullQuestions}
        currentQuestionIndex={currentQuestionIndex}
        questionType={questionType}
        handleStartInterview={handleStartInterview}
        handleNextQuestion={handleNextQuestion}
      />
      {markingLoading && <Spinner size="xl" />}
    </Flex>
  );
}
