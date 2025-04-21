// Chakra Imports
import { Button, useColorMode } from '@chakra-ui/react';
// Custom Icons
import React from 'react';

export default function FixedPlugin(props: { [x: string]: any }) {
	const { ...rest } = props;
	const { colorMode, toggleColorMode } = useColorMode();
	let bgButton = 'linear-gradient(135deg, #868CFF 0%, #4318FF 100%)';

	return (
		<Button
			{...rest}
			h='60px'
			w='60px'
			bg={bgButton}
			zIndex='99'
			position='fixed'
			variant='no-effects'
			left={document.documentElement.dir === 'rtl' ? '35px' : ''}
			right={document.documentElement.dir === 'rtl' ? '' : '35px'}
			bottom='30px'
			border='1px solid'
			borderColor='#6A53FF'
			borderRadius='50px'
			onClick={toggleColorMode}
			display='flex'
			p='0px'
			alignItems='center'
			justifyContent='center'>
			<span style={{ display: 'flex', alignItems: 'center' }}>
				<svg width="24" height="24" fill="white" viewBox="0 0 24 24">
					<path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-7h2v2h-2v-2zm0-8h2v6h-2V5z"/>
				</svg>
			</span>
		</Button>
	);
}
