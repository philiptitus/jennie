import { Icon as ChakraIcon, IconProps } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { ElementType } from 'react';

interface CustomIconProps extends Omit<IconProps, 'as'> {
  as: IconType | ElementType;
}

const CustomIcon = ({ as: Component, ...props }: CustomIconProps) => {
  return <ChakraIcon as={Component as ElementType} {...props} />;
};

export { CustomIcon as Icon };
export default CustomIcon;
