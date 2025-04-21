// Chakra imports
import { Box, Flex, Text, useColorModeValue, Checkbox } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';

// Assets

export default function Conversion(props: { [x: string]: any }) {
	const { ...rest } = props;

	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'orange.700');
	const brandColor = useColorModeValue('brand.500', 'brand.400');
	return (
		<Card p='20px' alignItems='center' flexDirection='column' w='100%' {...rest}>
			<Flex alignItems='center' w='100%' mb='30px'>
				<Box me='12px' w='38px' h='38px' bg={boxBg} display='flex' alignItems='center' justifyContent='center'>
					<svg width="24" height="24" fill={brandColor} viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 14H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
				</Box>

				<Text color={textColor} fontSize='lg' fontWeight='700'>
					Tasks
				</Text>
				<Menu ms='auto' />
			</Flex>
			<Box px='11px'>
				<Flex mb='20px'>
					<Checkbox me='16px' colorScheme='brandScheme' />
					<Flex align='center'>
						<Text color={textColor} fontSize='lg' fontWeight='700'>
							Landing Page Design
						</Text>
						<span style={{ marginLeft: 'auto' }}>
							<svg width="24" height="24" fill="#718096" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
						</span>
					</Flex>
				</Flex>
				<Flex mb='20px'>
					<Checkbox me='16px' defaultChecked colorScheme='brandScheme' />
					<Flex align='center'>
						<Text color={textColor} fontSize='lg' fontWeight='700'>
							Dashboard Builder
						</Text>
						<span style={{ marginLeft: 'auto' }}>
							<svg width="24" height="24" fill="#718096" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
						</span>
					</Flex>
				</Flex>
				<Flex mb='20px'>
					<Checkbox defaultChecked me='16px' colorScheme='brandScheme' />
					<Flex align='center'>
						<Text color={textColor} fontSize='lg' fontWeight='700'>
							Mobile App Design
						</Text>
						<span style={{ marginLeft: 'auto' }}>
							<svg width="24" height="24" fill="#718096" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
						</span>
					</Flex>
				</Flex>
				<Flex mb='20px'>
					<Checkbox me='16px' colorScheme='brandScheme' />
					<Flex align='center'>
						<Text color={textColor} fontSize='lg' fontWeight='700'>
							Illustrations
						</Text>
						<span style={{ marginLeft: 'auto' }}>
							<svg width="24" height="24" fill="#718096" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
						</span>
					</Flex>
				</Flex>
				<Flex mb='20px'>
					<Checkbox defaultChecked me='16px' colorScheme='brandScheme' />
					<Flex align='center'>
						<Text color={textColor} fontSize='lg' fontWeight='700'>
							Promotional LP
						</Text>
						<span style={{ marginLeft: 'auto' }}>
							<svg width="24" height="24" fill="#718096" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
						</span>
					</Flex>
				</Flex>
			</Box>
		</Card>
	);
}
