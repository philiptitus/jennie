import React from 'react';
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

const Credits = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const textColorSecondary = 'gray.400';
  const box = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  return (
    <>
      <Button onClick={onOpen} variant="ghost" p={0}>
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <svg width="24" height="24" fill={brandColor} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><rect x="11" y="7" width="2" height="8"/><rect x="11" y="17" width="2" height="2"/></svg>
        </span>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg={box} color={textColorPrimary}>
          <ModalHeader>
            <Flex align="center">
              <span style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
                <svg width="24" height="24" fill={brandColor} viewBox="0 0 24 24"><path d="M12 17c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V7c0-3.31-2.69-6-6-6S6 3.69 6 7v4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2zm-6-9c2.21 0 4 1.79 4 4v4H8V7c0-2.21 1.79-4 4-4zm6 17c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v6z"/></svg>
              </span>
              <Text fontWeight="bold" fontSize="xl">
                Credits Explanation
              </Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb={4}>
              <Flex align="center">
                <span style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
                  <svg width="24" height="24" fill={brandColor} viewBox="0 0 24 24"><path d="M12 17c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V7c0-3.31-2.69-6-6-6S6 3.69 6 7v4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2zm-6-9c2.21 0 4 1.79 4 4v4H8V7c0-2.21 1.79-4 4-4zm6 17c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v6z"/></svg>
                </span>
                <Text fontWeight="bold">Job Creation</Text>
              </Flex>
              <Text color={textColorSecondary}>- 10 credits</Text>
              <Progress value={10} colorScheme="brandScheme" w="100%" mt={2} />
            </Box>
            <Box mb={4}>
              <Flex align="center">
                <span style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
                  <svg width="24" height="24" fill={brandColor} viewBox="0 0 24 24"><path d="M12 17c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V7c0-3.31-2.69-6-6-6S6 3.69 6 7v4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2zm-6-9c2.21 0 4 1.79 4 4v4H8V7c0-2.21 1.79-4 4-4zm6 17c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v6z"/></svg>
                </span>
                <Text fontWeight="bold">Prep Material or Interview Creation</Text>
              </Flex>
              <Text color={textColorSecondary}>- 50 credits</Text>
              <Progress value={50} colorScheme="brandScheme" w="100%" mt={2} />
            </Box>
            <Box mb={4}>
              <Flex align="center">
                <span style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
                  <svg width="24" height="24" fill={brandColor} viewBox="0 0 24 24"><path d="M12 17c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V7c0-3.31-2.69-6-6-6S6 3.69 6 7v4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2zm-6-9c2.21 0 4 1.79 4 4v4H8V7c0-2.21 1.79-4 4-4zm6 17c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v6z"/></svg>
                </span>
                <Text fontWeight="bold">Marking Prep Material or Interviews</Text>
              </Flex>
              <Text color={textColorSecondary}>- 50 credits</Text>
              <Progress value={50} colorScheme="brandScheme" w="100%" mt={2} />
            </Box>
            <Box mb={4}>
              <Flex align="center">
                <span style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
                  <svg width="24" height="24" fill={brandColor} viewBox="0 0 24 24"><path d="M12 17c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V7c0-3.31-2.69-6-6-6S6 3.69 6 7v4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2zm-6-9c2.21 0 4 1.79 4 4v4H8V7c0-2.21 1.79-4 4-4zm6 17c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v6z"/></svg>
                </span>
                <Text fontWeight="bold">Running Code</Text>
              </Flex>
              <Text color={textColorSecondary}>- 10 credits</Text>
              <Progress value={10} colorScheme="brandScheme" w="100%" mt={2} />
            </Box>
            <Box mb={4}>
              <Flex align="center">
                <span style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
                  <svg width="24" height="24" fill={brandColor} viewBox="0 0 24 24"><path d="M12 17c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V7c0-3.31-2.69-6-6-6S6 3.69 6 7v4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2zm-6-9c2.21 0 4 1.79 4 4v4H8V7c0-2.21 1.79-4 4-4zm6 17c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v6z"/></svg>
                </span>
                <Text fontWeight="bold">Talking to an Agent During the Interview</Text>
              </Flex>
              <Text color={textColorSecondary}>- 20 credits</Text>
              <Progress value={20} colorScheme="brandScheme" w="100%" mt={2} />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="brandScheme" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Credits;
