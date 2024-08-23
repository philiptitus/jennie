import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import AddJobButton from './Addjob/AddJobButton';
import JobForm from './Addjob/JobForm';

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
