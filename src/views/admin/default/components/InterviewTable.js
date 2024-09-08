import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Flex,
  Table,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  useColorModeValue,
  Checkbox,
  IconButton,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table';
import ChangeTime from './ChangeTime';
import DeleteInterviewModal from './DeleteInterview';
import StartSessionModal from './StartSession';
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';
import InterviewTableHeader from './InterviewTable/InterviewTableHeader';
import InterviewTableBody from './InterviewTable/InterviewTableBody';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInterviewList, resetUserInterviewList } from 'server/actions/actions1'; // Update the path accordingly

const columnHelper = createColumnHelper();

export default function InterviewTable() {
  const [sorting, setSorting] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleInterviews, setVisibleInterviews] = useState(10);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const toast = useToast();
  const dispatch = useDispatch();

  const interviewList = useSelector((state) => state.userInterviewList);
  const { loading, error, interviews, success } = interviewList;

  const columns = [
    columnHelper.accessor('job_name', {
      id: 'job_name',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '10px', lg: '12px' }}
          color='gray.400'>
          Job Name
        </Text>
      ),
      cell: (info) => (
        <Flex align='center'>
          <Text color={textColor} fontSize='sm' fontWeight='700'>
            {info.getValue()}
          </Text>
        </Flex>
      )
    }),
    columnHelper.accessor('interview_datetime', {
      id: 'interview_datetime',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '10px', lg: '12px' }}
          color='gray.400'>
          Interview Date & Time
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize='sm'>
          {info.getValue()}
        </Text>
      )
    }),
    columnHelper.accessor('passed', {
      id: 'passed',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '10px', lg: '12px' }}
          color='gray.400'>
          Passed
        </Text>
      ),
      cell: (info) => (
        <Checkbox isChecked={info.getValue()} isReadOnly />
      )
    }),
    columnHelper.display({
      id: 'change_time',
      header: () => null, // No header for this column
      cell: (info) => {
        const interviewDateTime = new Date(info.row.original.interview_datetime);
        const currentDateTime = new Date();
        if (interviewDateTime > currentDateTime) {
          return <ChangeTime interviewId={info.row.original.id} />;
        }
        return null;
      },
    }),
    columnHelper.display({
      id: 'delete_interview',
      header: () => null, // No header for this column
      cell: (info) => (
        <DeleteInterviewModal interviewId={info.row.original.id} />
      ),
    }),
    columnHelper.display({
      id: 'start_session',
      header: () => null, // No header for this column
      cell: (info) => {
        const interviewDateTime = new Date(info.row.original.interview_datetime);
        const currentDateTime = new Date();
        if (interviewDateTime > currentDateTime) {
          return <StartSessionModal interviewId={info.row.original.id} />;
        }
        return null;
      },
    }),
  ];

  useEffect(() => {
    dispatch(getUserInterviewList());

    return () => {
      dispatch(resetUserInterviewList());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    if (success && interviews?.length === 0) {
      toast({
        title: "No Interviews",
        description: "You don't have any interviews on my platform yet.",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, loading, interviews, toast]);

  const filteredData = useMemo(() => {
    return interviews?.filter(interview =>
      interview.job_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.interview_datetime.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, visibleInterviews);
  }, [interviews, searchQuery, visibleInterviews]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const handleLoadMore = () => {
    setVisibleInterviews(prev => prev + 10);
  };

  return (
    <Box
      flexDirection='column'
      w='100%'
      h='400px' // Set a fixed height
      overflowY='auto' // Enable vertical scrolling
      px='0px'>
      <Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
        <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
          All your Interviews
        </Text>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <Icon as={SearchIcon} color='gray.300' />
          </InputLeftElement>
          <Input
            type='text'
            placeholder='Search interviews...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
      </Flex>
      <Box>
        {loading ? (
          <Flex justifyContent="center" alignItems="center" h="100%">
            <Spinner />
          </Flex>
        ) : (
          <Table variant='simple' color='gray.500' mb='24px' mt="12px">
            <InterviewTableHeader headerGroups={table.getHeaderGroups()} borderColor={borderColor} />
            <InterviewTableBody rows={table.getRowModel().rows} />
          </Table>
        )}
      </Box>
      {interviews?.length > visibleInterviews && (
        <Flex justifyContent="center" mt="4">
          <IconButton
            icon={<ChevronDownIcon />}
            onClick={handleLoadMore}
            aria-label="Load More"
          />
        </Flex>
      )}
    </Box>
  );
}
