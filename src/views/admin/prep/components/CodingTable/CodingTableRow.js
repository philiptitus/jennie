import { Box, Button, Flex, IconButton, Select, Td, Text, Textarea, Tr, useColorModeValue, useToast, Spinner } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import React, { useCallback, useEffect, useRef } from 'react';
import CodeEditorModal from './CodeEditor';
import { flexRender } from '@tanstack/react-table';
import { useDispatch, useSelector } from 'react-redux';
import { updateCodingQuestion, resetCodingQuestionUpdate } from 'server/actions/actions1'; // Update the path accordingly

const CodingTableRow = ({
  row,
  showAnswer = {},
  setShowAnswer,
  answers = {},
  setAnswers,
  languages = {},
  setLanguages,
  submitted = {},
  setSubmitted,
  viewedAnswer = {},
  setViewedAnswer,
  id,
  attempted,
  placeholder = 'Your answer',
  showSend
}) => {
  const boxBg = useColorModeValue('gray.50', 'gray.700');
  const toast = useToast();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.codingQuestionUpdate);

  const toastIdRef = useRef(null);

  useEffect(() => {
    if (success) {
      if (!toast.isActive(toastIdRef.current)) {
        toastIdRef.current = toast({
          title: 'Success',
          description: 'Answer Updated.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      setShowAnswer((prev) => ({ ...prev, [id]: true })); // Unblur the answer immediately after success
      dispatch(resetCodingQuestionUpdate());
    }
    if (error) {
      if (!toast.isActive(toastIdRef.current)) {
        toastIdRef.current = toast({
          title: 'Error',
          description: error,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      dispatch(resetCodingQuestionUpdate());
    }
  }, [success, error, dispatch, toast, id]);

  const toggleAnswerVisibility = useCallback((id) => {
    if (!submitted[id]) {
      setAnswers((prev) => ({ ...prev, [id]: 'I don\'t know' }));
      dispatch(updateCodingQuestion(id, { my_answer: 'I don\'t know' }));
    }
    setShowAnswer((prev) => ({ ...prev, [id]: !prev[id] }));
    setViewedAnswer((prev) => ({ ...prev, [id]: true }));

    if (!toast.isActive(toastIdRef.current)) {
      toastIdRef.current = toast({
        title: 'Info',
        description: 'You have viewed the correct answer. You cannot submit an answer now.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [dispatch, toast, submitted]);

  const handleAnswerChange = useCallback((id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleLanguageChange = useCallback((id, value) => {
    setLanguages((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleSubmitAnswer = useCallback((id) => {
    if (!answers[id]) {
      if (!toast.isActive(toastIdRef.current)) {
        toastIdRef.current = toast({
          title: 'Error',
          description: 'Please enter an answer before submitting.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      return;
    }
    if (submitted[id]) {
      if (!toast.isActive(toastIdRef.current)) {
        toastIdRef.current = toast({
          title: 'Info',
          description: 'This answer has already been submitted.',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      }
      return;
    }
    if (viewedAnswer[id]) {
      if (!toast.isActive(toastIdRef.current)) {
        toastIdRef.current = toast({
          title: 'Error',
          description: 'You cannot submit an answer after viewing the correct answer.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      return;
    }

    // Dispatch the update action
    dispatch(updateCodingQuestion(id, { my_answer: answers[id] }));

    setSubmitted((prev) => ({ ...prev, [id]: true }));

    if (!toast.isActive(toastIdRef.current)) {
      toastIdRef.current = toast({
        title: 'Success',
        description: `Saved.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [answers, submitted, viewedAnswer, dispatch, toast]);

  return (
    <React.Fragment key={row.id}>
      <Tr>
        {row.getVisibleCells().map((cell) => (
          <Td
            key={cell.id}
            fontSize={{ sm: '14px' }}
            minW={{ sm: '150px', md: '200px', lg: 'auto' }}
            borderColor='transparent'>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </Td>
        ))}
      </Tr>
      <Tr>
        <Td colSpan={4} p={0} borderColor='transparent'>
          <Box p='4' bg={boxBg}>
            <Text fontSize='lg' fontWeight='bold' mb='4'>
              {row.original.question}
            </Text>

            <Textarea
              placeholder={attempted ? placeholder : 'Your answer'}
              value={answers[row.original.id] || ''}
              onChange={(e) => handleAnswerChange(row.original.id, e.target.value)}
              mb='4'
              resize='vertical'
              minH='100px'
            />

{showSend &&            <div>
            {!attempted && (
              <Button
                colorScheme='teal'
                size='sm'
                onClick={() => handleSubmitAnswer(row.original.id)}
                mb='4'
                disabled={!answers[row.original.id] || submitted[row.original.id] || viewedAnswer[row.original.id]}
                _disabled={{ bg: 'gray.300', color: 'gray.500', cursor: 'not-allowed' }}>
                {loading ? <Spinner size='xs' /> : 'Send'}
              </Button>
            )}
</div>}



            {!showAnswer[row.original.id] && !attempted && (
              <Flex align='center' mb='4'>
                <Text fontSize='lg' fontWeight='bold' me='2'>
                  Correct Answer:
                </Text>
                <IconButton
                  icon={<ViewIcon />}
                  aria-label='Show Answer'
                  onClick={() => toggleAnswerVisibility(row.original.id)}
                  size='sm'
                />
              </Flex>
            )}
            <Text
              className={showAnswer[row.original.id] || attempted ? '' : 'blur'}
              style={{
                filter: showAnswer[row.original.id] || attempted ? 'none' : 'blur(5px)',
              }}>
              {row.original.answer}
            </Text>
            <Text mt='4'>Attempted: {row.original.attempted ? 'Yes' : 'No'}</Text>
            <Text mt='2'>Score: {row.original.score}%</Text>

            {/* <CodeEditorModal/> */}
          </Box>
        </Td>
      </Tr>
    </React.Fragment>
  );
};

export default CodingTableRow;
