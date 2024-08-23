// main addjob.tsx

import React from 'react';
import { Box, Heading, Text, Flex, IconButton, useColorModeValue } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

interface AddJobButtonProps {
  onOpen: () => void;
}

const AddJobButton: React.FC<AddJobButtonProps> = ({ onOpen }) => {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const cardColor = useColorModeValue('white', 'orange.700');
  const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');
  const buttonColorScheme = useColorModeValue('orange', 'orange');

  return (
    <Box
      p="20px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow={cardShadow}
      bg={cardColor}
      maxW="sm"
      mb={6}
      alignItems="center"
      flexDirection="column"
    >
      <Heading size="md" mb={2} color={textColor}>Add a New Job</Heading>
      <Text mb={4} color={textColor}>
        Keep track of your job applications by adding a new job to the list. Click the button below to get started.
      </Text>
      <Flex justify="center">
        <IconButton
          icon={<AddIcon />}
          onClick={onOpen}
          colorScheme={buttonColorScheme}
          aria-label="Add a New Job"
          size="lg"
        />
      </Flex>
    </Box>
  );
};

export default AddJobButton;
