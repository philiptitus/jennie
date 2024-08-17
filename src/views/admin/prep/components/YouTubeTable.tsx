import {
	Box,
	Flex,
	Text,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useColorModeValue,
	Button,
} from '@chakra-ui/react';
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import React, { useState, useMemo } from 'react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import YouTubeEmbed from './YoutubeEmbed'; // Ensure the path is correct

type RowObj = {
	id: number;
	title: string;
	videoUrl: string;
};

const columnHelper = createColumnHelper<RowObj>();

export default function YouTubeTable() {
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	const boxBg = useColorModeValue('gray.50', 'gray.700');

	// Sample data (use useMemo to avoid recreating the data array on every render)
	const data = useMemo<RowObj[]>(
		() => [
			{
				id: 1,
				title: 'Introduction to React',
				videoUrl: 'https://www.youtube.com/embed/dGcsHMXbSOA',
			},
			{
				id: 2,
				title: 'Advanced React Patterns',
				videoUrl: 'https://www.youtube.com/embed/DPnqb74Smug',
			},
			{
				id: 3,
				title: 'Understanding GraphQL',
				videoUrl: 'https://www.youtube.com/embed/ed8SzALpx1Q',
			},
		],
		[]
	);

	// Memoize columns to prevent re-creation
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
				cell: (info: any) => (
					<Flex align='center'>
						<Text color={textColor} fontSize='sm' fontWeight='700'>
							{info.getValue()}
						</Text>
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
		getSortedRowModel: useMemo(() => getSortedRowModel(), []),
		debugTable: true,
	});

	return (
		<Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }} h='auto'>
			<Flex px='25px' mb='8px' justifyContent='space-between' align='center'>
				<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
					YouTube Videos
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
						{table.getRowModel().rows.map((row) => (
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
									<Td colSpan={3} p={0} borderColor='transparent'>
										<Box p='4' bg={boxBg}>
											<YouTubeEmbed embedUrl={row.original.videoUrl} />
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
