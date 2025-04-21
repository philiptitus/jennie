import React from 'react';

// Chakra imports
import {
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useDisclosure,
	useColorModeValue,
	Flex,
	Text
} from '@chakra-ui/react';

export default function Banner(props: { icon: JSX.Element | string; [x: string]: any }) {
	const { icon, ...rest } = props;

	// Ellipsis modals
	const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();

	// Chakra color mode

	const textColor = useColorModeValue('secondaryGray.500', 'white');
	const textHover = useColorModeValue(
		{ color: 'secondaryGray.900', bg: 'unset' },
		{ color: 'secondaryGray.500', bg: 'unset' }
	);
	const bgList = useColorModeValue('white', 'whiteAlpha.100');
	const bgShadow = useColorModeValue('14px 17px 40px 4px rgba(112, 144, 176, 0.08)', 'unset');

	return (
		<Menu isOpen={isOpen1} onClose={onClose1}>
			<MenuButton {...rest} onClick={onOpen1}>
				{icon}
			</MenuButton>
			<MenuList
				w='150px'
				minW='unset'
				maxW='150px !important'
				border='transparent'
				backdropFilter='blur(63px)'
				bg={bgList}
				boxShadow={bgShadow}
				borderRadius='20px'
				p='15px'>
				<MenuItem
					transition='0.2s linear'
					color={textColor}
					_hover={textHover}
					p='0px'
					borderRadius='8px'
					_active={{
						bg: 'transparent'
					}}
					_focus={{
						bg: 'transparent'
					}}
					mb='10px'>
					<Flex align='center'>
						<span style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
							<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V7c0-3.31-2.69-6-6-6S6 3.69 6 7v4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2zm-6-9c2.21 0 4 1.79 4 4v4H8V7c0-2.21 1.79-4 4-4zm6 17c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v6z"/></svg>
						</span>
						<Text fontSize='sm' fontWeight='400'>
							Panel 1
						</Text>
					</Flex>
				</MenuItem>
				<MenuItem
					transition='0.2s linear'
					p='0px'
					borderRadius='8px'
					color={textColor}
					_hover={textHover}
					_active={{
						bg: 'transparent'
					}}
					_focus={{
						bg: 'transparent'
					}}
					mb='10px'>
					<Flex align='center'>
						<span style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
							<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
						</span>
						<Text fontSize='sm' fontWeight='400'>
							Panel 2
						</Text>
					</Flex>
				</MenuItem>
				<MenuItem
					transition='0.2s linear'
					p='0px'
					borderRadius='8px'
					color={textColor}
					_hover={textHover}
					_active={{
						bg: 'transparent'
					}}
					_focus={{
						bg: 'transparent'
					}}
					mb='10px'>
					<Flex align='center'>
						<span style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
							<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
						</span>
						<Text fontSize='sm' fontWeight='400'>
							Panel 3
						</Text>
					</Flex>
				</MenuItem>
				<MenuItem
					transition='0.2s linear'
					color={textColor}
					_hover={textHover}
					p='0px'
					borderRadius='8px'
					_active={{
						bg: 'transparent'
					}}
					_focus={{
						bg: 'transparent'
					}}>
					<Flex align='center'>
						<span style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
							<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 00-7.07 17.07A10 10 0 1012 2zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-7h2v2h-2v-2zm0-8h2v6h-2V5z"/></svg>
						</span>
						<Text fontSize='sm' fontWeight='400'>
							Panel 4
						</Text>
					</Flex>
				</MenuItem>
			</MenuList>
		</Menu>
	);
}
