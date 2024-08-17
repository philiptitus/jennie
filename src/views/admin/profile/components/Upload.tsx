// Chakra imports
import { Box, Button, Flex, Icon, Text, Input, Textarea, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
// Assets
import { MdUpload } from 'react-icons/md';
import Dropzone from 'views/admin/profile/components/Dropzone';

export default function Upload(props: { used?: number; total?: number; [x: string]: any }) {
	const { used, total, ...rest } = props;
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'white');
	const textColorSecondary = 'gray.400';

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
				<Dropzone
					w={{ base: '100%', '2xl': '268px' }}
					me='36px'
					h='auto'
					minH={{ base: '200px', '2xl': 'auto' }}
					content={
						<Box>
							<Icon as={MdUpload} w='80px' h='80px' color={brandColor} />
							<Flex justify='center' mx='auto' mb='12px'>
								<Text fontSize='xl' fontWeight='700' color={brandColor}>
									Change your Profile Picture
								</Text>
							</Flex>
							<Text fontSize='sm' fontWeight='500' color='secondaryGray.500'>
								PNG, JPG, and GIF files are allowed
							</Text>
						</Box>
					}
				/>
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
					/>

					{/* Bio Field */}
					<Text color={textColorPrimary} fontWeight='bold' mb='8px'>
						Bio
					</Text>
					<Textarea
						placeholder='Tell us about yourself'
						mb='20px'
						variant='filled'
						bg={useColorModeValue('gray.100', 'gray.700')}
					/>

					{/* Update Button */}
					<Flex w='100%' justifyContent={{ base: 'center', '2xl': 'flex-start' }}>
						<Button
							w='140px'
							minW='140px'
							mt={{ base: '20px', '2xl': 'auto' }}
							fontWeight='500'>
							Update
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
}
