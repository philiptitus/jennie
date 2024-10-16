import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useToast, Spinner, Flex, Box, Heading, Text } from '@chakra-ui/react';
import { cognitologin } from 'server/actions/userAction'; // Update the path accordingly

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const cognitoLogin = useSelector((state) => state.cognitoLogin);
  const { error, loading, userInfo } = cognitoLogin;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');

    if (code) {
      dispatch(cognitologin(code));
    }
  }, [location, dispatch]);

  useEffect(() => {
    if (userInfo) {
      toast({
        title: "Welcome Back!",
        description: "You have successfully signed in.",
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
  }, [userInfo, error, navigate, toast]);

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Box textAlign="center">
        <Heading mb="4">Handling login...</Heading>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <Text>Please wait while we process your login.</Text>
        )}
      </Box>
    </Flex>
  );
};

export default Callback;
