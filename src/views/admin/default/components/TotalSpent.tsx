// Chakra imports
import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import LineChart from 'components/charts/LineChart';
// Assets
import { lineChartDataTotalSpent, lineChartOptionsTotalSpent } from 'variables/charts';

export default function TotalSpent(props: { [x: string]: any }) {
	const { ...rest } = props;

	// Chakra Color Mode

	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.600', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const iconColor = useColorModeValue('brand.500', 'white');
	const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
	const bgFocus = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.100' });
	return (
		<Card justifyContent='center' alignItems='center' flexDirection='column' w='100%' mb='0px' {...rest}>
			<Flex align='center' justify='space-between' w='100%' pe='20px' pt='5px'>
				<Button bg={boxBg} fontSize='sm' fontWeight='500' color={textColorSecondary} borderRadius='7px'>
					<span style={{ display: 'flex', alignItems: 'center', marginRight: '4px' }}>
						<svg width="24" height="24" fill={textColorSecondary} viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="2"/><rect x="4" y="11" width="16" height="2"/><rect x="4" y="16" width="16" height="2"/></svg>
					</span>
					This month
				</Button>
				<Button
					ms='auto'
					alignItems='center'
					justifyContent='center'
					bg={bgButton}
					_hover={bgHover}
					_focus={bgFocus}
					_active={bgFocus}
					w='37px'
					h='37px'
					lineHeight='100%'
					borderRadius='10px'
					{...rest}>
					<span style={{ display: 'flex', alignItems: 'center' }}>
						<svg width="24" height="24" fill={iconColor} viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="2"/><rect x="4" y="11" width="16" height="2"/><rect x="4" y="16" width="16" height="2"/></svg>
					</span>
				</Button>
			</Flex>
			<Flex w='100%' flexDirection={{ base: 'column', lg: 'row' }}>
				<Flex flexDirection='column' me='20px' mt='28px'>
					<Text color={textColor} fontSize='34px' textAlign='start' fontWeight='700' lineHeight='100%'>
						$37.5K
					</Text>
					<Flex align='center' mb='20px'>
						<Text color='secondaryGray.600' fontSize='sm' fontWeight='500' mt='4px' me='12px'>
							Total Spent
						</Text>
						<Flex align='center'>
							<span style={{ display: 'flex', alignItems: 'center', marginRight: '2px', marginTop: '2px' }}>
								<svg width="24" height="24" fill="green" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
							</span>
							<Text color='green.500' fontSize='sm' fontWeight='700'>
								+2.45%
							</Text>
						</Flex>
					</Flex>

					<Flex align='center'>
						<span style={{ display: 'flex', alignItems: 'center', marginRight: '4px' }}>
							<svg width="24" height="24" fill="green" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 17c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2zm-1-3h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V7h-2v2z"/></svg>
						</span>
						<Text color='green.500' fontSize='md' fontWeight='700'>
							On track
						</Text>
					</Flex>
				</Flex>
				<Box minH='260px' minW='75%' mt='auto'>
					<LineChart chartData={lineChartDataTotalSpent} chartOptions={lineChartOptionsTotalSpent} />
				</Box>
			</Flex>
		</Card>
	);
}
