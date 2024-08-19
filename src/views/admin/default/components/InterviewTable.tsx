import {
	Box,
	Flex,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useColorModeValue,
	Checkbox,
	Input,
	InputGroup,
	InputLeftElement,
	Icon
} from '@chakra-ui/react';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table';
import * as React from 'react';
import ChangeTime from './ChangeTime';
import DeleteInterviewModal from './DeleteInterview';
import StartSessionModal from './StartSession';
import { SearchIcon } from '@chakra-ui/icons';

// Define the RowObj type for the interview data
type InterviewObj = {
	id: number;
	job_name: string;
	interview_datetime: string;
	passed: boolean;
};

const columnHelper = createColumnHelper<InterviewObj>();

// Example fake data for interviews with IDs
const fakeInterviewsData: InterviewObj[] = [
	{
		id: 1,
		job_name: 'Software Engineer',
		interview_datetime: '2024-08-20 10:00 AM',
		passed: true
	},
	{
		id: 2,
		job_name: 'Product Manager',
		interview_datetime: '2024-09-01 02:00 PM',
		passed: false
	},
	{
		id: 3,
		job_name: 'Data Analyst',
		interview_datetime: '2024-08-25 11:30 AM',
		passed: true
	}
];

export default function InterviewTable() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [searchQuery, setSearchQuery] = React.useState('');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

	const columns = [
		columnHelper.accessor('job_name', {
			id: 'job_name',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Job Name
				</Text>
			),
			cell: (info: any) => (
				<Flex align='center'>
					<Text color={textColor} fontSize='sm' fontWeight='700'>
						{info.getValue()}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('interview_datetime', {
			id: 'interview_datetime',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Interview Date & Time
				</Text>
			),
			cell: (info: any) => (
				<Text color={textColor} fontSize='sm'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('passed', {
			id: 'passed',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Passed
				</Text>
			),
			cell: (info: any) => (
				<Checkbox isChecked={info.getValue()} isReadOnly />
			)
		}),
		columnHelper.display({
			id: 'change_time',
			header: () => null, // No header for this column
			cell: (info: any) => (
				<ChangeTime interviewId={info.row.original.id} />
			),
		}),
		columnHelper.display({
			id: 'delete_interview',
			header: () => null, // No header for this column
			cell: (info: any) => (
				<DeleteInterviewModal interviewId={info.row.original.id} />
			),
		}),
		columnHelper.display({
			id: 'start_session',
			header: () => null, // No header for this column
			cell: (info: any) => (
				<StartSessionModal interviewId={info.row.original.id} />
			),
		}),
	];

	const [data, setData] = React.useState(() => [...fakeInterviewsData]);

	const filteredData = React.useMemo(() => {
		return data.filter(interview =>
			interview.job_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			interview.interview_datetime.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}, [data, searchQuery]);

	const table = useReactTable({
		data: filteredData,
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
		<Box
			flexDirection='column'
			w='100%'
			h='400px' // Set a fixed height
			overflowY='auto' // Enable vertical scrolling
			px='0px'>
			<Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
				<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
					All your Interviews
				</Text>
				<InputGroup>
					<InputLeftElement pointerEvents='none'>
						<Icon as={SearchIcon} color='gray.300' />
					</InputLeftElement>
					<Input
						type='text'
						placeholder='Search interviews...'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</InputGroup>
			</Flex>
			<Box>
				<Table variant='simple' color='gray.500' mb='24px' mt="12px">
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
		</Box>
	);
}
