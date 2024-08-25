import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'assets/css/MiniCalendar.css';
import {
  Text,
  Icon,
  Box,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  List,
  ListItem,
} from '@chakra-ui/react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Card from 'components/card/Card';
import { fakeInterviewsData } from 'views/admin/marketplace/components/data'; // Importing the new data

type CalendarValue = Date | [Date, Date] | null;

export default function MiniCalendar(props: { selectRange: boolean; [x: string]: any; }) {
  const { selectRange, ...rest } = props;
  const [value, setValue] = useState<CalendarValue>(new Date());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEvents, setSelectedEvents] = useState<{ date: string; events: { job_name: string; interview_datetime: string }[] } | null>(null);

  const handleChange = (value: CalendarValue) => {
    setValue(value);

    const formattedDate = value instanceof Date ? value.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
    
    const dayEvents = fakeInterviewsData.filter(event => {
      const eventDate = new Date(event.interview_datetime).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      return eventDate === formattedDate;
    });

    if (dayEvents.length > 0) {
      setSelectedEvents({ date: formattedDate, events: dayEvents.map(event => ({ job_name: event.job_name, interview_datetime: event.interview_datetime })) });
      onOpen();
    }
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      if (fakeInterviewsData.some(event => {
        const eventDate = new Date(event.interview_datetime).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
        return eventDate === formattedDate;
      })) {
        return 'highlight';
      }
    }
    return null;
  };

  return (
    <Card
      alignItems="center"
      flexDirection="column"
      w="100%"
      maxW="max-content"
      p="20px 15px"
      h="max-content"
      {...rest}
    >
      <Heading as="h3" size="lg" mb="20px">
        My Calendar
      </Heading>
      <Calendar
        onChange={handleChange}
        value={value}
        selectRange={selectRange}
        view={'month'}
        tileClassName={tileClassName}
        prevLabel={<Icon as={MdChevronLeft} w="24px" h="24px" mt="4px" />}
        nextLabel={<Icon as={MdChevronRight} w="24px" h="24px" mt="4px" />}
      />

      {selectedEvents && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Interviews on {selectedEvents.date}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <List spacing={3}>
                {selectedEvents.events.map((event, index) => (
                  <ListItem key={index}>
                    <Text fontWeight="bold">{new Date(event.interview_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}:</Text> {event.job_name}
                  </ListItem>
                ))}
              </List>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Card>
  );
}
