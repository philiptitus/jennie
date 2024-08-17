import axios from "axios";

const generateVideo = async (text) => {
  try {
    console.log('Sending request to generate video...');
    const response = await axios.post('https://api.d-id.com/talks', {
      text: text,
      voice: 'en_us_male',
    }, {
      headers: {
        'Authorization': `Bearer bXJwaGlsaXBvd2FkZUBnbWFpbC5jb20:gxvJwxnWR-Ye69HGFY5mo`,
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200 && response.data.video_url) {
      console.log('Video URL:', response.data.video_url);
      return response.data.video_url;
    } else {
      console.error('Unexpected response structure:', response.data);
      return null;
    }
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Error response:', error.response);
    } else if (error.request) {
      // No response was received
      console.error('No response received:', error.request);
    } else {
      // Something else happened while setting up the request
      console.error('Error in setting up request:', error.message);
    }
    return null;
  }
};

export default generateVideo
