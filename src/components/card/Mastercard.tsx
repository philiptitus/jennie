// Chakra imports
import { Flex, Box, Icon, Text, Spacer } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';

// Assets
import bgMastercard from 'assets/img/dashboards/Debit.png';

export default function Banner(props: { exp: string; cvv: string; number: string }) {
	const { exp, cvv, number, ...rest } = props;

	// Chakra Color Mode
	return (
		<Card
			backgroundImage={bgMastercard}
			backgroundRepeat='no-repeat'
			bgSize='cover'
			alignSelf='center'
			w={{ base: '100%', md: '60%', xl: '99%' }}
			bgPosition='10%'
			mx='auto'
			p='20px'
			{...rest}>
			<Flex direction='column' color='white' h='100%' w='100%'>
				<Flex justify='space-between' align='center' mb='37px'>
					<Text fontSize='2xl' fontWeight='bold'>
						Glassy.
					</Text>
					<span style={{ display: 'flex', alignItems: 'center' }}>
						<svg width="48" height="48" fill="#A0AEC0" viewBox="0 0 24 24"><circle cx="9" cy="12" r="5"/><circle cx="15" cy="12" r="5"/></svg>
					</span>
				</Flex>
				<Spacer />
				<Flex direction='column'>
					<Box>
						<Text fontSize={{ sm: 'xl', lg: 'lg', xl: 'xl' }} fontWeight='bold'>
							{number}
						</Text>
					</Box>
					<Flex mt='14px'>
						<Flex direction='column' me='34px'>
							<Text fontSize='xs'>VALID THRU</Text>
							<Text fontSize='sm' fontWeight='500'>
								{exp}
							</Text>
						</Flex>
						<Flex direction='column'>
							<Text fontSize='xs'>CVV</Text>
							<Text fontSize='sm' fontWeight='500'>
								{cvv}
							</Text>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
}
