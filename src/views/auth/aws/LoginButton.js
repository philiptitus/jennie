const redirectToCognito = () => {
    const clientId = '6pul2opu2dt6i086o3deg4nis9'; // Replace with your Cognito App Client ID
    const redirectUri = encodeURIComponent('https://jennie-steel.vercel.app/auth/callback'); // Always use encodeURIComponent
    const cognitoDomain = 'https://philip.auth.eu-north-1.amazoncognito.com'; // Your Cognito domain
  
    const cognitoLoginUrl = `https://philip.auth.eu-north-1.amazoncognito.com/login?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
  
    // Redirect the user to Cognito's Hosted UI
    window.location.href = cognitoLoginUrl;
  };
  
  const LoginButton = () => (
    <button onClick={redirectToCognito}>
      Login with AWS Cognito
    </button>
  );
  
  export default LoginButton;
  