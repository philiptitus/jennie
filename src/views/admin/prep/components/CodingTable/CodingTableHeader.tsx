//CodingTable
import { Flex, Text, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';

const CodingTableHeader = () => {
	const textColor = useColorModeValue('secondaryGray.900', 'white');

	return (
		<Flex px='25px' mb='8px' justifyContent='space-between' align='center'>
			<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
				Coding Questions
			</Text>
			<Menu>
				<MenuButton>Menu</MenuButton>
				<MenuList>
					<MenuItem>Option 1</MenuItem>
					<MenuItem>Option 2</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	);
};

export default CodingTableHeader;
