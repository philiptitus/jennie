import React, { useState, useEffect } from 'react';
import { Text, HStack, Icon } from '@chakra-ui/react';
import { TimeIcon } from '@chakra-ui/icons';

const TimerDisplay: React.FC = () => {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    // Cleanup the timer on component unmount
    return () => clearInterval(timerId);
  }, []);

  const minutes = Math.floor(time / 60);
  const seconds = ('0' + (time % 60)).slice(-2);

  return (
    <HStack spacing={2}>
      <Icon as={TimeIcon} color="gray.500" />
      <Text fontSize="md" color="gray.500">
        : {minutes}:{seconds} minutes
      </Text>
    </HStack>
  );
};

export default TimerDisplay;
