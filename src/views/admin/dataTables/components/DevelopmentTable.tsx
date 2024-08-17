import React, { useMemo } from 'react';
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
} from '@chakra-ui/react';
import { createColumnHelper, flexRender, useReactTable } from '@tanstack/react-table';
import Card from 'components/card/Card';
import { getCoreRowModel } from '@tanstack/react-table';

type RowObj = {
	id: number;
	title: string;
	completed: boolean;
	score: number;
};

const columnHelper = createColumnHelper<RowObj>();

export default function DevelopmentTable() {
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	const navigate = useNavigate();

	// Data for the table
	const data = useMemo<RowObj[]>(
		() => [
			{ id: 1, title: 'React Basics', completed: true, score: 85.5 },
			{ id: 2, title: 'Django REST Framework', completed: false, score: 70.0 },
			{ id: 3, title: 'GraphQL with Apollo', completed: true, score: 92.0 },
		],
		[]
	);

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
				cell: (info) => (
					<Flex
						align='center'
						onClick={() => navigate(`/admin/proom/`)}
						cursor='pointer'>
						<Text color={textColor} fontSize='sm' fontWeight='700'>
							{info.getValue()}
						</Text>
					</Flex>
				),
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
		],
		[navigate, textColor]
	);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }} h='auto'>
			<Flex px='25px' mb='8px' justifyContent='space-between' align='center'>
				<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
					Your Prep Resources
				</Text>
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
		</Card>
	);
}
