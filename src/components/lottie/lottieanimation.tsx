import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import Lottie from 'lottie-react';

export default function LottieAnimation({
  animationPath,
  displayText,
}: {
  animationPath: string;
  displayText: string;
}) {
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const cardColor = useColorModeValue('white', 'orange.700');
  const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');

  return (
    <Box
      p='20px'
      bg={cardColor}
      boxShadow={cardShadow}
      borderRadius='15px'
      display='flex'
      flexDirection='column'
      alignItems='center'
      w='100%'
      maxW='400px'
      mx='auto'
    >
      {/* <Lottie animationData={animationPath} style={{ height: '200px', width: '200px' }} /> */}
      <Text color={textColor} fontSize='md' fontWeight='600' mt='20px'>
        {displayText}
      </Text>
    </Box>
  );
}
