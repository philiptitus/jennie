import { Box, Button, Flex, IconButton, Select, Td, Text, Textarea, Tr, useColorModeValue, useToast } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import React, { useCallback } from 'react';
import CodeEditorModal from './CodeEditor';
import { RowObj } from './types';
import { flexRender } from '@tanstack/react-table';

interface CodingTableRowProps {
  row: any; // Replace 'any' with the appropriate type if available
  showAnswer: { [key: number]: boolean };
  setShowAnswer: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  answers: { [key: number]: string };
  setAnswers: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>;
  languages: { [key: number]: string };
  setLanguages: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>;
  submitted: { [key: number]: boolean };
  setSubmitted: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  viewedAnswer: { [key: number]: boolean };
  setViewedAnswer: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
}

const CodingTableRow: React.FC<CodingTableRowProps> = ({
  row,
  showAnswer,
  setShowAnswer,
  answers,
  setAnswers,
  languages,
  setLanguages,
  submitted,
  setSubmitted,
  viewedAnswer,
  setViewedAnswer,
}) => {
  const boxBg = useColorModeValue('gray.50', 'gray.700');
  const toast = useToast();

  const toggleAnswerVisibility = useCallback((id: number) => {
    setShowAnswer((prev) => ({ ...prev, [id]: !prev[id] }));
    setViewedAnswer((prev) => ({ ...prev, [id]: true }));
    toast({
      title: 'Info',
      description: 'You have viewed the correct answer. You cannot submit an answer now.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  }, [toast]);

  const handleAnswerChange = useCallback((id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleLanguageChange = useCallback((id: number, value: string) => {
    setLanguages((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleSubmitAnswer = useCallback((id: number) => {
    if (!answers[id]) {
      toast({
        title: 'Error',
        description: 'Please enter an answer before submitting.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (submitted[id]) {
      toast({
        title: 'Info',
        description: 'This answer has already been submitted.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (viewedAnswer[id]) {
      toast({
        title: 'Error',
        description: 'You cannot submit an answer after viewing the correct answer.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Successful submission
    console.log(`Submitted answer for question ${id}:`, answers[id]);
    setSubmitted((prev) => ({ ...prev, [id]: true }));

    toast({
      title: 'Success',
      description: `The answer for question ${id} has been successfully saved.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }, [answers, submitted, viewedAnswer, toast]);

  return (
    <React.Fragment key={row.id}>
      <Tr>
        {row.getVisibleCells().map((cell: any) => (
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
            <Select
              placeholder='Select Language'
              value={languages[row.original.id] || row.original.language}
              onChange={(e) => handleLanguageChange(row.original.id, e.target.value)}
              mb='4'>
              <option value='Python'>Python</option>
              <option value='JavaScript'>JavaScript</option>
              <option value='Java'>Java</option>
            </Select>
            <Textarea
              placeholder='Your Answer'
              value={answers[row.original.id] || ''}
              onChange={(e) => handleAnswerChange(row.original.id, e.target.value)}
              mb='4'
              resize='vertical'
              minH='100px'
            />
            <CodeEditorModal />
            <Button
              colorScheme='teal'
              size='sm'
              onClick={() => handleSubmitAnswer(row.original.id)}
              mb='4'
              disabled={!answers[row.original.id] || submitted[row.original.id] || viewedAnswer[row.original.id]}
              _disabled={{ bg: 'gray.300', color: 'gray.500', cursor: 'not-allowed' }}>
              Send
            </Button>
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
            <Text
              className={showAnswer[row.original.id] ? '' : 'blur'}
              style={{
                filter: showAnswer[row.original.id] ? 'none' : 'blur(5px)',
              }}>
              {row.original.answer}
            </Text>
            <Text mt='4'>Attempted: {row.original.attempted ? 'Yes' : 'No'}</Text>
            <Text mt='2'>Score: {row.original.score}%</Text>
          </Box>
        </Td>
      </Tr>
    </React.Fragment>
  );
};

export default CodingTableRow;
