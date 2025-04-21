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
import GoogleCallback from 'views/auth/google/GoogleCallback';



const routes = [
  {
    name: 'Home',
    layout: '/admin',
    path: '/default',
    icon: (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
      </span>
    ),
    component: <MainDashboard />,
  },
  {
    name: 'Interview Room',
    layout: '/admin',
    path: '/interviews',
    icon: (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
      </span>
    ),
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: 'Prep Rooms',
    layout: '/admin',
    icon: (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
      </span>
    ),
    path: '/prep-rooms',
    component: <DataTables />,
  },
  {
    name: 'Prep Material',
    layout: '/admin',
    icon: (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
      </span>
    ),
    path: '/proom/:id',
    component: <Prep />,
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: '/profile',
    icon: (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
      </span>
    ),
    component: <Profile />,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
      </span>
    ),
    component: <SignInCentered />,
  },
  {
    name: 'Sign Up',
    layout: '/auth',
    path: '/sign-up',
    icon: (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
      </span>
    ),
    component: <SignUpCentered />,
  },
  {
    name: 'Forgot Password',
    layout: '/auth',
    path: '/forgot-password',
    icon: (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
      </span>
    ),
    component: <ForgotCentered />,
  },
  {
    name: 'Reset Password',
    layout: '/auth',
    path: '/password-reset-confirm/:uid/:token',
    icon: (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
      </span>
    ),
    component: <ResetCentered/>,
  },
  {
    name: '404',
    layout: '/auth',
    path: '/404',
    icon: (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
      </span>
    ),
    component: <NotFoundCentered/>,
  },

  {
    name: 'Callback',
    layout: '/auth',
    path: '/callback',
    icon: (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
      </span>
    ),
    component: <Callback/>,
  },
  {
    name: 'GoogleCallback',
    layout: '/auth',
    path: '/callbackgoogle',
    icon: (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
      </span>
    ),
    component: <GoogleCallback/>,
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
