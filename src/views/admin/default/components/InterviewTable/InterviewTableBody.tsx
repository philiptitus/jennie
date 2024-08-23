//INterview Table
import React from 'react';
import { Tbody, Tr, Td } from '@chakra-ui/react';
import { flexRender, Row } from '@tanstack/react-table';

type InterviewObj = {
  id: number;
  job_name: string;
  interview_datetime: string;
  passed: boolean;
};

interface InterviewTableBodyProps {
  rows: Row<InterviewObj>[];
}

const InterviewTableBody: React.FC<InterviewTableBodyProps> = ({ rows }) => {
  return (
    <Tbody>
      {rows.map((row) => (
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
  );
};

export default InterviewTableBody;
