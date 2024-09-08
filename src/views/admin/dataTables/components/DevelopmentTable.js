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
  IconButton,
  Tbody,
  Tr,
  Th,
  Thead,
  Td,
  Progress,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table';
import Card from 'components/card/Card';
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPreparationMaterialList, resetPreparationMaterialList } from 'server/actions/actions1'; // Update the path accordingly

const columnHelper = createColumnHelper();

export default function DevelopmentTable() {
  const [sorting, setSorting] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleDataLength, setVisibleDataLength] = useState(10);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const preparationMaterialList = useSelector((state) => state.preparationMaterialList);
  const { loading, error, materials, success } = preparationMaterialList;

  const columns = [
    columnHelper.accessor('title', {
      id: 'title',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '10px', lg: '12px' }}
          color='gray.400'>
          TITLE
        </Text>
      ),
      cell: (info) => {
        const row = info.row.original;
        return (
          <Flex
            align='center'
            onClick={() => navigate(`/admin/proom/${row.id}/`)}
            cursor='pointer'>
            <Text color={textColor} fontSize='sm' fontWeight='700'>
              {info.getValue()}
            </Text>
          </Flex>
        );
      },
    }),
    columnHelper.accessor('completed', {
      id: 'completed',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '10px', lg: '12px' }}
          color='gray.400'>
          COMPLETED
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
      cell: (info) => {
        const score = parseFloat(info.getValue()).toFixed(2);
        return (
          <Flex align='center'>
            <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
              {score}%
            </Text>
            <Progress
              variant='table'
              colorScheme='brandScheme'
              h='8px'
              w='63px'
              value={score}
            />
          </Flex>
        );
      },
    }),
    columnHelper.accessor('ready', {
      id: 'ready',
      header: () => (
        <Text
          justifyContent='space-between'
          align='center'
          fontSize={{ sm: '10px', lg: '12px' }}
          color='gray.400'>
          READY
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize='sm' fontWeight='700'>
          {info.getValue() ? 'Ready' : 'Not Ready'}
        </Text>
      ),
    }),
  ];

  useEffect(() => {
    dispatch(getPreparationMaterialList());

    return () => {
      dispatch(resetPreparationMaterialList());
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

    if (success && materials.length === 0) {
      toast({
        title: "No Materials",
        description: "You don't have any preparation materials yet.",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, loading, materials, toast]);

  const filteredData = useMemo(() => {
    return materials.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, visibleDataLength);
  }, [materials, searchQuery, visibleDataLength]);

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
    setVisibleDataLength(prev => prev + 10);
  };

  return (
    <Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
      <Flex px='25px' mb='8px' justifyContent='space-between' align='center'>
        <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
          Your Prep Resources
        </Text>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <Icon as={SearchIcon} color='gray.300' />
          </InputLeftElement>
          <Input
            type='text'
            placeholder='Search resources...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
      </Flex>
      <Box overflowY='auto'>
        {loading ? (
          <Flex justifyContent="center" alignItems="center" h="100%">
            <Spinner />
          </Flex>
        ) : (
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
                      cursor='pointer'>
                      <Flex
                        justifyContent='space-between'
                        align='center'
                        fontSize={{ sm: '10px', lg: '12px' }}
                        color='gray.400'>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </Flex>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map((row) => (
                <Tr key={row.id}>
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
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
      {materials.length > visibleDataLength && (
        <Flex justifyContent="center" mt="4">
          <IconButton
            icon={<ChevronDownIcon />}
            onClick={handleLoadMore}
            aria-label="Load More"
          />
        </Flex>
      )}
    </Card>
  );
}
