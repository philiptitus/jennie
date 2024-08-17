// Chakra imports
import { Avatar, Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';

export default function Banner(props: {
  banner: string;
  avatar: string;
  name: string;
  bio: string;
  email: string;
  dateJoined: string;
  [x: string]: any;
}) {
  const { banner, avatar, name, bio, email, dateJoined, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const borderColor = useColorModeValue('white !important', '#111C44 !important');
  
  return (
    <Card mb={{ base: '0px', lg: '20px' }} alignItems='center' {...rest}>
      <Box bg={`url(${banner})`} bgSize='cover' borderRadius='16px' h='131px' w='100%' />
      <Avatar mx='auto' src={avatar} h='87px' w='87px' mt='-43px' border='4px solid' borderColor={borderColor} />
      <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
        {name}
      </Text>
      <Text color={textColorSecondary} fontSize='sm'>
        {bio}
      </Text>
      <Flex w='max-content' mx='auto' mt='26px' flexDirection='column' alignItems='center'>
        <Text color={textColorPrimary} fontSize='md' fontWeight='500'>
          {email}
        </Text>
        <Text color={textColorSecondary} fontSize='sm' mt='8px'>
          Joined: {dateJoined}
        </Text>
      </Flex>
    </Card>
  );
}
