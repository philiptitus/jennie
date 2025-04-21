// Chakra imports
import { Box, Flex, Image, Link, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
// Assets

export default function Project(props: {
	title: string;
	ranking: number | string;
	link: string;
	image: string;
	[x: string]: any;
}) {
	const { title, ranking, link, image, ...rest } = props;
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'gray.400';
	const brandColor = useColorModeValue('brand.500', 'white');
	const bg = useColorModeValue('white', 'orange.700');
	return (
		<Card bg={bg} {...rest} p='14px'>
			<Flex align='center' direction={{ base: 'column', md: 'row' }}>
				<Image h='80px' w='80px' src={image} borderRadius='8px' me='20px' />
				<Box mt={{ base: '10px', md: '0' }}>
					<Text color={textColorPrimary} fontWeight='500' fontSize='md' mb='4px'>
						{title}
					</Text>
					<Text fontWeight='500' color={textColorSecondary} fontSize='sm' me='4px'>
						Project #{ranking} •{' '}
						<Link fontWeight='500' color={brandColor} href={link} fontSize='sm'>
							See project details
						</Link>
					</Text>
				</Box>
				<Link href={link} variant='no-hover' me='16px' ms='auto' p='0px !important'>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <svg width="18" height="18" fill="#A0AEC0" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm17.71-10.04a1.003 1.003 0 0 0 0-1.42l-2.54-2.54a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
          </span>
				</Link>
			</Flex>
		</Card>
	);
}
