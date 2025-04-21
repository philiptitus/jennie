import { useEffect, useState } from 'react';
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
import { useSelector } from 'react-redux';

export default function Overview() {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo, success } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading: userDetailsLoading, error: userDetailsError, user } = userDetails;

  const [avatar, setAvatar] = useState('');

	const clientId = '6pul2opu2dt6i086o3deg4nis9'; // Replace with your Cognito App Client ID
	const redirectUri = encodeURIComponent('https://jennie-steel.vercel.app/auth/callback'); // Always use encodeURIComponent
	const cognitoDomain = 'https://philip.auth.eu-north-1.amazoncognito.com'; // Your Cognito domain
  
	const cognitoLoginUrl = `https://philip.auth.eu-north-1.amazoncognito.com/login?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
  
  // Function to randomly select an SVG
  const importAll = (r: __WebpackModuleApi.RequireContext) => {
    const svgModules = r.keys().map(r);
    console.log(`Number of SVGs found: ${svgModules.length}`);
    return svgModules.map((mod) => mod.default || mod);
  };

  const randomSVG = () => {
    const svgs = importAll(require.context('assets/svgs/', false, /\.svg$/));
    const randomIndex = Math.floor(Math.random() * svgs.length);
    const selectedSVG = svgs[randomIndex];
    console.log('Selected SVG:', selectedSVG);
    return selectedSVG;
  };

  useEffect(() => {
    if (!userInfo) {
      navigate(cognitoLoginUrl);
    } else {
      const svg = randomSVG();
      setAvatar(svg); // Set the correct SVG path as the avatar
    }
  }, [userInfo, navigate]);

  return (
    <Box pt={{ base: '130px', md: '130px', xl: '130px', l: '130px' }}>
      {/* Main Fields */}
      <Banner
        gridArea="1 / 1 / 2 / 2"
        banner={banner}
        avatar={avatar}
        name={userInfo?.name}
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
        used={1000 - user?.credits}
        total={1000}
      />
      <br />

      {/* <Upload
        gridArea={{
          base: '3 / 1 / 4 / 2',
          lg: '1 / 3 / 2 / 4',
        }}
        minH={{ base: 'auto', lg: '420px', '2xl': '365px' }}
        pe="20px"
        pb={{ base: '100px', lg: '20px' }}
      /> */}
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
