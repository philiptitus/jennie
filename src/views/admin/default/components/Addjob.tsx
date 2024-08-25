import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, useToast } from '@chakra-ui/react';
import AddJobButton from './Addjob/AddJobButton';
import JobForm from './Addjob/JobForm';

export default function AddJobModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Separate state for each form field
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [actualInterviewDate, setActualInterviewDate] = useState('');
  const [jobUrl, setJobUrl] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    console.log(formValues);

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
  };

  const formValues = {
    title,
    description,
    company,
    location,
    actual_interview_date: actualInterviewDate,
    job_url: jobUrl
  };

  return (
    <>
      <AddJobButton onOpen={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Job to the List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <JobForm
              formValues={formValues}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
