import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Icon, Text, Input, Textarea, useColorModeValue, useToast, Spinner } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
// Assets
import { MdUpload } from 'react-icons/md';
import Dropzone from 'views/admin/profile/components/Dropzone';

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "server/actions/userAction";
import { useNavigate } from "react-router-dom";

export default function Upload(props: { used?: number; total?: number; [x: string]: any }) {
	const { used, total, ...rest } = props;
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'white');
	const textColorSecondary = 'gray.400';

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const toast = useToast();
	const navigate = useNavigate();

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { error, loading, success } = userUpdateProfile;

	const handleSubmit = () => {
		const user = { username, email, password };
		dispatch(updateUserProfile(user));
	};

	useEffect(() => {
		if (success) {
			toast({
				title: "Profile Updated",
				description: "Your profile has been updated successfully.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			// Redirect or perform other actions if needed
		}

		if (error) {
			toast({
				title: "Error",
				description: error,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	}, [success, error, toast]);

	return (
		<Card {...rest} mb='20px' alignItems='center' p='20px' w='100%' h='auto'>
			<Text
				color={textColorPrimary}
				fontWeight='bold'
				textAlign='start'
				fontSize='2xl'
				mt={{ base: '20px', '2xl': '50px' }}>
				Update your profile
			</Text>
			<Flex direction={{ base: 'column', '2xl': 'row' }} w='100%' h='auto'>

				<Flex direction='column' flex='1' pe='44px'>
					{/* Username Field */}
					<Text color={textColorPrimary} fontWeight='bold' mb='8px' mt='20px'>
						Username
					</Text>
					<Input
						placeholder='Enter your new username'
						mb='20px'
						variant='filled'
						bg={useColorModeValue('gray.100', 'gray.700')}
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>

					{/* Email Field */}
					<Text color={textColorPrimary} fontWeight='bold' mb='8px'>
						Email
					</Text>
					<Input
						placeholder='Enter your new email'
						mb='20px'
						variant='filled'
						bg={useColorModeValue('gray.100', 'gray.700')}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					{/* Password Field */}
					<Text color={textColorPrimary} fontWeight='bold' mb='8px'>
						Password
					</Text>
					<Input
						placeholder='Enter your new password'
						type='password'
						mb='20px'
						variant='filled'
						bg={useColorModeValue('gray.100', 'gray.700')}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					{/* Bio Field */}


					{/* Update Button */}
					<Flex w='100%' justifyContent={{ base: 'center', '2xl': 'flex-start' }}>
						<Button
							w='140px'
							minW='140px'
							mt={{ base: '20px', '2xl': 'auto' }}
							fontWeight='500'
							onClick={handleSubmit}
							isLoading={loading}>
							{loading ? <Spinner /> : "Update"}
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
}
