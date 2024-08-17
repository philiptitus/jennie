import * as React from 'react';
import { Box, Spinner, Flex } from '@chakra-ui/react';

type YouTubeEmbedProps = {
	embedUrl: string;
};

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ embedUrl }) => {
	const [isLoading, setIsLoading] = React.useState(true);

	// Handle iframe load event
	const handleLoad = () => {
		setIsLoading(false);
	};

	return (
		<Box 
			position="relative" 
			width="100%" 
			height="315px" 
			borderRadius="md" 
			overflow="hidden" 
			boxShadow="lg"
			transition="box-shadow 0.3s ease-in-out"
			_hover={{ boxShadow: 'xl' }}
		>
			{isLoading && (
				<Flex
					justifyContent="center"
					alignItems="center"
					position="absolute"
					top="0"
					left="0"
					width="100%"
					height="100%"
					bg="gray.200"
					zIndex="1"
				>
					<Spinner 
						size="xl" 
						thickness="4px" 
						speed="0.65s" 
						emptyColor="gray.300" 
						color="blue.500"
					/>
				</Flex>
			)}
			<Box
				as="iframe"
				width="100%"
				height="315px"
				src={embedUrl}
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				onLoad={handleLoad}
				opacity={isLoading ? 0 : 1}
				transition="opacity 0.5s ease-in-out"
			/>
		</Box>
	);
};

export default YouTubeEmbed;
