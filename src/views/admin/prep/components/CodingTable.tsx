import { Box, Card, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, useToast, Progress } from '@chakra-ui/react';
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import React, { useState, useMemo, useCallback } from 'react';
import CodingTableHeader from './CodingTable/CodingTableHeader';
import CodingTableRow from './CodingTable/CodingTableRow';

type RowObj = {
	id: number;
	question: string;
	answer: string;
	my_answer: string;
	language: string;
	attempted: boolean;
	score: number;
};

const columnHelper = createColumnHelper<RowObj>();

export default function CodingTable() {
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	const [showAnswer, setShowAnswer] = useState<{ [key: number]: boolean }>({});
	const [answers, setAnswers] = useState<{ [key: number]: string }>({});
	const [languages, setLanguages] = useState<{ [key: number]: string }>({});
	const [submitted, setSubmitted] = useState<{ [key: number]: boolean }>({});
	const [viewedAnswer, setViewedAnswer] = useState<{ [key: number]: boolean }>({});
	const toast = useToast();

	const data = useMemo<RowObj[]>(
		() => [
			{
				id: 1,
				question: 'Write a function to reverse a string in Python.',
				answer: 'def reverse_string(s):\n    return s[::-1]',
				my_answer: '',
				language: 'Python',
				attempted: false,
				score: 0,
			},
			{
				id: 2,
				question: 'Implement a binary search algorithm in JavaScript.',
				answer: 'function binarySearch(arr, x) {\n    let start = 0, end = arr.length - 1;\n    while (start <= end) {\n        let mid = Math.floor((start + end) / 2);\n        if (arr[mid] === x) return mid;\n        else if (arr[mid] < x) start = mid + 1;\n        else end = mid - 1;\n    }\n    return -1;\n}',
				my_answer: '',
				language: 'JavaScript',
				attempted: false,
				score: 0,
			},
			{
				id: 3,
				question: 'Write a program to find the factorial of a number in Java.',
				answer: 'public class Factorial {\n    public static int factorial(int n) {\n        if (n == 0) return 1;\n        return n * factorial(n - 1);\n    }\n    public static void main(String[] args) {\n        System.out.println(factorial(5));\n    }\n}',
				my_answer: '',
				language: 'Java',
				attempted: false,
				score: 0,
			},
		],
		[]
	);

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
			columnHelper.accessor('language', {
				id: 'language',
				header: () => (
					<Text
						justifyContent='space-between'
						align='center'
						fontSize={{ sm: '10px', lg: '12px' }}
						color='gray.400'>
						LANGUAGE
					</Text>
				),
				cell: (info: any) => (
					<Text color={textColor} fontSize='sm' fontWeight='700'>
						{info.getValue()}
					</Text>
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

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: useMemo(() => getSortedRowModel(), []),
		debugTable: true,
	});

	return (
		<Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }} h='auto'>
			<CodingTableHeader />
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
							<CodingTableRow
								key={row.id}
								row={row}
								showAnswer={showAnswer}
								setShowAnswer={setShowAnswer}
								answers={answers}
								setAnswers={setAnswers}
								languages={languages}
								setLanguages={setLanguages}
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
