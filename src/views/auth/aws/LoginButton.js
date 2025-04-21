import React from 'react';
import { useSelector } from 'react-redux';

const LoginButton = () => {
  const cognitoLogin = useSelector((state) => state.cognitoLogin);
  const { userInfo: cognitoInfo } = cognitoLogin;

  const clientId = '6pul2opu2dt6i086o3deg4nis9';
  const redirectUri = encodeURIComponent('https://jennie-steel.vercel.app/auth/callback');
  const cognitoDomain = 'https://philip.auth.eu-north-1.amazoncognito.com';
  const cognitoLoginUrl = `https://philip.auth.eu-north-1.amazoncognito.com/login?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

  const handleLogin = () => {
    if (cognitoInfo) {
      window.location.reload();
    } else {
      window.location.href = cognitoLoginUrl;
    }
  };

  const buttonStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '250px',
    height: '50px',
    // backgroundColor: '#FF9900', // AWS orange
    border: 'none',
    borderRadius: '8px',
    // color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    backgroundImage: 'url(https://www.svgrepo.com/show/448266/aws.svg)',
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
      onClick={handleLogin}
      style={buttonStyles}
      onMouseOver={(e) => (e.currentTarget.style.filter = buttonHover.filter)}
      onMouseOut={(e) => (e.currentTarget.style.filter = 'none')}
    >
      Login with AWS Cognito
    </button>
  );
};

export default LoginButton;
