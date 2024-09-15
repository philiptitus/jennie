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
  VStack,
  HStack,
  Badge,
  Collapse,
} from '@chakra-ui/react';
import { ChevronRightIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import languages from './languages'; // Import the languages list
import { useDispatch, useSelector } from 'react-redux';
import { runCode, resetRunCode } from 'server/actions/actions2'; // Import the actions
import { getCode, resetGetCode } from 'server/actions/actions2'; // Import the actions

export default function CodeEditorModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python3');
  const [output, setOutput] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

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
      setIsProcessing(true);

      setTimeout(() => {
        dispatch(getCode());
      }, 10000); // Wait for 10 seconds before dispatching getCode
    }
  }, [runCodeOutput, dispatch]);

  useEffect(() => {
    if (getCodeOutput) {
      setOutput(typeof getCodeOutput === 'string' ? getCodeOutput : JSON.stringify(getCodeOutput, null, 2));
      setIsProcessing(false);
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
      setIsProcessing(false);
      toast({
        title: 'Error',
        description: 'Server took too long to respond. 500 Internal Server Error',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      dispatch(resetGetCode());
    }
  }, [getCodeError, dispatch, toast]);

  useEffect(() => {
    return () => {
      dispatch(resetGetCode()); // Reset getCode action when modal is closed
    };
  }, [dispatch]);

  const handleRunCode = () => {
    const codeData = {
      script: code,
      language: language,
      versionIndex: '4',
    };
    dispatch(runCode(codeData));
  };

  const codeLines = code.split('\n');

  const renderOutput = (output) => {
    if (!output) return null;

    const parsedOutput = JSON.parse(output);
    const { response } = parsedOutput;
    const { output: codeOutput, error, statusCode, memory, cpuTime, compilationStatus, projectKey, isExecutionSuccess, isCompiled } = JSON.parse(response);

    return (
      <VStack align="stretch" spacing={4}>
        <HStack justify="space-between">
          <Text fontWeight="bold">Output:</Text>
          <Badge colorScheme={isExecutionSuccess ? 'green' : 'red'}>
            {isExecutionSuccess ? 'Success' : 'Failed'}
          </Badge>
        </HStack>
        <Box border="1px solid" borderColor="gray.200" borderRadius="md" p={4}>
          <Text fontFamily="'Courier New', Courier, monospace" fontSize="sm">
            {codeOutput || 'No output'}
          </Text>
        </Box>
        <HStack justify="space-between">
          <Text fontWeight="bold">Error:</Text>
          <Badge colorScheme={error ? 'red' : 'green'}>
            {error ? 'Error' : 'No Error'}
          </Badge>
        </HStack>
        <Box border="1px solid" borderColor="gray.200" borderRadius="md" p={4}>
          <Text fontFamily="'Courier New', Courier, monospace" fontSize="sm">
            {error || 'No error'}
          </Text>
        </Box>
        <HStack justify="space-between" align="center">
          <Text fontWeight="bold">Additional Info:</Text>
          <IconButton
            icon={isCollapsed ? <ChevronDownIcon /> : <ChevronUpIcon />}
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label="Toggle additional info"
            size="sm"
          />
        </HStack>
        <Collapse in={!isCollapsed} animateOpacity>
          <VStack align="stretch" spacing={4}>
            <HStack justify="space-between">
              <Text fontWeight="bold">Status Code:</Text>
              <Badge colorScheme={statusCode === 200 ? 'green' : 'red'}>
                {statusCode}
              </Badge>
            </HStack>
            <HStack justify="space-between">
              <Text fontWeight="bold">Memory:</Text>
              <Text>{memory} KB</Text>
            </HStack>
            <HStack justify="space-between">
              <Text fontWeight="bold">CPU Time:</Text>
              <Text>{cpuTime} seconds</Text>
            </HStack>
            <HStack justify="space-between">
              <Text fontWeight="bold">Compilation Status:</Text>
              <Badge colorScheme={compilationStatus === 'success' ? 'green' : 'red'}>
                {compilationStatus || 'N/A'}
              </Badge>
            </HStack>
            <HStack justify="space-between">
              <Text fontWeight="bold">Project Key:</Text>
              <Text>{projectKey || 'N/A'}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text fontWeight="bold">Execution Success:</Text>
              <Badge colorScheme={isExecutionSuccess ? 'green' : 'red'}>
                {isExecutionSuccess ? 'Yes' : 'No'}
              </Badge>
            </HStack>
            <HStack justify="space-between">
              <Text fontWeight="bold">Compiled:</Text>
              <Badge colorScheme={isCompiled ? 'green' : 'red'}>
                {isCompiled ? 'Yes' : 'No'}
              </Badge>
            </HStack>
          </VStack>
        </Collapse>
      </VStack>
    );
  };

  const handleClose = () => {
    dispatch(resetRunCode());
    dispatch(resetGetCode());
    setCode(''); // Reset the code
    setOutput(''); // Reset the output
    setLanguage('python3'); // Reset the language
    setIsProcessing(false); // Reset the processing state
    setIsCollapsed(true); // Reset the collapsed state
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      handleClose();
    } else {
      // Reset state when the modal is opened
      setCode('');
      setOutput('');
      setLanguage('python3');
      setIsProcessing(false);
      setIsCollapsed(true);
    }
  }, [isOpen]);

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

      <Modal isOpen={isOpen} onClose={handleClose} size="xl">
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
                <Button
                  colorScheme={buttonColorScheme}
                  onClick={handleRunCode}
                  isLoading={runCodeLoading || getCodeLoading}
                  loadingText="Running"
                >
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
                {isProcessing && (
                  <Flex justify="center" align="center" h="100%">
                    <Spinner />
                    <Text ml={2}>Processing...</Text>
                  </Flex>
                )}
                {renderOutput(output)}
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
