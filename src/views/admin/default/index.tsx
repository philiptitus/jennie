
// Chakra imports
import { Avatar, Box, Flex, FormLabel, Icon, Select, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
// Assets
import Usa from 'assets/img/dashboards/usa.png';
// Custom components
import MiniCalendar from 'components/calendar/MiniCalendar';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import { MdAddTask, MdAttachMoney, MdBarChart, MdFileCopy } from 'react-icons/md';
import { MdCheckCircle, MdDone } from 'react-icons/md';

import CheckTable from 'views/admin/rtl/components/CheckTable';
import ComplexTable from 'views/admin/default/components/ComplexTable';
import DailyTraffic from 'views/admin/default/components/DailyTraffic';
import PieCard from 'views/admin/default/components/PieCard';
import Tasks from 'views/admin/default/components/Tasks';
import TotalSpent from 'views/admin/default/components/TotalSpent';
import WeeklyRevenue from 'views/admin/default/components/WeeklyRevenue';
import tableDataCheck from 'views/admin/default/variables/tableDataCheck';
import tableDataComplex from 'views/admin/default/variables/tableDataComplex';
import InterviewTable from './components/InterviewTable';
import AddJobModal from './components/Addjob';

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
							icon={<Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />}
						/>
					}
					name='Total Jobs'
					value='10 Jobs'
				/>
				<MiniStatistics
					startContent={
						<IconBox
							w='56px'
							h='56px'
							bg={boxBg}
							icon={<Icon w='32px' h='32px' as={MdDone} color={brandColor} />}
						/>
					}
					name='Complete Interview sessions'
					value='5 sessions'
				/>
				{/* <MiniStatistics growth='+23%' name='Sales' value='$574.34' /> */}
				<MiniStatistics

					name='Your Credit balance'
					value='$1,000 credits'
				/>
				<MiniStatistics
					startContent={
						<IconBox
							w='56px'
							h='56px'
							bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
							icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
						/>
					}
					name='Upcoming Interview sessions'
					value='3 sessions'
				/>
				{/* <MiniStatistics
					startContent={
						<IconBox
							w='56px'
							h='56px'
							bg={boxBg}
							icon={<Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />}
						/>
					}
					name='Total Projects'
					value='2935'
				/> */}
			</SimpleGrid>

			<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
				{/* <TotalSpent /> */}
				{/* <WeeklyRevenue /> */}
			</SimpleGrid>
			<SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
				{/* <CheckTable tableData={tableDataCheck} /> */}
				<ComplexTable />

				<InterviewTable/>

				<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
					{/* <DailyTraffic /> */}
				</SimpleGrid>
			</SimpleGrid>
			<SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
				<PieCard />
<AddJobModal/>
				<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
					{/* <Tasks /> */}
					<MiniCalendar h='100%' minW='100%' selectRange={false} />
				</SimpleGrid>
			</SimpleGrid>
		</Box>
	);
}
