import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

type VideoPlayerProps = {
  isSpeaking: boolean;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ isSpeaking }) => {
  const [currentVideo, setCurrentVideo] = useState<'intro' | 'lazy'>('lazy');
  const [playingIntro, setPlayingIntro] = useState<1 | 2>(1);
  const [playingLazy, setPlayingLazy] = useState<1 | 2>(1);

  const introPlayerRef1 = useRef<ReactPlayer>(null);
  const introPlayerRef2 = useRef<ReactPlayer>(null);
  const lazyPlayerRef1 = useRef<ReactPlayer>(null);
  const lazyPlayerRef2 = useRef<ReactPlayer>(null);

  useEffect(() => {
    setCurrentVideo(isSpeaking ? 'intro' : 'lazy');
  }, [isSpeaking]);

  const handleIntroEnded = () => {
    setPlayingIntro(playingIntro === 1 ? 2 : 1);
  };

  const handleLazyEnded = () => {
    setPlayingLazy(playingLazy === 1 ? 2 : 1);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <ReactPlayer
        ref={introPlayerRef1}
        url="/intro3.mp4"
        playing={currentVideo === 'intro' && playingIntro === 1}
        muted
        width="100%"
        height="100%"
        onEnded={handleIntroEnded}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: currentVideo === 'intro' && playingIntro === 1 ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
        }}
      />
      <ReactPlayer
        ref={introPlayerRef2}
        url="/intro3.mp4"
        playing={currentVideo === 'intro' && playingIntro === 2}
        muted
        width="100%"
        height="100%"
        onEnded={handleIntroEnded}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: currentVideo === 'intro' && playingIntro === 2 ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
        }}
      />
      <ReactPlayer
        ref={lazyPlayerRef1}
        url="/lazy3.mp4"
        playing={currentVideo === 'lazy' && playingLazy === 1}
        muted
        width="100%"
        height="100%"
        onEnded={handleLazyEnded}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: currentVideo === 'lazy' && playingLazy === 1 ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
        }}
      />
      <ReactPlayer
        ref={lazyPlayerRef2}
        url="/lazy3.mp4"
        playing={currentVideo === 'lazy' && playingLazy === 2}
        muted
        width="100%"
        height="100%"
        onEnded={handleLazyEnded}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: currentVideo === 'lazy' && playingLazy === 2 ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
        }}
      />
    </div>
  );
};

export default VideoPlayer;
