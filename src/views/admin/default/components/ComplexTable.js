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
  Button,
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
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import ScheduleInterviewModal from 'views/admin/default/components/InterviewModal';
import DeleteJobModal from './DeleteJobModal';
import CreatePreparationModal from './CreatePreparation';
import { SearchIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import TableHeader from './complextable/TableHeader';
import TableBody from './complextable/TableBody';
import { useDispatch, useSelector } from 'react-redux';
import { getJobList, resetJobList } from 'server/actions/actions1'; // Update the path accordingly

const columnHelper = createColumnHelper();

export default function ComplexTable() {
  const [sorting, setSorting] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleJobs, setVisibleJobs] = useState(10);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const toast = useToast();
  const dispatch = useDispatch();

  const jobList = useSelector((state) => state.jobList);
  const { loading, error, jobs, success } = jobList;

  const jobDelete = useSelector((state) => state.jobDelete);
  const { success: successDelete} = jobDelete;

  const jobCreate = useSelector((state) => state.jobCreate);
  const { loading: createLoading, error: createError, success: createSuccess } = jobCreate;

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
      cell: (info) => (
        <Flex align='center'>
          <Text color={textColor} fontSize='sm' fontWeight='700'>
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('actual_interview_date', {
      id: 'actual_interview_date',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '10px', lg: '12px' }}
          color='gray.400'>
          Actual Interview Date
        </Text>
      ),
      cell: (info) => (
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
      cell: (info) => (
        <Flex justifyContent="center" alignItems="center">
          <Icon
            as={ExternalLinkIcon}
            color={textColor}
            cursor="pointer"
            onClick={() => window.open(info.getValue(), '_blank', 'noopener,noreferrer')}
          />
        </Flex>
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
      cell: (info) => (
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
      cell: (info) => (
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
      cell: (info) => (
        <Flex justifyContent="center" alignItems="center">
          <CreatePreparationModal jobId={info.row.original.id} />
        </Flex>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getJobList());

    return () => {
      dispatch(resetJobList());
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

    if (success && jobs?.length === 0) {
      toast({
        title: "No Jobs",
        description: "You don't have any jobs on my platform yet.",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    }

    if (createSuccess) {
      dispatch(getJobList());
    }
    if (successDelete) {
      dispatch(getJobList());
    }
  }, [error, loading, jobs, toast, dispatch, createSuccess, successDelete]);

  const filteredData = useMemo(() => {
    return jobs?.filter(job =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.actual_interview_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.job_url.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, visibleJobs);
  }, [jobs, searchQuery, visibleJobs]);

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
    setVisibleJobs(prev => prev + 10);
  };

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
        {loading ? (
          <Flex justifyContent="center" alignItems="center" h="100%">
            <Spinner />
          </Flex>
        ) : (
          <Table variant='simple' color='gray.500' mb='24px' mt="12px">
            <TableHeader headerGroups={table.getHeaderGroups()} borderColor={borderColor} />
            <TableBody rows={table.getRowModel().rows} />
          </Table>
        )}
      </Box>
      {jobs?.length > visibleJobs && (
        <Flex justifyContent="center" mt="4">
          <Button onClick={handleLoadMore}>Load More</Button>
        </Flex>
      )}
    </Card>
  );
}
