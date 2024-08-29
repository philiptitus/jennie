import React, { useState, useEffect } from 'react';
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
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import languages from './languages'; // Import the languages list
import { useDispatch, useSelector } from 'react-redux';
import { runCode, resetRunCode } from 'server/actions/actions2'; // Import the actions
import { getCode, resetGetCode } from 'server/actions/actions2'; // Import the actions

export default function CodeEditorModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [output, setOutput] = useState('');

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const cardColor = useColorModeValue('white', 'orange.700');
  const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');
  const buttonColorScheme = useColorModeValue('blue', 'orange');

  const dispatch = useDispatch();
  const toast = useToast();

  const { loading: runCodeLoading, error: runCodeError, code: runCodeOutput } = useSelector((state) => state.runCode);
  const { loading: getCodeLoading, error: getCodeError, code: getCodeOutput } = useSelector((state) => state.getCode);

  useEffect(() => {
    if (runCodeOutput) {
      setOutput(''); // Clear the output before showing the spinner
      setTimeout(() => {
        dispatch(getCode());
      }, 2000); // Wait for 2 seconds before fetching the result
      dispatch(resetRunCode());
    }
  }, [runCodeOutput, dispatch]);

  useEffect(() => {
    if (getCodeOutput) {
      setOutput(typeof getCodeOutput === 'string' ? getCodeOutput : JSON.stringify(getCodeOutput, null, 2));
      dispatch(resetGetCode());
    }
  }, [getCodeOutput, dispatch]);

  useEffect(() => {
    if (runCodeError) {
      toast({
        title: 'Error',
        description: typeof runCodeError === 'string' ? runCodeError : JSON.stringify(runCodeError, null, 2),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      dispatch(resetRunCode());
    }
  }, [runCodeError, dispatch, toast]);

  useEffect(() => {
    if (getCodeError) {
      toast({
        title: 'Error',
        description: typeof getCodeError === 'string' ? getCodeError : JSON.stringify(getCodeError, null, 2),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      dispatch(resetGetCode());
    }
  }, [getCodeError, dispatch, toast]);

  const handleRunCode = () => {
    const codeData = {
      script: code,
      language: language,
      versionIndex: '4',
    };
    dispatch(runCode(codeData));
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
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
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
              <Box flex="1" border="1px solid" borderColor="gray.200" borderRadius="md" p={4} position="relative">
                {(runCodeLoading || getCodeLoading) && (
                  <Spinner
                    size="md"
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                  />
                )}
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
