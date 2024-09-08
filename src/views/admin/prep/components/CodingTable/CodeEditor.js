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
  const [intervalId, setIntervalId] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [retryMessage, setRetryMessage] = useState('');
  const [retryTimeoutId, setRetryTimeoutId] = useState(null);

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
      const id = setInterval(() => {
        dispatch(getCode());
      }, 2000); // Call getCode every 2 seconds
      setIntervalId(id);
      dispatch(resetRunCode());
    }
  }, [runCodeOutput, dispatch]);

  useEffect(() => {
    if (getCodeOutput) {
      setOutput(typeof getCodeOutput === 'string' ? getCodeOutput : JSON.stringify(getCodeOutput, null, 2));
      clearInterval(intervalId); // Clear the interval once output is received
      clearTimeout(retryTimeoutId); // Clear any retry timeout
      setRetryCount(0); // Reset retry count
      setRetryMessage(''); // Clear retry message
      dispatch(resetGetCode());
    }
  }, [getCodeOutput, intervalId, dispatch, retryTimeoutId]);

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
      setRetryCount(retryCount + 1);
      if (retryCount >= 9) {
        toast({
          title: 'Error',
          description: 'Server took too long to respond. 500 Internal Server Error',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        clearInterval(intervalId); // Stop fetching
        clearTimeout(retryTimeoutId); // Clear any retry timeout
      } else {
        const timeoutId = setTimeout(() => {
          setRetryMessage(''); // Clear retry message
          dispatch(getCode()); // Retry fetching
        }, 5000); // Retry after 5 seconds
        setRetryTimeoutId(timeoutId);
        setRetryMessage('Trying again in 5 seconds...');
      }
      dispatch(resetGetCode());
    }
  }, [getCodeError, retryCount, dispatch, toast, intervalId, retryTimeoutId]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId); // Clear interval on component unmount or modal close
      clearTimeout(retryTimeoutId); // Clear retry timeout on component unmount or modal close
    };
  }, [intervalId, retryTimeoutId]);

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
                {retryMessage && <Text>{retryMessage}</Text>}
                {renderOutput(output)}
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
