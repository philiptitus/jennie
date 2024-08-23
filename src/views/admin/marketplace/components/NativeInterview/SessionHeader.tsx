//NativeInterview
import React from 'react';
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

const SessionHeader = () => {
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  return (
    <Flex
      align={{ sm: 'flex-start', lg: 'center' }}
      justify='space-between'
      w='100%'
      px='22px'
      pb='20px'
      mb='10px'
      boxShadow='0px 40px 58px -20px rgba(112, 144, 176, 0.26)'>
      <Text color={textColor} fontSize='xl' fontWeight='600'>
        Your Session
      </Text>
    </Flex>
  );
};

export default SessionHeader;
