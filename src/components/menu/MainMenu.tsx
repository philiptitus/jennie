import React from 'react';

// Chakra imports
import {
	Flex,
	Text,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useDisclosure,
	useColorModeValue
} from '@chakra-ui/react';

export default function Banner(props: { [x: string]: any }) {
	const { ...rest } = props;

	const textColor = useColorModeValue('secondaryGray.500', 'white');
	const textHover = useColorModeValue(
		{ color: 'secondaryGray.900', bg: 'unset' },
		{ color: 'secondaryGray.500', bg: 'unset' }
	);
	const iconColor = useColorModeValue('brand.500', 'white');
	const bgList = useColorModeValue('white', 'whiteAlpha.100');
	const bgShadow = useColorModeValue('14px 17px 40px 4px rgba(112, 144, 176, 0.08)', 'unset');
	const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
	const bgFocus = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.100' });

	// Ellipsis modals
	const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();

	return (
		<Menu isOpen={isOpen1} onClose={onClose1}>
			<MenuButton
				alignItems='center'
				justifyContent='center'
				bg={bgButton}
				_hover={bgHover}
				_focus={bgFocus}
				_active={bgFocus}
				w='37px'
				h='37px'
				lineHeight='100%'
				onClick={onOpen1}
				borderRadius='10px'
				{...rest}>
				<span style={{ display: 'flex', alignItems: 'center' }}>
					<svg width="24" height="24" fill={iconColor} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
				</span>
			</MenuButton>
			<MenuList
				w='250px'
				minW='unset'
				maxW='250px !important'
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
					}}>
					<Flex align='center'>
						<span style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
							<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V7c0-3.31-2.69-6-6-6S6 3.69 6 7v4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2zm-6-9c2.21 0 4 1.79 4 4v4H8V7c0-2.21 1.79-4 4-4zm6 17c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v6z"/></svg>
						</span>
						<Text fontSize='sm' fontWeight='400'>
							You are currently on a free trial account. For full access, please reach out for more information.
						</Text>
					</Flex>
				</MenuItem>
			</MenuList>
		</Menu>
	);
}
