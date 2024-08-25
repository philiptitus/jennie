import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import { createColumnHelper, flexRender, useReactTable } from '@tanstack/react-table';
import Card from 'components/card/Card';
import { getCoreRowModel } from '@tanstack/react-table';
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Prepdata } from 'views/admin/marketplace/components/data';



type RowObj = {
  id: number;
  title: string;
  completed: boolean;
  score: number;
  ready: boolean;
};

const columnHelper = createColumnHelper<RowObj>();

export default function DevelopmentTable() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleDataLength, setVisibleDataLength] = useState(10);

  // Define columns
  const columns = useMemo(
    () => [
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
        cell: (info) => (
          <Flex align='center'>
            <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
              {info.getValue()}%
            </Text>
            <Progress
              variant='table'
              colorScheme='brandScheme'
              h='8px'
              w='63px'
              value={info.getValue()}
            />
          </Flex>
        ),
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
    ],
    [navigate, textColor]
  );

  const filteredData = useMemo(() => {
    return Prepdata.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, visibleDataLength);
  }, [searchQuery, visibleDataLength]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleLoadMore = () => {
    setVisibleDataLength(prev => prev + 10);
  };

  return (
    <Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }} h='auto'>
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
      </Box>
      {Prepdata.length > visibleDataLength && (
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
