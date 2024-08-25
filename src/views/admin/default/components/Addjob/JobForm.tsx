import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  ModalFooter,
  useColorModeValue
} from '@chakra-ui/react';

interface JobFormProps {
  formValues: {
    title: string;
    description: string;
    company: string;
    location: string;
    actual_interview_date: string;
    job_url: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: () => void;
  onClose: () => void;
}

const JobForm: React.FC<JobFormProps> = ({ formValues, handleInputChange, handleSubmit, onClose }) => {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const cardColor = useColorModeValue('white', 'orange.700');
  const buttonColorScheme = useColorModeValue('orange', 'orange');

  return (
    <>
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
        <FormLabel color={textColor}>Job URL</FormLabel>
        <Input
          name="job_url"
          value={formValues.job_url}
          onChange={handleInputChange}
          placeholder="Enter job URL"
          bg={cardColor}
        />
      </FormControl>

      <ModalFooter>
        <Button colorScheme={buttonColorScheme} mr={3} onClick={handleSubmit}>
          Save Job Details
        </Button>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </>
  );
};

export default JobForm;
