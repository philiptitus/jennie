import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdMeetingRoom, // Icon representing a room
  MdAssignment,  // Icon representing preparation
  MdSmartToy,    // Icon representing AI
  MdPsychology,        // Icon representing AI (symbolizes intelligence or mind)

} from 'react-icons/md';


// Admin Imports
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/dataTables';
import RTL from 'views/admin/rtl';
import Prep from 'views/admin/prep'

// Auth Imports
import SignInCentered  from 'views/auth/signIn';
import SignUpCentered from 'views/auth/signUp';
import ForgotCentered from 'views/auth/forgotPassword';
import ResetCentered from 'views/auth/resetPassword';
import NotFoundCentered from 'views/auth/notFound';
import Callback from 'views/auth/aws/Callback';



const routes = [
  {
    name: 'Home',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdPsychology} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
  },
  {
    name: 'Interview Room',
    layout: '/admin',
    path: '/interviews',
    icon: (
      <Icon
        as={MdMeetingRoom}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: 'Prep Rooms',
    layout: '/admin',
    icon: <Icon as={MdAssignment} width="20px" height="20px" color="inherit" />,
    path: '/prep-rooms',
    component: <DataTables />,
  },
  {
    name: 'Prep Material',
    layout: '/admin',
    icon: <Icon as={MdAssignment} width="20px" height="20px" color="inherit" />,
    path: '/proom/:id',
    component: <Prep />,
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: '/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Profile />,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <SignInCentered />,
  },
  {
    name: 'Sign Up',
    layout: '/auth',
    path: '/sign-up',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <SignUpCentered />,
  },
  {
    name: 'Forgot Password',
    layout: '/auth',
    path: '/forgot-password',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <ForgotCentered />,
  },
  {
    name: 'Reset Password',
    layout: '/auth',
    path: '/password-reset-confirm/:uid/:token',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <ResetCentered/>,
  },
  {
    name: '404',
    layout: '/auth',
    path: '/404',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <NotFoundCentered/>,
  },

  {
    name: 'Callback',
    layout: '/auth',
    path: '/callback',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <Callback/>,
  },
  // {
  //   name: 'RTL Admin',
  //   layout: '/rtl',
  //   path: '/rtl-default',
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  //   component: <RTL />,
  // },
];

export default routes;
