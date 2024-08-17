// Chakra imports
import { Flex, Text, Button, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
// Custom components
import SwitchField from 'components/fields/SwitchField';
import Menu from 'components/menu/MainMenu';

export default function Notifications(props: { [x: string]: any }) {
	const { ...rest } = props;
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

	return (
		<Card mb='20px' {...rest}>
			<Flex align='center' w='100%' justify='space-between' mb='30px'>
				<Text color={textColorPrimary} fontWeight='bold' fontSize='2xl' mb='4px'>
					Close Account
				</Text>
			</Flex>
			<SwitchField
				isChecked={false}
				reversed={true}
				fontSize='sm'
				mb='20px'
				id='1'
				label='Permanently delete my account'
			/>
			<SwitchField
				isChecked={false}
				reversed={true}
				fontSize='sm'
				mb='20px'
				id='2'
				label='Delete all my data'
			/>
			<SwitchField
				isChecked={false}
				reversed={true}
				fontSize='sm'
				mb='20px'
				id='3'
				label='Unsubscribe from all notifications'
			/>
			<SwitchField
				isChecked={false}
				reversed={true}
				fontSize='sm'
				mb='20px'
				id='4'
				label='Close all associated services'
			/>

			<Flex mt='40px' justify='center'>
				<Button colorScheme='red' fontWeight='bold' size='lg'>
					Confirm Account Deletion
				</Button>
			</Flex>
		</Card>
	);
}
