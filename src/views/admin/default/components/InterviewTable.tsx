import React from 'react';
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
  Checkbox
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
import { SearchIcon } from '@chakra-ui/icons';
import InterviewTableHeader from './InterviewTable/InterviewTableHeader';
import InterviewTableBody from './InterviewTable/InterviewTableBody';
import { fakeInterviewsData } from 'views/admin/marketplace/components/data';

type InterviewObj = {
  id: number;
  job_name: string;
  interview_datetime: string;
  passed: boolean;
};

const columnHelper = createColumnHelper<InterviewObj>();

// Example fake data for interviews with IDs


export default function InterviewTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

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
      cell: (info: any) => (
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
      cell: (info: any) => (
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
      cell: (info: any) => (
        <Checkbox isChecked={info.getValue()} isReadOnly />
      )
    }),
    columnHelper.display({
      id: 'change_time',
      header: () => null, // No header for this column
      cell: (info: any) => (
        <ChangeTime interviewId={info.row.original.id} />
      ),
    }),
    columnHelper.display({
      id: 'delete_interview',
      header: () => null, // No header for this column
      cell: (info: any) => (
        <DeleteInterviewModal interviewId={info.row.original.id} />
      ),
    }),
    columnHelper.display({
      id: 'start_session',
      header: () => null, // No header for this column
      cell: (info: any) => (
        <StartSessionModal interviewId={info.row.original.id} />
      ),
    }),
  ];

  const [data, setData] = React.useState(() => [...fakeInterviewsData]);

  const filteredData = React.useMemo(() => {
    return data.filter(interview =>
      interview.job_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.interview_datetime.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const table = useReactTable({
    data: filteredData,
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
        <Table variant='simple' color='gray.500' mb='24px' mt="12px">
          <InterviewTableHeader headerGroups={table.getHeaderGroups()} borderColor={borderColor} />
          <InterviewTableBody rows={table.getRowModel().rows} />
        </Table>
      </Box>
    </Box>
  );
}
