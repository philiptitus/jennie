// Chakra imports
import { AvatarGroup, Avatar, Box, Button, Flex, Icon, Image, Link, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
// Assets
import { useState } from 'react';

export default function NFT(props: {
	image: string;
	name: string;
	author: string;
	bidders: string[];
	download: string;
	currentbid: string | number;
}) {
	const { image, name, author, bidders, download, currentbid } = props;
	const [ like, setLike ] = useState(false);
	const textColor = useColorModeValue('orange.700', 'white');
	const textColorBid = useColorModeValue('brand.500', 'white');
	return (
		<Card p='20px'>
			<Flex direction={{ base: 'column' }} justify='center'>
				<Box mb={{ base: '20px', '2xl': '20px' }} position='relative'>
					<Image
						src={image}
						w={{ base: '100%', '3xl': '100%' }}
						h={{ base: '100%', '3xl': '100%' }}
						borderRadius='20px'
					/>
					<Button
						position='absolute'
						bg='white'
						_hover={{ bg: 'whiteAlpha.900' }}
						_active={{ bg: 'white' }}
						_focus={{ bg: 'white' }}
						p='0px !important'
						top='14px'
						right='14px'
						borderRadius='50%'
						minW='36px'
						h='36px'
						onClick={() => {
							setLike(!like);
						}}>
						<Icon
							transition='0.2s linear'
							w='20px'
							h='20px'
							as={undefined}
						>
							{like ? (
								<span style={{ display: 'flex', alignItems: 'center' }}>
									<svg width="20" height="20" fill="var(--chakra-colors-brand-500)" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
								</span>
							) : (
								<span style={{ display: 'flex', alignItems: 'center' }}>
									<svg width="20" height="20" fill="var(--chakra-colors-brand-500)" viewBox="0 0 24 24"><path d="M12.1 8.64l-.1.1-.1-.1C10.14 6.6 7.1 7.24 7.1 9.91c0 2.53 2.91 4.61 7.9 8.54 5-3.93 7.9-6.01 7.9-8.54 0-2.67-3.04-3.31-4.9-1.27z"/></svg>
								</span>
							)}
						</Icon>
					</Button>
				</Box>
				<Flex flexDirection='column' justify='space-between' h='100%'>
					<Flex
						justify='space-between'
						direction={{
							base: 'row',
							md: 'column',
							lg: 'row',
							xl: 'column',
							'2xl': 'row'
						}}
						mb='auto'>
						<Flex direction='column'>
							<Text
								color={textColor}
								fontSize={{
									base: 'xl',
									md: 'lg',
									lg: 'lg',
									xl: 'lg',
									'2xl': 'md',
									'3xl': 'lg'
								}}
								mb='5px'
								fontWeight='bold'
								me='14px'>
								{name}
							</Text>
							<Text
								color='secondaryGray.600'
								fontSize={{
									base: 'sm'
								}}
								fontWeight='400'
								me='14px'>
								{author}
							</Text>
						</Flex>
						<AvatarGroup
							max={3}
							color={textColorBid}
							size='sm'
							mt={{
								base: '0px',
								md: '10px',
								lg: '0px',
								xl: '10px',
								'2xl': '0px'
							}}
							fontSize='12px'>
							{bidders.map((avt, key) => <Avatar key={key} src={avt} />)}
						</AvatarGroup>
					</Flex>
					<Flex
						align={{
							base: 'center',
							md: 'start',
							lg: 'center',
							xl: 'start',
							'2xl': 'center'
						}}
						justify='space-between'
						direction={{
							base: 'row',
							md: 'column',
							lg: 'row',
							xl: 'column',
							'2xl': 'row'
						}}
						mt='25px'>
						<Text fontWeight='700' fontSize='sm' color={textColorBid}>
							Current Bid: {currentbid}
						</Text>
						<Link
							href={download}
							mt={{
								base: '0px',
								md: '10px',
								lg: '0px',
								xl: '10px',
								'2xl': '0px'
							}}>
							<Button
								variant='darkBrand'
								color='white'
								fontSize='sm'
								fontWeight='500'
								borderRadius='70px'
								px='24px'
								py='5px'>
								Place Bid
							</Button>
						</Link>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
}
