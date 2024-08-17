import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Flex,
  Text,
  useColorModeValue,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

interface CodeEditorModalProps {
  // You can add any additional props here if needed
}

export default function CodeEditorModal({}: CodeEditorModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [output, setOutput] = useState('');

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const cardColor = useColorModeValue('white', 'orange.700');
  const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');
  const buttonColorScheme = useColorModeValue('blue', 'orange');

  const handleRunCode = () => {
    // Simulate running the code and setting the output
    setOutput(`Output for ${language} code:\n${code}`);
  };

  const codeLines = code.split('\n');

  return (
    <>
      <Flex justify="center">
        <IconButton
          icon={<ChevronRightIcon />}
          onClick={onOpen}
          colorScheme={buttonColorScheme}
          aria-label=""
          size="sm"
        />
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={textColor}>Code Editor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" h="100%">
              <Flex mb={4}>
                <Select
                  placeholder="Select Language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  mr={4}
                >
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                </Select>
                <Button colorScheme={buttonColorScheme} onClick={handleRunCode}>
                  Run
                </Button>
              </Flex>
              <Box flex="1" mb={4} border="1px solid" borderColor="gray.200" borderRadius="md" p={4}>
                <Flex direction="row">
                  <Box w="40px" mr={2} borderRight="1px solid" borderColor="gray.200" pr={2}>
                    {codeLines.map((_, index) => (
                      <Text key={index} fontSize="sm" color="gray.500">
                        {index + 1}
                      </Text>
                    ))}
                  </Box>
                  <Box flex="1">
                    <Textarea
                      placeholder="Write your code here..."
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      h="100%"
                      fontFamily="'Courier New', Courier, monospace"
                      fontSize="sm"
                      resize="vertical"
                      p={2}
                      border="none"
                      _focus={{ border: 'none' }}
                    />
                  </Box>
                </Flex>
              </Box>
              <Box flex="1" border="1px solid" borderColor="gray.200" borderRadius="md" p={4}>
                <Text fontFamily="'Courier New', Courier, monospace" fontSize="sm">
                  {output}
                </Text>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
