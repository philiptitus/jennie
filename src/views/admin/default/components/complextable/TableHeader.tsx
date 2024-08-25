//complex Table
import React from 'react';
import { Flex, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import { flexRender, Header, HeaderGroup } from '@tanstack/react-table';

type RowObj = {
  id: string;
  title: string;
  description: string;
  actual_interview_date: string;
  job_url: string;
};

interface TableHeaderProps {
  headerGroups: HeaderGroup<RowObj>[];
  borderColor: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({ headerGroups, borderColor }) => {
  return (
    <Thead>
      {headerGroups.map((headerGroup) => (
        <Tr key={headerGroup.id}>
          {headerGroup.headers.map((header: Header<RowObj, unknown>) => (
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
                {{
                  asc: '',
                  desc: '',
                }[header.column.getIsSorted() as string] ?? null}
              </Flex>
            </Th>
          ))}
        </Tr>
      ))}
    </Thead>
  );
};

export default TableHeader;
