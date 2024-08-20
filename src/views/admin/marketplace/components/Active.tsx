import React from 'react';
import Lottie from 'react-lottie-player';
import animationData from '../../../../../src/assets/lotties/ai.json'; // Adjust the path if necessary

const Active: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Lottie
        loop
        animationData={animationData}
        play
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default Active;
