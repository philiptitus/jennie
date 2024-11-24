import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useToast, Spinner, Flex, Box, Heading, Text } from '@chakra-ui/react';
import { googleauth } from 'server/actions/userAction'; // Update the path accordingly

const GoogleCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const googleAuth = useSelector((state) => state.googleAuth);
  const { error, loading, success} = googleAuth;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');

    if (code) {
      dispatch(googleauth(code));
    }
  }, [location, dispatch]);

  React.useEffect(() => {
    if (success) {
      toast({
        title: "Welcome Back",
        description: "Please Try Setting Up Your Interview Now, you should be receiving the meeting details on your email account 😊.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate('/admin/default');
    }

    if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [success, error, navigate, toast]);

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Box textAlign="center">
        <Heading mb="4">Handling Google Auth...</Heading>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <Text>Please wait while we authorize your google information, dont worry this takes just a minute😅.</Text>
        )}
      </Box>
    </Flex>
  );
};

export default GoogleCallback;
