import React from 'react';
import {
  Box,
  Button,
  Flex,
  Icon,
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
import { MdOutlineAttachMoney, MdOutlineHelpOutline } from 'react-icons/md';

const Credits = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const textColorSecondary = 'gray.400';
  const box = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  return (
    <>
      <Button onClick={onOpen} variant="ghost" p={0}>
        <Icon as={MdOutlineHelpOutline} color={brandColor} h='24px' w='24px' />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg={box} color={textColorPrimary}>
          <ModalHeader>
            <Flex align="center">
              <Icon as={MdOutlineAttachMoney} color={brandColor} h='24px' w='24px' mr={2} />
              <Text fontWeight="bold" fontSize="xl">
                Credits Explanation
              </Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb={4}>
              <Flex align="center">
                <Icon as={MdOutlineAttachMoney} color={brandColor} h='24px' w='24px' mr={2} />
                <Text fontWeight="bold">Job Creation</Text>
              </Flex>
              <Text color={textColorSecondary}>- 10 credits</Text>
              <Progress value={10} colorScheme="brandScheme" w="100%" mt={2} />
            </Box>
            <Box mb={4}>
              <Flex align="center">
                <Icon as={MdOutlineAttachMoney} color={brandColor} h='24px' w='24px' mr={2} />
                <Text fontWeight="bold">Prep Material or Interview Creation</Text>
              </Flex>
              <Text color={textColorSecondary}>- 50 credits</Text>
              <Progress value={50} colorScheme="brandScheme" w="100%" mt={2} />
            </Box>
            <Box mb={4}>
              <Flex align="center">
                <Icon as={MdOutlineAttachMoney} color={brandColor} h='24px' w='24px' mr={2} />
                <Text fontWeight="bold">Marking Prep Material or Interviews</Text>
              </Flex>
              <Text color={textColorSecondary}>- 50 credits</Text>
              <Progress value={50} colorScheme="brandScheme" w="100%" mt={2} />
            </Box>
            <Box mb={4}>
              <Flex align="center">
                <Icon as={MdOutlineAttachMoney} color={brandColor} h='24px' w='24px' mr={2} />
                <Text fontWeight="bold">Running Code</Text>
              </Flex>
              <Text color={textColorSecondary}>- 10 credits</Text>
              <Progress value={10} colorScheme="brandScheme" w="100%" mt={2} />
            </Box>
            <Box mb={4}>
              <Flex align="center">
                <Icon as={MdOutlineAttachMoney} color={brandColor} h='24px' w='24px' mr={2} />
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
