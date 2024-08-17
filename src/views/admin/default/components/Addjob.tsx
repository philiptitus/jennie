import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalFooter, 
  ModalBody, 
  ModalCloseButton, 
  useDisclosure, 
  IconButton, 
  Textarea,
  Text,
  Flex,
  Heading,
  useColorModeValue
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export default function AddJobModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    actual_interview_date: '',
    mockup_interview_date: '',
    job_url: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log(formValues);
    onClose();
  };

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const cardColor = useColorModeValue('white', 'orange.700');
  const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');
  const buttonColorScheme = useColorModeValue('orange', 'orange');

  return (
    <>
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={textColor}>Add a New Job to the List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel color={textColor}>Title</FormLabel>
              <Input 
                name="title" 
                value={formValues.title} 
                onChange={handleInputChange} 
                placeholder="Enter job title" 
                bg={cardColor}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel color={textColor}>Description</FormLabel>
              <Textarea 
                name="description" 
                value={formValues.description} 
                onChange={handleInputChange} 
                placeholder="Enter job description" 
                bg={cardColor}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel color={textColor}>Company</FormLabel>
              <Input 
                name="company" 
                value={formValues.company} 
                onChange={handleInputChange} 
                placeholder="Enter company name" 
                bg={cardColor}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel color={textColor}>Location</FormLabel>
              <Input 
                name="location" 
                value={formValues.location} 
                onChange={handleInputChange} 
                placeholder="Enter location" 
                bg={cardColor}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel color={textColor}>Actual Interview Date</FormLabel>
              <Input 
                type="date" 
                name="actual_interview_date" 
                value={formValues.actual_interview_date} 
                onChange={handleInputChange} 
                bg={cardColor}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel color={textColor}>Mockup Interview Date</FormLabel>
              <Input 
                type="date" 
                name="mockup_interview_date" 
                value={formValues.mockup_interview_date} 
                onChange={handleInputChange} 
                bg={cardColor}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel color={textColor}>Job URL</FormLabel>
              <Input 
                name="job_url" 
                value={formValues.job_url} 
                onChange={handleInputChange} 
                placeholder="Enter job URL" 
                bg={cardColor}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme={buttonColorScheme} mr={3} onClick={handleSubmit}>
              Save Job Details
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
