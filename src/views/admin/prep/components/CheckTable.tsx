import React from 'react';
import {
	Box,
	Flex,
	IconButton,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useColorModeValue,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';

type GoogleSearchResult = {
	id: number;
	title: string;
	snippet: string;
	link: string;
	attempted: boolean;
};

const data: GoogleSearchResult[] = [
	{
		id: 1,
		title: 'How to Learn React',
		snippet: 'A comprehensive guide to learning React.js from scratch.',
		link: 'https://example.com/how-to-learn-react',
		attempted: false,
	},
	{
		id: 2,
		title: 'Understanding JavaScript Promises',
		snippet: 'An in-depth look at how JavaScript promises work and how to use them effectively.',
		link: 'https://example.com/javascript-promises',
		attempted: true,
	},
	{
		id: 3,
		title: 'CSS Grid Layout',
		snippet: "A beginner's guide to mastering CSS Grid Layout.",
		link: 'https://example.com/css-grid-layout',
		attempted: false,
	},
	{
		id: 4,
		title: 'Mastering Python for Data Science',
		snippet: 'Learn Python with a focus on data science applications.',
		link: 'https://example.com/python-data-science',
		attempted: false,
	},
	{
		id: 5,
		title: 'Django REST Framework Tutorial',
		snippet: 'Step-by-step tutorial on building APIs with Django REST Framework.',
		link: 'https://example.com/django-rest-framework',
		attempted: true,
	},
];

export default function CheckTable() {
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

	return (
		<Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: 'scroll', lg: 'hidden' }} h="auto">
			<Flex px="25px" mb="8px" justifyContent="space-between" align="center">
				<Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
					Some useful links for you
				</Text>
				<Menu />
			</Flex>
			<Box overflowY="auto">
				<Table variant="simple" color="gray.500" mb="24px" mt="12px">
					<Thead>
						<Tr>
							<Th borderColor={borderColor}>
								<Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
									TITLE
								</Text>
							</Th>
							<Th borderColor={borderColor}>
								<Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
									ACTION
								</Text>
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{data.map((result) => (
							<Tr key={result.id}>
								<Td borderColor="transparent">
									<Text color={textColor} fontSize="sm" fontWeight="700">
										{result.title}
									</Text>
								</Td>
								<Td borderColor="transparent">
									<IconButton
										icon={<ExternalLinkIcon />}
										aria-label="Open Link"
										onClick={() => window.open(result.link, '_blank')}
										size="sm"
									/>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</Box>
		</Card>
	);
}
