import { Box, Card, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, useToast, Progress, Tooltip, IconButton } from '@chakra-ui/react';
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import React, { useState, useMemo, useEffect } from 'react';
import ComplexTableHeader from './DevelopmentTable/ComplexTableHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getPreparationMaterialDetail, resetPreparationMaterialDetail } from 'server/actions/actions1'; // Update the path accordingly
import CodingTableRow from './CodingTable/CodingTableRow';
import CodeEditorModal from './CodingTable/CodeEditor';
import { FaCode } from 'react-icons/fa';

const columnHelper = createColumnHelper();

export default function CodingTable({ materialId }) {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const [showAnswer, setShowAnswer] = useState({});
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [viewedAnswer, setViewedAnswer] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  const dispatch = useDispatch();
  const preparationMaterialDetail = useSelector((state) => state.preparationMaterialDetail);
  const { loading, error, material } = preparationMaterialDetail;

  useEffect(() => {
    dispatch(getPreparationMaterialDetail(materialId));

    return () => {
      dispatch(resetPreparationMaterialDetail());
    };
  }, [dispatch, materialId]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while fetching the data.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    if (!loading && material && material.coding_questions && material.coding_questions?.length === 0) {
      toast({
        title: 'No Results',
        description: 'No coding questions found.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [loading, error, material, toast]);

  const data = useMemo(() => {
    if (material && material.coding_questions) {
      return material.coding_questions.map(question => ({
        id: question.id,
        question: question.question,
        answer: question.answer,
        my_answer: question.my_answer,
        attempted: question.attempted,
        score: question.score,
      }));
    }
    return [];
  }, [material]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('question', {
        id: 'question',
        header: () => (
          <Text
            justifyContent='space-between'
            align='center'
            fontSize={{ sm: '10px', lg: '12px' }}
            color='gray.400'>
            QUESTION
          </Text>
        ),
        cell: (info) => (
          <Flex align='center'>
            <Text color={textColor} fontSize='sm' fontWeight='700'>
              {info.getValue()}
            </Text>
          </Flex>
        ),
      }),
      columnHelper.accessor('attempted', {
        id: 'attempted',
        header: () => (
          <Text
            justifyContent='space-between'
            align='center'
            fontSize={{ sm: '10px', lg: '12px' }}
            color='gray.400'>
            ATTEMPTED
          </Text>
        ),
        cell: (info) => (
          <Text color={textColor} fontSize='sm' fontWeight='700'>
            {info.getValue() ? 'Yes' : 'No'}
          </Text>
        ),
      }),
      columnHelper.accessor('score', {
        id: 'score',
        header: () => (
          <Text
            justifyContent='space-between'
            align='center'
            fontSize={{ sm: '10px', lg: '12px' }}
            color='gray.400'>
            SCORE
          </Text>
        ),
        cell: (info) => (
          <Flex align='center'>
            <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
              {info.getValue()}%
            </Text>
            <Progress variant='table' colorScheme='brandScheme' h='8px' w='63px' value={info.getValue()} />
          </Flex>
        ),
      }),
    ],
    [textColor]
  );

  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: useMemo(() => getSortedRowModel(), []),
    debugTable: true,
  });

  return (
    <Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }} h='auto'>
      <ComplexTableHeader />
      <Box overflowY='auto'>
        <Table variant='simple' color='gray.500' mb='24px' mt='12px'>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    pe='10px'
                    borderColor={borderColor}
                    cursor='pointer'
                    onClick={header.column.getToggleSortingHandler()}>
                    <Flex
                      justifyContent='space-between'
                      align='center'
                      fontSize={{ sm: '10px', lg: '12px' }}
                      color='gray.400'>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{ asc: '', desc: '' }[header.column.getIsSorted()] ?? null}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.slice(0, 11).map((row) => (
              <CodingTableRow
                showSend={!material?.completed}
                key={row.id}
                row={row}
                showAnswer={showAnswer}
                setShowAnswer={setShowAnswer}
                answers={answers}
                setAnswers={setAnswers}
                submitted={submitted}
                setSubmitted={setSubmitted}
                viewedAnswer={viewedAnswer}
                setViewedAnswer={setViewedAnswer}
                id={materialId} // Pass the block.id as the id parameter
                attempted={row.original.attempted}
                placeholder={row.original.my_answer}
              />
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Fixed Code Editor Button with Tooltip */}
      <Tooltip label='Open Code Editor' placement='left'>
        <IconButton
          icon={<FaCode />}
          position='fixed'
          top='20px'
          right='20px'
          onClick={() => setIsModalOpen(true)}
        />
      </Tooltip>

      {/* Code Editor Modal */}
      <Box position='fixed' top='120px' right='20px' zIndex='1000'>
        <CodeEditorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onOpen={() => setIsModalOpen(true)}
        />
      </Box>
    </Card>
  );
}
