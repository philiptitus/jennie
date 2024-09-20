/*eslint-disable*/

import { Flex, Link, List, ListItem, Text, useColorModeValue } from '@chakra-ui/react';

export default function Footer() {
	const textColor = useColorModeValue('gray.400', 'white');
	return (
		<Flex
			zIndex='3'
			flexDirection={{
				base: 'column',
				xl: 'row'
			}}
			alignItems={{
				base: 'center',
				xl: 'start'
			}}
			justifyContent='space-between'
			px={{ base: '30px', md: '50px' }}
			pb='30px'>
			<Text
				color={textColor}
				textAlign={{
					base: 'center',
					xl: 'start'
				}}
				mb={{ base: '20px', xl: '0px' }}>
				{' '}
				&copy; {new Date().getFullYear()}
				<Text as='span' fontWeight='500' ms='4px'>
				<Link mx='3px' color={textColor} href='https://mrphilip.pythonanywhere.com/' target='_blank' fontWeight='700'>
						Philip Titus
					</Link>
					 All Rights Reserved. Powered by the 
					 <Link mx='3px' color="green" href='https://github.com/philiptitus/vectorapi' target='_blank' fontWeight='700'>
					 Vector API.
</Link>
				</Text>
			</Text>
			<List display='flex'>
				<ListItem
					me={{
						base: '20px',
						md: '44px'
					}}>
<Link fontWeight='500' color={textColor} href='https://mrphilip.pythonanywhere.com/contact/' isExternal>
  Help
</Link>

				</ListItem>



			</List>
		</Flex>
	);
}
