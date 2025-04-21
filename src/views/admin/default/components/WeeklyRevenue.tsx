// Chakra imports
import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
// Custom components
import BarChart from 'components/charts/BarChart';
import React from 'react';
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
						<svg width="24" height="24" fill={iconColor} viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="2"/><rect x="4" y="11" width="16" height="2"/><rect x="4" y="16" width="16" height="2"/></svg>
					</span>
				</Button>
			</Flex>

			<Box h='240px' mt='auto' w='100%'>
				<BarChart chartData={barChartDataConsumption} chartOptions={barChartOptionsConsumption} />
			</Box>
		</Card>
	);
}
