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
// Chakra imports
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
// Custom components
import Card from 'components/card/Card';
import events from './events'; // Importing the events

type CalendarValue = Date | [Date, Date] | null;

export default function MiniCalendar(props: {
  selectRange: boolean;
  [x: string]: any;
}) {
  const { selectRange, ...rest } = props;
  const [value, setValue] = useState<CalendarValue>(new Date());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEvents, setSelectedEvents] = useState<{ date: string; events: { title: string; time: string }[] } | null>(null);

  // Helper function to format the event date to match the calendar date
  const formatEventDate = (dateString: string) => {
    const [day, month, year] = dateString
      .replace(/(st|nd|rd|th)/, '')
      .split(' ');
    return new Date(`${month} ${day}, ${year}`).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleChange = (value: CalendarValue) => {
    setValue(value);

    const formattedDate = value instanceof Date ? value.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
    
    const dayEvents = events.filter(event => formatEventDate(event.date) === formattedDate);

    if (dayEvents.length > 0) {
      setSelectedEvents({ date: formattedDate, events: dayEvents.map(event => ({ title: event.title, time: event.time })) });
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
      if (events.some(event => formatEventDate(event.date) === formattedDate)) {
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
            <ModalHeader>Events on {selectedEvents.date}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <List spacing={3}>
                {selectedEvents.events.map((event, index) => (
                  <ListItem key={index}>
                    <Text fontWeight="bold">{event.time}:</Text> {event.title}
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
