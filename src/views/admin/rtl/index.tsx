/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Avatar, Box, Flex, FormLabel, Select, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
// Assets
import Usa from 'assets/img/dashboards/usa.png';
// Custom components
import MiniCalendar from 'components/calendar/MiniCalendar';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import React from 'react';
import CheckTable from 'views/admin/rtl/components/CheckTable';
import ComplexTable from 'views/admin/rtl/components/ComplexTable';
import DailyTraffic from 'views/admin/rtl/components/DailyTraffic';
import PieCard from 'views/admin/rtl/components/PieCard';
import Tasks from 'views/admin/rtl/components/Tasks';
import TotalSpent from 'views/admin/rtl/components/TotalSpent';
import WeeklyRevenue from 'views/admin/rtl/components/WeeklyRevenue';
import tableDataCheck from 'views/admin/rtl/variables/tableDataCheck';
import tableDataComplex from 'views/admin/rtl/variables/tableDataComplex';

export default function UserReports() {
	// Chakra Color Mode
	const brandColor = useColorModeValue('brand.500', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<SimpleGrid columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }} gap='20px' mb='20px'>
				<MiniStatistics
					startContent={
						<IconBox
							w='56px'
							h='56px'
							bg={boxBg}
							icon={
								<span style={{ display: 'flex', alignItems: 'center' }}>
									<svg width="32" height="32" fill={brandColor} viewBox="0 0 24 24">
										<path d="M5 9.2V5c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v4.2c-1.2-.7-2.6-1.2-4-1.2s-2.8.5-4 1.2zm14 2.3c0-2.1-3.1-3.5-7-3.5s-7 1.4-7 3.5v7.5c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2z" />
									</svg>
								</span>
							}
						/>
					}
					name='Earnings'
					value='$350.4'
				/>
				<MiniStatistics
					startContent={
						<IconBox
							w='56px'
							h='56px'
							bg={boxBg}
							icon={
								<span style={{ display: 'flex', alignItems: 'center' }}>
									<svg width="32" height="32" fill={brandColor} viewBox="0 0 24 24">
										<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
									</svg>
								</span>
							}
						/>
					}
					name='Spend this month'
					value='$642.39'
				/>
				<MiniStatistics growth='+23%' name='Sales' value='$574.34' />
				<MiniStatistics
					endContent={
						<Flex me='-16px' mt='10px'>
							<FormLabel htmlFor='balance'>
								<Avatar src={Usa} />
							</FormLabel>
							<Select id='balance' variant='mini' mt='5px' me='0px' defaultValue='usd'>
								<option value='usd'>USD</option>
								<option value='eur'>EUR</option>
								<option value='gba'>GBA</option>
							</Select>
						</Flex>
					}
					name='Your balance'
					value='$1,000'
				/>
				<MiniStatistics
					startContent={
						<IconBox
							w='56px'
							h='56px'
							bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
							icon={
								<span style={{ display: 'flex', alignItems: 'center' }}>
									<svg width="28" height="28" fill="white" viewBox="0 0 24 24">
										<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 14H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V7h10v2z" />
									</svg>
								</span>
							}
						/>
					}
					name='New Tasks'
					value='154'
				/>
				<MiniStatistics
					startContent={
						<IconBox
							w='56px'
							h='56px'
							bg={boxBg}
							icon={
								<span style={{ display: 'flex', alignItems: 'center' }}>
									<svg width="32" height="32" fill={brandColor} viewBox="0 0 24 24">
										<path d="M16 1H4c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7l-6-6zm2 19H6V4h7v5h5v11zm-7-2h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V7h-2v2z" />
									</svg>
								</span>
							}
						/>
					}
					name='Total Projects'
					value='2935'
				/>
			</SimpleGrid>

			<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
				<TotalSpent />
				<WeeklyRevenue />
			</SimpleGrid>
			<SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
				<CheckTable tableData={tableDataCheck} />
				<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
					<DailyTraffic />
					<PieCard />
				</SimpleGrid>
			</SimpleGrid>
			<SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
				<ComplexTable tableData={tableDataComplex} />
				<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
					<Tasks />
					<MiniCalendar h='100%' minW='100%' selectRange={false} />
				</SimpleGrid>
			</SimpleGrid>
		</Box>
	);
}
