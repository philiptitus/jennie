// Chakra Imports
import {
	Avatar,
	Button,
	Flex,
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useColorModeValue,
	useColorMode,
	Spinner,
	useToast,
} from '@chakra-ui/react';
// Custom Components
import { ItemContent } from 'components/menu/ItemContent';
import { SidebarResponsive } from 'components/sidebar/Sidebar';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
// Assets
import { NavLink, useNavigate } from "react-router-dom";

import { MdNotificationsNone } from 'react-icons/md';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import routes from 'routes';

// Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'server/actions/userAction'; // Update with the correct path to your actions

export default function HeaderLinks(props: { secondary: boolean }) {
	const { secondary } = props;
	const { colorMode, toggleColorMode } = useColorMode();
	const navigate = useNavigate(); // Initialize the useNavigate hook
	const dispatch = useDispatch();
	const toast = useToast();

	// Assuming you have a loading and error state in your redux store
	const { loading, error, userInfo } = useSelector((state: RootState) => state.userLogin);

	const filteredRoutes = routes.filter(route => route.layout !== '/auth' && route.path !== '/proom');

	// Chakra Color Mode
	const navbarIcon = useColorModeValue('gray.400', 'white');
	let menuBg = useColorModeValue('white', 'orange.800');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const ethColor = useColorModeValue('gray.700', 'white');
	const ethBg = useColorModeValue('secondaryGray.300', 'orange.900');
	const ethBox = useColorModeValue('white', 'orange.800');
	const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);
	const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');

	// Logout handler function
	const handleLogout = () => {
		dispatch(logout());
	};

	useEffect(() => {
		if (error) {
			toast({
				title: 'Error',
				description: error,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
		if (!userInfo) {
			toast({
				title: 'Success',
				description: 'Logged out successfully',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
			navigate('/auth/sign-in'); // Redirect to the sign-in page
		}
	}, [error, userInfo, navigate, toast]);

	return (
		<Flex
			w={{ sm: '100%', md: 'auto' }}
			alignItems='center'
			flexDirection='row'
			bg={menuBg}
			flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
			p='10px'
			borderRadius='30px'
			boxShadow={shadow}>
			{loading && <Spinner />}
			{/* <SearchBar
				mb={() => {
					if (secondary) {
						return { base: '10px', md: 'unset' };
					}
					return 'unset';
				}}
				me='10px'
				borderRadius='30px'
			/> */}

			<SidebarResponsive routes={filteredRoutes} />
			<Menu>
				<MenuButton p='0px'>
					<Icon mt='6px' as={MdNotificationsNone} color={navbarIcon} w='18px' h='18px' me='10px' />
				</MenuButton>
				<MenuList
					boxShadow={shadow}
					p='20px'
					borderRadius='20px'
					bg={menuBg}
					border='none'
					mt='22px'
					me={{ base: '30px', md: 'unset' }}
					minW={{ base: 'unset', md: '400px', xl: '450px' }}
					maxW={{ base: '360px', md: 'unset' }}>
					<Flex w='100%' mb='20px'>
						<Text fontSize='md' fontWeight='600' color={textColor}>
							Your Notifications
						</Text>
					</Flex>
					<Flex flexDirection='column'>
						<MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} px='0' borderRadius='8px' mb='10px'>
							<ItemContent info='Horizon UI Dashboard PRO' />
						</MenuItem>
						<MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} px='0' borderRadius='8px' mb='10px'>
							<ItemContent info='Horizon Design System Free' />
						</MenuItem>
					</Flex>
				</MenuList>
			</Menu>

			<Button
				variant='no-hover'
				bg='transparent'
				p='0px'
				minW='unset'
				minH='unset'
				h='18px'
				w='max-content'
				onClick={toggleColorMode}>
				<Icon
					me='10px'
					h='18px'
					w='18px'
					color={navbarIcon}
					as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
				/>
			</Button>
			<Menu>
				<MenuButton p='0px'>
					<Avatar
						_hover={{ cursor: 'pointer' }}
						color='white'
						name={userInfo?.name}
						bg='#11047A'
						size='sm'
						w='40px'
						h='40px'
					/>
				</MenuButton>
				<MenuList boxShadow={shadow} p='0px' mt='10px' borderRadius='20px' bg={menuBg} border='none'>
					<Flex w='100%' mb='0px'>
						<Text
							ps='20px'
							pt='16px'
							pb='10px'
							w='100%'
							borderBottom='1px solid'
							borderColor={borderColor}
							fontSize='sm'
							fontWeight='700'
							color={textColor}>
							👋&nbsp; Ola, {userInfo?.username}
						</Text>
					</Flex>
					<Flex flexDirection='column' p='10px'>
						<NavLink to='/admin/profile'>
							<MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius='8px' px='14px'>
								<Text fontSize='sm'>My Profile</Text>
							</MenuItem>
						</NavLink>
						<MenuItem
							_hover={{ bg: 'none' }}
							_focus={{ bg: 'none' }}
							color='red.400'
							borderRadius='8px'
							px='14px'
							onClick={handleLogout}> {/* Attach the logout handler */}
							<Text fontSize='sm'>Log out</Text>
						</MenuItem>
					</Flex>
				</MenuList>
			</Menu>
		</Flex>
	);
}

HeaderLinks.propTypes = {
	variant: PropTypes.string,
	fixed: PropTypes.bool,
	secondary: PropTypes.bool,
	onOpen: PropTypes.func
};