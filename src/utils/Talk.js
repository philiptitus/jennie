import React, { useState, useEffect } from 'react';
import generateVideo from './video'

const TalkingPerson = ({ text }) => {
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const url = await generateVideo(text);
      setVideoUrl(url);
    };

    fetchVideo();
  }, [text]);

  return (
    <div>
      {videoUrl ? (
        <video controls autoPlay>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default TalkingPerson;
