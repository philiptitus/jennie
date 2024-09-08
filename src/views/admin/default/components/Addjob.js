import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import AddJobButton from './Addjob/AddJobButton';
import { createJob, resetJobCreate } from 'server/actions/actions1'; // Update the path accordingly

export default function AddJobModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const dispatch = useDispatch();

  // Separate state for each form field
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [actualInterviewDate, setActualInterviewDate] = useState('');
  const [jobUrl, setJobUrl] = useState('');

  const jobCreate = useSelector((state) => state.jobCreate);
  const { loading, error, success } = jobCreate;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'company':
        setCompany(value);
        break;
      case 'location':
        setLocation(value);
        break;
      case 'actual_interview_date':
        setActualInterviewDate(value);
        break;
      case 'job_url':
        setJobUrl(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    const formValues = {
      title,
      description,
      company,
      location,
      actual_interview_date: actualInterviewDate,
      job_url: jobUrl
    };

    if (new Date(actualInterviewDate) <= new Date()) {
      toast({
        title: "Invalid Date",
        description: "Please select a date later than today.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    dispatch(createJob(formValues));
  };

  const formValues = {
    title,
    description,
    company,
    location,
    actual_interview_date: actualInterviewDate,
    job_url: jobUrl
  };

  useEffect(() => {
    if (success) {
      toast({
        title: "Job Added",
        description: "Your job was added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Reset form values
      setTitle('');
      setDescription('');
      setCompany('');
      setLocation('');
      setActualInterviewDate('');
      setJobUrl('');
      onClose();
      dispatch(resetJobCreate());
    }

    if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      dispatch(resetJobCreate());

    }
  }, [success, error, toast, onClose, dispatch]);

  return (
    <>
      <AddJobButton onOpen={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Job to the List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Textarea
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={description}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Company</FormLabel>
                <Textarea
                  type="text"
                  name="company"
                  value={company}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Location</FormLabel>
                <Textarea
                  type="text"
                  name="location"
                  value={location}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Actual Interview Date</FormLabel>
                <Input
                  type="date"
                  name="actual_interview_date"
                  value={actualInterviewDate}
                  onChange={handleInputChange}
                  style={{ backgroundColor: "black" }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Job URL</FormLabel>
                <Textarea
                  type="url"
                  name="job_url"
                  value={jobUrl}
                  onChange={handleInputChange}
                />
              </FormControl>
              <Button
                colorScheme="teal"
                onClick={handleSubmit}
                isLoading={loading}
              >
                Add Job
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
