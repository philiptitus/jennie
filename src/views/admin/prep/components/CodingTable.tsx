import {
	Box,
	Flex,
	IconButton,
	Input,
	Progress,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useColorModeValue,
	Button,
	Textarea,
	Select,
	useToast,
} from '@chakra-ui/react';
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { ViewIcon } from '@chakra-ui/icons';
import React, { useState, useMemo, useCallback } from 'react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import CodeEditorModal from './CodeEditor';

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
	const boxBg = useColorModeValue('gray.50', 'gray.700');
	const [showAnswer, setShowAnswer] = useState<{ [key: number]: boolean }>({});
	const [answers, setAnswers] = useState<{ [key: number]: string }>({});
	const [languages, setLanguages] = useState<{ [key: number]: string }>({});
	const [submitted, setSubmitted] = useState<{ [key: number]: boolean }>({});
	const [viewedAnswer, setViewedAnswer] = useState<{ [key: number]: boolean }>({});
	const toast = useToast();

	// Sample data (use useMemo to avoid recreating the data array on every render)
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

	const toggleAnswerVisibility = useCallback((id: number) => {
		setShowAnswer((prev) => ({ ...prev, [id]: !prev[id] }));
		setViewedAnswer((prev) => ({ ...prev, [id]: true }));
		toast({
			title: 'Info',
			description: 'You have viewed the correct answer. You cannot submit an answer now.',
			status: 'info',
			duration: 3000,
			isClosable: true,
		});
	}, [toast]);

	const handleAnswerChange = useCallback((id: number, value: string) => {
		setAnswers((prev) => ({ ...prev, [id]: value }));
	}, []);

	const handleLanguageChange = useCallback((id: number, value: string) => {
		setLanguages((prev) => ({ ...prev, [id]: value }));
	}, []);

	const handleSubmitAnswer = useCallback((id: number) => {
		if (!answers[id]) {
			toast({
				title: 'Error',
				description: 'Please enter an answer before submitting.',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
			return;
		}
		if (submitted[id]) {
			toast({
				title: 'Info',
				description: 'This answer has already been submitted.',
				status: 'info',
				duration: 3000,
				isClosable: true,
			});
			return;
		}
		if (viewedAnswer[id]) {
			toast({
				title: 'Error',
				description: 'You cannot submit an answer after viewing the correct answer.',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
			return;
		}
		// Handle the submission of the answer here
		console.log(`Submitted answer for question ${id}:`, answers[id]);
		setSubmitted((prev) => ({ ...prev, [id]: true }));
	}, [answers, submitted, viewedAnswer, toast]);

	return (
		<Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }} h='auto'>
			<Flex px='25px' mb='8px' justifyContent='space-between' align='center'>
				<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
					Coding Questions
				</Text>
				<Menu />
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
							<React.Fragment key={row.id}>
								<Tr>
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
								<Tr>
									<Td colSpan={4} p={0} borderColor='transparent'>
										<Box p='4' bg={boxBg}>
											<Text fontSize='lg' fontWeight='bold' mb='4'>
												{row.original.question}
											</Text>
											<Select
												placeholder='Select Language'
												value={languages[row.original.id] || row.original.language}
												onChange={(e) => handleLanguageChange(row.original.id, e.target.value)}
												mb='4'>
												<option value='Python'>Python</option>
												<option value='JavaScript'>JavaScript</option>
												<option value='Java'>Java</option>
											</Select>
											<Textarea
												placeholder='Your Answer'
												value={answers[row.original.id] || ''}
												onChange={(e) => handleAnswerChange(row.original.id, e.target.value)}
												mb='4'
												resize='vertical'
												minH='100px'
											/>
											<CodeEditorModal />
											<Button
												colorScheme='teal'
												size='sm'
												onClick={() => handleSubmitAnswer(row.original.id)}
												mb='4'
												disabled={!answers[row.original.id] || submitted[row.original.id] || viewedAnswer[row.original.id]}
												_disabled={{ bg: 'gray.300', color: 'gray.500', cursor: 'not-allowed' }}>
												Send
											</Button>
											<Flex align='center' mb='4'>
												<Text fontSize='lg' fontWeight='bold' me='2'>
													Correct Answer:
												</Text>
												<IconButton
													icon={<ViewIcon />}
													aria-label='Show Answer'
													onClick={() => toggleAnswerVisibility(row.original.id)}
													size='sm'
												/>
											</Flex>
											<Text
												className={showAnswer[row.original.id] ? '' : 'blur'}
												style={{
													filter: showAnswer[row.original.id] ? 'none' : 'blur(5px)',
												}}>
												{row.original.answer}
											</Text>
											<Text mt='4'>Attempted: {row.original.attempted ? 'Yes' : 'No'}</Text>
											<Text mt='2'>Score: {row.original.score}%</Text>
										</Box>
									</Td>
								</Tr>
							</React.Fragment>
						))}
					</Tbody>
				</Table>
			</Box>
		</Card>
	);
}
