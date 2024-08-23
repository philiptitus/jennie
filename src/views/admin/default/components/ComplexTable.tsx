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
  useColorModeValue
} from '@chakra-ui/react';
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import ScheduleInterviewModal from 'views/admin/default/components/InterviewModal';
import DeleteJobModal from './DeleteJobModal';
import CreatePreparationModal from './CreatePreparation';
import { SearchIcon } from '@chakra-ui/icons';
import TableHeader from './complextable/TableHeader';
import TableBody from './complextable/TableBody';
import { fakeJobsData } from 'views/admin/marketplace/components/data';
type RowObj = {
  id: string;
  title: string;
  description: string;
  mockup_interview_date: string;
  job_url: string;
};

const columnHelper = createColumnHelper<RowObj>();


export default function ComplexTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const columns = [
    columnHelper.accessor('title', {
      id: 'title',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '10px', lg: '12px' }}
          color='gray.400'>
          Job Title
        </Text>
      ),
      cell: (info: any) => (
        <Flex align='center'>
          <Text color={textColor} fontSize='sm' fontWeight='700'>
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('mockup_interview_date', {
      id: 'mockup_interview_date',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '10px', lg: '12px' }}
          color='gray.400'>
          Mockup Interview Date
        </Text>
      ),
      cell: (info: any) => (
        <Text color={textColor} fontSize='sm' fontWeight='700'>
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('job_url', {
      id: 'job_url',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '10px', lg: '12px' }}
          color='gray.400'>
          Job URL
        </Text>
      ),
      cell: (info: any) => (
        <Text color={textColor} fontSize='sm' textDecoration="underline">
          <a href={info.getValue()} target="_blank" rel="noopener noreferrer">
            {info.getValue()}
          </a>
        </Text>
      ),
    }),
    {
      id: 'schedule_interview',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '10px', lg: '12px' }}
          color='gray.400'>
          Schedule Interview
        </Text>
      ),
      cell: (info: any) => (
        <Flex justifyContent="center" alignItems="center">
          <ScheduleInterviewModal jobId={info.row.original.id} />
        </Flex>
      ),
    },
    {
      id: 'delete_job',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '10px', lg: '12px' }}
          color='gray.400'>
          Remove
        </Text>
      ),
      cell: (info: any) => (
        <Flex justifyContent="center" alignItems="center">
          <DeleteJobModal jobId={info.row.original.id} />
        </Flex>
      ),
    },
    {
      id: 'create_preparation',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '10px', lg: '12px' }}
          color='gray.400'>
          Prep Material
        </Text>
      ),
      cell: (info: any) => (
        <Flex justifyContent="center" alignItems="center">
          <CreatePreparationModal jobId={info.row.original.id} />
        </Flex>
      ),
    },
  ];

  const [data, setData] = React.useState(() => [...fakeJobsData]);

  const filteredData = React.useMemo(() => {
    return data.filter(job =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.mockup_interview_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.job_url.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

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

  return (
    <Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
      <Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
        <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
          Previous Jobs
        </Text>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <Icon as={SearchIcon} color='gray.300' />
          </InputLeftElement>
          <Input
            type='text'
            placeholder='Search jobs...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        <Menu />
      </Flex>
      <Box
        overflowY="auto"
        overflowX="auto"
        maxH="400px" // Adjust the height as needed
      >
        <Table variant='simple' color='gray.500' mb='24px' mt="12px">
          <TableHeader headerGroups={table.getHeaderGroups()} borderColor={borderColor} />
          <TableBody rows={table.getRowModel().rows} />
        </Table>
      </Box>
    </Card>
  );
}
