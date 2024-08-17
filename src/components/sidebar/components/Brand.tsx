// Chakra imports
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { HorizonLogo } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('orange.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
			<b><Text>JENNIE</Text></b>
			{/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
