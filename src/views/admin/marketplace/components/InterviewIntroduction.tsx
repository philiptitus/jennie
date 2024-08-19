import React from 'react';
import { Box, Button, Flex, Image, Text, useColorModeValue } from '@chakra-ui/react';
import NewInterview from './New';

type InterviewIntroductionProps = {
  onStart: () => void;
};

export default function InterviewIntroduction({ onStart }: InterviewIntroductionProps) {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'white');
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      bg={bgColor}
      borderRadius="md"
      p="6"
      boxShadow="lg"
      textAlign="center"
      w="100%"
    >

<NewInterview onStart={onStart}/>

    </Flex>
  );
}
