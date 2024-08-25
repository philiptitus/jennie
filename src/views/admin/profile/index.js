import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid } from '@chakra-ui/react';

// Custom components
import Banner from 'views/admin/profile/components/Banner';
import General from 'views/admin/profile/components/General';
import Notifications from 'views/admin/profile/components/Notifications';
import Projects from 'views/admin/profile/components/Projects';
import Storage from 'views/admin/profile/components/Storage';
import Upload from 'views/admin/profile/components/Upload';
import DeleteAccountCard from './components/Delete';

// Assets
import banner from 'assets/img/auth/banner.png';
import avatar from 'assets/img/avatars/avatar4.png';
import { useSelector } from 'react-redux';

export default function Overview() {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo, success } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/auth/sign-in');
    }
  }, [userInfo, navigate]);

  return (
    <Box pt={{ base: '130px', md: '130px', xl: '130px', l: '130px' }}>
      {/* Main Fields */}
      <Banner
        gridArea="1 / 1 / 2 / 2"
        banner={banner}
        avatar={avatar}
        name={userInfo?.username}
        job="Developer"
        posts="0"
        followers="0"
        following="0"
        bio="This is a short bio about Adela Parkson, a passionate developer."
        email={userInfo?.email}
        dateJoined={new Date(userInfo?.date_joined).toLocaleDateString()}
      />
      <br />
      <Storage
        gridArea={{ base: '2 / 1 / 3 / 2', lg: '1 / 2 / 2 / 3' }}
        used={25.6}
        total={50}
      />
      <br />

      <Upload
        gridArea={{
          base: '3 / 1 / 4 / 2',
          lg: '1 / 3 / 2 / 4',
        }}
        minH={{ base: 'auto', lg: '420px', '2xl': '365px' }}
        pe="20px"
        pb={{ base: '100px', lg: '20px' }}
      />
      <br />

      <DeleteAccountCard />
      <br />

      <Grid
        mb="20px"
        templateColumns={{
          base: '1fr',
          lg: 'repeat(2, 1fr)',
          '2xl': '1.34fr 1.62fr 1fr',
        }}
        templateRows={{
          base: '1fr',
          lg: 'repeat(2, 1fr)',
          '2xl': '1fr',
        }}
        gap={{ base: '20px', xl: '20px' }}
      >
        {/* <Projects
          banner={banner}
          avatar={avatar}
          name='Adela Parkson'
          job='Developer'
          posts='0'
          followers='0'
          following='0'
        /> */}
        {/* <General gridArea={{ base: '2 / 1 / 3 / 2', lg: '1 / 2 / 2 / 3' }} minH='365px' pe='20px' /> */}
      </Grid>
    </Box>
  );
}
