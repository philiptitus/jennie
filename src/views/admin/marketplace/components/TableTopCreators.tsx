import React, { useState, useEffect, useRef } from 'react';
import { 
  Avatar, Box, Button, Flex, Progress, 
  Table, Tbody, Td, Text, Th, Thead, Tr, 
  useColorModeValue, AlertDialog, AlertDialogBody, 
  AlertDialogFooter, AlertDialogHeader, AlertDialogContent, 
  AlertDialogOverlay 
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
  createColumnHelper, flexRender, getCoreRowModel, 
  getSortedRowModel, SortingState, useReactTable 
} from '@tanstack/react-table';
import { interviewBlocks, interviewCodingQuestions } from './data';
import InterviewQuestion from './InterviewQuestion';
import InterviewIntroduction from './InterviewIntroduction';

type RowObj = {
  name: string[];
  artworks: number;
  rating: number;
};

const columnHelper = createColumnHelper<RowObj>();

export default function TopCreatorTable(props: { tableData: any }) {
  const { tableData } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [startInterview, setStartInterview] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);
  const [questionType, setQuestionType] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

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
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '10px', lg: '12px' }}
          color='gray.400'>
          NAME
        </Text>
      ),
      cell: (info: any) => (
        <Flex align='center'>
          <Avatar
            src={info.getValue()[1]}
            w='30px'
            h='30px'
            me='8px'
          />
          <Text
            color={textColor}
            fontSize='sm'
            fontWeight='600'>
            {info.getValue()[0]}
          </Text>
        </Flex>
      )
    }), 
    columnHelper.accessor('artworks', {
      id: 'artworks',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '10px', lg: '12px' }}
          color='gray.400'>
          ARTWORKS
        </Text>
      ),
      cell: (info) => (
        <Text
          color={textColorSecondary}
          fontSize='sm'
          fontWeight='500'>
          {info.getValue()}
        </Text>
      )
    }),
    columnHelper.accessor('rating', {
      id: 'rating',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '10px', lg: '12px' }}
          color='gray.400'>
          RATING
        </Text>
      ),
      cell: (info) => (
        <Flex align='center'>
          <Progress variant='table' colorScheme='brandScheme' h='8px' w='108px' value={info.getValue()} />
        </Flex>
      )
    })
  ];

  const [data, setData] = useState(() => [ ...tableData ]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true
  });

  return (
    <Flex
      direction='column'
      w='100%'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex
        align={{ sm: "flex-start", lg: "center" }}
        justify='space-between'
        w='100%'
        px='22px'
        pb='20px'
        mb='10px'
        boxShadow='0px 40px 58px -20px rgba(112, 144, 176, 0.26)'>
        <Text color={textColor} fontSize='xl' fontWeight='600'>
          Your Session
        </Text>
      </Flex>
      
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

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Interview Completed
            </AlertDialogHeader>

            <AlertDialogBody>
              Your interview session is finished. We will send your results to you very soon.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleClose} colorScheme="blue">
                Finish
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
}
