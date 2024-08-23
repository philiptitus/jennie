import { Box, Card, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, useToast, Progress } from '@chakra-ui/react';
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import React, { useState, useMemo, useCallback } from 'react';
import ComplexTableHeader from './DevelopmentTable/ComplexTableHeader';
import ComplexTableRow from './DevelopmentTable/ComplexTableRow';
import { data } from 'views/admin/marketplace/components/data';

type RowObj = {
	id: number;
	question: string;
	answer: string;
	my_answer: string;
	attempted: boolean;
	score: number;
};

const columnHelper = createColumnHelper<RowObj>();

export default function ComplexTable() {
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	const [showAnswer, setShowAnswer] = useState<{ [key: number]: boolean }>({});
	const [answers, setAnswers] = useState<{ [key: number]: string }>({});
	const [submitted, setSubmitted] = useState<{ [key: number]: boolean }>({});
	const [viewedAnswer, setViewedAnswer] = useState<{ [key: number]: boolean }>({});
	const toast = useToast();

	// Memoize columns to prevent re-creation
	const columns = useMemo(
		() => [
			columnHelper.accessor('question', {
				id: 'question',
				header: () => (
					<Text
						justifyContent='space-between'
						align='center'
						fontSize={{ sm: '10px', lg: '12px' }}
						color='gray.400'>
						QUESTION
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
			columnHelper.accessor('attempted', {
				id: 'attempted',
				header: () => (
					<Text
						justifyContent='space-between'
						align='center'
						fontSize={{ sm: '10px', lg: '12px' }}
						color='gray.400'>
						ATTEMPTED
					</Text>
				),
				cell: (info: any) => (
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
				cell: (info: any) => (
					<Flex align='center'>
						<Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
							{info.getValue()}%
						</Text>
						<Progress variant='table' colorScheme='brandScheme' h='8px' w='63px' value={info.getValue()} />
					</Flex>
				),
			}),
		],
		[textColor]
	);

	const [sorting, setSorting] = useState<SortingState>([]);

	// Use useReactTable hook with optimized settings
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: useMemo(() => getSortedRowModel(), []), // Memoize to avoid re-calculations
		debugTable: true,
	});

	return (
		<Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }} h='auto'>
			<ComplexTableHeader />
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
										cursor='pointer'
										onClick={header.column.getToggleSortingHandler()}>
										<Flex
											justifyContent='space-between'
											align='center'
											fontSize={{ sm: '10px', lg: '12px' }}
											color='gray.400'>
											{flexRender(header.column.columnDef.header, header.getContext())}
											{{ asc: '', desc: '' }[header.column.getIsSorted() as string] ?? null}
										</Flex>
									</Th>
								))}
							</Tr>
						))}
					</Thead>
					<Tbody>
						{table.getRowModel().rows.slice(0, 11).map((row) => (
							<ComplexTableRow
								key={row.id}
								row={row}
								showAnswer={showAnswer}
								setShowAnswer={setShowAnswer}
								answers={answers}
								setAnswers={setAnswers}
								submitted={submitted}
								setSubmitted={setSubmitted}
								viewedAnswer={viewedAnswer}
								setViewedAnswer={setViewedAnswer}
							/>
						))}
					</Tbody>
				</Table>
			</Box>
		</Card>
	);
}
