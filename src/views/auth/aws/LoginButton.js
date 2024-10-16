import React from 'react';

const redirectToCognito = () => {
  const clientId = '6pul2opu2dt6i086o3deg4nis9'; // Replace with your Cognito App Client ID
  const redirectUri = encodeURIComponent('https://jennie-steel.vercel.app/auth/callback'); // Always use encodeURIComponent
  const cognitoDomain = 'https://philip.auth.eu-north-1.amazoncognito.com'; // Your Cognito domain

  const cognitoLoginUrl = `https://philip.auth.eu-north-1.amazoncognito.com/login?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

  // Redirect the user to Cognito's Hosted UI
  window.location.href = cognitoLoginUrl;
};

const LoginButton = () => {
  const buttonStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '250px',
    height: '50px',
    // backgroundColor: '#FF9900', // AWS orange
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    backgroundImage: 'url(https://www.svgrepo.com/show/376356/aws.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: '10px center',
    paddingLeft: '50px', // To ensure text does not overlap with logo
  };

  const buttonHover = {
    filter: 'brightness(0.9)', // Darken button slightly on hover
  };

  return (
    <button
      onClick={redirectToCognito}
      style={buttonStyles}
      onMouseOver={(e) => (e.currentTarget.style.filter = buttonHover.filter)}
      onMouseOut={(e) => (e.currentTarget.style.filter = 'none')}
    >
      Login with AWS Cognito
    </button>
  );
};

export default LoginButton;
