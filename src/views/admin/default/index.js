import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
  Spinner,
  useToast,
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from 'server/actions/userAction';

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
import Test from './components/Test';
import Popup from './components/PopUp';

export default function UserReports() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo, success } = userLogin;
  const jobCreate = useSelector((state) => state.jobCreate);
  const { loading: createLoading, error: createError, success: createSuccess } = jobCreate;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading: userDetailsLoading, error: userDetailsError, user } = userDetails;
	const clientId = '6pul2opu2dt6i086o3deg4nis9'; // Replace with your Cognito App Client ID
	const redirectUri = encodeURIComponent('https://jennie-steel.vercel.app/auth/callback'); // Always use encodeURIComponent
	const cognitoDomain = 'https://philip.auth.eu-north-1.amazoncognito.com'; // Your Cognito domain
  
	const cognitoLoginUrl = `https://philip.auth.eu-north-1.amazoncognito.com/login?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
  
  // Chakra Color Mode
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  useEffect(() => {
    if (!userInfo) {
      navigate(cognitoLoginUrl);
    } else {
      dispatch(getUserDetails());
    }
    if (createSuccess) {
      dispatch(getUserDetails());
    }
  }, [userInfo, navigate, dispatch ,createSuccess]);

  useEffect(() => {
    if (userDetailsError) {
      toast({
        title: "Error",
        description: userDetailsError,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [userDetailsError, toast]);

  if (loading || userDetailsLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }} gap='20px' mb='20px'>
        {/* <Popup/> */}
        {/* <Test/> */}
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
          value= {user?.tjobs || 0} 
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
          value={user?.csessions || 0} 
        />
        {/* <MiniStatistics growth='+23%' name='Sales' value='$574.34' /> */}
        <MiniStatistics
          name='Your Credit balance'
          value={user?.credits || 0} 
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
          value={user?.usessions || 0} 
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
      <PieCard />
      <AddJobModal />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
        {/* <CheckTable tableData={tableDataCheck} /> */}
        <ComplexTable />

        <InterviewTable />

        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          {/* <DailyTraffic /> */}
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>

        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          {/* <Tasks /> */}
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
