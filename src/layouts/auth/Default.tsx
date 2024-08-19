import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import Footer from 'components/footer/FooterAuth';
import FixedPlugin from 'components/fixedPlugin/FixedPlugin';
import { NavLink } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

function AuthIllustration({ children, illustrationBackground, image }: { children: JSX.Element | string; illustrationBackground?: string; image?: string }) {
  return (
    <Flex position='relative' minH='100vh' w='100%'>
      {/* Main content area */}
      <Flex
        direction='column'
        justify='center'
        align='flex-start'
        w={{ base: '100%', lg: '50%' }}
        p={{ base: '6', md: '8', lg: '10' }}
        mx='auto'>
        <NavLink to='/admin' style={{ width: 'fit-content', marginTop: '40px' }}>
          <Flex align='center'>
            <Icon as={FaChevronLeft} me='12px' h='13px' w='8px' color='secondaryGray.600' />
            <Text fontSize='sm' color='secondaryGray.600'>
              Back
            </Text>
          </Flex>
        </NavLink>
        {children}
        <Footer />
      </Flex>

      {/* Background illustration area */}
      <Box
        display={{ base: 'none', lg: 'block' }}
        position='absolute'
        top='50%'
        right='5%'
        transform='translateY(-50%)'
        w='45%'
        h='90%' // 10% smaller
        bgImage={illustrationBackground ? `url(${illustrationBackground})` : image ? `url(${image})` : undefined}
        bgSize='contain'
        bgRepeat='no-repeat'
        bgPosition='center'
      />
      <FixedPlugin />
    </Flex>
  );
}

AuthIllustration.propTypes = {
  illustrationBackground: PropTypes.string,
  image: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default AuthIllustration;
