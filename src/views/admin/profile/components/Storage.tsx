// Chakra imports
import { Box, Flex, Icon, Progress, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import IconBox from 'components/icons/IconBox';
import Menu from 'components/menu/MainMenu';
import React from 'react';
// Assets
import { MdOutlineCloudDone } from 'react-icons/md';
import Credits from './Credits';

export default function Banner(props: { used: number; total: number; [x: string]: any }) {
	const { used, total } = props;
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'white');
	const textColorSecondary = 'gray.400';
	const box = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	return (
		<Card mb={{ base: '0px', lg: '20px' }} alignItems='center'>
			<Flex w='100%'>
				<Menu ms='auto' />
			</Flex>
			<Flex w='100%'>
				<Credits  />
			</Flex>
			<IconBox
				mx='auto'
				h='100px'
				w='100px'
				icon={
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <svg width="46" height="46" fill={brandColor} viewBox="0 0 24 24"><path d="M12 17c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V7c0-3.31-2.69-6-6-6S6 3.69 6 7v4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2zm-6-9c2.21 0 4 1.79 4 4v4H8V7c0-2.21 1.79-4 4-4zm6 17c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v6z"/></svg>
          </span>
        }
				bg={box}
			/>
			<Text color={textColorPrimary} fontWeight='bold' fontSize='2xl' mt='10px'>
				Your Credits Usage
			</Text>
			<Text color={textColorSecondary} fontSize='md' maxW={{ base: '100%', xl: '80%', '3xl': '60%' }} mx='auto'>
Take note of how much of your free credits have been used up			
</Text>
			<Box w='100%' mt='auto'>
				<Flex w='100%' justify='space-between' mb='10px'>
					<Text color={textColorSecondary} fontSize='sm' maxW='40%'>
						{used} credits
					</Text>
					<Text color={textColorSecondary} fontSize='sm' maxW='40%'>
						{total} credits
					</Text>
				</Flex>
				<Progress alignItems='start' colorScheme='brandScheme' value={used / total * 100} w='100%' />
			</Box>
		</Card>
	);
}
