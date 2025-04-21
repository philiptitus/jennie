// Chakra imports
import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
// Custom components
import BarChart from 'components/charts/BarChart';

import { barChartDataConsumption, barChartOptionsConsumption } from 'variables/charts';

export default function WeeklyRevenue(props: { [x: string]: any }) {
	const { ...rest } = props;

	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const iconColor = useColorModeValue('brand.500', 'white');
	const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
	const bgFocus = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.100' });
	return (
		<Card alignItems='center' flexDirection='column' w='100%' {...rest}>
			<Flex align='center' w='100%' px='15px' py='10px'>
				<Text me='auto' color={textColor} fontSize='xl' fontWeight='700' lineHeight='100%'>
					Weekly Revenue
				</Text>
				<Button
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
						<svg width="24" height="24" fill={iconColor} viewBox="0 0 24 24"><path d="M5 9.2V5c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v4.2c-1.2-.7-2.6-1.2-4-1.2s-2.8.5-4 1.2zm14 2.3c0-2.1-3.1-3.5-7-3.5s-7 1.4-7 3.5v7.5c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2z"/></svg>
					</span>
				</Button>
			</Flex>

			<Box h='240px' mt='auto' w='100%'>
				<BarChart chartData={barChartDataConsumption} chartOptions={barChartOptionsConsumption} />
			</Box>
		</Card>
	);
}
