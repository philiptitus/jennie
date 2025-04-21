import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import routes from 'routes';

// Chakra imports
import { Box, useColorModeValue } from '@chakra-ui/react';

// Layout components
import { SidebarContext } from 'contexts/SidebarContext';

// Custom Chakra theme
export default function Auth() {
  	const clientId = '6pul2opu2dt6i086o3deg4nis9'; // Replace with your Cognito App Client ID
	const redirectUri = encodeURIComponent('https://jennie-steel.vercel.app/auth/callback'); // Always use encodeURIComponent
	const cognitoDomain = 'https://philip.auth.eu-north-1.amazoncognito.com'; // Your Cognito domain
  
	const cognitoLoginUrl = `https://philip.auth.eu-north-1.amazoncognito.com/login?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
  
  // states and functions
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const getRoute = () => {
    return window.location.pathname !== '/auth/full-screen-maps';
  };
  const getRoutes = (routes: any[]) => {
    return routes.map((route: any, key: number) => {
      if (route.layout === '/auth') {
        return (
          <Route path={`${route.path}`} element={route.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };
  const authBg = useColorModeValue('white', 'orange.900');
  document.documentElement.dir = 'ltr';
  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Box
          bg={authBg}
          float="right"
          minHeight="100vh"
          height="100%"
          position="relative"
          w="100%"
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          {getRoute() ? (
            <Box mx="auto" minH="100vh">
              <Routes>
                {getRoutes(routes)}
                <Route
                  path="/"
                  element={<Navigate to={cognitoLoginUrl} replace />}
                />
                <Route
                  path="*"
                  element={
                    (() => {
                      // Allow Cognito login links to pass through without 404
                      const cognitoRegex = /^https:\/\/([a-zA-Z0-9-]+\.)?amazoncognito\.com\/login\?/;
                      if (typeof window !== 'undefined' && cognitoRegex.test(window.location.href)) {
                        window.location.href = window.location.href; // let browser handle it
                        return null;
                      }
                      return <Navigate to="/auth/404" replace />;
                    })()
                  }
                />
              </Routes>
            </Box>
          ) : null}
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
