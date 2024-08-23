//TableTopCreators

import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import {
  Table, Tbody, Td, Text, Th, Thead, Tr,
  useColorModeValue, Avatar, Progress
} from '@chakra-ui/react';
import {
  createColumnHelper, flexRender, getCoreRowModel,
  getSortedRowModel, SortingState, useReactTable
} from '@tanstack/react-table';

type RowObj = {
  name: string[];
  artworks: number;
  rating: number;
};

export function CreatorTable({ data }: { data: any[] }) {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const columnHelper = createColumnHelper<RowObj>();

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

  const [sorting, setSorting] = React.useState<SortingState>([]);
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
    <Table>
      <Thead>
        {table.getHeaderGroups().map(headerGroup => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <Th key={header.id}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map(row => (
          <Tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <Td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
