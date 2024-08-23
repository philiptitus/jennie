//INterviewTable
import React from 'react';
import { Flex, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import { flexRender, Header, HeaderGroup } from '@tanstack/react-table';

type InterviewObj = {
  id: number;
  job_name: string;
  interview_datetime: string;
  passed: boolean;
};

interface InterviewTableHeaderProps {
  headerGroups: HeaderGroup<InterviewObj>[];
  borderColor: string;
}

const InterviewTableHeader: React.FC<InterviewTableHeaderProps> = ({ headerGroups, borderColor }) => {
  return (
    <Thead>
      {headerGroups.map((headerGroup) => (
        <Tr key={headerGroup.id}>
          {headerGroup.headers.map((header: Header<InterviewObj, unknown>) => (
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

export default InterviewTableHeader;
