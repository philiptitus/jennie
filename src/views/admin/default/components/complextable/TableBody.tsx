//complex Table

import React from 'react';
import { Tbody, Tr, Td } from '@chakra-ui/react';
import { flexRender, Row } from '@tanstack/react-table';

type RowObj = {
  id: string;
  title: string;
  description: string;
  actual_interview_date: string;
  job_url: string;
};

interface TableBodyProps {
  rows: Row<RowObj>[];
}

const TableBody: React.FC<TableBodyProps> = ({ rows }) => {
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

export default TableBody;
